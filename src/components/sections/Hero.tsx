import { ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import { BrandLogo } from '@/components/layout/BrandLogo'
import { DiscordIcon, LinkedInIcon, SocialLinks } from '@/components/layout/SocialLinks'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { events } from '@/data/events'
import { getNextEvent } from '@/lib/events'

const floating = ['Agents', 'RAG', 'Computer Vision', 'Responsible AI', 'LLM Apps']
const nodePositions = [
  'left-[8%] top-[34%] sm:left-[12%] sm:top-[34%]',
  'right-[10%] top-[28%] sm:right-[12%] sm:top-[30%]',
  'left-[12%] top-[55%] sm:left-[16%] sm:top-[58%]',
  'right-[8%] top-[55%] sm:right-[10%] sm:top-[58%]',
  'left-1/2 top-[44%] -translate-x-1/2',
]

export function Hero() {
  const nextEvent = getNextEvent(events)

  return (
    <section id="top" className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(45,212,191,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,0.08)_1px,transparent_1px)] bg-[size:42px_42px]" />
      <div className="absolute left-1/2 top-8 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <Badge className="gap-2">
            <Sparkles className="h-3.5 w-3.5" />
            Malaga-based - Open to builders everywhere
          </Badge>
          <h1 className="mt-6 max-w-4xl font-safiro text-5xl leading-[1.02] text-foreground sm:text-6xl lg:text-7xl">
            Build, learn, and connect with the AI community in Malaga.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Malaga AI is a community dedicated to sharing the power and promise of artificial intelligence, so that all
            people may benefit from this transformative technology.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#contact-form" className="gap-2">
              <span>Contact</span>
              <span className="flex items-center gap-1.5" aria-hidden="true">
                <LinkedInIcon className="h-4 w-4" />
                <DiscordIcon className="h-4 w-4" />
              </span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <SocialLinks className="mt-5" showLabels />
        </motion.div>

        <motion.div
          className="relative min-h-[440px] overflow-hidden rounded-[2rem] border border-border bg-surface shadow-glow backdrop-blur"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.18),transparent_34%),linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:auto,32px_32px,32px_32px]" />
          <div className="absolute left-5 top-5 rounded-2xl border border-primary/25 bg-panel p-4 sm:left-8 sm:top-8 sm:p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-brand-ink">Next session</p>
            <p className="mt-3 max-w-xs font-safiro text-xl leading-tight text-foreground sm:text-2xl">{nextEvent.title}</p>
          </div>

          <div className="absolute left-1/2 top-1/2 h-32 w-64 -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-primary/30 bg-panel p-4">
            <div className="grid h-full place-items-center rounded-2xl border border-border bg-primary/10">
              <BrandLogo showText={false} imageClassName="h-16 max-w-[210px]" />
            </div>
          </div>
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border" />
          <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border" />

          {floating.map((item, index) => (
            <div
              key={item}
              className={`absolute ${nodePositions[index]} max-w-[9rem] rounded-full border border-border-strong bg-panel px-3 py-2 text-center text-xs font-medium text-foreground backdrop-blur sm:px-4 sm:text-sm`}
            >
              {item}
            </div>
          ))}

          <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-border bg-panel p-5 text-sm leading-6 text-muted-foreground sm:inset-x-auto sm:right-8 sm:max-w-xs">
            Technical talks, demos, workshops, and conversations with people building real AI systems.
          </div>
        </motion.div>
      </div>
    </section>
  )
}
