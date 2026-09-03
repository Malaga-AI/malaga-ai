import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  LanguageContext,
  applyLanguage,
  readStoredLanguage,
  storeLanguage,
  type Language,
} from '@/lib/language'
import { documentTexts } from '@/lib/texts/document'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => readStoredLanguage() ?? 'en')

  useEffect(() => {
    applyLanguage(language)

    const { title, description } = documentTexts[language]
    document.title = title

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description)
  }, [language])

  const setLanguage = useCallback((next: Language) => {
    storeLanguage(next)
    setLanguageState(next)
  }, [])

  const toggleLanguage = useCallback(() => {
    setLanguageState((current) => {
      const next = current === 'en' ? 'es' : 'en'
      storeLanguage(next)
      return next
    })
  }, [])

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage }),
    [language, setLanguage, toggleLanguage],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
