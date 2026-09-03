import { SponsorCard } from '@/components/community/SponsorCard'
import { partners, sponsors } from '@/data/sponsors'
import type { Sponsor } from '@/types/community'
import { useTexts } from '@/lib/texts'

function PartnerLogo({ partner }: { partner: Sponsor }) {
  return (
    <a
      href={partner.url}
      target="_blank"
      rel="noreferrer"
      className="flex h-16 w-44 shrink-0 items-center gap-3 rounded-lg border border-border bg-surface px-3 transition hover:border-primary/50 hover:bg-surface-strong"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-white text-[#090E2A]">
        <img
          src={partner.logo}
          alt=""
          className="max-h-7 max-w-7 object-contain"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.display = 'none'
          }}
        />
      </span>
      <span className="min-w-0 text-sm font-medium leading-5 text-foreground">{partner.name}</span>
    </a>
  )
}

export function CommunityPartners() {
  const texts = useTexts().partners

  return (
    <>
      <section id="sponsors" className="scroll-mt-24 py-20 md:py-28" aria-labelledby="sponsors-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-ink">{texts.sponsorsKicker}</p>
              <h2 id="sponsors-title" className="mt-3 font-safiro text-4xl text-foreground md:text-5xl">
                {texts.sponsorsHeading}
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                {texts.sponsorsDescription}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {sponsors.map((sponsor) => <SponsorCard key={sponsor.id} sponsor={sponsor} />)}
            </div>
          </div>
        </div>
      </section>

      <section id="partners" className="scroll-mt-24 py-20 md:py-28" aria-labelledby="partners-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-ink">{texts.partnersKicker}</p>
            <h2 id="partners-title" className="mt-3 font-safiro text-4xl text-foreground md:text-5xl">
              {texts.partnersHeading}
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              {texts.partnersDescription}
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            {partners.map((partner) => <PartnerLogo key={partner.id} partner={partner} />)}
          </div>
        </div>
      </section>
    </>
  )
}
