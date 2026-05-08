import type { FriendlyCommunity } from '@/types/community'
import cloudNativeMalagaLogo from '@/assets/friendly-communities/cloud-native-malaga.svg'
import gdgMalagaLogo from '@/assets/friendly-communities/gdg-malaga.svg'
import pyDataMalagaLogo from '@/assets/friendly-communities/pydata-malaga.svg'
import womenTechmakersMalagaLogo from '@/assets/friendly-communities/women-techmakers-malaga.svg'

export const friendlyCommunities: FriendlyCommunity[] = [
  {
    id: 'gdg-malaga',
    name: 'GDG Malaga',
    shortDescription: 'Developer events, Google technologies, cloud sessions, and community learning.',
    logo: gdgMalagaLogo,
    url: '#',
  },
  {
    id: 'pydata-malaga',
    name: 'PyData Malaga',
    shortDescription: 'Data science, Python, analytics, and machine learning practitioners.',
    logo: pyDataMalagaLogo,
    url: '#',
  },
  {
    id: 'wtm-malaga',
    name: 'Women Techmakers Malaga',
    shortDescription: 'A welcoming network supporting women in technology through talks and mentoring.',
    logo: womenTechmakersMalagaLogo,
    url: '#',
  },
  {
    id: 'cloud-native-malaga',
    name: 'Cloud Native Malaga',
    shortDescription: 'Infrastructure, Kubernetes, platform engineering, and production systems.',
    logo: cloudNativeMalagaLogo,
    url: '#',
  },
]
