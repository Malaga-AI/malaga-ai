import { CalendarDays, Clock, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { getEventLevelLabel, getEventTypeLabel } from '@/data/eventMeta'
import { formatEventDate } from '@/lib/utils'
import type { Event } from '@/types/community'

export function EventCard({ event }: { event: Event }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-card/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-teal-300/40">
      <div className="flex flex-wrap gap-2">
        <Badge>{getEventTypeLabel(event.type)}</Badge>
        <Badge>{getEventLevelLabel(event.level)}</Badge>
        <Badge>{event.language}</Badge>
      </div>
      <h3 className="mt-5 font-safiro text-2xl leading-tight text-white">{event.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{event.description}</p>
      <div className="mt-6 grid gap-3 text-sm text-slate-300">
        <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-teal-300" />{formatEventDate(event.date)}</span>
        <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-teal-300" />{event.startTime} - {event.endTime}</span>
        <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-teal-300" />{event.location}</span>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {event.tags.map((tag) => <Badge key={tag} className="border-cyan-300/15 bg-cyan-300/[0.08]">{tag}</Badge>)}
      </div>
    </article>
  )
}
