import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { render, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { LanguageProvider } from '@/components/language/LanguageProvider'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { LANGUAGE_STORAGE_KEY } from '@/lib/language'

/**
 * The bilingual rewiring (see design-notes-spanish.md) was meant to be a pure
 * refactor for English readers: every literal moved out of the components and
 * into `src/lib/texts/`, nothing reworded. This fixture is the rendered English
 * page, captured and diffed word-for-word against commit b8ca680 — the last
 * state before that work started — with the diff showing exactly one change:
 * the two new "ES" language-toggle labels (desktop bar and mobile menu, both
 * present in the DOM). That comparison does not run on every test invocation,
 * since it needs a second git worktree; this fixture is what is left of it, and
 * this test is what keeps it honest afterwards.
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
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, 'en')
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
