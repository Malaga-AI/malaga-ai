import { CalendarDays, Clock, MapPin, Ticket } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  formatEventDateTime,
  formatEventTimeRange,
  getEventStateLabel,
} from '@/features/events/eventHelpers'
import type { EventItem } from '@/features/events/types'

export function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-card/80 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-teal-300/40">
      {event.imageUrl ? (
        <img src={event.imageUrl} alt="" className="aspect-[2/1] w-full object-cover" loading="lazy" />
      ) : (
        <div className="aspect-[2/1] bg-gradient-to-br from-teal-300/20 via-white/[0.06] to-cyan-300/10" />
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2">
          <Badge>{getEventStateLabel(event)}</Badge>
          {event.isFree ? <Badge>Free</Badge> : null}
          {event.isOnline ? <Badge>Online</Badge> : <Badge>In person</Badge>}
        </div>
        <h3 className="mt-5 font-safiro text-2xl leading-tight text-white">{event.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{event.summary ?? event.description}</p>
        <div className="mt-6 grid gap-3 text-sm text-slate-300">
          <span className="flex items-start gap-2"><CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />{formatEventDateTime(event.startsAt, event.timezone)}</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4 shrink-0 text-teal-300" />{formatEventTimeRange(event)}</span>
          <span className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />{event.venueName ?? (event.isOnline ? 'Online' : 'Venue to be confirmed')}</span>
          <span className="flex items-center gap-2"><Ticket className="h-4 w-4 shrink-0 text-teal-300" />{event.isSoldOut ? 'Sold out' : event.hasAvailableTickets === false ? 'Registration closed' : 'Tickets on Eventbrite'}</span>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {event.capacity ? <Badge className="border-cyan-300/15 bg-cyan-300/[0.08]">{event.capacity} seats</Badge> : null}
          {event.organizerName ? <Badge className="border-cyan-300/15 bg-cyan-300/[0.08]">{event.organizerName}</Badge> : null}
        </div>
        <Button href={event.url} target="_blank" rel="noreferrer" variant="secondary" className="mt-6 self-start">
          View on Eventbrite
        </Button>
      </div>
    </article>
  )
}
