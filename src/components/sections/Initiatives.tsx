import { BookOpen, GraduationCap, UsersRound } from 'lucide-react'

const initiatives = [
  {
    title: 'Talent Group',
    status: 'Active',
    description:
      'A bridge between companies looking for AI talent and people who join the community while searching for new work opportunities.',
    icon: UsersRound,
  },
  {
    title: 'Certified Studies Group',
    status: 'Active',
    description:
      'Since 2023, Malaga-AI study groups have helped cohesive teams learn AI by building projects, from Innovation Hub and LLM exploits to agents, safety AI, and evals.',
    icon: GraduationCap,
  },
  {
    title: 'Training Session',
    status: 'Under construction',
    description:
      'Practical sessions in progress for training specific skills through workshops, guided challenges, and applied learning.',
    icon: BookOpen,
  },
]

export function Initiatives() {
  return (
    <section id="initiatives" className="scroll-mt-24 py-20 md:py-28" aria-labelledby="initiatives-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-200">Initiatives</p>
          <h2 id="initiatives-title" className="mt-3 font-safiro text-4xl text-white md:text-5xl">
            Groups for learning, practicing, and growing with AI
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Malaga AI supports focused spaces where the community can move forward with structure, peers, and real opportunities.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {initiatives.map((initiative) => {
            const Icon = initiative.icon

            return (
              <article
                key={initiative.title}
                className="flex h-full flex-col rounded-2xl border border-white/10 bg-card/80 p-6 shadow-sm backdrop-blur"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-teal-300/12 text-teal-200">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-semibold text-slate-200">
                    {initiative.status}
                  </span>
                </div>
                <h3 className="mt-6 font-safiro text-2xl leading-tight text-white">{initiative.title}</h3>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{initiative.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
