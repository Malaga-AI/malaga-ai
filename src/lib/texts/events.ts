import type { Language } from '@/lib/language'

export type EventTicketStateLabels = {
  past: string
  soldOut: string
  registrationClosed: string
  freeRegistration: string
  upcoming: string
}

export type EventBadgeTexts = {
  featured: string
  free: string
  online: string
  inPerson: string
}

export type EventsTexts = {
  kicker: string
  heading: string
  description: string
  errorMessage: string
  retryLabel: string
  emptyMessage: string
  emptyCta: string
  alsoComingUpHeading: string
  pastEventsHeading: string
  pastEventsCarouselLabel: string
  registerCta: string
  venueTbc: string
  ticketsOnEventbrite: string
  badges: EventBadgeTexts
  ticketState: EventTicketStateLabels
}

export const eventsTexts: Record<Language, EventsTexts> = {
  en: {
    kicker: 'Events',
    heading: 'Upcoming and recent sessions',
    description: 'Technical talks, demos, workshops, panels, and community sessions hosted by Malaga AI.',
    errorMessage: 'We could not load the events right now.',
    retryLabel: 'Try again',
    emptyMessage: 'We will announce new events soon.',
    emptyCta: 'Follow us on Eventbrite for updates',
    alsoComingUpHeading: 'Also coming up',
    pastEventsHeading: 'Past events',
    pastEventsCarouselLabel: 'Past events',
    registerCta: 'Register now',
    venueTbc: 'Venue to be confirmed',
    ticketsOnEventbrite: 'Tickets on Eventbrite',
    badges: {
      featured: 'Featured upcoming event',
      free: 'Free',
      online: 'Online',
      inPerson: 'In person',
    },
    ticketState: {
      past: 'Past event',
      soldOut: 'Sold out',
      registrationClosed: 'Registration closed',
      freeRegistration: 'Free registration',
      upcoming: 'Upcoming',
    },
  },
  es: {
    kicker: 'Eventos',
    heading: 'Sesiones próximas y recientes',
    description: 'Charlas técnicas, demos, talleres, paneles y sesiones comunitarias organizadas por Malaga AI.',
    errorMessage: 'No hemos podido cargar los eventos ahora mismo.',
    retryLabel: 'Inténtalo de nuevo',
    emptyMessage: 'Pronto anunciaremos nuevos eventos.',
    emptyCta: 'Síguenos en Eventbrite para enterarte de las novedades',
    alsoComingUpHeading: 'Próximos eventos',
    pastEventsHeading: 'Eventos anteriores',
    pastEventsCarouselLabel: 'Eventos anteriores',
    registerCta: 'Reserva tu plaza',
    venueTbc: 'Lugar por confirmar',
    ticketsOnEventbrite: 'Entradas en Eventbrite',
    badges: {
      featured: 'Próximo evento destacado',
      free: 'Gratis',
      online: 'Online',
      inPerson: 'Presencial',
    },
    ticketState: {
      past: 'Evento pasado',
      soldOut: 'Entradas agotadas',
      registrationClosed: 'Inscripción cerrada',
      freeRegistration: 'Entrada gratuita',
      upcoming: 'Próximo',
    },
  },
}
