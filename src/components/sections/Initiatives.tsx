import { GraduationCap, Sparkles, UsersRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTexts } from '@/lib/texts'

const initiatives = [
  {
    icon: Sparkles,
    actionHref: 'https://careeradvice.malaga-ai.community',
  },
  {
    icon: UsersRound,
    actionHref: 'mailto:talent@malaga-ai.community',
  },
  {
    icon: GraduationCap,
  },
]

export function Initiatives() {
  const texts = useTexts()

  return (
    <section id="initiatives" className="scroll-mt-24 py-20 md:py-28" aria-labelledby="initiatives-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-ink">{texts.initiatives.kicker}</p>
          <h2 id="initiatives-title" className="mt-3 font-safiro text-4xl text-foreground md:text-5xl">
            {texts.initiatives.heading}
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">{texts.initiatives.description}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {initiatives.map((initiative, index) => {
            const Icon = initiative.icon
            const card = texts.initiatives.cards[index]

            return (
              <article
                key={card.title}
                className="flex h-full flex-col rounded-2xl border border-border bg-card/80 p-6 shadow-sm backdrop-blur"
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
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{card.description}</p>
                {card.actionLabel && initiative.actionHref ? (
                  <Button
                    href={initiative.actionHref}
                    {...(initiative.actionHref.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                    variant="secondary"
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
