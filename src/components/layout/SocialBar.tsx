import type { SVGProps } from 'react'
import { LinkedInIcon, DiscordIcon } from '@/components/layout/SocialLinks'

const socialBarLinks = [
  {
    href: 'https://www.linkedin.com/company/malaga-ai',
    label: 'LinkedIn',
    ariaLabel: 'Malaga AI on LinkedIn',
    Icon: LinkedInIcon,
  },
  {
    href: 'https://malaga-ai.eventbrite.com',
    label: 'Eventbrite',
    ariaLabel: 'Malaga AI on Eventbrite',
    Icon: EventbriteIcon,
  },
  {
    href: 'https://discord.com/invite/2tv7W2jxXF',
    label: 'Discord',
    ariaLabel: 'Malaga AI on Discord',
    Icon: DiscordIcon,
  },
  {
    href: 'https://github.com/Malaga-AI',
    label: 'GitHub',
    ariaLabel: 'Malaga AI on GitHub',
    Icon: GitHubIcon,
  },
]

export function SocialBar() {
  return (
    <div className="h-11 border-t border-border bg-background/82">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-center gap-5 px-4 sm:px-6 lg:px-8">
        {socialBarLinks.map(({ href, label, ariaLabel, Icon }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={ariaLabel}
            title={ariaLabel}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">{label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

function EventbriteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0Zm5.88 8.9-.42 1.72a.3.3 0 0 1-.34.24l-6.02-.94-.36 1.83 5.15.8a.3.3 0 0 1 .25.35l-.34 1.7a.3.3 0 0 1-.35.24l-5.15-.8-.4 2.02 6.16.96a.3.3 0 0 1 .25.35l-.35 1.77a.3.3 0 0 1-.34.24l-8.4-1.31a.3.3 0 0 1-.25-.35L8.6 5.4a.3.3 0 0 1 .34-.24l8.7 1.36a.3.3 0 0 1 .24.35Z" />
    </svg>
  )
}

function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.69-1.28-1.69-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.8 1.18 1.83 1.18 3.09 0 4.43-2.69 5.41-5.25 5.7.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .31.2.67.8.56A10.51 10.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
      />
    </svg>
  )
}
