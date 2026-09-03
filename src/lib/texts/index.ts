import type { Language } from '@/lib/language'
import { useLanguage } from '@/lib/language'
import { chromeTexts, type ChromeTexts } from './chrome'
import { eventsTexts, type EventsTexts } from './events'
import { heroTexts, type HeroTexts } from './hero'
import { initiativesTexts, type InitiativesTexts } from './initiatives'
import { teamTexts, type TeamTexts } from './team'
import { photosTexts, type PhotosTexts } from './photos'
import { partnersTexts, type PartnersTexts } from './partners'
import { contactTexts, type ContactTexts } from './contact'
import { documentTexts, type DocumentTexts } from './document'

export type SiteTexts = {
  chrome: ChromeTexts
  events: EventsTexts
  hero: HeroTexts
  initiatives: InitiativesTexts
  team: TeamTexts
  photos: PhotosTexts
  partners: PartnersTexts
  contact: ContactTexts
  document: DocumentTexts
}

export const TEXTS: Record<Language, SiteTexts> = {
  en: {
    chrome: chromeTexts.en,
    events: eventsTexts.en,
    hero: heroTexts.en,
    initiatives: initiativesTexts.en,
    team: teamTexts.en,
    photos: photosTexts.en,
    partners: partnersTexts.en,
    contact: contactTexts.en,
    document: documentTexts.en,
  },
  es: {
    chrome: chromeTexts.es,
    events: eventsTexts.es,
    hero: heroTexts.es,
    initiatives: initiativesTexts.es,
    team: teamTexts.es,
    photos: photosTexts.es,
    partners: partnersTexts.es,
    contact: contactTexts.es,
    document: documentTexts.es,
  },
}

export function useTexts(): SiteTexts {
  const { language } = useLanguage()
  return TEXTS[language]
}
