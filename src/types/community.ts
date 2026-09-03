export type Speaker = {
  id: string
  name: string
  role: string
  company?: string
  bio: string
  avatar?: string
  topics: string[]
  links?: {
    linkedin?: string
    github?: string
    x?: string
    website?: string
  }
}

export type Sponsor = {
  id: string
  name: string
  tier: 'community' | 'venue' | 'pizza' | 'gold' | 'silver' | 'bronze' | 'main'
  logo?: string
  url?: string
}

export type Stat = {
  id: string
  label: string
  value: string
  description?: string
}
