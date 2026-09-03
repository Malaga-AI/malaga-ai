import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  LANGUAGE_STORAGE_KEY,
  applyLanguage,
  getBrowserLanguage,
  readStoredLanguage,
  storeLanguage,
} from './language'

function mockNavigatorLanguage(language: string | undefined) {
  Object.defineProperty(navigator, 'language', {
    value: language,
    configurable: true,
  })
}

afterEach(() => {
  window.localStorage.clear()
  document.documentElement.lang = ''
  vi.restoreAllMocks()
})

describe('getBrowserLanguage', () => {
  it('returns es when the browser language starts with es', () => {
    mockNavigatorLanguage('es-ES')
    expect(getBrowserLanguage()).toBe('es')
  })

  it('falls back to en for any other browser language', () => {
    mockNavigatorLanguage('fr-FR')
    expect(getBrowserLanguage()).toBe('en')
  })

  it('falls back to en when navigator.language is unavailable', () => {
    mockNavigatorLanguage(undefined)
    expect(getBrowserLanguage()).toBe('en')
  })
})

describe('readStoredLanguage', () => {
  it('returns null when nothing is stored', () => {
    expect(readStoredLanguage()).toBeNull()
  })

  it('returns null for a value that is not a known language', () => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, 'banana')
    expect(readStoredLanguage()).toBeNull()
  })

  it('round-trips a stored language', () => {
    storeLanguage('es')
    expect(readStoredLanguage()).toBe('es')
  })

  it('returns null when storage access throws', () => {
    vi.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    expect(readStoredLanguage()).toBeNull()
  })
})

describe('storeLanguage', () => {
  it('does not throw when storage access is blocked', () => {
    vi.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    expect(() => storeLanguage('es')).not.toThrow()
  })
})

describe('applyLanguage', () => {
  it('sets the lang attribute on <html>', () => {
    applyLanguage('es')
    expect(document.documentElement.lang).toBe('es')

    applyLanguage('en')
    expect(document.documentElement.lang).toBe('en')
  })
})
