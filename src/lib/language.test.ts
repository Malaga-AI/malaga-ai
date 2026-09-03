import { afterEach, describe, expect, it } from 'vitest'
import { detectLanguage } from './language'

function mockNavigatorLanguage(language: string | undefined) {
  Object.defineProperty(navigator, 'language', {
    value: language,
    configurable: true,
  })
}

afterEach(() => {
  document.documentElement.lang = ''
})

describe('detectLanguage', () => {
  it('returns es for any es-prefixed locale, case-insensitively', () => {
    mockNavigatorLanguage('es-ES')
    expect(detectLanguage()).toBe('es')

    mockNavigatorLanguage('ES-MX')
    expect(detectLanguage()).toBe('es')

    mockNavigatorLanguage('es')
    expect(detectLanguage()).toBe('es')
  })

  it('falls back to en for any other browser language', () => {
    mockNavigatorLanguage('fr-FR')
    expect(detectLanguage()).toBe('en')
  })

  it('falls back to en when navigator.language is unavailable', () => {
    mockNavigatorLanguage(undefined)
    expect(detectLanguage()).toBe('en')
  })
})
