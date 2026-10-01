import type { ReactElement } from 'react'
import { render, screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Events } from './Events'
import { LanguageContext, type Language } from '@/lib/language'
import type { EventItem } from '@/features/events/types'
import { TEXTS } from '@/lib/texts'

const en = TEXTS.en.events
const es = TEXTS.es.events

function renderWithLanguage(ui: ReactElement, language: Language) {
  return render(
    <LanguageContext.Provider value={{ language }}>
      {ui}
    </LanguageContext.Provider>,
  )
}

function makeEvent(id: string, startsAt: string, overrides: Partial<EventItem> = {}): EventItem {
  return {
    id,
    title: `Event ${id}`,
    description: 'AI networking in Malaga.',
    summary: 'AI networking in Malaga.',
    url: `https://www.eventbrite.com/e/${id}`,
    startsAt,
    endsAt: undefined,
    timezone: 'Europe/Madrid',
    venueName: 'Innovation Campus - Malaga Terrace',
    organizerName: 'Malaga-AI',
    isFree: true,
    status: 'live',
    ...overrides,
  }
}

describe('Events', () => {
  it('shows loading skeletons', () => {
    const { container } = render(<Events events={[]} isLoading />)

    expect(container.querySelectorAll('.animate-pulse')).not.toHaveLength(0)
  })

  it('shows empty state', () => {
    render(<Events events={[]} />)

    expect(screen.getByText(en.emptyMessage)).toBeInTheDocument()
  })

  it('shows error state with retry', () => {
    const onRetry = vi.fn()
    render(<Events events={[]} error={new Error('Nope')} onRetry={onRetry} />)

    screen.getByRole('button', { name: en.retryLabel }).click()

    expect(screen.getByText(en.errorMessage)).toBeInTheDocument()
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('renders the soonest upcoming event as a large featured card', () => {
    const events = [
      makeEvent('soonest', '2027-06-25T16:30:00Z'),
      makeEvent('later', '2027-07-25T16:30:00Z'),
    ]

    render(<Events events={events} />)

    expect(screen.getByRole('heading', { name: 'Event soonest' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: en.registerCta })).toHaveAttribute(
      'href',
      'https://www.eventbrite.com/e/soonest',
    )
  })

  it('lists other upcoming events as links to Eventbrite', () => {
    const events = [
      makeEvent('soonest', '2027-06-25T16:30:00Z'),
      makeEvent('later', '2027-07-25T16:30:00Z'),
    ]

    render(<Events events={events} />)

    const heading = screen.getByRole('heading', { name: en.alsoComingUpHeading })
    const section = heading.closest('div') as HTMLElement
    const link = within(section).getByRole('link', { name: /Event later/ })

    expect(link).toHaveAttribute('href', 'https://www.eventbrite.com/e/later')
    expect(within(section).queryByText('Event soonest')).not.toBeInTheDocument()
  })

  it('does not render the also-coming-up list when there is only one upcoming event', () => {
    render(<Events events={[makeEvent('soonest', '2027-06-25T16:30:00Z')]} />)

    expect(screen.queryByRole('heading', { name: en.alsoComingUpHeading })).not.toBeInTheDocument()
  })

  it('lists past events as a scrollable carousel with a past-event badge', () => {
    const events = [
      makeEvent('soonest', '2027-06-25T16:30:00Z'),
      makeEvent('gone', '2020-01-01T16:30:00Z', { status: 'completed' }),
    ]

    render(<Events events={events} />)

    const heading = screen.getByRole('heading', { name: en.pastEventsHeading })
    const section = heading.closest('div') as HTMLElement
    const link = within(section).getByRole('link', { name: /Event gone/ })

    expect(link).toHaveAttribute('href', 'https://www.eventbrite.com/e/gone')
    expect(within(link).getByText(en.ticketState.past)).toBeInTheDocument()
  })

  it('does not render seat counts', () => {
    const events = [makeEvent('soonest', '2027-06-25T16:30:00Z', { capacity: 50 })]

    render(<Events events={events} />)

    expect(screen.queryByText(/seats/)).not.toBeInTheDocument()
  })

  it('labels the past events carousel', () => {
    const events = [
      makeEvent('soonest', '2027-06-25T16:30:00Z'),
      makeEvent('gone', '2020-01-01T16:30:00Z', { status: 'completed' }),
    ]

    render(<Events events={events} />)

    expect(screen.getByLabelText(en.pastEventsCarouselLabel)).toBeInTheDocument()
  })
})

describe('Events in Spanish', () => {
  it('shows empty state', () => {
    renderWithLanguage(<Events events={[]} />, 'es')

    expect(screen.getByText(es.emptyMessage)).toBeInTheDocument()
  })

  it('shows error state with retry', () => {
    const onRetry = vi.fn()
    renderWithLanguage(<Events events={[]} error={new Error('Nope')} onRetry={onRetry} />, 'es')

    screen.getByRole('button', { name: es.retryLabel }).click()

    expect(screen.getByText(es.errorMessage)).toBeInTheDocument()
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('renders the soonest upcoming event as a large featured card', () => {
    const events = [
      makeEvent('soonest', '2027-06-25T16:30:00Z'),
      makeEvent('later', '2027-07-25T16:30:00Z'),
    ]

    renderWithLanguage(<Events events={events} />, 'es')

    expect(screen.getByText(es.badges.featured)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: es.registerCta })).toHaveAttribute(
      'href',
      'https://www.eventbrite.com/e/soonest',
    )
  })

  it('lists other upcoming events under the also-coming-up heading', () => {
    const events = [
      makeEvent('soonest', '2027-06-25T16:30:00Z'),
      makeEvent('later', '2027-07-25T16:30:00Z'),
    ]

    renderWithLanguage(<Events events={events} />, 'es')

    expect(screen.getByRole('heading', { name: es.alsoComingUpHeading })).toBeInTheDocument()
  })

  it('lists past events with a past-event badge', () => {
    const events = [
      makeEvent('soonest', '2027-06-25T16:30:00Z'),
      makeEvent('gone', '2020-01-01T16:30:00Z', { status: 'completed' }),
    ]

    renderWithLanguage(<Events events={events} />, 'es')

    const heading = screen.getByRole('heading', { name: es.pastEventsHeading })
    const section = heading.closest('div') as HTMLElement
    const link = within(section).getByRole('link', { name: /Event gone/ })

    expect(within(link).getByText(es.ticketState.past)).toBeInTheDocument()
    expect(screen.getByLabelText(es.pastEventsCarouselLabel)).toBeInTheDocument()
  })

  it('formats event dates using the es-ES locale', () => {
    const events = [makeEvent('soonest', '2027-06-25T16:30:00Z')]

    renderWithLanguage(<Events events={events} />, 'es')

    expect(screen.getByText(/de junio de/)).toBeInTheDocument()
  })
})
