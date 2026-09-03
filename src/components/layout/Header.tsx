import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BrandLogo } from '@/components/layout/BrandLogo'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { SocialBar } from '@/components/layout/SocialBar'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { LanguageToggle } from '@/components/language/LanguageToggle'
import { useTexts } from '@/lib/texts'

export function Header() {
  const [open, setOpen] = useState(false)
  const texts = useTexts().chrome
  const links = texts.nav

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/82 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" aria-label={texts.homeAriaLabel}>
          <BrandLogo showText={false} imageClassName="h-10 max-w-[180px]" />
        </a>
        <nav className="hidden items-center gap-5 text-sm text-muted-foreground md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-foreground">{link.label}</a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <LanguageToggle />
          <Button href="#contact">{texts.contactButton}</Button>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <LanguageToggle />
          <button className="rounded-full border border-border-strong bg-surface p-2 text-foreground md:hidden" onClick={() => setOpen(true)} aria-label={texts.openMenuAriaLabel}>
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
      <SocialBar />
      <MobileMenu open={open} links={links} onClose={() => setOpen(false)} />
    </header>
  )
}
