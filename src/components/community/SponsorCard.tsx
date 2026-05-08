import { initials } from '@/lib/utils'
import type { Sponsor } from '@/types/community'

export function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const content = (
    <div className="flex h-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.055] p-5">
      {sponsor.logo ? (
        <div className="grid h-14 w-24 shrink-0 place-items-center rounded-xl bg-white/5 p-2">
          <img src={sponsor.logo} alt={`${sponsor.name} logo`} className="max-h-full max-w-full object-contain" />
        </div>
      ) : (
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/10 font-safiro text-sm text-teal-100">
          {initials(sponsor.name)}
        </div>
      )}
      <div>
        <h3 className="font-semibold text-white">{sponsor.name}</h3>
        <p className="text-sm capitalize text-muted-foreground">{sponsor.tier} partner</p>
      </div>
    </div>
  )

  return sponsor.url ? <a href={sponsor.url}>{content}</a> : content
}
