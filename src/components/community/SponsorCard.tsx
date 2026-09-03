import { cn, initials } from '@/lib/utils'
import type { Sponsor } from '@/types/community'

// Tier colours live in index.css (`--tier-*`) because gold/silver/bronze need
// genuinely different hues per theme: metallics that glow on navy turn
// illegible on a light background.
const TIERS = new Set<Sponsor['tier']>(['gold', 'silver', 'bronze'])

export function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const tier = TIERS.has(sponsor.tier) ? sponsor.tier : undefined

  const content = (
    <div
      data-tier={tier}
      className={cn(
        'flex h-full items-center gap-4 rounded-2xl border border-border bg-surface p-5',
        tier && 'sponsor-tier',
      )}
    >
      {sponsor.logo ? (
        <div className={cn('grid h-14 w-24 shrink-0 place-items-center overflow-hidden rounded-xl bg-surface p-2', tier && 'sponsor-tier__logo')}>
          <img src={sponsor.logo} alt={`${sponsor.name} logo`} className="max-h-10 max-w-20 object-contain" />
        </div>
      ) : (
        <div className={cn('grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-surface-strong font-safiro text-sm text-brand-ink', tier && 'sponsor-tier__logo')}>
          {initials(sponsor.name)}
        </div>
      )}
      <div>
        <h3 className="font-safiro font-semibold text-foreground">{sponsor.name}</h3>
        <p className={cn('text-sm capitalize text-muted-foreground', tier && 'sponsor-tier__label')}>{sponsor.tier} partner</p>
      </div>
    </div>
  )

  return sponsor.url ? <a href={sponsor.url}>{content}</a> : content
}
