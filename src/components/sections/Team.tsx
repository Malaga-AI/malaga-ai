import { Linkedin, Mail } from 'lucide-react'
import team01 from '@/assets/team/team-01.webp'
import team02 from '@/assets/team/team-02.webp'
import team03 from '@/assets/team/team-03.webp'
import team04 from '@/assets/team/team-04.webp'
import team05 from '@/assets/team/team-05.webp'
import team06 from '@/assets/team/team-06.webp'
import team07 from '@/assets/team/team-07.webp'
import team08 from '@/assets/team/team-08.webp'

const team = [
  {
    name: 'Team Member 01',
    role: 'Community Lead',
    description: 'Connects members, welcomes newcomers, and helps the local AI ecosystem stay active.',
    image: team01,
  },
  {
    name: 'Team Member 02',
    role: 'Events Lead',
    description: 'Coordinates meetups, panels, workshops, venues, speakers, and event operations.',
    image: team02,
  },
  {
    name: 'Team Member 03',
    role: 'Content Lead',
    description: 'Turns community activity into updates, useful resources, and stories people can follow.',
    image: team03,
  },
  {
    name: 'Team Member 04',
    role: 'Partnerships Lead',
    description: 'Builds relationships with sponsors, partners, venues, and organizations around Malaga AI.',
    image: team04,
  },
  {
    name: 'Team Member 05',
    role: 'Technical Lead',
    description: 'Supports demos, technical sessions, tooling, and hands-on learning formats.',
    image: team05,
  },
  {
    name: 'Team Member 06',
    role: 'Talent Lead',
    description: 'Helps connect members with learning paths, opportunities, and the Talent Group.',
    image: team06,
  },
  {
    name: 'Team Member 07',
    role: 'Media Lead',
    description: 'Captures event moments and helps shape the visual memory of the community.',
    image: team07,
  },
  {
    name: 'Team Member 08',
    role: 'Open Role',
    description: 'Reserved for a contributor who wants to help the community grow with care and consistency.',
    image: team08,
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

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <article
              key={member.name}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-card/80 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-teal-300/40"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-white/[0.05]">
                <img
                  src={member.image}
                  alt={`${member.name} portrait`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/92 via-slate-950/16 to-transparent" />
                <span className="absolute bottom-4 left-4 right-4 rounded-full border border-white/15 bg-slate-950/70 px-3 py-1.5 text-center text-xs font-semibold text-teal-100 backdrop-blur">
                  {member.role}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-safiro text-2xl leading-tight text-white">{member.name}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Profile slot
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <a
                      href="#contact"
                      className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-slate-200 transition hover:border-teal-300/40 hover:text-white"
                      aria-label={`Contact ${member.name}`}
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                    <a
                      href="#contact"
                      className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-slate-200 transition hover:border-teal-300/40 hover:text-white"
                      aria-label={`${member.name} LinkedIn placeholder`}
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <p className="mt-4 min-h-24 text-sm leading-6 text-muted-foreground">{member.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
