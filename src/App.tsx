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

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <DalaParticleTransition />
        <FeaturedEvent />
        <Events />
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
