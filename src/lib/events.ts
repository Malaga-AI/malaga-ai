import type { Event } from '@/types/community'

function getEventStart(event: Event) {
  return new Date(`${event.date}T${event.startTime}`).getTime()
}

export function getNextEvent(events: Event[]) {
  const now = Date.now()
  const byStartDate = (a: Event, b: Event) => getEventStart(a) - getEventStart(b)
  const upcomingEvent = [...events].filter((event) => getEventStart(event) >= now).sort(byStartDate)[0]

  return upcomingEvent ?? [...events].sort((a, b) => byStartDate(b, a))[0]
}
