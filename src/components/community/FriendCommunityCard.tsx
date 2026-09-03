import { ArrowUpRight } from 'lucide-react'
import { initials } from '@/lib/utils'
import type { FriendlyCommunity } from '@/types/community'

export function FriendCommunityCard({ community }: { community: FriendlyCommunity }) {
  const card = (
    <div className="h-full rounded-2xl border border-border bg-card/80 p-6">
      <div className="flex items-center justify-between gap-4">
        {community.logo ? (
          <div className="grid h-14 w-24 shrink-0 place-items-center rounded-xl bg-surface p-2">
            <img src={community.logo} alt={`${community.name} logo`} className="max-h-full max-w-full object-contain" />
          </div>
        ) : (
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/15 font-safiro text-lg text-brand-ink">
            {initials(community.name)}
          </div>
        )}
        {community.url ? <ArrowUpRight className="h-5 w-5 text-muted-foreground" aria-hidden="true" /> : null}
      </div>
      <h3 className="mt-5 font-safiro text-xl text-foreground">{community.name}</h3>
      {community.shortDescription ? <p className="mt-3 text-sm leading-6 text-muted-foreground">{community.shortDescription}</p> : null}
    </div>
  )

  return community.url ? <a href={community.url} aria-label={`Visit ${community.name}`}>{card}</a> : card
}
