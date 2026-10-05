import { useEffect, useState } from 'react'
import { Languages } from 'lucide-react'
import { getLanguage, restoreTranslation, setLanguage } from '../services/translate.js'
import { useToast } from './Toast.jsx'

// "عربي / EN" switch in the top bar: translates the whole site on click.
export default function LanguageToggle() {
  const [lang, setLang] = useState(getLanguage)
  const [busy, setBusy] = useState(false)
  const { error } = useToast()

  // Bring Arabic back after a reload.
  useEffect(() => {
    restoreTranslation()
  }, [])

  const toggle = async () => {
    if (busy) return
    const next = lang === 'ar' ? 'en' : 'ar'
    setBusy(true)
    try {
      await setLanguage(next)
      setLang(next)
    } catch {
      setLang(getLanguage())
      error('Translation service is unavailable right now. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  const goingToArabic = lang !== 'ar'
  const label = goingToArabic ? 'عربي' : 'EN'

  return (
    <>
      {busy && <span className="route-loading__bar" aria-hidden="true" />}
      <button
        type="button"
        onClick={toggle}
        disabled={busy}
        // Google must never rewrite this button's DOM — React owns it, and
        // unwrapping translated nodes during a re-render can blank the page.
        translate="no"
        aria-busy={busy}
        aria-pressed={!goingToArabic}
        aria-label={busy ? 'Translating…' : goingToArabic ? 'Translate site to Arabic' : 'Switch back to English'}
        title={busy ? 'Translating…' : goingToArabic ? 'Translate site to Arabic' : 'Switch back to English'}
        className="border border-line px-2 py-1.5 text-[13px] font-medium text-ink-muted transition hover:text-ink disabled:cursor-wait disabled:opacity-60 sm:px-2.5"
      >
        <span className="flex items-center gap-1.5">
          {busy ? (
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.291 0 1 5.291 1 12h3zm2 5.291A7.962 7.962 0 014 12H1c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <Languages size={15} aria-hidden="true" />
          )}
          {label}
        </span>
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {busy ? 'Translating the site…' : ''}
      </span>
    </>
  )
}
