import type { Language } from '@/lib/language'

export type SponsorTier = 'gold' | 'silver' | 'bronze'

export type SponsorTierCardTexts = {
  name: string
  tierLabel: Record<SponsorTier, string>
}

export type PartnersTexts = {
  sponsorsKicker: string
  sponsorsHeading: string
  sponsorsDescription: string
  partnersKicker: string
  partnersHeading: string
  partnersDescription: string
  sponsorTierCard: SponsorTierCardTexts
}

export const partnersTexts: Record<Language, PartnersTexts> = {
  en: {
    sponsorsKicker: 'Sponsors',
    sponsorsHeading: 'Sponsors that make our gatherings possible',
    sponsorsDescription: 'Brands that support high-quality spaces for learning, connecting, and activating AI projects in Malaga.',
    partnersKicker: 'Partners',
    partnersHeading: 'Partners for building the ecosystem',
    partnersDescription: 'Companies, communities, and public entities that help Malaga-AI connect talent, venues, knowledge, and local opportunity.',
    sponsorTierCard: {
      name: 'Be a sponsor',
      tierLabel: {
        gold: 'gold partner',
        silver: 'silver partner',
        bronze: 'bronze partner',
      },
    },
  },
  es: {
    sponsorsKicker: 'Patrocinadores',
    sponsorsHeading: 'Patrocinadores que hacen posibles nuestros encuentros',
    sponsorsDescription: 'Marcas que apoyan espacios de calidad para aprender, conectar y activar proyectos de IA en Málaga.',
    partnersKicker: 'Partners',
    partnersHeading: 'Partners para construir el ecosistema',
    partnersDescription: 'Empresas, comunidades y entidades públicas que ayudan a Malaga-AI a conectar talento, espacios, conocimiento y oportunidades locales.',
    sponsorTierCard: {
      name: 'Sé patrocinador',
      tierLabel: {
        gold: 'socio dorado',
        silver: 'socio plateado',
        bronze: 'socio de bronce',
      },
    },
  },
}
