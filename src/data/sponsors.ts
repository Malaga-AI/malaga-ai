import type { Sponsor } from '@/types/community'
import malagaAiLogo from '@/assets/brand/malaga-ai-logo.png'
import grupoBillinghamLogo from '@/assets/sponsors/grupo-billingham.png'

const favicon = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`

export const sponsors: Sponsor[] = [
  {
    id: 'sponsor-gold',
    name: 'Be a sponsor',
    tier: 'gold',
    logo: malagaAiLogo,
    url: 'https://malaga-ai.community/',
  },
  {
    id: 'sponsor-silver',
    name: 'Be a sponsor',
    tier: 'silver',
    logo: malagaAiLogo,
    url: 'https://malaga-ai.community/',
  },
  {
    id: 'sponsor-bronze',
    name: 'Be a sponsor',
    tier: 'bronze',
    logo: malagaAiLogo,
    url: 'https://malaga-ai.community/',
  },
]

export const partners: Sponsor[] = [
  {
    id: 'grupo-billingham',
    name: 'Grupo Billingham',
    tier: 'community',
    logo: grupoBillinghamLogo,
    url: 'https://www.grupobillingham.com/',
  },
  {
    id: 'innovation-campus-malaga',
    name: 'Innovation Campus Malaga',
    tier: 'community',
    logo: favicon('innovationcampus.biz'),
    url: 'https://innovationcampus.biz/',
  },
]
