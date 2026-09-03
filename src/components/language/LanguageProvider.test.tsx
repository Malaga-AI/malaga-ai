import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { LanguageProvider } from './LanguageProvider'
import { useLanguage } from '@/lib/language'
import { documentTexts } from '@/lib/texts/document'

function ToggleButton() {
  const { toggleLanguage } = useLanguage()
  return (
    <button type="button" onClick={toggleLanguage}>
      toggle
    </button>
  )
}

function getMetaDescription() {
  return document.querySelector('meta[name="description"]')
}

afterEach(() => {
  window.localStorage.clear()
  document.documentElement.lang = ''
  document.title = ''
  getMetaDescription()?.remove()
})

describe('LanguageProvider', () => {
  it('sets the document title and meta description for the initial language', () => {
    render(
      <LanguageProvider>
        <ToggleButton />
      </LanguageProvider>,
    )

    expect(document.title).toBe(documentTexts.en.title)
    expect(getMetaDescription()?.getAttribute('content')).toBe(documentTexts.en.description)
  })

  it('updates the title and meta description when the language changes', () => {
    render(
      <LanguageProvider>
        <ToggleButton />
      </LanguageProvider>,
    )

    fireEvent.click(screen.getByText('toggle'))

    expect(document.documentElement.lang).toBe('es')
    expect(document.title).toBe(documentTexts.es.title)
    expect(getMetaDescription()?.getAttribute('content')).toBe(documentTexts.es.description)

    fireEvent.click(screen.getByText('toggle'))

    expect(document.title).toBe(documentTexts.en.title)
    expect(getMetaDescription()?.getAttribute('content')).toBe(documentTexts.en.description)
  })

  it('creates the meta description element when the page lacks one', () => {
    getMetaDescription()?.remove()
    expect(getMetaDescription()).toBeNull()

    render(
      <LanguageProvider>
        <ToggleButton />
      </LanguageProvider>,
    )

    expect(getMetaDescription()?.getAttribute('content')).toBe(documentTexts.en.description)
  })
})
