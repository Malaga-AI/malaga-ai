import { useMemo } from 'react'
import { CalendarDays, Clock, MapPin, Ticket, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { EventCard } from '@/components/community/EventCard'
import { useLanguage } from '@/lib/language'
import type { Language } from '@/lib/language'
import { useTexts } from '@/lib/texts'
import type { EventsTexts } from '@/lib/texts'
import {
  formatEventDateTime,
  formatEventTimeRange,
  getEventStateLabel,
  getFeaturedEvent,
  splitEventsByTime,
} from '@/features/events/eventHelpers'
import type { EventItem } from '@/features/events/types'

type EventsProps = {
  events: EventItem[]
  isLoading?: boolean
  error?: Error
  onRetry?: () => void
}

function FeaturedEventSkeleton() {
  return (
    <div className="rounded-[2rem] border border-primary/25 bg-gradient-to-br from-primary/15 via-surface to-accent/10 p-6 shadow-glow md:p-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr]">
        <div className="space-y-5">
          <div className="h-7 w-48 animate-pulse rounded-full bg-surface" />
          <div className="h-12 w-4/5 animate-pulse rounded bg-surface" />
          <div className="h-24 animate-pulse rounded bg-surface" />
          <div className="h-11 w-36 animate-pulse rounded-full bg-surface" />
        </div>
        <div className="aspect-[2/1] animate-pulse rounded-3xl bg-surface" />
      </div>
    </div>
  )
}

function EventCardSkeleton() {
  return (
    <article className="h-full overflow-hidden rounded-2xl border border-border bg-card/80 shadow-sm">
      <div className="aspect-[3/1] animate-pulse bg-surface" />
      <div className="space-y-4 p-5">
        <div className="h-6 w-32 animate-pulse rounded-full bg-surface" />
        <div className="h-7 w-4/5 animate-pulse rounded bg-surface" />
        <div className="space-y-2">
          <div className="h-4 animate-pulse rounded bg-surface" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-surface" />
        </div>
      </div>
    </article>
  )
}

function FeaturedEventCard({ event, language, texts }: { event: EventItem; language: Language; texts: EventsTexts }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-primary/25 bg-gradient-to-br from-primary/15 via-surface to-accent/10 shadow-glow">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr]">
        <div className="p-6 md:p-10">
          <Badge>{texts.badges.featured}</Badge>
          <h3 className="mt-5 font-safiro text-4xl leading-tight text-foreground md:text-5xl">{event.title}</h3>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{event.summary ?? event.description}</p>
          <Button href={event.url} target="_blank" rel="noreferrer" className="mt-8">{texts.registerCta}</Button>
        </div>
        <div className="m-6 rounded-3xl border border-border bg-panel p-6 md:m-10 lg:ml-0">
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt=""
              className="mb-6 aspect-[2/1] w-full rounded-2xl object-cover"
              loading="lazy"
            />
          ) : null}
          <div className="grid gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-3"><CalendarDays className="h-5 w-5 shrink-0 text-brand-ink" />{formatEventDateTime(event.startsAt, event.timezone, language)}</span>
            <span className="flex items-center gap-3"><Clock className="h-5 w-5 shrink-0 text-brand-ink" />{formatEventTimeRange(event, language)}</span>
            <span className="flex items-center gap-3"><MapPin className="h-5 w-5 shrink-0 text-brand-ink" />{event.venueName ?? (event.isOnline ? texts.badges.online : texts.venueTbc)}</span>
            {event.organizerName ? (
              <span className="flex items-center gap-3"><Users className="h-5 w-5 shrink-0 text-brand-ink" />{event.organizerName}</span>
            ) : null}
            <span className="flex items-center gap-3"><Ticket className="h-5 w-5 shrink-0 text-brand-ink" />{getEventStateLabel(event, texts.ticketState)}</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {event.isFree ? <Badge>{texts.badges.free}</Badge> : null}
            {event.isOnline ? <Badge>{texts.badges.online}</Badge> : <Badge>{texts.badges.inPerson}</Badge>}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Events({ events, isLoading = false, error, onRetry }: EventsProps) {
  const { language } = useLanguage()
  const texts = useTexts().events
  const { featured, otherUpcoming, past } = useMemo(() => {
    const featuredEvent = getFeaturedEvent(events)
    const { upcoming, past: pastEvents } = splitEventsByTime(events)

    return {
      featured: featuredEvent,
      otherUpcoming: featuredEvent ? upcoming.filter((event) => event.id !== featuredEvent.id) : upcoming,
      past: pastEvents,
    }
  }, [events])

  return (
    <section id="events" className="scroll-mt-24 py-20 md:py-28" aria-labelledby="events-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-ink">{texts.kicker}</p>
          <h2 id="events-title" className="mt-3 font-safiro text-4xl text-foreground md:text-5xl">{texts.heading}</h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">{texts.description}</p>
        </div>

        {error ? (
          <div className="mt-10 rounded-2xl border border-danger/30 bg-danger/10 p-6 text-muted-foreground">
            <p>{texts.errorMessage}</p>
            {onRetry ? (
              <button
                type="button"
                onClick={onRetry}
                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
              >
                {texts.retryLabel}
              </button>
            ) : null}
          </div>
        ) : null}

        {!error && isLoading ? (
          <div className="mt-10 space-y-10">
            <FeaturedEventSkeleton />
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }, (_, index) => <EventCardSkeleton key={index} />)}
            </div>
          </div>
        ) : null}

        {!error && !isLoading && events.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-border bg-card/80 p-6 text-muted-foreground">
            <p>{texts.emptyMessage}</p>
            <a
              href="https://malaga-ai.eventbrite.com"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex text-sm font-semibold text-brand-ink hover:text-foreground"
            >
              {texts.emptyCta}
            </a>
          </div>
        ) : null}

        {!error && !isLoading && events.length > 0 ? (
          <div className="mt-10 space-y-16">
            {featured ? <FeaturedEventCard event={featured} language={language} texts={texts} /> : null}

            {otherUpcoming.length > 0 ? (
              <div>
                <h3 className="font-safiro text-2xl leading-tight text-foreground">{texts.alsoComingUpHeading}</h3>
                <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {otherUpcoming.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            ) : null}

            {past.length > 0 ? (
              <div>
                <h3 className="font-safiro text-2xl leading-tight text-foreground">{texts.pastEventsHeading}</h3>
                <div
                  className="mt-6 -mx-4 flex gap-4 overflow-x-auto px-4 pb-2"
                  aria-label={texts.pastEventsCarouselLabel}
                >
                  {past.map((event) => (
                    <div key={event.id} className="w-64 shrink-0 sm:w-72">
                      <EventCard event={event} variant="compact" />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  )
}
