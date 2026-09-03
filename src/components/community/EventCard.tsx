import { CalendarDays, MapPin, Ticket } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  formatEventDateTime,
  getEventStateLabel,
} from '@/features/events/eventHelpers'
import type { EventItem } from '@/features/events/types'
import { cn } from '@/lib/utils'

type EventCardProps = {
  event: EventItem
  variant?: 'default' | 'compact'
}

export function EventCard({ event, variant = 'default' }: EventCardProps) {
  const isCompact = variant === 'compact'

  return (
    <a
      href={event.url}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/80 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
    >
      {event.imageUrl ? (
        <img
          src={event.imageUrl}
          alt=""
          className={cn('w-full object-cover', isCompact ? 'aspect-[16/9]' : 'aspect-[3/1]')}
          loading="lazy"
        />
      ) : (
        <div
          className={cn(
            'bg-gradient-to-br from-primary/25 via-surface to-accent/10',
            isCompact ? 'aspect-[16/9]' : 'aspect-[3/1]',
          )}
        />
      )}
      <div className={cn('flex flex-1 flex-col', isCompact ? 'p-4' : 'p-5')}>
        <div className="flex flex-wrap gap-2">
          <Badge>{getEventStateLabel(event)}</Badge>
          {event.isOnline ? <Badge>Online</Badge> : <Badge>In person</Badge>}
        </div>
        <h3
          className={cn(
            'mt-4 line-clamp-2 font-safiro leading-tight text-foreground',
            isCompact ? 'text-lg' : 'text-xl',
          )}
        >
          {event.title}
        </h3>
        {!isCompact ? (
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">{event.summary ?? event.description}</p>
        ) : null}
        <div className={cn('grid gap-2.5 text-sm text-muted-foreground', isCompact ? 'mt-3' : 'mt-5')}>
          <span className="flex items-start gap-2">
            <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-brand-ink" />
            {formatEventDateTime(event.startsAt, event.timezone)}
          </span>
          {!isCompact ? (
            <span className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-ink" />
              {event.venueName ?? (event.isOnline ? 'Online' : 'Venue to be confirmed')}
            </span>
          ) : null}
          {!isCompact ? (
            <span className="flex items-center gap-2">
              <Ticket className="h-4 w-4 shrink-0 text-brand-ink" />
              {event.isSoldOut ? 'Sold out' : event.hasAvailableTickets === false ? 'Registration closed' : event.isFree ? 'Free registration' : 'Tickets on Eventbrite'}
            </span>
          ) : null}
        </div>
      </div>
    </a>
  )
}
