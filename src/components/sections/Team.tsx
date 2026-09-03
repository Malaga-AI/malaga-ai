import { Linkedin, Mail } from 'lucide-react'
import adrianImage from '@/assets/team/adrian.webp'
import andreaImage from '@/assets/team/andrea.webp'
import janineImage from '@/assets/team/janine.webp'
import joseImage from '@/assets/team/jose.webp'
import juanImage from '@/assets/team/juan.webp'
import paulImage from '@/assets/team/paul.webp'
import rosaImage from '@/assets/team/rosa.webp'

const team = [
  {
    name: 'Adrian Tineo',
    role: 'Community Lead',
    image: adrianImage,
    emailUrl: 'mailto:adrian@malaga-ai.community',
    linkedinUrl: 'https://www.linkedin.com/in/adriantineo/',
  },
  {
    name: 'Rosa Castillo',
    role: 'Community Lead',
    image: rosaImage,
    emailUrl: 'mailto:rosa@malaga-ai.community',
    linkedinUrl: 'https://www.linkedin.com/in/arosacastillo/',
  },
  {
    name: 'Paul Ben',
    role: 'Collaborator',
    image: paulImage,
    emailUrl: 'mailto:paul@malaga-ai.community',
  },
  {
    name: 'Juan Gallego',
    role: 'Technical Program Manager',
    image: juanImage,
    emailUrl: 'mailto:juan@malaga-ai.community',
    linkedinUrl: 'https://www.linkedin.com/in/juan-gallego-güeto-7b3a22141/',
  },
  {
    name: 'Andrea Villanca',
    role: 'Commnity Manager',
    image: andreaImage,
    linkedinUrl: 'https://www.linkedin.com/in/andreavillanca/',
  },
  {
    name: 'Jose Rodriguez',
    role: 'Collaborator',
    image: joseImage,
    linkedinUrl: 'https://www.linkedin.com/in/jose-rodriguez-ortega/',
  },
]

export function Team() {
  return (
    <section id="team" className="scroll-mt-24 py-20 md:py-28" aria-labelledby="team-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-ink">Team</p>
          <h2 id="team-title" className="mt-3 font-safiro text-4xl text-foreground md:text-5xl">
            The people making Malaga AI happen
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            A small, hands-on team coordinates the community, events, content, and collaborations behind Malaga AI.
          </p>
        </div>

        <div className="-mx-4 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 [scrollbar-width:thin] sm:mx-0 sm:grid sm:snap-none sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-7">
          {team.map((member) => (
            <article
              key={member.name}
              className="group flex h-full w-[72vw] max-w-56 shrink-0 snap-center flex-col overflow-hidden rounded-xl border border-border bg-card/80 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-primary/50 sm:w-auto sm:max-w-none"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                <img
                  src={member.image}
                  alt={`${member.name} portrait`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 p-3">
                <div className="flex w-full items-start justify-between gap-2">
                  <div>
                    <h3 className="font-safiro text-base leading-tight text-foreground">{member.name}</h3>
                    {member.role ? (
                      <p className="mt-1 text-xs leading-4 text-muted-foreground">
                        {member.role}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex shrink-0 gap-2">
                    {member.emailUrl ? (
                      <a
                        href={member.emailUrl}
                        className="grid h-7 w-7 place-items-center rounded-full border border-border bg-surface text-muted-foreground transition hover:border-primary/50 hover:text-foreground"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail className="h-3.5 w-3.5" />
                      </a>
                    ) : null}
                    {member.linkedinUrl ? (
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="grid h-7 w-7 place-items-center rounded-full border border-border bg-surface text-muted-foreground transition hover:border-primary/50 hover:text-foreground"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <Linkedin className="h-3.5 w-3.5" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
