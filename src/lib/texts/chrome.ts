import type { Language } from '@/lib/language'
import type { Theme } from '@/lib/theme'

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
  languageToggleLabel: (nextLanguage: Language) => string
}

export const chromeTexts: Record<Language, ChromeTexts> = {
  en: {
    nav: [
      { href: '#events', label: 'Events' },
      { href: '#initiatives', label: 'Initiatives' },
      { href: '#team', label: 'Team' },
      { href: '#photos', label: 'Photos' },
      { href: '#sponsors', label: 'Sponsors' },
      { href: '#partners', label: 'Partners' },
      { href: '#contact', label: 'Contact' },
    ],
    homeAriaLabel: 'Malaga AI home',
    contactButton: 'Contact',
    openMenuAriaLabel: 'Open menu',
    closeMenuAriaLabel: 'Close menu',
    footerTagline: 'Malaga AI is a community for people building, learning, and experimenting with artificial intelligence in Malaga.',
    footerCopyright: '© 2026 Malaga AI.',
    socialAriaLabel: (network) => `Malaga AI on ${network}`,
    brandLogoAlt: 'Malaga AI logo',
    themeToggleLabel: (nextTheme) => `Switch to ${nextTheme} theme`,
    languageToggleLabel: (nextLanguage) => `Switch to ${nextLanguage === 'es' ? 'Spanish' : 'English'}`,
  },
  es: {
    nav: [
      { href: '#events', label: 'Eventos' },
      { href: '#initiatives', label: 'Iniciativas' },
      { href: '#team', label: 'Equipo' },
      { href: '#photos', label: 'Fotos' },
      { href: '#sponsors', label: 'Patrocinadores' },
      { href: '#partners', label: 'Partners' },
      { href: '#contact', label: 'Contacto' },
    ],
    homeAriaLabel: 'Inicio de Malaga AI',
    contactButton: 'Contacto',
    openMenuAriaLabel: 'Abrir menú',
    closeMenuAriaLabel: 'Cerrar menú',
    footerTagline: 'Malaga AI es una comunidad de personas que construyen, aprenden y experimentan con la inteligencia artificial en Málaga.',
    footerCopyright: '© 2026 Malaga AI.',
    socialAriaLabel: (network) => `Malaga AI en ${network}`,
    brandLogoAlt: 'Logotipo de Malaga AI',
    themeToggleLabel: (nextTheme) => `Cambiar a tema ${nextTheme === 'light' ? 'claro' : 'oscuro'}`,
    languageToggleLabel: (nextLanguage) => `Cambiar a ${nextLanguage === 'es' ? 'español' : 'inglés'}`,
  },
}
