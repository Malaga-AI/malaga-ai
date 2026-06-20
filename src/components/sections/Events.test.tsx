import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Events } from './Events'
import type { EventItem } from '@/features/events/types'

function makeEvent(id: string, title = 'Malaga-AI Networking Night - June 2026'): EventItem {
  return {
    id,
    title,
    description: 'AI networking in Malaga.',
    summary: 'AI networking in Malaga.',
    url: `https://www.eventbrite.com/e/${id}`,
    startsAt: '2026-06-25T16:30:00Z',
    endsAt: '2026-06-25T18:30:00Z',
    timezone: 'Europe/Madrid',
    venueName: 'Innovation Campus - Malaga Terrace',
    organizerName: 'Malaga-AI',
    isFree: true,
    status: 'live',
  }
}

const event: EventItem = {
  id: '1991565396713',
  title: 'Malaga-AI Networking Night - June 2026',
  description: 'AI networking in Malaga.',
  summary: 'AI networking in Malaga.',
  url: 'https://www.eventbrite.com/e/example',
  startsAt: '2026-06-25T16:30:00Z',
  endsAt: '2026-06-25T18:30:00Z',
  timezone: 'Europe/Madrid',
  venueName: 'Innovation Campus - Malaga Terrace',
  organizerName: 'Malaga-AI',
  isFree: true,
  status: 'live',
}

describe('Events', () => {
  it('shows loading skeletons', () => {
    const { container } = render(<Events events={[]} isLoading />)

    expect(container.querySelectorAll('.animate-pulse')).not.toHaveLength(0)
  })

  it('shows empty state', () => {
    render(<Events events={[]} />)

    expect(screen.getByText('We will announce new events soon.')).toBeInTheDocument()
  })

  it('shows event cards', () => {
    render(<Events events={[event]} />)

    expect(screen.getByText('Malaga-AI Networking Night - June 2026')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'View on Eventbrite' })).toHaveAttribute('href', event.url)
  })

  it('only shows three events at first and advances through the carousel', () => {
    const events = Array.from({ length: 5 }, (_, index) => makeEvent(`event-${index + 1}`, `Event ${index + 1}`))

    render(<Events events={events} />)

    expect(screen.getByText('Event 1')).toBeInTheDocument()
    expect(screen.getByText('Event 3')).toBeInTheDocument()
    expect(screen.queryByText('Event 4')).not.toBeInTheDocument()
    expect(screen.queryByText('Event 5')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Next events' }))

    expect(screen.queryByText('Event 1')).not.toBeInTheDocument()
    expect(screen.getByText('Event 4')).toBeInTheDocument()
  })

  it('shows error state with retry', () => {
    const onRetry = vi.fn()
    render(<Events events={[]} error={new Error('Nope')} onRetry={onRetry} />)

    screen.getByRole('button', { name: 'Try again' }).click()

    expect(screen.getByText('We could not load the events right now.')).toBeInTheDocument()
    expect(onRetry).toHaveBeenCalledTimes(1)
  })
})
