import type { Sponsor } from '@/types/community'
import cloudPartnerLogo from '@/assets/sponsors/cloud-partner.svg'
import educationPartnerLogo from '@/assets/sponsors/education-partner.svg'
import grupoBillinghamLogo from '@/assets/sponsors/grupo-billingham.png'
import pizzaSponsorLogo from '@/assets/sponsors/pizza-sponsor.svg'

export const sponsors: Sponsor[] = [
  {
    id: 'venue',
    name: 'Grupo Billingham',
    tier: 'venue',
    logo: grupoBillinghamLogo,
    url: 'https://www.grupobillingham.com/',
  },
  {
    id: 'pizza',
    name: 'Pizza Sponsor',
    tier: 'pizza',
    logo: pizzaSponsorLogo,
    url: '#',
  },
  {
    id: 'cloud',
    name: 'Cloud Partner',
    tier: 'gold',
    logo: cloudPartnerLogo,
    url: '#',
  },
  {
    id: 'education',
    name: 'Education Partner',
    tier: 'community',
    logo: educationPartnerLogo,
    url: '#',
  },
]
