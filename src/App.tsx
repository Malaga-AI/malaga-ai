import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Events } from '@/components/sections/Events'
import { FeaturedEvent } from '@/components/sections/FeaturedEvent'
import { FriendlyCommunities } from '@/components/sections/FriendlyCommunities'
import { Hero } from '@/components/sections/Hero'
import { JoinCommunity } from '@/components/sections/JoinCommunity'
import { Projects } from '@/components/sections/Projects'
import { Resources } from '@/components/sections/Resources'
import { Sponsors } from '@/components/sections/Sponsors'

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
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
