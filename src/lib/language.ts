import { createContext, useContext } from 'react'

export type Language = 'en' | 'es'

export const LANGUAGE_STORAGE_KEY = 'malaga-ai-language'

/**
 * The browser's language preference. Only an explicit Spanish setting opts
 * in; everything else, including unset or unrecognized values, is English.
 */
export function getBrowserLanguage(): Language {
  if (typeof navigator === 'undefined' || typeof navigator.language !== 'string') return 'en'
  return navigator.language.startsWith('es') ? 'es' : 'en'
}

export function readStoredLanguage(): Language | null {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    return stored === 'en' || stored === 'es' ? stored : null
  } catch {
    return null
  }
}

export function storeLanguage(language: Language) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  } catch {
    // Private mode or blocked storage: the language still applies for this visit.
  }
}

export function applyLanguage(language: Language) {
  document.documentElement.lang = language
}

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
}

export const LanguageContext = createContext<LanguageContextValue>({
  language: 'en',
  setLanguage: () => {},
  toggleLanguage: () => {},
})

export function useLanguage() {
  return useContext(LanguageContext)
}
