import type { EventItem } from './types.js'

type EventLanguage = 'en' | 'es'

type EventTicketStateLabels = {
  past: string
  soldOut: string
  registrationClosed: string
  freeRegistration: string
  upcoming: string
}

const DATE_LOCALES: Record<EventLanguage, string> = {
  en: 'en-GB',
  es: 'es-ES',
}

export function getFeaturedEvent(events: EventItem[], now = Date.now()) {
  return (
    [...events]
      .filter((event) => new Date(event.startsAt).getTime() >= now)
      .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())[0] ?? null
  )
}

export function splitEventsByTime(events: EventItem[], now = Date.now()) {
  const upcoming: EventItem[] = []
  const past: EventItem[] = []

  for (const event of events) {
    if (new Date(event.startsAt).getTime() >= now) upcoming.push(event)
    else past.push(event)
  }

  upcoming.sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())
  past.sort((a, b) => new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime())

  return { upcoming, past }
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

export function formatEventDateTime(isoDate: string, timezone: string | undefined, language: EventLanguage) {
  return new Intl.DateTimeFormat(DATE_LOCALES[language], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: timezone,
  }).format(new Date(isoDate))
}

export function formatEventTimeRange(event: EventItem, language: EventLanguage) {
  const locale = DATE_LOCALES[language]
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

export function getEventStateLabel(event: EventItem, labels: EventTicketStateLabels, now = Date.now()) {
  if (new Date(event.startsAt).getTime() < now || event.status === 'completed' || event.status === 'ended') {
    return labels.past
  }

  if (event.isSoldOut) return labels.soldOut
  if (event.hasAvailableTickets === false) return labels.registrationClosed
  if (event.isFree) return labels.freeRegistration

  return labels.upcoming
}
