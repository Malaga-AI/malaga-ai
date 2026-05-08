import { EventCard } from '@/components/community/EventCard'
import { events } from '@/data/events'

export function Events() {
  return (
    <section id="events" className="scroll-mt-24 py-20 md:py-28" aria-labelledby="events-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-200">Events</p>
          <h2 id="events-title" className="mt-3 font-safiro text-4xl text-white md:text-5xl">Upcoming and recent sessions</h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">Technical talks, demos, workshops, panels, and community sessions hosted by Malaga AI.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => <EventCard key={event.id} event={event} />)}
        </div>
      </div>
    </section>
  )
}
