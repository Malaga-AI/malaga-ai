import { BrandLogo } from '@/components/layout/BrandLogo'
import { SocialLinks } from '@/components/layout/SocialLinks'

const links = [
  { href: '#events', label: 'Events' },
  { href: '#initiatives', label: 'Initiatives' },
  { href: '#team', label: 'Team' },
  { href: '#photos', label: 'Photos' },
  { href: '#sponsors', label: 'Sponsors' },
  { href: '#partners', label: 'Partners' },
  { href: '#collaborators', label: 'Collaborators' },
  { href: '#contact', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <BrandLogo showText={false} imageClassName="h-12 max-w-[220px]" />
          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Malaga AI is a community for people building, learning, and experimenting with artificial intelligence in Malaga.
          </p>
        </div>
        <div className="flex flex-col gap-5 md:items-end">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground md:justify-end">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-foreground">
                {link.label}
              </a>
            ))}
          </div>
          <SocialLinks linkClassName="h-10 w-10" />
        </div>
        <p className="text-sm text-muted-foreground">© 2026 Malaga AI.</p>
      </div>
    </footer>
  )
}
