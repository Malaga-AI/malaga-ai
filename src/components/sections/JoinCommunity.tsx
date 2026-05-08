import type { FormEvent } from 'react'
import { ArrowRight, Handshake, Mic2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const contactEmail = 'juangallego001@gmail.com'

function handleJoinSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()

  const formData = new FormData(event.currentTarget)
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const interest = String(formData.get('interest') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  const subject = encodeURIComponent(`Malaga AI community request from ${name || 'a new member'}`)
  const body = encodeURIComponent(
    [
      'Hi Malaga AI,',
      '',
      'I would like to join the community.',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Interest: ${interest}`,
      '',
      'Message:',
      message || 'No additional message.',
    ].join('\n'),
  )

  window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`
}

export function JoinCommunity() {
  return (
    <section id="join" className="scroll-mt-24 py-20 md:py-28" aria-labelledby="join-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 rounded-[2rem] border border-white/10 bg-white/[0.07] p-8 shadow-glow md:p-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 id="join-title" className="font-safiro text-4xl leading-tight text-white md:text-5xl">
              Join Malaga AI and be part of the local AI movement.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Get updates about upcoming sessions, open calls for demos, workshops, and community opportunities.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button href="#join-form">
                Join the community <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button href="#join-form" variant="secondary">
                <Mic2 className="mr-2 h-4 w-4" />
                Propose a talk
              </Button>
              <Button href="#join-form" variant="secondary">
                <Handshake className="mr-2 h-4 w-4" />
                Become a partner
              </Button>
            </div>
          </div>

          <form id="join-form" className="grid gap-4" onSubmit={handleJoinSubmit}>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-200" htmlFor="join-name">
                Name
              </label>
              <input
                id="join-name"
                name="name"
                required
                className="min-h-12 rounded-2xl border border-white/10 bg-slate-950/55 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-teal-300"
                placeholder="Your name"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-200" htmlFor="join-email">
                Email
              </label>
              <input
                id="join-email"
                name="email"
                type="email"
                required
                className="min-h-12 rounded-2xl border border-white/10 bg-slate-950/55 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-teal-300"
                placeholder="you@example.com"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-200" htmlFor="join-interest">
                Interest
              </label>
              <select
                id="join-interest"
                name="interest"
                className="min-h-12 rounded-2xl border border-white/10 bg-slate-950/55 px-4 text-white outline-none transition focus:border-teal-300"
                defaultValue="Join the community"
              >
                <option>Join the community</option>
                <option>Propose a talk</option>
                <option>Become a partner</option>
                <option>Volunteer</option>
              </select>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-200" htmlFor="join-message">
                Message
              </label>
              <textarea
                id="join-message"
                name="message"
                rows={4}
                className="resize-none rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-teal-300"
                placeholder="Tell us what you are interested in."
              />
            </div>
            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-teal-300 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-glow transition hover:-translate-y-0.5 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 focus:ring-offset-background"
            >
              Send email request <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
