import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Contact } from '@/components/sections/Contact'
import { Events } from '@/components/sections/Events'
import { EventPhotos } from '@/components/sections/EventPhotos'
import { FeaturedEvent } from '@/components/sections/FeaturedEvent'
import { Initiatives } from '@/components/sections/Initiatives'
import { CommunityPartners } from '@/components/sections/CommunityPartners'
import { Team } from '@/components/sections/Team'
import { DalaParticleTransition } from '@/components/visuals/DalaParticleTransition'
import { useEvents } from '@/features/events/useEvents'
import { useState } from 'react'

export default function App() {
  const eventsState = useEvents()
  const [contactReason, setContactReason] = useState('General')

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
        <Initiatives />
        <Team />
        <EventPhotos />
        <CommunityPartners onContactTypeChange={setContactReason} />
        <Contact contactReason={contactReason} onContactReasonChange={setContactReason} />
      </main>
      <Footer />
    </div>
  )
}
