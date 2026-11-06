import type { Sponsor } from '@/types/community'
import type { SponsorTier } from '@/lib/texts'
import malagaAiLogo from '@/assets/brand/malaga-ai-logo.png'
import grupoBillinghamLogo from '@/assets/sponsors/grupo-billingham.png'
import fortyTwoMalagaLogo from '@/assets/sponsors/42-malaga.svg'
import jOnTheBeachLogo from '@/assets/sponsors/j-on-the-beach.svg'
import gdgMalagaLogo from '@/assets/friendly-communities/gdg-malaga.svg'
import womenTechmakersLogo from '@/assets/friendly-communities/women-techmakers-malaga.svg'

const favicon = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`

export type SponsorTierEntry = {
  id: string
  tier: SponsorTier
  logo: string
  url: string
}

export const sponsors: SponsorTierEntry[] = [
  {
    id: 'sponsor-gold',
    tier: 'gold',
    logo: malagaAiLogo,
    url: 'https://malaga-ai.community/',
  },
  {
    id: 'sponsor-silver',
    tier: 'silver',
    logo: malagaAiLogo,
    url: 'https://malaga-ai.community/',
  },
  {
    id: 'sponsor-bronze',
    tier: 'bronze',
    logo: malagaAiLogo,
    url: 'https://malaga-ai.community/',
  },
]

export const partners: Sponsor[] = [
  {
    id: 'innovation-campus-malaga',
    name: 'Innovation Campus Malaga',
    tier: 'community',
    logo: favicon('innovationcampus.biz'),
    url: 'https://innovationcampus.biz/',
  },
  {
    id: 'grupo-billingham',
    name: 'Grupo Billingham',
    tier: 'community',
    logo: grupoBillinghamLogo,
    url: 'https://www.grupobillingham.com/',
  },
  {
    id: 'wunderdog',
    name: 'Wunderdog',
    tier: 'community',
    logo: favicon('wunderdog.io'),
    url: 'https://www.wunderdog.io/',
  },
  {
    id: 'brite',
    name: 'Brite',
    tier: 'community',
    logo: favicon('britepayments.com'),
    url: 'https://britepayments.com/',
  },
  {
    id: 'google',
    name: 'Google',
    tier: 'community',
    logo: favicon('google.com'),
    url: 'https://www.google.com/',
  },
  {
    id: 'certus',
    name: 'Certus',
    tier: 'community',
    logo: favicon('certuslegalfirm.com'),
    url: 'https://certuslegalfirm.com/',
  },
  {
    id: 'grupo-cajamar',
    name: 'Grupo Cajamar',
    tier: 'community',
    logo: favicon('cajamar.es'),
    url: 'https://www.cajamar.es/',
  },
  {
    id: 'ciklum',
    name: 'Ciklum',
    tier: 'community',
    logo: favicon('ciklum.com'),
    url: 'https://www.ciklum.com/',
  },
  {
    id: 'fjx',
    name: 'FJX',
    tier: 'community',
    logo: favicon('thefjx.com'),
    url: 'https://www.thefjx.com/',
  },
  {
    id: 'bravend',
    name: 'Bravend',
    tier: 'community',
    logo: favicon('bravend.com.br'),
    url: 'https://bravend.com.br/',
  },
  {
    id: 'codespace',
    name: 'CodeSpace',
    tier: 'community',
    logo: favicon('codespaceacademy.com'),
    url: 'https://codespaceacademy.com/',
  },
  {
    id: 'freepik-magnific',
    name: 'Freepik (Magnific)',
    tier: 'community',
    logo: favicon('magnific.com'),
    url: 'https://www.magnific.com/',
  },
  {
    id: 'marlife',
    name: 'Marlife',
    tier: 'community',
    logo: favicon('marlife.eu'),
    url: 'https://marlife.eu/',
  },
  {
    id: 'azure-malaga',
    name: 'Azure-Malaga',
    tier: 'community',
    logo: favicon('azuremalaga.com'),
    url: 'https://azuremalaga.com/',
  },
  {
    id: 'gdg-malaga',
    name: 'GDG Malaga',
    tier: 'community',
    logo: gdgMalagaLogo,
    url: 'https://gdg.community.dev/gdg-malaga/',
  },
  {
    id: 'opensouthcode',
    name: 'OpenSouthCode',
    tier: 'community',
    logo: favicon('opensouthcode.org'),
    url: 'https://www.opensouthcode.org/',
  },
  {
    id: 'malagajug',
    name: 'MalagaJUG',
    tier: 'community',
    logo: favicon('malagajug.wordpress.com'),
    url: 'https://malagajug.wordpress.com/',
  },
  {
    id: 'deeplearningai',
    name: 'DeepLearningAI',
    tier: 'community',
    logo: favicon('deeplearning.ai'),
    url: 'https://www.deeplearning.ai/',
  },
  {
    id: 'wordpress-malaga',
    name: 'WordPress Malaga',
    tier: 'community',
    logo: favicon('wpmalaga.org'),
    url: 'https://wpmalaga.org/',
  },
  {
    id: 'women-techmakers',
    name: 'Women Techmakers',
    tier: 'community',
    logo: womenTechmakersLogo,
    url: 'https://www.womentechmakers.com/',
  },
  {
    id: 'university-of-malaga',
    name: 'University of Malaga',
    tier: 'community',
    logo: favicon('uma.es'),
    url: 'https://www.uma.es/',
  },
  {
    id: 'polodigital',
    name: 'PoloDigital',
    tier: 'community',
    logo: favicon('polodigital.eu'),
    url: 'https://www.polodigital.eu/',
  },
  {
    id: '42-malaga',
    name: '42 Málaga',
    tier: 'community',
    logo: fortyTwoMalagaLogo,
    url: 'https://www.42malaga.com/',
  },
  {
    id: 'j-on-the-beach',
    name: 'J On The Beach',
    tier: 'community',
    logo: jOnTheBeachLogo,
    url: 'https://www.jonthebeach.com/',
  },
  {
    id: 'el-espanol',
    name: 'El Español',
    tier: 'community',
    logo: favicon('elespanol.com'),
    url: 'https://www.elespanol.com/malaga/',
  },
]
