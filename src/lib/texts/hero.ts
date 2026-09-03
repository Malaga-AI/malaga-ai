import type { Language } from '@/lib/language'

export type HeroPanel = {
  kicker: string
  title: string
  copy: string
}

export type HeroTexts = {
  panels: [HeroPanel, HeroPanel, HeroPanel]
  contactCta: string
  eventsCta: string
}

export const heroTexts: Record<Language, HeroTexts> = {
  en: {
    panels: [
      {
        kicker: 'The AI community in Malaga and beyond',
        title: 'Meet Malaga AI.',
        copy: 'A community for curious minds, builders, researchers, founders, and creatives exploring AI together through practical events, shared projects, honest learning, and the occasional “wait, the model did what?” moment.',
      },
      {
        kicker: 'Events',
        title: 'Talks, demos, and delightfully weird AI moments',
        copy: 'Join practical sessions where ideas leave the slide deck, demos occasionally surprise their own creators, and smart people compare notes before the coffee gets cold.',
      },
      {
        kicker: 'Malaga is moving',
        title: 'AI is advancing across Malaga, from startups and research groups to meetups, universities, makers, and teams building by the sea.',
        copy: 'Do not miss what is happening in the city: follow Malaga AI to discover the people, projects, events, and ideas shaping the next wave of AI in Malaga.',
      },
    ],
    contactCta: 'Contact',
    eventsCta: 'See events',
  },
  es: {
    panels: [
      {
        kicker: 'La comunidad de IA en Málaga y más allá',
        title: 'Conoce Malaga AI.',
        copy: 'Una comunidad para mentes curiosas, personas que construyen, investigadores, fundadores y creativos que exploran juntos la IA a través de eventos prácticos, proyectos compartidos, aprendizaje sincero y el ocasional momento de «espera, ¿qué ha hecho el modelo?».',
      },
      {
        kicker: 'Eventos',
        title: 'Charlas, demos y momentos de IA deliciosamente raros',
        copy: 'Únete a sesiones prácticas donde las ideas salen de las diapositivas, las demos a veces sorprenden hasta a quienes las crean, y gente inteligente comparte impresiones antes de que se enfríe el café.',
      },
      {
        kicker: 'Málaga se mueve',
        title: 'La IA avanza por toda Málaga, desde startups y grupos de investigación hasta meetups, universidades, makers y equipos que construyen junto al mar.',
        copy: 'No te pierdas lo que está pasando en la ciudad: sigue a Malaga AI para descubrir a las personas, proyectos, eventos e ideas que están dando forma a la próxima ola de IA en Málaga.',
      },
    ],
    contactCta: 'Contacto',
    eventsCta: 'Ver eventos',
  },
}
