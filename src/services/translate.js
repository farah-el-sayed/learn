// Automatic site translation (English → Arabic) powered by Google Translate.
// The Google widget stays hidden: a single button in the Navbar drives it.
// The choice persists in localStorage (for the button) and in the googtrans
// cookie (so Google re-applies Arabic after a full page reload).
// Switching back to English clears both and reloads the page: Google cannot
// un-translate in place without racing React for ownership of the DOM.

const STORAGE_KEY = 'learn-language'
const COOKIE_NAME = 'googtrans'
const PAGE_LANGUAGE = 'en'
const ARABIC = 'ar'
const COOKIE_VALUE = `/${PAGE_LANGUAGE}/${ARABIC}`

let loader = null
let listeners = []

function readLanguage() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === ARABIC ? ARABIC : PAGE_LANGUAGE
  } catch {
    return PAGE_LANGUAGE
  }
}

function writeLanguage(lang) {
  try {
    if (lang === ARABIC) window.localStorage.setItem(STORAGE_KEY, ARABIC)
    else window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* storage unavailable — the cookie still carries the choice */
  }
}

function writeCookie(enabled) {
  const expire = 'expires=Thu, 01 Jan 1970 00:00:00 GMT'
  try {
    if (enabled) {
      document.cookie = `${COOKIE_NAME}=${COOKIE_VALUE}; path=/`
      return
    }
    const host = window.location.hostname
    document.cookie = `${COOKIE_NAME}=; path=/; ${expire}`
    document.cookie = `${COOKIE_NAME}=; path=/; domain=${host}; ${expire}`
    document.cookie = `${COOKIE_NAME}=; path=/; domain=.${host}; ${expire}`
  } catch {
    /* ignore malformed cookie domains (e.g. file://) */
  }
}

function findCombo() {
  return document.querySelector('.goog-te-combo')
}

// The hidden language <select> only exists once the widget has booted.
function whenComboReady(timeout = 10000) {
  return new Promise(resolve => {
    const immediate = findCombo()
    if (immediate) return resolve(immediate)
    const startedAt = Date.now()
    const check = () => {
      const select = findCombo()
      if (select) return resolve(select)
      if (Date.now() - startedAt >= timeout) return resolve(null)
      window.setTimeout(check, 120)
    }
    check()
  })
}

export function getLanguage() {
  return readLanguage()
}

export function onLanguageChange(listener) {
  listeners.push(listener)
  return () => {
    listeners = listeners.filter(item => item !== listener)
  }
}

function notify() {
  const lang = readLanguage()
  document.documentElement.lang = lang
  listeners.forEach(listener => listener(lang))
}

// --- Keep Google's top banner out of the way -------------------------------
// Google injects its stylesheet *after* ours (so plain CSS can lose the
// cascade) and may re-add the bar at any time. Three layers of defence:
// a stylesheet appended after Google's, inline styles (which beat every
// stylesheet), and a MutationObserver that re-applies them on insertion.

const BANNER_RULES = `
  iframe.goog-te-banner-frame,
  .goog-te-banner-frame.skiptranslate,
  .skiptranslate > iframe,
  div.skiptranslate:has(> iframe),
  .goog-te-balloon-frame,
  .goog-te-spinner-pos,
  #goog-gt-tt,
  .VIpgJd-ZVi9od-ORHb,
  .VIpgJd-ZVi9od-aZ2wEe,
  .VIpgJd-ZVi9od-aZ2wEe-wOHMyf,
  .VIpgJd-ZVi9od-l4VXw-haA0lb {
    display: none !important;
    visibility: hidden !important;
    height: 0 !important;
    border: none !important;
    box-shadow: none !important;
  }
  html body {
    top: 0 !important;
    margin-top: 0 !important;
    padding-top: 0 !important;
  }
`

const BANNER_SELECTORS = [
  'iframe.goog-te-banner-frame',
  '.skiptranslate > iframe',
  '.goog-te-balloon-frame',
  '.goog-te-spinner-pos',
  '.VIpgJd-ZVi9od-ORHb',
  '.VIpgJd-ZVi9od-aZ2wEe',
  '.VIpgJd-ZVi9od-aZ2wEe-wOHMyf',
  '.VIpgJd-ZVi9od-l4VXw-haA0lb',
].join(', ')

let suppressorInstalled = false

function forceHideBanner() {
  if (!document.body) return

  document.querySelectorAll(BANNER_SELECTORS).forEach(el => {
    if (el.style.getPropertyValue('display') !== 'none') {
      el.style.setProperty('display', 'none', 'important')
      el.style.setProperty('visibility', 'hidden', 'important')
    }
  })

  // The wrapper keeps a white strip even after its iframe is gone.
  document.querySelectorAll('div.skiptranslate').forEach(el => {
    if (el.querySelector('iframe') && el.style.getPropertyValue('display') !== 'none') {
      el.style.setProperty('display', 'none', 'important')
    }
  })

  if (document.body.style.getPropertyValue('top') !== '0px') {
    document.body.style.setProperty('top', '0px', 'important')
    document.body.style.setProperty('margin-top', '0px', 'important')
    document.body.style.setProperty('padding-top', '0px', 'important')
  }
}

function installBannerSuppressor() {
  if (suppressorInstalled || typeof document === 'undefined') return
  suppressorInstalled = true

  // Layer 1: appended after Google's <style>, so we win equal-specificity ties.
  const style = document.createElement('style')
  style.id = 'learn-gt-banner-rules'
  style.textContent = BANNER_RULES
  document.head.appendChild(style)

  // Layer 2: inline !important beats any stylesheet.
  forceHideBanner()

  // Layer 3: Google can insert or restore the bar later.
  if (typeof MutationObserver !== 'undefined' && document.documentElement) {
    const observer = new MutationObserver(() => forceHideBanner())
    observer.observe(document.documentElement, { childList: true, subtree: true })
  }
}

// Loads the Google Translate script exactly once.
// Resolves with the hidden language <select>, or null if it never appeared.
function loadWidget() {
  if (loader) return loader

  loader = new Promise((resolve, reject) => {
    const host = document.createElement('div')
    host.id = 'google_translate_element'
    host.setAttribute('aria-hidden', 'true')
    document.body.appendChild(host)

    window.googleTranslateElementInit = () => {
      try {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: PAGE_LANGUAGE,
            includedLanguages: `${PAGE_LANGUAGE},${ARABIC}`,
            autoDisplay: false,
          },
          'google_translate_element'
        )
      } catch (error) {
        reject(error)
        return
      }
      installBannerSuppressor()
      resolve(whenComboReady())
    }

    const script = document.createElement('script')
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.async = true
    script.onerror = () => reject(new Error('Google Translate could not be loaded'))
    document.head.appendChild(script)
  }).catch(error => {
    loader = null
    throw error
  })

  return loader
}

// Called once on mount: if the visitor left the site in Arabic, make sure the
// script loads and the cookie is in place so the page comes back translated.
export async function restoreTranslation() {
  if (readLanguage() !== ARABIC) return
  writeCookie(true)
  try {
    await loadWidget()
  } catch {
    /* offline or blocked — the button stays available for a retry */
  }
}

// Google rewrites the DOM in batches while it translates. Waiting for the
// churn to settle lets the button show a real loading state instead of a
// fixed fake delay (the timeout is only a safety net).
function whenTranslationSettles({ quiet = 500, timeout = 5000 } = {}) {
  return new Promise(resolve => {
    if (typeof MutationObserver === 'undefined' || !document.body) {
      resolve()
      return
    }
    let quietTimer = null
    const finish = () => {
      window.clearTimeout(timeoutTimer)
      window.clearTimeout(quietTimer)
      observer.disconnect()
      resolve()
    }
    const observer = new MutationObserver(() => {
      window.clearTimeout(quietTimer)
      quietTimer = window.setTimeout(finish, quiet)
    })
    observer.observe(document.body, { childList: true, subtree: true, characterData: true })
    const timeoutTimer = window.setTimeout(finish, timeout)
  })
}

// Switches between Arabic and English.
export async function setLanguage(lang) {
  const next = lang === ARABIC ? ARABIC : PAGE_LANGUAGE
  writeLanguage(next)
  writeCookie(next === ARABIC)
  document.documentElement.lang = next

  if (next === PAGE_LANGUAGE) {
    const wasTranslated = Boolean(loader)
    notify()
    if (wasTranslated) {
      // Reverting in place races Google's DOM unwrapping against React:
      // React later removes nodes Google already replaced, the tree unmounts
      // and the page goes blank. A clean reload (cookie already cleared
      // above) sidesteps the race entirely.
      window.location.reload()
    }
    return next
  }

  const select = await loadWidget()
  if (select && select.value !== ARABIC) {
    const settled = whenTranslationSettles()
    select.value = ARABIC
    select.dispatchEvent(new Event('change'))
    await settled
  } else if (!select) {
    // Widget never showed up: the cookie makes the next load translate.
    window.location.reload()
  } else {
    // Arabic already applied (restored from the cookie) — give React a beat.
    await whenTranslationSettles({ quiet: 200, timeout: 1500 })
  }
  notify()
  return next
}
