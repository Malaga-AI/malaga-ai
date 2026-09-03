import { describe, expect, it } from 'vitest'
import { TEXTS } from './index'

function collectKeyPaths(value: unknown, path: string, keys: Set<string>) {
  if (typeof value === 'function') {
    keys.add(path)
    return
  }

  if (Array.isArray(value)) {
    keys.add(`${path}[]`)
    value.forEach((item, index) => collectKeyPaths(item, `${path}[${index}]`, keys))
    return
  }

  if (value !== null && typeof value === 'object') {
    for (const key of Object.keys(value)) {
      collectKeyPaths((value as Record<string, unknown>)[key], path ? `${path}.${key}` : key, keys)
    }
    return
  }

  keys.add(path)
}

describe('TEXTS', () => {
  it('has an identical key shape for every language', () => {
    const enKeys = new Set<string>()
    const esKeys = new Set<string>()

    collectKeyPaths(TEXTS.en, '', enKeys)
    collectKeyPaths(TEXTS.es, '', esKeys)

    expect([...esKeys].sort()).toEqual([...enKeys].sort())
  })

  it('does not leave any string values empty', () => {
    const emptyPaths: string[] = []

    function checkEmpty(value: unknown, path: string) {
      if (typeof value === 'function') return

      if (Array.isArray(value)) {
        value.forEach((item, index) => checkEmpty(item, `${path}[${index}]`))
        return
      }

      if (value !== null && typeof value === 'object') {
        for (const key of Object.keys(value)) {
          checkEmpty((value as Record<string, unknown>)[key], path ? `${path}.${key}` : key)
        }
        return
      }

      if (typeof value === 'string' && value.trim() === '') {
        emptyPaths.push(path)
      }
    }

    checkEmpty(TEXTS.en, 'en')
    checkEmpty(TEXTS.es, 'es')

    expect(emptyPaths).toEqual([])
  })
})

/**
 * Strings that are correctly identical in both languages. Everything else must
 * differ, otherwise it is copy that never got translated.
 *
 * `Partners`, `Online` and `Career Advice AI` are deliberate loanwords: Spanish
 * tech readers use them untranslated. The rest are proper nouns, an event
 * acronym, or the brand itself.
 */
const SHARED_VALUES = new Set([
  'Partners',
  'Online',
  'Career Advice AI',
  'Malaga-AI',
  '© 2026 Malaga-AI.',
  'GSEC',
  'IWD2026',
])

describe('translation coverage', () => {
  it('translates every string that is not a proper noun or an agreed loanword', () => {
    const untranslated: string[] = []

    function compare(en: unknown, es: unknown, path: string) {
      // Anchors and URLs are addresses, not copy.
      if (path.endsWith('.href')) return

      if (typeof en === 'function' && typeof es === 'function') {
        const enCall = (en as (value: string) => string)('X')
        const esCall = (es as (value: string) => string)('X')
        if (enCall === esCall && !SHARED_VALUES.has(enCall)) untranslated.push(`${path} :: ${enCall}`)
        return
      }

      if (typeof en === 'string' && typeof es === 'string') {
        if (en === es && !SHARED_VALUES.has(en)) untranslated.push(`${path} :: ${en}`)
        return
      }

      if (en !== null && es !== null && typeof en === 'object' && typeof es === 'object') {
        for (const key of Object.keys(en as object)) {
          compare(
            (en as Record<string, unknown>)[key],
            (es as Record<string, unknown>)[key],
            path ? `${path}.${key}` : key,
          )
        }
      }
    }

    compare(TEXTS.en, TEXTS.es, '')

    expect(untranslated).toEqual([])
  })
})
