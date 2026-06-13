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
        <div className="rounded-[2rem] border border-teal-300/20 bg-gradient-to-br from-teal-300/12 via-white/[0.055] to-cyan-400/10 p-6 shadow-glow md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr]">
            <div className="space-y-5">
              <div className="h-7 w-48 animate-pulse rounded-full bg-white/[0.08]" />
              <div className="h-12 w-4/5 animate-pulse rounded bg-white/[0.08]" />
              <div className="h-24 animate-pulse rounded bg-white/[0.08]" />
              <div className="h-11 w-36 animate-pulse rounded-full bg-white/[0.08]" />
            </div>
            <div className="aspect-[2/1] animate-pulse rounded-3xl bg-white/[0.08]" />
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
        <div className="overflow-hidden rounded-[2rem] border border-teal-300/20 bg-gradient-to-br from-teal-300/12 via-white/[0.055] to-cyan-400/10 shadow-glow">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr]">
            <div className="p-6 md:p-10">
              <Badge>Featured upcoming event</Badge>
              <h2 id="featured-event-title" className="mt-5 font-safiro text-4xl leading-tight text-white md:text-5xl">{event.title}</h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{event.summary ?? event.description}</p>
              <Button href={event.url} target="_blank" rel="noreferrer" className="mt-8">Register now</Button>
            </div>
            <div className="m-6 rounded-3xl border border-white/10 bg-slate-950/55 p-6 md:m-10 lg:ml-0">
              {event.imageUrl ? (
                <img
                  src={event.imageUrl}
                  alt=""
                  className="mb-6 aspect-[2/1] w-full rounded-2xl object-cover"
                  loading="lazy"
                />
              ) : null}
              <div className="grid gap-4 text-sm text-slate-200">
                <span className="flex items-center gap-3"><CalendarDays className="h-5 w-5 shrink-0 text-teal-300" />{formatEventDateTime(event.startsAt, event.timezone)}</span>
                <span className="flex items-center gap-3"><Clock className="h-5 w-5 shrink-0 text-teal-300" />{formatEventTimeRange(event)}</span>
                <span className="flex items-center gap-3"><MapPin className="h-5 w-5 shrink-0 text-teal-300" />{event.venueName ?? (event.isOnline ? 'Online' : 'Venue to be confirmed')}</span>
                {event.organizerName ? (
                  <span className="flex items-center gap-3"><Users className="h-5 w-5 shrink-0 text-teal-300" />{event.organizerName}</span>
                ) : null}
                <span className="flex items-center gap-3"><Ticket className="h-5 w-5 shrink-0 text-teal-300" />{getEventStateLabel(event)}</span>
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
