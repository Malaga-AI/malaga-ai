import type { Config } from 'tailwindcss'

const hsl = (token: string) => `hsl(var(--${token}) / <alpha-value>)`

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        safiro: ['Safiro', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: hsl('background'),
        foreground: hsl('foreground'),
        muted: hsl('muted'),
        'muted-foreground': hsl('muted-foreground'),
        border: hsl('border'),
        'border-strong': hsl('border-strong'),
        card: hsl('card'),
        'card-foreground': hsl('card-foreground'),
        primary: hsl('primary'),
        'primary-hover': hsl('primary-hover'),
        'primary-foreground': hsl('primary-foreground'),
        'brand-ink': hsl('brand-ink'),
        accent: hsl('accent'),
        'accent-foreground': hsl('accent-foreground'),
        danger: hsl('danger'),
        ring: hsl('ring'),
        // Translucent layers. Alpha is baked into the custom property, so these
        // deliberately do not support Tailwind's `/opacity` modifier.
        surface: 'var(--surface)',
        'surface-strong': 'var(--surface-strong)',
        panel: 'var(--panel)',
        overlay: 'var(--overlay)',
        'hero-bg': 'var(--hero-bg)',
        'hero-ink': 'var(--hero-ink)',
        'hero-ink-muted': 'var(--hero-ink-muted)',
        'hero-kicker': 'var(--hero-kicker)',
      },
      boxShadow: {
        glow: 'var(--shadow-glow)',
      },
      dropShadow: {
        hero: 'var(--hero-text-shadow)',
      },
    },
  },
  plugins: [],
} satisfies Config
