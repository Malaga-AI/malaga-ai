import type { SVGProps } from 'react'
import { cn } from '@/lib/utils'

const socialLinks = [
  {
    href: 'https://www.linkedin.com/company/malaga-ai',
    label: 'LinkedIn',
    ariaLabel: 'Malaga AI on LinkedIn',
    Icon: LinkedInIcon,
  },
  {
    href: 'https://discord.com/invite/2tv7W2jxXF',
    label: 'Discord',
    ariaLabel: 'Malaga AI on Discord',
    Icon: DiscordIcon,
  },
]

type SocialLinksProps = {
  className?: string
  linkClassName?: string
  showLabels?: boolean
}

export function SocialLinks({ className, linkClassName, showLabels = false }: SocialLinksProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      {socialLinks.map(({ href, label, ariaLabel, Icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={ariaLabel}
          title={ariaLabel}
          className={cn(
            'inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border-strong bg-surface px-3.5 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:border-primary/55 hover:bg-surface-strong focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
            !showLabels && 'w-11 px-0',
            linkClassName,
          )}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
          {showLabels ? <span>{label}</span> : null}
        </a>
      ))}
    </div>
  )
}

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.86-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.33V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.54V9H7.1v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0Z" />
    </svg>
  )
}

export function DiscordIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.32 4.37A19.8 19.8 0 0 0 15.36 2.84a13.7 13.7 0 0 0-.64 1.32 18.4 18.4 0 0 0-5.45 0 13.7 13.7 0 0 0-.65-1.32 19.74 19.74 0 0 0-4.96 1.53C.53 9.02-.32 13.55.1 18.02a19.9 19.9 0 0 0 6.08 3.08 14.6 14.6 0 0 0 1.3-2.1c-.72-.27-1.41-.6-2.05-.98l.5-.39a14.2 14.2 0 0 0 12.14 0l.5.39c-.64.38-1.33.71-2.05.98.38.74.82 1.44 1.3 2.1a19.83 19.83 0 0 0 6.08-3.08c.5-5.18-.85-9.67-3.58-13.65ZM8.02 15.27c-1.19 0-2.17-1.1-2.17-2.45s.96-2.45 2.17-2.45c1.22 0 2.2 1.1 2.17 2.45 0 1.35-.96 2.45-2.17 2.45Zm7.96 0c-1.19 0-2.17-1.1-2.17-2.45s.96-2.45 2.17-2.45c1.22 0 2.2 1.1 2.17 2.45 0 1.35-.95 2.45-2.17 2.45Z" />
    </svg>
  )
}
