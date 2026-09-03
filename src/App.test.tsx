import { render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { LanguageProvider } from '@/components/language/LanguageProvider'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import type { Language } from '@/lib/language'
import { TEXTS } from '@/lib/texts'

// GSAP's ScrollTrigger calls `window.matchMedia` while it registers, at module
// import time, and jsdom does not implement it. Hoisted so it exists before
// `App` and its transitive imports are evaluated.
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

// The hero mounts a Three.js scene, which jsdom has no WebGL context for. The
// panel copy it renders is plain DOM either way, so stub the canvas out and keep
// the text.
vi.mock('three', async () => {
  const actual = await vi.importActual<typeof import('three')>('three')
  // Any method the hero calls on the renderer is a no-op here, so the stub does
  // not have to track the component's use of the three.js API.
  function StubRenderer() {
    const domElement = document.createElement('canvas')
    return new Proxy(
      { domElement },
      {
        get: (target, property) =>
          property in target ? target[property as 'domElement'] : () => undefined,
      },
    )
  }
  return { ...actual, WebGLRenderer: StubRenderer }
})

function renderAppIn(language: Language) {
  Object.defineProperty(navigator, 'language', {
    value: language === 'es' ? 'es-ES' : 'en-US',
    configurable: true,
  })
  return render(
    <ThemeProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>,
  )
}

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ events: [], source: 'fallback', fetchedAt: new Date().toISOString() }),
    }),
  )
})

afterEach(() => {
  vi.unstubAllGlobals()
  window.localStorage.clear()
  document.documentElement.lang = ''
  document.title = ''
})

describe('App language switching', () => {
  it('renders every section heading in English', async () => {
    renderAppIn('en')

    const en = TEXTS.en
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: en.events.heading })).toBeInTheDocument()
    })

    for (const heading of [
      en.hero.panels[0].title,
      en.initiatives.heading,
      en.team.heading,
      en.photos.heading,
      en.partners.sponsorsHeading,
      en.partners.partnersHeading,
      en.contact.heading,
    ]) {
      expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument()
    }
  })

  it('renders every section heading in Spanish', async () => {
    renderAppIn('es')

    const es = TEXTS.es
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: es.events.heading })).toBeInTheDocument()
    })

    for (const heading of [
      es.hero.panels[0].title,
      es.initiatives.heading,
      es.team.heading,
      es.photos.heading,
      es.partners.sponsorsHeading,
      es.partners.partnersHeading,
      es.contact.heading,
    ]) {
      expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument()
    }
  })

  it('leaves no English section heading on the Spanish page', async () => {
    renderAppIn('es')

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: TEXTS.es.events.heading })).toBeInTheDocument()
    })

    const englishOnly = [
      TEXTS.en.events.heading,
      TEXTS.en.initiatives.heading,
      TEXTS.en.team.heading,
      TEXTS.en.photos.heading,
      TEXTS.en.contact.heading,
    ].filter((heading) => !Object.values(TEXTS.es).some((area) => JSON.stringify(area).includes(heading)))

    // Guards against the filter quietly emptying the list and the assertions
    // below passing without checking anything.
    expect(englishOnly.length).toBeGreaterThan(2)

    for (const heading of englishOnly) {
      expect(screen.queryByRole('heading', { name: heading })).not.toBeInTheDocument()
    }
  })
})
