import type { EventItem } from './types'

export function getFeaturedEvent(events: EventItem[], now = Date.now()) {
  return (
    [...events]
      .filter((event) => new Date(event.startsAt).getTime() >= now)
      .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())[0] ?? null
  )
}

export function sortEventsForDisplay(events: EventItem[], now = Date.now()) {
  return [...events].sort((a, b) => {
    const aTime = new Date(a.startsAt).getTime()
    const bTime = new Date(b.startsAt).getTime()
    const aUpcoming = aTime >= now
    const bUpcoming = bTime >= now

    if (aUpcoming && bUpcoming) return aTime - bTime
    if (!aUpcoming && !bUpcoming) return bTime - aTime
    return aUpcoming ? -1 : 1
  })
}

export function formatEventDateTime(isoDate: string, timezone?: string, locale = 'es-ES') {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: timezone,
  }).format(new Date(isoDate))
}

export function formatEventTimeRange(event: EventItem, locale = 'es-ES') {
  const start = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: event.timezone,
  }).format(new Date(event.startsAt))

  if (!event.endsAt) return start

  const end = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: event.timezone,
  }).format(new Date(event.endsAt))

  return `${start} - ${end}`
}

export function getEventStateLabel(event: EventItem, now = Date.now()) {
  if (new Date(event.startsAt).getTime() < now || event.status === 'completed' || event.status === 'ended') {
    return 'Past event'
  }

  if (event.isSoldOut) return 'Sold out'
  if (event.hasAvailableTickets === false) return 'Registration closed'
  if (event.isFree) return 'Free registration'

  return 'Upcoming'
}
