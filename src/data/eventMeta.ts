import type { EventLevel, EventType } from '@/types/community'

type EventTypeMeta = {
  id: EventType
  label: string
}

type EventLevelMeta = {
  id: EventLevel
  label: string
}

export const eventTypes = {
  talk: { id: 'talk', label: 'Talk' },
  workshop: { id: 'workshop', label: 'Workshop' },
  demo: { id: 'demo', label: 'Demo' },
  networking: { id: 'networking', label: 'Networking' },
  panel: { id: 'panel', label: 'Panel' },
  communitySession: { id: 'community-session', label: 'Community session' },
} satisfies Record<string, EventTypeMeta>

export const eventLevels = {
  beginner: { id: 'beginner', label: 'Beginner' },
  intermediate: { id: 'intermediate', label: 'Intermediate' },
  advanced: { id: 'advanced', label: 'Advanced' },
  all: { id: 'all', label: 'All levels' },
} satisfies Record<string, EventLevelMeta>

export const eventSpeakers = {
  franciscoSanchez: { id: 'francisco-sanchez', name: 'Francisco Sanchez' },
  daniMorillas: { id: 'dani-morillas', name: 'Dani Morillas' },
  katyPeichert: { id: 'katy-peichert', name: 'Katy Peichert' },
  noraCastillo: { id: 'nora-castillo', name: 'Nora Castillo' },
  elenaMartin: { id: 'elena-martin', name: 'Elena Martin' },
  marcusChen: { id: 'marcus-chen', name: 'Marcus Chen' },
  samirRojas: { id: 'samir-rojas', name: 'Samir Rojas' },
} as const

export function getEventTypeLabel(type: EventType) {
  return Object.values(eventTypes).find((eventType) => eventType.id === type)?.label ?? type
}

export function getEventLevelLabel(level: EventLevel) {
  return Object.values(eventLevels).find((eventLevel) => eventLevel.id === level)?.label ?? level
}

export function getEventSpeakerName(speakerId: string) {
  return Object.values(eventSpeakers).find((speaker) => speaker.id === speakerId)?.name ?? speakerId
}
