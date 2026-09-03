import type { Language } from '@/lib/language'

export type TeamTexts = {
  kicker: string
  heading: string
  description: string
  emailAriaLabel: (name: string) => string
  linkedinAriaLabel: (name: string) => string
  photoAlt: (name: string) => string
}

export const teamTexts: Record<Language, TeamTexts> = {
  en: {
    kicker: 'Team',
    heading: 'The people making Malaga-AI happen',
    description: 'A small, hands-on team coordinates the community, events, content, and collaborations behind Malaga-AI.',
    emailAriaLabel: (name) => `Email ${name}`,
    linkedinAriaLabel: (name) => `${name} LinkedIn`,
    photoAlt: (name) => `${name} portrait`,
  },
  es: {
    kicker: 'Equipo',
    heading: 'Las personas que hacen posible Malaga-AI',
    description: 'Un equipo pequeño y muy implicado coordina la comunidad, los eventos, el contenido y las colaboraciones detrás de Malaga-AI.',
    emailAriaLabel: (name) => `Enviar correo a ${name}`,
    linkedinAriaLabel: (name) => `LinkedIn de ${name}`,
    photoAlt: (name) => `Retrato de ${name}`,
  },
}
