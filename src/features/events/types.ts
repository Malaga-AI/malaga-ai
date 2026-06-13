export type EventStatus = 'live' | 'draft' | 'started' | 'ended' | 'completed' | 'canceled' | 'unknown'

export type EventItem = {
  id: string
  title: string
  description: string
  summary?: string
  url: string
  imageUrl?: string
  startsAt: string
  endsAt?: string
  timezone?: string
  venueName?: string
  venueAddress?: string
  organizerName?: string
  isOnline?: boolean
  isFree?: boolean
  currency?: string
  minPrice?: number
  maxPrice?: number
  status: EventStatus
  capacity?: number
  hasAvailableTickets?: boolean
  isSoldOut?: boolean
}

export type EventsResponse = {
  events: EventItem[]
  source: 'eventbrite' | 'fallback'
  fetchedAt: string
}
