import gdgMalagaLogo from '@/assets/friendly-communities/gdg-malaga.svg'
import womenTechmakersLogo from '@/assets/friendly-communities/women-techmakers-malaga.svg'
import { SponsorCard } from '@/components/community/SponsorCard'
import { partners, sponsors } from '@/data/sponsors'

type Collaborator = {
  name: string
  url: string
  logo: string
}

type CollaboratorGroup = {
  title: string
  items: Collaborator[]
}

const favicon = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`

const collaboratorGroups: CollaboratorGroup[] = [
  {
    title: 'Companies',
    items: [
      { name: 'Vodafone', url: 'https://www.vodafone.com/', logo: favicon('vodafone.com') },
      { name: 'Wunderdog', url: 'https://www.wunderdog.io/', logo: favicon('wunderdog.io') },
      { name: 'Brite', url: 'https://britepayments.com/', logo: favicon('britepayments.com') },
      { name: 'Google', url: 'https://www.google.com/', logo: favicon('google.com') },
      { name: 'Certus', url: 'https://certuslegalfirm.com/', logo: favicon('certuslegalfirm.com') },
      { name: 'Grupo Cajamar', url: 'https://www.cajamar.es/', logo: favicon('cajamar.es') },
      { name: 'Ciklum', url: 'https://www.ciklum.com/', logo: favicon('ciklum.com') },
      { name: 'FJX', url: 'https://www.thefjx.com/', logo: favicon('thefjx.com') },
      { name: 'Bravend', url: 'https://bravend.com.br/', logo: favicon('bravend.com.br') },
      { name: 'CodeSpace', url: 'https://codespaceacademy.com/', logo: favicon('codespaceacademy.com') },
      { name: 'Freepik (Magnific)', url: 'https://www.magnific.com/', logo: favicon('magnific.com') },
      { name: 'Marlife', url: 'https://marlife.eu/', logo: favicon('marlife.eu') },
    ],
  },
  {
    title: 'Communities',
    items: [
      { name: 'Azure-Malaga', url: 'https://azuremalaga.com/', logo: favicon('azuremalaga.com') },
      { name: 'GDG Malaga', url: 'https://gdg.community.dev/gdg-malaga/', logo: gdgMalagaLogo },
      { name: 'OpenSouthCode', url: 'https://www.opensouthcode.org/', logo: favicon('opensouthcode.org') },
      { name: 'MalagaJUG', url: 'https://malagajug.wordpress.com/', logo: favicon('malagajug.wordpress.com') },
      { name: 'DeepLearningAI', url: 'https://www.deeplearning.ai/', logo: favicon('deeplearning.ai') },
      { name: 'WordPress Malaga', url: 'https://wpmalaga.org/', logo: favicon('wpmalaga.org') },
      { name: 'Women Techmakers', url: 'https://www.womentechmakers.com/', logo: womenTechmakersLogo },
    ],
  },
  {
    title: 'Entities',
    items: [
      { name: 'University of Malaga', url: 'https://www.uma.es/', logo: favicon('uma.es') },
      { name: 'PoloDigital', url: 'https://www.polodigital.eu/', logo: favicon('polodigital.eu') },
    ],
  },
]

function CollaboratorLogo({ collaborator }: { collaborator: Collaborator }) {
  return (
    <a
      href={collaborator.url}
      target="_blank"
      rel="noreferrer"
      className="flex h-16 w-44 shrink-0 items-center gap-3 rounded-lg border border-border bg-surface px-3 transition hover:border-primary/50 hover:bg-surface-strong"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-white text-[#090E2A]">
        <img
          src={collaborator.logo}
          alt=""
          className="max-h-7 max-w-7 object-contain"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.display = 'none'
          }}
        />
      </span>
      <span className="min-w-0 text-sm font-medium leading-5 text-foreground">{collaborator.name}</span>
    </a>
  )
}

function CollaboratorRow({ group, index }: { group: CollaboratorGroup; index: number }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface py-3">
      <div className="mb-3 flex items-center justify-between px-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-ink">{group.title}</h3>
        <span className="text-xs text-muted-foreground">{group.items.length}</span>
      </div>
      <div className="collaborator-marquee" data-direction={index % 2 === 0 ? 'left' : 'right'}>
        <div className="collaborator-marquee__track">
          {group.items.map((collaborator) => <CollaboratorLogo key={collaborator.name} collaborator={collaborator} />)}
          {group.items.map((collaborator) => (
            <span key={`${collaborator.name}-repeat`} className="collaborator-marquee__repeat contents" aria-hidden="true">
              <CollaboratorLogo collaborator={collaborator} />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function CommunityPartners() {
  return (
    <>
      <section id="sponsors" className="scroll-mt-24 py-20 md:py-28" aria-labelledby="sponsors-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-ink">Sponsors</p>
              <h2 id="sponsors-title" className="mt-3 font-safiro text-4xl text-foreground md:text-5xl">
                Sponsors that make our gatherings possible
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Brands that support high-quality spaces for learning, connecting, and activating AI projects in Malaga.
              </p>
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
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-ink">Partners</p>
              <h2 id="partners-title" className="mt-3 font-safiro text-4xl text-foreground md:text-5xl">
                Partners for building the ecosystem
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Long-term collaborations with organizations that want to support talent, learning, and open innovation.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {partners.map((partner) => <SponsorCard key={partner.id} sponsor={partner} />)}
            </div>
          </div>
        </div>
      </section>

      <section id="collaborators" className="scroll-mt-24 py-20 md:py-28" aria-labelledby="collaborators-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-ink">Collaborators</p>
              <h2 id="collaborators-title" className="mt-3 font-safiro text-4xl text-foreground md:text-5xl">
                Organizations and communities moving with us
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Companies, communities, and entities that help Malaga AI connect talent, venues, knowledge, and local opportunity.
              </p>
            </div>
            <div className="space-y-4">
              {collaboratorGroups.map((group, index) => <CollaboratorRow key={group.title} group={group} index={index} />)}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
