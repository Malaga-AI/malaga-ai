import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Events } from './Events'
import type { EventItem } from '@/features/events/types'

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

    expect(screen.getByText('Próximamente anunciaremos nuevos eventos.')).toBeInTheDocument()
  })

  it('shows event cards', () => {
    render(<Events events={[event]} />)

    expect(screen.getByText('Malaga-AI Networking Night - June 2026')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'View on Eventbrite' })).toHaveAttribute('href', event.url)
  })

  it('shows error state with retry', () => {
    const onRetry = vi.fn()
    render(<Events events={[]} error={new Error('Nope')} onRetry={onRetry} />)

    screen.getByRole('button', { name: 'Reintentar' }).click()

    expect(screen.getByText('No hemos podido cargar los eventos ahora mismo.')).toBeInTheDocument()
    expect(onRetry).toHaveBeenCalledTimes(1)
  })
})
