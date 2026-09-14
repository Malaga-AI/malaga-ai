import { describe, expect, it } from 'vitest'
import { isPublicEventbriteEvent, mapEventbriteEventToEventItem } from './eventbriteMapper'

describe('isPublicEventbriteEvent', () => {
  it('accepts only events Eventbrite lists publicly', () => {
    expect(isPublicEventbriteEvent({ id: '1', listed: true })).toBe(true)
    expect(isPublicEventbriteEvent({ id: '2', listed: false })).toBe(false)
    expect(isPublicEventbriteEvent({ id: '3', listed: null })).toBe(false)
    expect(isPublicEventbriteEvent({ id: '4' })).toBe(false)
  })
})

describe('mapEventbriteEventToEventItem', () => {
  it('normalizes Eventbrite events with logo, venue, organizer and tickets', () => {
    const event = mapEventbriteEventToEventItem({
      id: '1991565396713',
      name: { text: 'Malaga-AI Networking Night - June 2026' },
      description: { text: 'AI networking in Malaga.' },
      summary: 'AI networking in Malaga.',
      url: 'https://www.eventbrite.com/e/example',
      start: { utc: '2026-06-25T16:30:00Z', timezone: 'Europe/Madrid' },
      end: { utc: '2026-06-25T18:30:00Z', timezone: 'Europe/Madrid' },
      logo: { original: { url: 'https://img.evbuc.com/original.jpg' }, url: 'https://img.evbuc.com/card.jpg' },
      venue: {
        name: 'Innovation Campus - Malaga Terrace',
        address: { localized_address_display: '14 Calle Puerto, 29016 Malaga' },
      },
      organizer: { name: 'Malaga-AI' },
      online_event: false,
      is_free: true,
      status: 'live',
      capacity: 80,
      ticket_availability: {
        has_available_tickets: true,
        is_sold_out: false,
        minimum_ticket_price: { currency: 'USD', major_value: '0.00' },
        maximum_ticket_price: { currency: 'USD', major_value: '0.00' },
      },
    })

    expect(event).toMatchObject({
      id: '1991565396713',
      title: 'Malaga-AI Networking Night - June 2026',
      imageUrl: 'https://img.evbuc.com/original.jpg',
      venueName: 'Innovation Campus - Malaga Terrace',
      venueAddress: '14 Calle Puerto, 29016 Malaga',
      organizerName: 'Malaga-AI',
      isFree: true,
      minPrice: 0,
      maxPrice: 0,
      status: 'live',
      capacity: 80,
      hasAvailableTickets: true,
      isSoldOut: false,
    })
  })

  it('handles nullable optional fields', () => {
    const event = mapEventbriteEventToEventItem({
      id: null,
      name: null,
      description: null,
      url: null,
      start: null,
      status: 'unexpected',
      online_event: true,
    })

    expect(event.title).toBe('Evento sin titulo')
    expect(event.description).toBe('')
    expect(event.status).toBe('unknown')
    expect(event.isOnline).toBe(true)
  })
})
