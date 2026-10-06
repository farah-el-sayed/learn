import i18n from '../i18n.js'

const STORAGE_KEY = 'learn-language'

export function getLanguage() {
  return i18n.resolvedLanguage === 'ar' ? 'ar' : 'en'
}

export async function setLanguage(language) {
  const nextLanguage = language === 'ar' ? 'ar' : 'en'
  await i18n.changeLanguage(nextLanguage)

  try {
    window.localStorage.setItem(STORAGE_KEY, nextLanguage)
  } catch {
    // Language changes still apply for the current session if storage is disabled.
  }

  return nextLanguage
}
