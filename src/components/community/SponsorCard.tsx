import { useTexts } from '@/lib/texts'
import type { SponsorTierEntry } from '@/data/sponsors'

// Tier colours live in index.css (`--tier-*`) because gold/silver/bronze need
// genuinely different hues per theme: metallics that glow on navy turn
// illegible on a light background.

export function SponsorCard({ sponsor }: { sponsor: SponsorTierEntry }) {
  const { sponsorTierCard } = useTexts().partners

  const content = (
    <div
      data-tier={sponsor.tier}
      className="sponsor-tier flex h-full items-center gap-4 rounded-2xl border border-border bg-surface p-5"
    >
      <div className="sponsor-tier__logo grid h-14 w-24 shrink-0 place-items-center overflow-hidden rounded-xl bg-surface p-2">
        <img src={sponsor.logo} alt={`${sponsorTierCard.name} logo`} className="max-h-10 max-w-20 object-contain" />
      </div>
      <div>
        <h3 className="font-safiro font-semibold text-foreground">{sponsorTierCard.name}</h3>
        <p className="sponsor-tier__label text-sm capitalize text-muted-foreground">{sponsorTierCard.tierLabel[sponsor.tier]}</p>
      </div>
    </div>
  )

  return sponsor.url ? <a href={sponsor.url}>{content}</a> : content
}
