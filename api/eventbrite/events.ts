import { fallbackEvents } from '../../src/features/events/fallbackEvents.js'
import { sortEventsForDisplay } from '../../src/features/events/eventHelpers.js'
import { mapEventbriteEventToEventItem, type EventbriteRawEvent } from '../../src/features/events/eventbriteMapper.js'
import type { EventItem, EventsResponse } from '../../src/features/events/types.js'

type ServerlessRequest = {
  method?: string
}

type ServerlessResponse = {
  status: (statusCode: number) => ServerlessResponse
  setHeader: (name: string, value: string) => void
  json: (body: unknown) => void
}

type EventbriteEventsPayload = {
  events?: unknown[]
  pagination?: {
    continuation?: string
    has_more_items?: boolean
  }
}

const EVENTBRITE_BASE_URL = 'https://www.eventbriteapi.com/v3'
const MAX_PAGES_PER_STATUS = 3
const EVENT_STATUSES = ['live', 'ended']

function cacheSeconds() {
  const parsed = Number.parseInt(process.env.EVENTBRITE_CACHE_SECONDS ?? '300', 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 300
}

export function jsonResponse(events: EventItem[], source: EventsResponse['source']): EventsResponse {
  return {
    events,
    source,
    fetchedAt: new Date().toISOString(),
  }
}

async function fetchStatusEvents(status: string, continuation?: string) {
  const organizationId = process.env.EVENTBRITE_ORGANIZATION_ID
  const token = process.env.EVENTBRITE_PRIVATE_TOKEN

  if (!organizationId || !token) {
    throw new Error('Missing Eventbrite environment variables')
  }

  const url = new URL(`${EVENTBRITE_BASE_URL}/organizations/${organizationId}/events/`)
  url.searchParams.set('status', status)
  url.searchParams.set('order_by', status === 'live' ? 'start_asc' : 'start_desc')
  url.searchParams.set('expand', 'venue,organizer,ticket_availability,logo')
  url.searchParams.set('page_size', '50')

  if (continuation) {
    url.searchParams.set('continuation', continuation)
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10_000)

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`Eventbrite request failed with ${response.status}`)
    }

    return (await response.json()) as EventbriteEventsPayload
  } finally {
    clearTimeout(timeout)
  }
}

export async function fetchEventbriteEvents() {
  const events: EventItem[] = []

  for (const status of EVENT_STATUSES) {
    let continuation: string | undefined

    for (let page = 0; page < MAX_PAGES_PER_STATUS; page += 1) {
      const payload = await fetchStatusEvents(status, continuation)
      const mappedEvents = (payload.events ?? [])
        .map((event) => mapEventbriteEventToEventItem(event as EventbriteRawEvent))
        .filter((event) => event.id && event.url && event.startsAt)

      events.push(...mappedEvents)

      if (!payload.pagination?.has_more_items || !payload.pagination.continuation) break
      continuation = payload.pagination.continuation
    }
  }

  const uniqueEvents = Array.from(new Map(events.map((event) => [event.id, event])).values())
  return sortEventsForDisplay(uniqueEvents)
}

export default async function handler(request: ServerlessRequest, response: ServerlessResponse) {
  if (request.method && request.method !== 'GET') {
    response.status(405).json({ error: 'Method not allowed' })
    return
  }

  response.setHeader('Cache-Control', `s-maxage=${cacheSeconds()}, stale-while-revalidate=${cacheSeconds() * 2}`)

  try {
    const events = await fetchEventbriteEvents()
    response.status(200).json(jsonResponse(events, 'eventbrite'))
  } catch {
    response.status(200).json(jsonResponse(sortEventsForDisplay(fallbackEvents), 'fallback'))
  }
}
