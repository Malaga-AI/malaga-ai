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
