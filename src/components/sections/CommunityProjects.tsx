import { BookOpenText, Car, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTexts } from '@/lib/texts'

type Project = {
  icon: typeof Sparkles
  actionHref: string
  author?: { name: string; linkedinUrl: string }
}

// Order matches texts.projects.cards in copy.json.
const projects: Project[] = [
  {
    icon: Sparkles,
    actionHref: 'https://careeradvice.malaga-ai.community',
  },
  {
    icon: BookOpenText,
    actionHref: 'https://whatisai.proaiassistant.com/',
    author: { name: 'Julija Jukneviciute', linkedinUrl: 'https://www.linkedin.com/in/jujuk/' },
  },
  {
    icon: Car,
    actionHref: 'https://glorieta.anaidic.com/',
    author: { name: 'Geordie Everitt', linkedinUrl: 'https://www.linkedin.com/in/georgeeveritt/' },
  },
]

export function CommunityProjects() {
  const texts = useTexts()

  return (
    <section id="projects" className="scroll-mt-24 py-20 md:py-28" aria-labelledby="projects-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-ink">{texts.projects.kicker}</p>
          <h2 id="projects-title" className="mt-3 font-safiro text-4xl text-foreground md:text-5xl">
            {texts.projects.heading}
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">{texts.projects.description}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {projects.map((project, index) => {
            const Icon = project.icon
            const card = texts.projects.cards[index]

            return (
              <article
                key={card.title}
                className="relative flex h-full flex-col rounded-2xl border border-border bg-card/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-primary/50"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-brand-ink">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-muted-foreground">
                    {card.status}
                  </span>
                </div>
                <h3 className="mt-6 font-safiro text-2xl leading-tight text-foreground">{card.title}</h3>
                {project.author ? (
                  <p className="relative z-10 mt-2 text-sm text-muted-foreground">
                    {texts.projects.byline}{' '}
                    <a
                      href={project.author.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={texts.projects.authorLinkedinAriaLabel(project.author.name)}
                      className="font-semibold text-brand-ink underline-offset-4 hover:underline"
                    >
                      {project.author.name}
                    </a>
                  </p>
                ) : null}
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{card.description}</p>
                {card.actionLabel ? (
                  <Button
                    href={project.actionHref}
                    target="_blank"
                    rel="noreferrer"
                    variant="secondary"
                    stretched
                    className="mt-6 self-start"
                  >
                    {card.actionLabel}
                  </Button>
                ) : null}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
