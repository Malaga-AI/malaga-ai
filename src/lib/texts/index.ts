import type { Language } from '@/lib/language'
import { useLanguage } from '@/lib/language'
import type { Theme } from '@/lib/theme'
import copy from './copy.json'

export type NavLink = {
  href: string
  label: string
}

export type ChromeTexts = {
  nav: [NavLink, NavLink, NavLink, NavLink, NavLink, NavLink, NavLink]
  homeAriaLabel: string
  contactButton: string
  openMenuAriaLabel: string
  closeMenuAriaLabel: string
  footerTagline: string
  footerCopyright: string
  socialAriaLabel: (network: string) => string
  brandLogoAlt: string
  themeToggleLabel: (nextTheme: Theme) => string
}

export type ContactTexts = {
  kicker: string
  heading: string
  description: string
  nameLabel: string
  namePlaceholder: string
  emailLabel: string
  emailPlaceholder: string
  messageLabel: string
  messagePlaceholder: string
  submitIdleLabel: string
  submitSendingLabel: string
  successMessage: string
  errorGenericMessage: string
  errorActivationMessage: string
  errorFallbackMessage: string
}

export type DocumentTexts = {
  title: string
  description: string
}

export type EventTicketStateLabels = {
  past: string
  soldOut: string
  registrationClosed: string
  freeRegistration: string
  upcoming: string
}

export type EventBadgeTexts = {
  featured: string
  free: string
  online: string
  inPerson: string
}

export type EventsTexts = {
  kicker: string
  heading: string
  description: string
  errorMessage: string
  retryLabel: string
  emptyMessage: string
  emptyCta: string
  alsoComingUpHeading: string
  pastEventsHeading: string
  pastEventsCarouselLabel: string
  registerCta: string
  venueTbc: string
  ticketsOnEventbrite: string
  badges: EventBadgeTexts
  ticketState: EventTicketStateLabels
}

export type HeroPanel = {
  kicker: string
  title: string
  copy: string
}

export type HeroTexts = {
  panels: [HeroPanel, HeroPanel, HeroPanel]
  contactCta: string
  eventsCta: string
}

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

export type PhotoCaption = {
  title: string
  description: string
}

export type PhotosTexts = {
  kicker: string
  heading: string
  description: string
  closePhotoAriaLabel: string
  previousPhotoAriaLabel: string
  nextPhotoAriaLabel: string
  openPhotoAriaLabel: (label: string) => string
  galleryImageFallbackAlt: (imageNumber: number) => string
  captions: [PhotoCaption, PhotoCaption, PhotoCaption, PhotoCaption, PhotoCaption, PhotoCaption, PhotoCaption]
}

export type TeamTexts = {
  kicker: string
  heading: string
  description: string
  emailAriaLabel: (name: string) => string
  linkedinAriaLabel: (name: string) => string
  photoAlt: (name: string) => string
}

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

/**
 * Every string in copy.json is either a plain value (an href, a status code
 * used as a lookup key) or a `{ en, es }` pair. Resolve every such pair to the
 * requested language, recursively; everything else — arrays, nested objects,
 * plain values — passes through untouched. This is what lets copy.json stay
 * flat, ordinary data: adding a field there needs no matching change here.
 */
function resolveLang(value: unknown, language: Language): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => resolveLang(item, language))
  }
  if (value !== null && typeof value === 'object') {
    const keys = Object.keys(value)
    if (keys.length === 2 && keys.includes('en') && keys.includes('es')) {
      return (value as Record<Language, unknown>)[language]
    }
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, resolveLang(entry, language)]))
  }
  return value
}

/** Fills the one `{{placeholder}}` a template string carries, whatever its name. */
function template(source: string, value: string | number): string {
  return source.replace(/\{\{[^}]+\}\}/, String(value))
}

type LocalizedCopy = {
  chrome: Omit<ChromeTexts, 'socialAriaLabel' | 'themeToggleLabel'> & {
    socialAriaLabel: string
    themeToggleLabel: { light: string; dark: string }
  }
  contact: ContactTexts
  document: DocumentTexts
  events: EventsTexts
  hero: HeroTexts
  initiatives: InitiativesTexts
  partners: PartnersTexts
  photos: Omit<PhotosTexts, 'openPhotoAriaLabel' | 'galleryImageFallbackAlt'> & {
    openPhotoAriaLabel: string
    galleryImageFallbackAlt: string
  }
  team: Omit<TeamTexts, 'emailAriaLabel' | 'linkedinAriaLabel' | 'photoAlt'> & {
    emailAriaLabel: string
    linkedinAriaLabel: string
    photoAlt: string
  }
}

// The handful of fields that are dynamic in the UI (an aria-label built from a
// person's name, a toggle label built from a theme) stay plain strings in
// copy.json — a translator edits text, not code — and are wrapped into the
// functions the components call only here, in one place.
function buildTexts(language: Language): SiteTexts {
  const localized = resolveLang(copy, language) as LocalizedCopy

  return {
    ...localized,
    chrome: {
      ...localized.chrome,
      socialAriaLabel: (network) => template(localized.chrome.socialAriaLabel, network),
      themeToggleLabel: (nextTheme) => localized.chrome.themeToggleLabel[nextTheme],
    },
    photos: {
      ...localized.photos,
      openPhotoAriaLabel: (label) => template(localized.photos.openPhotoAriaLabel, label),
      galleryImageFallbackAlt: (imageNumber) => template(localized.photos.galleryImageFallbackAlt, imageNumber),
    },
    team: {
      ...localized.team,
      emailAriaLabel: (name) => template(localized.team.emailAriaLabel, name),
      linkedinAriaLabel: (name) => template(localized.team.linkedinAriaLabel, name),
      photoAlt: (name) => template(localized.team.photoAlt, name),
    },
  }
}

export const TEXTS: Record<Language, SiteTexts> = {
  en: buildTexts('en'),
  es: buildTexts('es'),
}

export function useTexts(): SiteTexts {
  const { language } = useLanguage()
  return TEXTS[language]
}
