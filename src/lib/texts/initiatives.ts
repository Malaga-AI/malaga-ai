import type { Language } from '@/lib/language'

export type InitiativeCard = {
  title: string
  status: string
  description: string
  actionLabel?: string
}

export type InitiativesTexts = {
  kicker: string
  heading: string
  description: string
  cards: [InitiativeCard, InitiativeCard, InitiativeCard]
}

export const initiativesTexts: Record<Language, InitiativesTexts> = {
  en: {
    kicker: 'Initiatives',
    heading: 'Groups for learning, practicing, and growing with AI',
    description: 'Malaga AI supports focused spaces where the community can move forward with structure, peers, and real opportunities.',
    cards: [
      {
        title: 'Career Advice AI',
        status: 'Live',
        description:
          'Upload your CV and get a free, personalized read on how AI is reshaping your career — your strengths, your exposure, and where to grow next.',
        actionLabel: 'Try it now',
      },
      {
        title: 'Talent Program',
        status: 'Active',
        description:
          'A bridge between companies looking for AI talent and people who join the community while searching for new work opportunities.',
        actionLabel: 'Contact our talent team',
      },
      {
        title: 'Certified Study Groups',
        status: 'Active',
        description:
          'Since 2023, Malaga-AI study groups have helped cohesive teams learn AI by building projects, from Innovation Hub and LLM exploits to agents, safety AI, and evals.',
      },
    ],
  },
  es: {
    kicker: 'Iniciativas',
    heading: 'Grupos para aprender, practicar y crecer con la IA',
    description: 'Malaga AI impulsa espacios enfocados donde la comunidad puede avanzar con estructura, compañeros y oportunidades reales.',
    cards: [
      {
        title: 'Career Advice AI',
        status: 'Activo',
        description:
          'Sube tu CV y consigue un análisis gratuito y personalizado de cómo la IA está transformando tu carrera: tus puntos fuertes, tu exposición y hacia dónde crecer.',
        actionLabel: 'Pruébalo ahora',
      },
      {
        title: 'Programa de Talento',
        status: 'Activo',
        description:
          'Un puente entre empresas que buscan talento en IA y personas que se unen a la comunidad mientras buscan nuevas oportunidades laborales.',
        actionLabel: 'Contacta con nuestro equipo de talento',
      },
      {
        title: 'Grupos de Estudio Certificados',
        status: 'Activo',
        description:
          'Desde 2023, los grupos de estudio de Malaga-AI han ayudado a equipos cohesionados a aprender IA construyendo proyectos, desde el Innovation Hub y exploits de LLM hasta agentes, seguridad en IA y evals.',
      },
    ],
  },
}
