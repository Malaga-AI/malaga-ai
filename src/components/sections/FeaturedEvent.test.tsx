import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FeaturedEvent } from './FeaturedEvent'
import type { EventItem } from '@/features/events/types'

const events: EventItem[] = [
  {
    id: 'past',
    title: 'Past event',
    description: '',
    url: 'https://www.eventbrite.com/e/past',
    startsAt: '2026-01-01T16:30:00Z',
    status: 'completed',
  },
  {
    id: 'future',
    title: 'Career Advice in the Age of AI',
    description: 'Stay ahead in AI.',
    url: 'https://www.eventbrite.com/e/career-advice',
    startsAt: '2999-06-26T16:30:00Z',
    endsAt: '2999-06-26T17:15:00Z',
    timezone: 'Europe/Madrid',
    venueName: 'La Termica',
    organizerName: 'Malaga-AI',
    isFree: true,
    status: 'live',
  },
]

describe('FeaturedEvent', () => {
  it('renders CTA for the nearest future event', () => {
    render(<FeaturedEvent events={events} />)

    expect(screen.getByRole('heading', { name: 'Career Advice in the Age of AI' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Register now' })).toHaveAttribute(
      'href',
      'https://www.eventbrite.com/e/career-advice',
    )
  })

  it('renders nothing when there is no future event', () => {
    const { container } = render(<FeaturedEvent events={[events[0]]} />)

    expect(container).toBeEmptyDOMElement()
  })
})
