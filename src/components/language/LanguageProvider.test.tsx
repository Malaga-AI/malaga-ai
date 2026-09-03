import { render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { LanguageProvider } from './LanguageProvider'
import { documentTexts } from '@/lib/texts/document'

function mockNavigatorLanguage(language: string) {
  Object.defineProperty(navigator, 'language', { value: language, configurable: true })
}

function getMetaDescription() {
  return document.querySelector('meta[name="description"]')
}

afterEach(() => {
  document.documentElement.lang = ''
  document.title = ''
  getMetaDescription()?.remove()
})

describe('LanguageProvider', () => {
  it('sets the document title and meta description for a browser set to English', () => {
    mockNavigatorLanguage('en-US')
    render(
      <LanguageProvider>
        <div />
      </LanguageProvider>,
    )

    expect(document.documentElement.lang).toBe('en')
    expect(document.title).toBe(documentTexts.en.title)
    expect(getMetaDescription()?.getAttribute('content')).toBe(documentTexts.en.description)
  })

  it('sets the document title and meta description for a browser set to Spanish', () => {
    mockNavigatorLanguage('es-ES')
    render(
      <LanguageProvider>
        <div />
      </LanguageProvider>,
    )

    expect(document.documentElement.lang).toBe('es')
    expect(document.title).toBe(documentTexts.es.title)
    expect(getMetaDescription()?.getAttribute('content')).toBe(documentTexts.es.description)
  })

  it('creates the meta description element when the page lacks one', () => {
    mockNavigatorLanguage('en-US')
    getMetaDescription()?.remove()
    expect(getMetaDescription()).toBeNull()

    render(
      <LanguageProvider>
        <div />
      </LanguageProvider>,
    )

    expect(getMetaDescription()?.getAttribute('content')).toBe(documentTexts.en.description)
  })
})
