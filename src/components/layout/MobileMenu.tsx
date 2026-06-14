import { X } from 'lucide-react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/button'
import { BrandLogo } from '@/components/layout/BrandLogo'

type MobileMenuProps = {
  open: boolean
  links: { href: string; label: string }[]
  onClose: () => void
}

export function MobileMenu({ open, links, onClose }: MobileMenuProps) {
  if (!open) return null

  return createPortal(
    <div className="fixed inset-x-0 top-0 z-[100] bg-slate-950 p-6 shadow-2xl ring-1 ring-white/10 md:hidden">
      <div className="flex items-center justify-between">
        <a href="#top" onClick={onClose} aria-label="Malaga AI home">
          <BrandLogo showText={false} imageClassName="h-10 max-w-[180px]" />
        </a>
        <button className="rounded-full border border-white/10 p-2 text-white" onClick={onClose} aria-label="Close menu">
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="mt-8 grid gap-2.5">
        {links.map((link) => (
          <a
            key={link.href}
            className="rounded-lg border border-white/15 bg-white/[0.08] px-3.5 py-2.5 text-sm font-medium text-slate-100 transition hover:border-teal-200/45 hover:bg-teal-200/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 focus:ring-offset-slate-950"
            href={link.href}
            onClick={onClose}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <Button href="#join-form" onClick={onClose} className="mt-8 w-full">Join the community</Button>
    </div>,
    document.body,
  )
}
