import { ArrowRight, Building2, Handshake, HeartHandshake } from 'lucide-react'
import { SponsorCard } from '@/components/community/SponsorCard'
import { Button } from '@/components/ui/button'
import { sponsors } from '@/data/sponsors'

type CommunityPartnersProps = {
  onContactTypeChange: (type: string) => void
}

const partnerItems = [
  {
    name: 'Universities and education centers',
    description: 'Academic allies that bring talent, research, and applied learning closer to the community.',
  },
  {
    name: 'Technology companies',
    description: 'Organizations that share knowledge, real-world cases, and opportunities for the local ecosystem.',
  },
]

const collaboratorItems = [
  {
    name: 'Speakers and mentors',
    description: 'People who contribute experience, talks, reviews, and guidance in practical sessions.',
  },
  {
    name: 'Community volunteers',
    description: 'Support for event operations, communication, photography, welcome desks, and community dynamics.',
  },
]

export function CommunityPartners({ onContactTypeChange }: CommunityPartnersProps) {
  return (
    <>
      <section id="sponsors" className="scroll-mt-24 py-20 md:py-28" aria-labelledby="sponsors-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-200">Sponsors</p>
              <h2 id="sponsors-title" className="mt-3 font-safiro text-4xl text-white md:text-5xl">
                Sponsors that make our gatherings possible
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Brands that support high-quality spaces for learning, connecting, and activating AI projects in Malaga.
              </p>
              <Button href="#contact-form" onClick={() => onContactTypeChange('Sponsor')} className="mt-7">
                Contact as sponsor <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {sponsors.map((sponsor) => <SponsorCard key={sponsor.id} sponsor={sponsor} />)}
            </div>
          </div>
        </div>
      </section>

      <section id="partners" className="scroll-mt-24 py-20 md:py-28" aria-labelledby="partners-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-200">Partners</p>
              <h2 id="partners-title" className="mt-3 font-safiro text-4xl text-white md:text-5xl">
                Partners for building the ecosystem
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Long-term collaborations with organizations that want to support talent, learning, and open innovation.
              </p>
              <Button href="#contact-form" onClick={() => onContactTypeChange('Partner')} className="mt-7">
                Contact as partner <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {partnerItems.map((item) => (
                <article key={item.name} className="rounded-2xl border border-white/10 bg-white/[0.055] p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-cyan-300/12 text-cyan-200">
                    <Building2 className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-safiro text-2xl text-white">{item.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="collaborators" className="scroll-mt-24 py-20 md:py-28" aria-labelledby="collaborators-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-200">Collaborators</p>
              <h2 id="collaborators-title" className="mt-3 font-safiro text-4xl text-white md:text-5xl">
                People who keep the community moving
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                If you want to help with content, mentoring, event operations, or outreach, there is room to contribute.
              </p>
              <Button href="#contact-form" onClick={() => onContactTypeChange('Collaborator')} className="mt-7">
                Contact as collaborator <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {collaboratorItems.map((item, index) => {
                const Icon = index === 0 ? Handshake : HeartHandshake

                return (
                  <article key={item.name} className="rounded-2xl border border-white/10 bg-white/[0.055] p-6">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-teal-300/12 text-teal-200">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-safiro text-2xl text-white">{item.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
