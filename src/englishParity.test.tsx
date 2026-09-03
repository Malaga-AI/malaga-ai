import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { render, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { LanguageProvider } from '@/components/language/LanguageProvider'
import { ThemeProvider } from '@/components/theme/ThemeProvider'


/**
 * The bilingual rewiring moved every literal out of the components and into
 * `src/lib/texts/`, so it is easy for a later edit to accidentally reword the
 * English side while touching the Spanish one. This fixture is a verified-good
 * snapshot of the rendered English page (see `src/test/fixtures/english-page.txt`)
 * — regenerate it deliberately whenever the English copy legitimately changes,
 * never to make a failing test pass without checking why it failed.
 */

vi.hoisted(() => {
  if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
    window.matchMedia = (query: string) =>
      ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      }) as MediaQueryList
  }
})

// jsdom has no WebGL context for the hero's three.js scene. The panel copy it
// renders is plain DOM either way, so stub the renderer and keep the text.
vi.mock('three', async () => {
  const actual = await vi.importActual<typeof import('three')>('three')
  function StubRenderer() {
    const domElement = document.createElement('canvas')
    return new Proxy(
      { domElement },
      { get: (target, property) => (property in target ? target[property as 'domElement'] : () => undefined) },
    )
  }
  return { ...actual, WebGLRenderer: StubRenderer }
})

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ events: [], source: 'fallback', fetchedAt: new Date().toISOString() }),
    }),
  )
})

describe('English page parity', () => {
  it('renders exactly the verified English text', async () => {
    Object.defineProperty(navigator, 'language', { value: 'en-US', configurable: true })
    const { container, getByText } = render(
      <ThemeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>,
    )
    await waitFor(() => getByText('Upcoming and recent sessions'))

    const rendered = (container.textContent ?? '').replace(/\s+/g, ' ').trim()
    const fixture = readFileSync(resolve(process.cwd(), 'src/test/fixtures/english-page.txt'), 'utf-8')

    expect(rendered).toBe(fixture)
  })
})
