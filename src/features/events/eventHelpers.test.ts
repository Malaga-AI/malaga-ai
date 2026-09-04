import { describe, expect, it } from 'vitest'
import {
  formatEventDateTime,
  formatEventTimeRange,
  getEventStateLabel,
  getFeaturedEvent,
  sortEventsForDisplay,
  splitEventsByTime,
} from './eventHelpers'
import { TEXTS } from '@/lib/texts'
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

  it('splits events into ascending upcoming and descending past groups', () => {
    const now = new Date('2026-06-13T12:00:00Z').getTime()
    const { upcoming, past } = splitEventsByTime(
      [
        event('older-past', '2026-05-20T16:30:00Z'),
        event('later', '2026-06-26T16:30:00Z'),
        event('recent-past', '2026-05-28T16:30:00Z'),
        event('next', '2026-06-25T16:30:00Z'),
      ],
      now,
    )

    expect(upcoming.map((item) => item.id)).toEqual(['next', 'later'])
    expect(past.map((item) => item.id)).toEqual(['recent-past', 'older-past'])
  })

  it('returns empty groups when there are no events', () => {
    const now = new Date('2026-06-13T12:00:00Z').getTime()

    expect(splitEventsByTime([], now)).toEqual({ upcoming: [], past: [] })
  })

  it('formats the date and time in English for the "en" language', () => {
    expect(formatEventDateTime('2026-06-25T16:30:00Z', 'Europe/Madrid', 'en')).toBe(
      new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Madrid',
      }).format(new Date('2026-06-25T16:30:00Z')),
    )
    expect(formatEventDateTime('2026-06-25T16:30:00Z', 'Europe/Madrid', 'en')).toContain('June')
  })

  it('formats the date and time in Spanish for the "es" language', () => {
    expect(formatEventDateTime('2026-06-25T16:30:00Z', 'Europe/Madrid', 'es')).toBe(
      new Intl.DateTimeFormat('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Madrid',
      }).format(new Date('2026-06-25T16:30:00Z')),
    )
    expect(formatEventDateTime('2026-06-25T16:30:00Z', 'Europe/Madrid', 'es')).toContain('junio')
  })

  it('formats a time range using the locale for the given language', () => {
    const withEnd = event('with-end', '2026-06-25T16:30:00Z')
    withEnd.endsAt = '2026-06-25T18:00:00Z'
    withEnd.timezone = 'Europe/Madrid'

    expect(formatEventTimeRange(withEnd, 'en')).toBe(
      `${new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid' }).format(new Date(withEnd.startsAt))} - ${new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid' }).format(new Date(withEnd.endsAt))}`,
    )
    expect(formatEventTimeRange(withEnd, 'es')).toBe(
      `${new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid' }).format(new Date(withEnd.startsAt))} - ${new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid' }).format(new Date(withEnd.endsAt))}`,
    )
  })

  it('formats just the start time when there is no end time', () => {
    const withoutEnd = event('no-end', '2026-06-25T16:30:00Z')
    withoutEnd.timezone = 'Europe/Madrid'

    expect(formatEventTimeRange(withoutEnd, 'en')).not.toContain('-')
  })

  it('returns the ticket state label for the given language', () => {
    const now = new Date('2026-06-13T12:00:00Z').getTime()

    const pastEvent = event('gone', '2026-06-01T12:00:00Z')
    expect(getEventStateLabel(pastEvent, TEXTS.en.events.ticketState, now)).toBe('Past event')
    expect(getEventStateLabel(pastEvent, TEXTS.es.events.ticketState, now)).toBe('Evento pasado')

    const soldOut = event('sold-out', '2026-06-25T16:30:00Z')
    soldOut.isSoldOut = true
    expect(getEventStateLabel(soldOut, TEXTS.en.events.ticketState, now)).toBe('Sold out')
    expect(getEventStateLabel(soldOut, TEXTS.es.events.ticketState, now)).toBe('Entradas agotadas')

    const closed = event('closed', '2026-06-25T16:30:00Z')
    closed.hasAvailableTickets = false
    expect(getEventStateLabel(closed, TEXTS.en.events.ticketState, now)).toBe('Registration closed')
    expect(getEventStateLabel(closed, TEXTS.es.events.ticketState, now)).toBe('Inscripción cerrada')

    const free = event('free', '2026-06-25T16:30:00Z')
    free.isFree = true
    expect(getEventStateLabel(free, TEXTS.en.events.ticketState, now)).toBe('Free registration')
    expect(getEventStateLabel(free, TEXTS.es.events.ticketState, now)).toBe('Entrada gratuita')

    const upcoming = event('upcoming', '2026-06-25T16:30:00Z')
    expect(getEventStateLabel(upcoming, TEXTS.en.events.ticketState, now)).toBe('Upcoming')
    expect(getEventStateLabel(upcoming, TEXTS.es.events.ticketState, now)).toBe('Próximo')
  })
})
