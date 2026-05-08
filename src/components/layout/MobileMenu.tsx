import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BrandLogo } from '@/components/layout/BrandLogo'

type MobileMenuProps = {
  open: boolean
  links: { href: string; label: string }[]
  onClose: () => void
}

export function MobileMenu({ open, links, onClose }: MobileMenuProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 p-6 backdrop-blur md:hidden">
      <div className="flex items-center justify-between">
        <a href="#top" onClick={onClose} aria-label="Malaga AI home">
          <BrandLogo showText={false} imageClassName="h-10 max-w-[180px]" />
        </a>
        <button className="rounded-full border border-white/10 p-2 text-white" onClick={onClose} aria-label="Close menu">
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="mt-10 grid gap-4">
        {links.map((link) => (
          <a key={link.href} className="rounded-2xl border border-white/10 p-4 text-lg text-white" href={link.href} onClick={onClose}>
            {link.label}
          </a>
        ))}
      </nav>
      <Button href="#join-form" onClick={onClose} className="mt-8 w-full">Join the community</Button>
    </div>
  )
}
