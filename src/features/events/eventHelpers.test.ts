import { describe, expect, it } from 'vitest'
import { getFeaturedEvent, sortEventsForDisplay } from './eventHelpers'
import type { EventItem } from './types'

function event(id: string, startsAt: string): EventItem {
  return {
    id,
    title: id,
    description: '',
    url: `https://example.com/${id}`,
    startsAt,
    status: 'live',
  }
}

describe('event helpers', () => {
  it('returns the nearest future event as featured', () => {
    const now = new Date('2026-06-13T12:00:00Z').getTime()
    const featured = getFeaturedEvent(
      [
        event('past', '2026-06-01T12:00:00Z'),
        event('later', '2026-06-26T16:30:00Z'),
        event('next', '2026-06-25T16:30:00Z'),
      ],
      now,
    )

    expect(featured?.id).toBe('next')
  })

  it('returns null when there are no future events', () => {
    const now = new Date('2026-06-13T12:00:00Z').getTime()

    expect(getFeaturedEvent([event('past', '2026-06-01T12:00:00Z')], now)).toBeNull()
  })

  it('sorts future events ascending and past events descending', () => {
    const now = new Date('2026-06-13T12:00:00Z').getTime()
    const sorted = sortEventsForDisplay(
      [
        event('older-past', '2026-05-20T16:30:00Z'),
        event('later', '2026-06-26T16:30:00Z'),
        event('recent-past', '2026-05-28T16:30:00Z'),
        event('next', '2026-06-25T16:30:00Z'),
      ],
      now,
    )

    expect(sorted.map((item) => item.id)).toEqual(['next', 'later', 'recent-past', 'older-past'])
  })
})
