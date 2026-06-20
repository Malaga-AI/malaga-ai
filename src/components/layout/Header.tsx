import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BrandLogo } from '@/components/layout/BrandLogo'
import { MobileMenu } from '@/components/layout/MobileMenu'

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

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/82 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" aria-label="Malaga AI home">
          <BrandLogo showText={false} imageClassName="h-10 max-w-[180px]" />
        </a>
        <nav className="hidden items-center gap-5 text-sm text-muted-foreground md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-white">{link.label}</a>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button href="#contact">Contact</Button>
        </div>
        <button className="rounded-full border border-white/10 p-2 text-white md:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
      </div>
      <MobileMenu open={open} links={links} onClose={() => setOpen(false)} />
    </header>
  )
}
