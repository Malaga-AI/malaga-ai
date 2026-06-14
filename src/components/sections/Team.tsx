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
    description: 'Coordinates Malaga AI initiatives and helps connect builders, speakers, and partners around practical AI.',
    image: adrianImage,
    contactUrl: 'https://www.linkedin.com/in/adriantineo/',
    contactType: 'linkedin',
  },
  {
    name: 'Rosa Castillo',
    role: 'Events & Community',
    description: 'Shapes welcoming events and community touchpoints so people can learn, meet, and collaborate.',
    image: rosaImage,
    contactUrl: 'https://www.linkedin.com/in/arosacastillo/',
    contactType: 'linkedin',
  },
  {
    name: 'Paul Ben',
    role: 'Operations',
    description: 'Supports event logistics, coordination, and the behind-the-scenes details that keep the community moving.',
    image: paulImage,
    contactUrl: 'mailto:Paul.benta@yahoo.ro',
    contactType: 'mail',
  },
  {
    name: 'Juan Gallego',
    role: 'Technical Program',
    description: 'Helps turn ideas into hands-on sessions, demos, and learning experiences for the local AI scene.',
    image: juanImage,
    contactUrl: 'https://www.linkedin.com/in/juan-gallego-güeto-7b3a22141/',
    contactType: 'linkedin',
  },
  {
    name: 'Andrea Villanca',
    role: 'Partnerships',
    description: 'Builds bridges with local communities, companies, and collaborators across Malaga.',
    image: andreaImage,
    contactUrl: 'https://www.linkedin.com/in/andreavillanca/',
    contactType: 'linkedin',
  },
  {
    name: 'Jose Rodriguez',
    role: 'Content & Projects',
    description: 'Contributes to community storytelling, project visibility, and resources for people building with AI.',
    image: joseImage,
    contactUrl: 'https://www.linkedin.com/in/jose-rodriguez-ortega/',
    contactType: 'linkedin',
  },
  {
    name: 'Janine Boldt',
    role: 'Community Experience',
    description: 'Focuses on making Malaga AI feel useful, open, and easy to join for newcomers and regulars.',
    image: janineImage,
    contactUrl: 'https://www.linkedin.com/in/janine-boldt/',
    contactType: 'linkedin',
  },
]

export function Team() {
  return (
    <section id="team" className="scroll-mt-24 py-20 md:py-28" aria-labelledby="team-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-200">Team</p>
          <h2 id="team-title" className="mt-3 font-safiro text-4xl text-white md:text-5xl">
            The people making Malaga AI happen
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            A small, hands-on team coordinates the community, events, content, and collaborations behind Malaga AI.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <article
              key={member.name}
              className="group overflow-hidden rounded-xl border border-white/10 bg-card/80 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-teal-300/40"
            >
              <div className="relative aspect-[5/4] overflow-hidden bg-white/[0.05]">
                <img
                  src={member.image}
                  alt={`${member.name} portrait`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/92 via-slate-950/16 to-transparent" />
                {member.role ? (
                  <span className="absolute bottom-3 left-3 right-3 rounded-full border border-white/15 bg-slate-950/70 px-3 py-1.5 text-center text-xs font-semibold text-teal-100 backdrop-blur">
                    {member.role}
                  </span>
                ) : null}
              </div>
              <div className="p-4">
                <div className="flex min-h-40 flex-col justify-between gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-safiro text-xl leading-tight text-white">{member.name}</h3>
                      {member.role ? (
                        <p className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                          {member.role}
                        </p>
                      ) : null}
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <a
                        href="#contact"
                        className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-slate-200 transition hover:border-teal-300/40 hover:text-white"
                        aria-label={`Contact ${member.name}`}
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                      <a
                        href={member.contactUrl}
                        target={member.contactUrl.startsWith('http') ? '_blank' : undefined}
                        rel={member.contactUrl.startsWith('http') ? 'noreferrer' : undefined}
                        className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-slate-200 transition hover:border-teal-300/40 hover:text-white"
                        aria-label={member.contactType === 'mail' ? `Email ${member.name}` : `${member.name} LinkedIn`}
                      >
                        {member.contactType === 'mail' ? <Mail className="h-4 w-4" /> : <Linkedin className="h-4 w-4" />}
                      </a>
                    </div>
                  </div>
                  <div className="h-px w-full bg-gradient-to-r from-teal-300/40 via-white/10 to-transparent" aria-hidden="true" />
                  {member.description ? (
                    <p className="text-sm leading-5 text-muted-foreground">{member.description}</p>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
