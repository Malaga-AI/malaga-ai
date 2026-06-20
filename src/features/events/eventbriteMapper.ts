import type { EventItem, EventStatus } from './types.js'

type EventbriteMoney = {
  major_value?: string | null
  currency?: string | null
}

export type EventbriteRawEvent = {
  id?: string | number | null
  name?: { text?: string | null } | null
  description?: { text?: string | null } | null
  summary?: string | null
  url?: string | null
  logo?: { original?: { url?: string | null } | null; url?: string | null } | null
  start?: { utc?: string | null; local?: string | null; timezone?: string | null } | null
  end?: { utc?: string | null; local?: string | null; timezone?: string | null } | null
  venue?: {
    name?: string | null
    address?: { localized_address_display?: string | null } | null
  } | null
  organizer?: { name?: string | null } | null
  online_event?: boolean | null
  is_free?: boolean | null
  currency?: string | null
  status?: string | null
  capacity?: number | null
  ticket_availability?: {
    has_available_tickets?: boolean | null
    is_sold_out?: boolean | null
    minimum_ticket_price?: EventbriteMoney | null
    maximum_ticket_price?: EventbriteMoney | null
  } | null
}

const knownStatuses = new Set<EventStatus>(['live', 'draft', 'started', 'ended', 'completed', 'canceled', 'unknown'])

function toEventStatus(status?: string | null): EventStatus {
  return status && knownStatuses.has(status as EventStatus) ? (status as EventStatus) : 'unknown'
}

function toPrice(price?: EventbriteMoney | null) {
  if (!price?.major_value) return undefined

  const parsed = Number.parseFloat(price.major_value)
  return Number.isFinite(parsed) ? parsed : undefined
}

function cleanText(value?: string | null) {
  return value?.replace(/\s+/g, ' ').trim()
}

export function mapEventbriteEventToEventItem(raw: EventbriteRawEvent): EventItem {
  const description = cleanText(raw.description?.text) ?? ''
  const summary = cleanText(raw.summary) ?? (description ? description.slice(0, 180) : undefined)
  const minPrice = toPrice(raw.ticket_availability?.minimum_ticket_price)
  const maxPrice = toPrice(raw.ticket_availability?.maximum_ticket_price)
  const currency =
    raw.currency ??
    raw.ticket_availability?.minimum_ticket_price?.currency ??
    raw.ticket_availability?.maximum_ticket_price?.currency ??
    undefined

  return {
    id: String(raw.id ?? ''),
    title: cleanText(raw.name?.text) ?? 'Evento sin titulo',
    description,
    summary,
    url: raw.url ?? '',
    imageUrl: raw.logo?.original?.url ?? raw.logo?.url ?? undefined,
    startsAt: raw.start?.utc ?? raw.start?.local ?? '',
    endsAt: raw.end?.utc ?? raw.end?.local ?? undefined,
    timezone: raw.start?.timezone ?? raw.end?.timezone ?? undefined,
    venueName: raw.venue?.name ?? undefined,
    venueAddress: raw.venue?.address?.localized_address_display ?? undefined,
    organizerName: raw.organizer?.name ?? undefined,
    isOnline: raw.online_event ?? false,
    isFree: raw.is_free ?? minPrice === 0,
    currency,
    minPrice,
    maxPrice,
    status: toEventStatus(raw.status),
    capacity: raw.capacity ?? undefined,
    hasAvailableTickets: raw.ticket_availability?.has_available_tickets ?? undefined,
    isSoldOut: raw.ticket_availability?.is_sold_out ?? undefined,
  }
}
