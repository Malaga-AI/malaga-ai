import type { Language } from '@/lib/language'

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

export const photosTexts: Record<Language, PhotosTexts> = {
  en: {
    kicker: 'Photos',
    heading: 'Event photos',
    description: 'A look at the sessions, conversations, and community moments shaping Malaga-AI.',
    closePhotoAriaLabel: 'Close photo',
    previousPhotoAriaLabel: 'Previous photo',
    nextPhotoAriaLabel: 'Next photo',
    openPhotoAriaLabel: (label) => `Open photo: ${label}`,
    galleryImageFallbackAlt: (imageNumber) => `Gallery image ${imageNumber}`,
    captions: [
      { title: 'Malaga-AI Community Session Feb2026', description: 'GSEC' },
      { title: 'Malaga-AI Community Session Feb2026', description: 'GSEC' },
      { title: 'IWD2026', description: 'Monday' },
      { title: 'IWD2026', description: 'Monday' },
      { title: 'Employment in the Age Of AI 2026', description: 'GSEC' },
      { title: 'Employment in the Age Of AI 2026', description: 'GSEC' },
      { title: 'AI Agents 2025', description: 'GSEC' },
    ],
  },
  es: {
    kicker: 'Fotos',
    heading: 'Fotos de eventos',
    description: 'Un vistazo a las sesiones, conversaciones y momentos de comunidad que dan forma a Malaga-AI.',
    closePhotoAriaLabel: 'Cerrar foto',
    previousPhotoAriaLabel: 'Foto anterior',
    nextPhotoAriaLabel: 'Foto siguiente',
    openPhotoAriaLabel: (label) => `Abrir foto: ${label}`,
    galleryImageFallbackAlt: (imageNumber) => `Imagen de la galería ${imageNumber}`,
    captions: [
      { title: 'Sesión comunitaria de Malaga-AI Feb2026', description: 'GSEC' },
      { title: 'Sesión comunitaria de Malaga-AI Feb2026', description: 'GSEC' },
      { title: 'IWD2026', description: 'Lunes' },
      { title: 'IWD2026', description: 'Lunes' },
      { title: 'El empleo en la era de la IA 2026', description: 'GSEC' },
      { title: 'El empleo en la era de la IA 2026', description: 'GSEC' },
      { title: 'Agentes de IA 2025', description: 'GSEC' },
    ],
  },
}
