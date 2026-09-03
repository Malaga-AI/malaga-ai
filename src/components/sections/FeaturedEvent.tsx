import { CalendarDays, Clock, MapPin, Ticket, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  formatEventDateTime,
  formatEventTimeRange,
  getEventStateLabel,
  getFeaturedEvent,
} from '@/features/events/eventHelpers'
import type { EventItem } from '@/features/events/types'

type FeaturedEventProps = {
  events: EventItem[]
  isLoading?: boolean
}

function FeaturedEventSkeleton() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="featured-event-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
      </div>
    </section>
  )
}

export function FeaturedEvent({ events, isLoading = false }: FeaturedEventProps) {
  if (isLoading) return <FeaturedEventSkeleton />

  const event = getFeaturedEvent(events)

  if (!event) return null

  return (
    <section className="py-20 md:py-28" aria-labelledby="featured-event-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-primary/25 bg-gradient-to-br from-primary/15 via-surface to-accent/10 shadow-glow">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr]">
            <div className="p-6 md:p-10">
              <Badge>Featured upcoming event</Badge>
              <h2 id="featured-event-title" className="mt-5 font-safiro text-4xl leading-tight text-foreground md:text-5xl">{event.title}</h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{event.summary ?? event.description}</p>
              <Button href={event.url} target="_blank" rel="noreferrer" className="mt-8">Register now</Button>
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
                <span className="flex items-center gap-3"><CalendarDays className="h-5 w-5 shrink-0 text-brand-ink" />{formatEventDateTime(event.startsAt, event.timezone)}</span>
                <span className="flex items-center gap-3"><Clock className="h-5 w-5 shrink-0 text-brand-ink" />{formatEventTimeRange(event)}</span>
                <span className="flex items-center gap-3"><MapPin className="h-5 w-5 shrink-0 text-brand-ink" />{event.venueName ?? (event.isOnline ? 'Online' : 'Venue to be confirmed')}</span>
                {event.organizerName ? (
                  <span className="flex items-center gap-3"><Users className="h-5 w-5 shrink-0 text-brand-ink" />{event.organizerName}</span>
                ) : null}
                <span className="flex items-center gap-3"><Ticket className="h-5 w-5 shrink-0 text-brand-ink" />{getEventStateLabel(event)}</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {event.isFree ? <Badge>Free</Badge> : null}
                {event.capacity ? <Badge>{event.capacity} seats</Badge> : null}
                {event.isOnline ? <Badge>Online</Badge> : <Badge>In person</Badge>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
