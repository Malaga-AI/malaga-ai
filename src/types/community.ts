export type EventLevel = 'beginner' | 'intermediate' | 'advanced' | 'all'
export type EventLanguage = 'EN' | 'ES' | 'EN/ES'
export type EventType = 'talk' | 'workshop' | 'demo' | 'networking' | 'panel' | 'community-session'

export type Event = {
  id: string
  title: string
  description: string
  date: string
  startTime: string
  endTime: string
  location: string
  address?: string
  type: EventType
  level: EventLevel
  language: EventLanguage
  speakers: string[]
  registrationUrl?: string
  image?: string
  tags: string[]
}

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

export type Resource = {
  id: string
  title: string
  description: string
  type: 'talk' | 'slides' | 'repo' | 'paper' | 'guide' | 'tool'
  url: string
  tags: string[]
  level: EventLevel
}

export type Project = {
  id: string
  title: string
  description: string
  authors: string[]
  stack: string[]
  repoUrl?: string
  demoUrl?: string
  tags: string[]
}

export type Sponsor = {
  id: string
  name: string
  tier: 'community' | 'venue' | 'pizza' | 'gold' | 'main'
  logo?: string
  url?: string
}

export type FriendlyCommunity = {
  id: string
  name: string
  shortDescription?: string
  logo?: string
  url?: string
}

export type Stat = {
  id: string
  label: string
  value: string
  description?: string
}
