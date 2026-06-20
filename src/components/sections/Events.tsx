import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { EventCard } from '@/components/community/EventCard'
import type { EventItem } from '@/features/events/types'

const DESKTOP_VISIBLE_EVENTS = 3

function useVisibleEventCount() {
  const [visibleEventCount, setVisibleEventCount] = useState(DESKTOP_VISIBLE_EVENTS)

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return

    const desktopQuery = window.matchMedia('(min-width: 1280px)')
    const tabletQuery = window.matchMedia('(min-width: 640px)')
    const updateVisibleEventCount = () => {
      setVisibleEventCount(desktopQuery.matches ? 3 : tabletQuery.matches ? 2 : 1)
    }

    updateVisibleEventCount()
    desktopQuery.addEventListener('change', updateVisibleEventCount)
    tabletQuery.addEventListener('change', updateVisibleEventCount)

    return () => {
      desktopQuery.removeEventListener('change', updateVisibleEventCount)
      tabletQuery.removeEventListener('change', updateVisibleEventCount)
    }
  }, [])

  return visibleEventCount
}

type EventsProps = {
  events: EventItem[]
  isLoading?: boolean
  error?: Error
  onRetry?: () => void
}

function EventCardSkeleton() {
  return (
    <article className="h-full overflow-hidden rounded-2xl border border-white/10 bg-card/80 shadow-sm">
      <div className="aspect-[3/1] animate-pulse bg-white/[0.08]" />
      <div className="space-y-4 p-5">
        <div className="h-6 w-32 animate-pulse rounded-full bg-white/[0.08]" />
        <div className="h-7 w-4/5 animate-pulse rounded bg-white/[0.08]" />
        <div className="space-y-2">
          <div className="h-4 animate-pulse rounded bg-white/[0.08]" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-white/[0.08]" />
        </div>
        <div className="h-10 w-36 animate-pulse rounded-full bg-white/[0.08]" />
      </div>
    </article>
  )
}

export function Events({ events, isLoading = false, error, onRetry }: EventsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const visibleEventCount = useVisibleEventCount()
  const maxStartIndex = Math.max(events.length - visibleEventCount, 0)
  const visibleEvents = useMemo(
    () => events.slice(activeIndex, activeIndex + visibleEventCount),
    [activeIndex, events, visibleEventCount],
  )
  const canMoveBackward = activeIndex > 0
  const canMoveForward = activeIndex < maxStartIndex

  useEffect(() => {
    setActiveIndex((currentIndex) => Math.min(currentIndex, maxStartIndex))
  }, [maxStartIndex])

  return (
    <section id="events" className="scroll-mt-24 py-20 md:py-28" aria-labelledby="events-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-200">Events</p>
            <h2 id="events-title" className="mt-3 font-safiro text-4xl text-white md:text-5xl">Upcoming and recent sessions</h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">Technical talks, demos, workshops, panels, and community sessions hosted by Malaga AI.</p>
          </div>

          {!error && !isLoading && events.length > visibleEventCount ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-400">
                {activeIndex + 1}-{activeIndex + visibleEvents.length} / {events.length}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveIndex((currentIndex) => Math.max(currentIndex - 1, 0))}
                  disabled={!canMoveBackward}
                  aria-label="Previous events"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:border-teal-300/40 hover:bg-teal-300/10 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/10 disabled:hover:bg-white/[0.04]"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveIndex((currentIndex) => Math.min(currentIndex + 1, maxStartIndex))}
                  disabled={!canMoveForward}
                  aria-label="Next events"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:border-teal-300/40 hover:bg-teal-300/10 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/10 disabled:hover:bg-white/[0.04]"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          ) : null}
        </div>

        {error ? (
          <div className="mt-10 rounded-2xl border border-rose-300/20 bg-rose-300/[0.06] p-6 text-slate-200">
            <p>We could not load the events right now.</p>
            {onRetry ? (
              <button
                type="button"
                onClick={onRetry}
                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-teal-300 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 focus:ring-offset-background"
              >
                Try again
              </button>
            ) : null}
          </div>
        ) : null}

        {!error && isLoading ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => <EventCardSkeleton key={index} />)}
          </div>
        ) : null}

        {!error && !isLoading && events.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-card/80 p-6 text-slate-200">
            <p>We will announce new events soon.</p>
            <a
              href="https://malaga-ai.eventbrite.com"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex text-sm font-semibold text-teal-200 hover:text-teal-100"
            >
              Follow us on Eventbrite for updates
            </a>
          </div>
        ) : null}

        {!error && !isLoading && events.length > 0 ? (
          <div className="mt-10 overflow-hidden" aria-live="polite">
            <div className="-mx-2 flex">
              {visibleEvents.map((event) => (
                <div key={event.id} className="flex min-w-0 basis-full px-2 sm:basis-1/2 xl:basis-1/3">
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
