const links = [
  { href: '#events', label: 'Events' },
  { href: '#projects', label: 'Projects' },
  { href: '#resources', label: 'Resources' },
  { href: '#partners', label: 'Partners' },
]

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="font-safiro text-2xl text-white">Malaga AI</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Malaga AI is a community for people building, learning, and experimenting with artificial intelligence in Malaga.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {links.map((link) => <a key={link.href} href={link.href} className="hover:text-white">{link.label}</a>)}
          <a href="#" className="hover:text-white">LinkedIn</a>
          <a href="#" className="hover:text-white">GitHub</a>
        </div>
        <p className="text-sm text-muted-foreground">© 2026 Malaga AI.</p>
      </div>
    </footer>
  )
}
