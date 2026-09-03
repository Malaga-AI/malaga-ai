import { X } from 'lucide-react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/button'
import { BrandLogo } from '@/components/layout/BrandLogo'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { useTexts } from '@/lib/texts'

type MobileMenuProps = {
  open: boolean
  links: { href: string; label: string }[]
  onClose: () => void
}

export function MobileMenu({ open, links, onClose }: MobileMenuProps) {
  const texts = useTexts().chrome
  if (!open) return null

  return createPortal(
    <div className="fixed inset-x-0 top-0 z-[100] bg-background p-6 shadow-2xl ring-1 ring-border md:hidden">
      <div className="flex items-center justify-between">
        <a href="#top" onClick={onClose} aria-label={texts.homeAriaLabel}>
          <BrandLogo showText={false} imageClassName="h-10 max-w-[180px]" />
        </a>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button className="rounded-full border border-border-strong bg-surface p-2 text-foreground" onClick={onClose} aria-label={texts.closeMenuAriaLabel}>
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
      <nav className="mt-8 grid gap-2.5">
        {links.map((link) => (
          <a
            key={link.href}
            className="rounded-lg border border-border-strong bg-surface px-3.5 py-2.5 text-sm font-medium text-foreground transition hover:border-primary/55 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
            href={link.href}
            onClick={onClose}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <Button href="#contact" onClick={onClose} className="mt-8 w-full">{texts.contactButton}</Button>
    </div>,
    document.body,
  )
}
