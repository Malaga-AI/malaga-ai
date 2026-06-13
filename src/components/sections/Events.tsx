import { EventCard } from '@/components/community/EventCard'
import type { EventItem } from '@/features/events/types'

type EventsProps = {
  events: EventItem[]
  isLoading?: boolean
  error?: Error
  onRetry?: () => void
}

function EventCardSkeleton() {
  return (
    <article className="h-full overflow-hidden rounded-2xl border border-white/10 bg-card/80 shadow-sm">
      <div className="aspect-[2/1] animate-pulse bg-white/[0.08]" />
      <div className="space-y-5 p-6">
        <div className="h-6 w-32 animate-pulse rounded-full bg-white/[0.08]" />
        <div className="h-8 w-4/5 animate-pulse rounded bg-white/[0.08]" />
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
  return (
    <section id="events" className="scroll-mt-24 py-20 md:py-28" aria-labelledby="events-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-200">Events</p>
          <h2 id="events-title" className="mt-3 font-safiro text-4xl text-white md:text-5xl">Upcoming and recent sessions</h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">Technical talks, demos, workshops, panels, and community sessions hosted by Malaga AI.</p>
        </div>

        {error ? (
          <div className="mt-10 rounded-2xl border border-rose-300/20 bg-rose-300/[0.06] p-6 text-slate-200">
            <p>No hemos podido cargar los eventos ahora mismo.</p>
            {onRetry ? (
              <button
                type="button"
                onClick={onRetry}
                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-teal-300 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 focus:ring-offset-background"
              >
                Reintentar
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
            <p>Próximamente anunciaremos nuevos eventos.</p>
            <a
              href="https://malaga-ai.eventbrite.com"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex text-sm font-semibold text-teal-200 hover:text-teal-100"
            >
              Síguenos en Eventbrite para recibir novedades
            </a>
          </div>
        ) : null}

        {!error && !isLoading && events.length > 0 ? (
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => <EventCard key={event.id} event={event} />)}
        </div>
        ) : null}
      </div>
    </section>
  )
}
