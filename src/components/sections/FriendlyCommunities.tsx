import { FriendCommunityCard } from '@/components/community/FriendCommunityCard'
import { friendlyCommunities } from '@/data/friendlyCommunities'

export function FriendlyCommunities() {
  return (
    <section id="friends" className="scroll-mt-24 py-20 md:py-28" aria-labelledby="friends-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-ink">Friendly Communities</p>
          <h2 id="friends-title" className="mt-3 font-safiro text-4xl text-foreground md:text-5xl">Local groups we are glad to share space with</h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">A light logo wall and list of communities connected to technology, data, cloud, and inclusive learning in Malaga.</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {friendlyCommunities.map((community) => <FriendCommunityCard key={community.id} community={community} />)}
        </div>
      </div>
    </section>
  )
}
