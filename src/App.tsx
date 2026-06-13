import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Events } from '@/components/sections/Events'
import { FeaturedEvent } from '@/components/sections/FeaturedEvent'
import { FriendlyCommunities } from '@/components/sections/FriendlyCommunities'
import { JoinCommunity } from '@/components/sections/JoinCommunity'
import { Projects } from '@/components/sections/Projects'
import { Resources } from '@/components/sections/Resources'
import { Sponsors } from '@/components/sections/Sponsors'
import { DalaParticleTransition } from '@/components/visuals/DalaParticleTransition'
import { useEvents } from '@/features/events/useEvents'

export default function App() {
  const eventsState = useEvents()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <DalaParticleTransition />
        <FeaturedEvent events={eventsState.events} isLoading={eventsState.isLoading} />
        <Events
          events={eventsState.events}
          isLoading={eventsState.isLoading}
          error={eventsState.error}
          onRetry={eventsState.refetch}
        />
        <Projects />
        <Sponsors />
        <FriendlyCommunities />
        <Resources />
        <JoinCommunity />
      </main>
      <Footer />
    </div>
  )
}
