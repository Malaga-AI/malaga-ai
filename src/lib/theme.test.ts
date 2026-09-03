import { afterEach, describe, expect, it, vi } from 'vitest'
import { THEME_STORAGE_KEY, applyTheme, getSystemTheme, readStoredTheme, storeTheme } from './theme'

function mockPrefersLight(matches: boolean | null) {
  if (matches === null) {
    // Browsers without matchMedia at all.
    Object.defineProperty(window, 'matchMedia', { value: undefined, configurable: true, writable: true })
    return
  }

  Object.defineProperty(window, 'matchMedia', {
    value: vi.fn((query: string) => ({
      matches: query.includes('prefers-color-scheme: light') ? matches : false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
    configurable: true,
    writable: true,
  })
}

afterEach(() => {
  window.localStorage.clear()
  document.documentElement.className = ''
  document.documentElement.style.colorScheme = ''
  vi.restoreAllMocks()
})

describe('getSystemTheme', () => {
  it('returns light when the OS explicitly prefers light', () => {
    mockPrefersLight(true)
    expect(getSystemTheme()).toBe('light')
  })

  it('falls back to dark when the OS expresses no light preference', () => {
    mockPrefersLight(false)
    expect(getSystemTheme()).toBe('dark')
  })

  it('falls back to dark when matchMedia is unavailable', () => {
    mockPrefersLight(null)
    expect(getSystemTheme()).toBe('dark')
  })
})

describe('readStoredTheme', () => {
  it('returns null when nothing is stored', () => {
    expect(readStoredTheme()).toBeNull()
  })

  it('returns null for a value that is not a known theme', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'banana')
    expect(readStoredTheme()).toBeNull()
  })

  it('round-trips a stored theme', () => {
    storeTheme('light')
    expect(readStoredTheme()).toBe('light')
  })
})

describe('applyTheme', () => {
  it('swaps the class on <html> instead of accumulating both', () => {
    applyTheme('light')
    expect(document.documentElement.classList.contains('light')).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(document.documentElement.style.colorScheme).toBe('light')

    applyTheme('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(document.documentElement.classList.contains('light')).toBe(false)
    expect(document.documentElement.style.colorScheme).toBe('dark')
  })
})
