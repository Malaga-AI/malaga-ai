import { CalendarDays, Clock, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { events } from '@/data/events'
import { getNextEvent } from '@/lib/events'
import { formatEventDate } from '@/lib/utils'

export function FeaturedEvent() {
  const event = getNextEvent(events)

  return (
    <section className="py-20 md:py-28" aria-labelledby="featured-event-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-teal-300/20 bg-gradient-to-br from-teal-300/12 via-white/[0.055] to-cyan-400/10 p-6 shadow-glow md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr]">
            <div>
              <Badge>Featured upcoming event</Badge>
              <h2 id="featured-event-title" className="mt-5 font-safiro text-4xl leading-tight text-white md:text-5xl">{event.title}</h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{event.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {event.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
              </div>
              {event.registrationUrl ? <Button href={event.registrationUrl} className="mt-8">Register now</Button> : null}
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/55 p-6">
              <div className="grid gap-4 text-sm text-slate-200">
                <span className="flex items-center gap-3"><CalendarDays className="h-5 w-5 text-teal-300" />{formatEventDate(event.date)}</span>
                <span className="flex items-center gap-3"><Clock className="h-5 w-5 text-teal-300" />{event.startTime} - {event.endTime}</span>
                <span className="flex items-center gap-3"><MapPin className="h-5 w-5 text-teal-300" />{event.location}</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge>{event.language}</Badge>
                <Badge>{event.level}</Badge>
                <Badge>{event.type}</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
