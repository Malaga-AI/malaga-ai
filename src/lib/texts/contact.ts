import type { Language } from '@/lib/language'

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

export const contactTexts: Record<Language, ContactTexts> = {
  en: {
    kicker: 'Contact',
    heading: 'Got an idea, a plan, or an AI question?',
    description: 'Send it over. If it involves AI, people, projects, or snacks after a meetup, we are probably curious.',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    emailLabel: 'Email',
    emailPlaceholder: 'you@example.com',
    messageLabel: 'Message',
    messagePlaceholder: 'Tell us what you have in mind.',
    submitIdleLabel: 'Send request',
    submitSendingLabel: 'Sending...',
    successMessage: 'Request sent. We will read it before the robots do.',
    errorGenericMessage: 'Something went wrong. Please try again in a moment.',
    errorActivationMessage: 'The form needs one-time activation. Check esparcaso@gmail.com and click the FormSubmit activation link.',
    errorFallbackMessage: 'Contact request failed',
  },
  es: {
    kicker: 'Contacto',
    heading: '¿Tienes una idea, un plan o una pregunta sobre IA?',
    description: 'Cuéntanoslo. Si tiene que ver con IA, personas, proyectos o aperitivos después de un meetup, seguro que nos interesa.',
    nameLabel: 'Nombre',
    namePlaceholder: 'Tu nombre',
    emailLabel: 'Correo electrónico',
    emailPlaceholder: 'tu@ejemplo.com',
    messageLabel: 'Mensaje',
    messagePlaceholder: 'Cuéntanos qué tienes en mente.',
    submitIdleLabel: 'Enviar solicitud',
    submitSendingLabel: 'Enviando...',
    successMessage: 'Solicitud enviada. La leeremos antes que los robots.',
    errorGenericMessage: 'Algo ha salido mal. Inténtalo de nuevo en un momento.',
    errorActivationMessage: 'El formulario necesita una activación única. Revisa esparcaso@gmail.com y haz clic en el enlace de activación de FormSubmit.',
    errorFallbackMessage: 'La solicitud de contacto ha fallado',
  },
}
