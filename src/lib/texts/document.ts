import type { Language } from '@/lib/language'

export type DocumentTexts = {
  title: string
  description: string
}

export const documentTexts: Record<Language, DocumentTexts> = {
  en: {
    title: 'Malaga-AI',
    description:
      'Malaga-AI is a community dedicated to sharing the power and promise of Artificial Intelligence (AI), so that all people may benefit from this transformative technology.',
  },
  es: {
    title: 'Malaga-AI',
    description:
      'Malaga-AI es una comunidad dedicada a compartir el poder y la promesa de la Inteligencia Artificial (IA), para que todas las personas puedan beneficiarse de esta tecnología transformadora.',
  },
}
