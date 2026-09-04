import { useEffect, useMemo, type ReactNode } from 'react'
import { LanguageContext, detectLanguage } from '@/lib/language'
import { TEXTS } from '@/lib/texts'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useMemo(() => detectLanguage(), [])

  useEffect(() => {
    document.documentElement.lang = language

    const { title, description } = TEXTS[language].document
    document.title = title

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description)
  }, [language])

  const value = useMemo(() => ({ language }), [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
