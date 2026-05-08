import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MobileMenu } from '@/components/layout/MobileMenu'

const links = [
  { href: '#events', label: 'Events' },
  { href: '#projects', label: 'Projects' },
  { href: '#resources', label: 'Resources' },
  { href: '#partners', label: 'Partners' },
  { href: '#friends', label: 'Friend Communities' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/82 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="font-safiro text-xl text-white">Malaga AI</a>
        <nav className="hidden items-center gap-5 text-sm text-muted-foreground md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-white">{link.label}</a>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button href="#join-form">Join the community</Button>
        </div>
        <button className="rounded-full border border-white/10 p-2 text-white md:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
      </div>
      <MobileMenu open={open} links={links} onClose={() => setOpen(false)} />
    </header>
  )
}
