import { cn, initials } from '@/lib/utils'
import type { Sponsor } from '@/types/community'

const tierStyles: Partial<Record<Sponsor['tier'], { card: string; logo: string; label: string }>> = {
  gold: {
    card: 'border-amber-300/35 bg-amber-300/[0.09] shadow-[0_0_24px_rgba(252,211,77,0.12)]',
    logo: 'bg-amber-200/10 ring-1 ring-amber-200/20',
    label: 'text-amber-200',
  },
  silver: {
    card: 'border-slate-200/35 bg-slate-100/[0.08] shadow-[0_0_24px_rgba(226,232,240,0.10)]',
    logo: 'bg-slate-100/10 ring-1 ring-slate-100/20',
    label: 'text-slate-200',
  },
  bronze: {
    card: 'border-orange-400/35 bg-orange-400/[0.08] shadow-[0_0_24px_rgba(251,146,60,0.12)]',
    logo: 'bg-orange-300/10 ring-1 ring-orange-300/20',
    label: 'text-orange-200',
  },
}

export function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const styles = tierStyles[sponsor.tier]

  const content = (
    <div className={cn('flex h-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.055] p-5', styles?.card)}>
      {sponsor.logo ? (
        <div className={cn('grid h-14 w-24 shrink-0 place-items-center overflow-hidden rounded-xl bg-white/5 p-2', styles?.logo)}>
          <img src={sponsor.logo} alt={`${sponsor.name} logo`} className="max-h-10 max-w-20 object-contain" />
        </div>
      ) : (
        <div className={cn('grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/10 font-safiro text-sm text-teal-100', styles?.logo)}>
          {initials(sponsor.name)}
        </div>
      )}
      <div>
        <h3 className="font-semibold text-white">{sponsor.name}</h3>
        <p className={cn('text-sm capitalize text-muted-foreground', styles?.label)}>{sponsor.tier} partner</p>
      </div>
    </div>
  )

  return sponsor.url ? <a href={sponsor.url}>{content}</a> : content
}
