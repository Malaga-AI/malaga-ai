import { createContext, useContext } from 'react'

export type Language = 'en' | 'es'

/**
 * Auto-detected from the browser once on load, same as the Career Advice
 * mini-site: any `es*` locale is Spanish, everything else is English. Not
 * user-switchable — there is no stored override and no toggle.
 */
export function detectLanguage(): Language {
  if (typeof navigator === 'undefined' || typeof navigator.language !== 'string') return 'en'
  return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en'
}

type LanguageContextValue = {
  language: Language
}

export const LanguageContext = createContext<LanguageContextValue>({ language: 'en' })

export function useLanguage() {
  return useContext(LanguageContext)
}
