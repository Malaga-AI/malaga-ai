import { SponsorCard } from '@/components/community/SponsorCard'
import { partners } from '@/data/sponsors'

export function Sponsors() {
  return (
    <section id="partners" className="scroll-mt-24 py-20 md:py-28" aria-labelledby="partners-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-200">Partners</p>
          <h2 id="partners-title" className="mt-3 font-safiro text-4xl text-white md:text-5xl">Supported by community-minded partners</h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((partner) => <SponsorCard key={partner.id} sponsor={partner} />)}
        </div>
      </div>
    </section>
  )
}
