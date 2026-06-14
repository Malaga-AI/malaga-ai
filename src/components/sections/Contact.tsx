import type { FormEvent } from 'react'
import { ArrowRight, Mail, MapPin } from 'lucide-react'

const contactEmail = 'juangallego001@gmail.com'
const contactTypes = ['General', 'Sponsor', 'Partner', 'Collaborator', 'Speaker', 'Volunteer']

type ContactProps = {
  contactType: string
  onContactTypeChange: (type: string) => void
}

function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()

  const formData = new FormData(event.currentTarget)
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const type = String(formData.get('type') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  const subject = encodeURIComponent(`Malaga AI contact: ${type || 'General'}${name ? ` - ${name}` : ''}`)
  const body = encodeURIComponent(
    [
      'Hi Malaga AI,',
      '',
      'I would like to get in touch.',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Type: ${type}`,
      '',
      'Message:',
      message || 'No additional message.',
    ].join('\n'),
  )

  window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`
}

export function Contact({ contactType, onContactTypeChange }: ContactProps) {
  return (
    <section id="contact" className="scroll-mt-24 py-20 md:py-28" aria-labelledby="contact-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 rounded-[2rem] border border-white/10 bg-white/[0.07] p-8 shadow-glow md:p-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-200">Contact</p>
            <h2 id="contact-title" className="mt-3 font-safiro text-4xl leading-tight text-white md:text-5xl">
              Let's talk about working with Malaga AI
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Reach out to sponsor, partner, propose a talk, collaborate, or activate a new community initiative.
            </p>
            <div className="mt-8 grid gap-4 text-sm text-slate-300">
              <span className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-teal-300" />
                {contactEmail}
              </span>
              <span className="flex items-center gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-teal-300" />
                Malaga, Spain
              </span>
            </div>
          </div>

          <form id="contact-form" className="grid gap-4 scroll-mt-24" onSubmit={handleContactSubmit}>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-200" htmlFor="contact-name">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                required
                className="min-h-12 rounded-2xl border border-white/10 bg-slate-950/55 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-teal-300"
                placeholder="Your name"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-200" htmlFor="contact-email">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                className="min-h-12 rounded-2xl border border-white/10 bg-slate-950/55 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-teal-300"
                placeholder="you@example.com"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-200" htmlFor="contact-type">
                Type
              </label>
              <select
                id="contact-type"
                name="type"
                value={contactType}
                onChange={(event) => onContactTypeChange(event.target.value)}
                className="min-h-12 rounded-2xl border border-white/10 bg-slate-950/55 px-4 text-white outline-none transition focus:border-teal-300"
              >
                {contactTypes.map((type) => <option key={type}>{type}</option>)}
              </select>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-200" htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                className="resize-none rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-teal-300"
                placeholder="Tell us what you have in mind."
              />
            </div>
            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-teal-300 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-glow transition hover:-translate-y-0.5 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 focus:ring-offset-background"
            >
              Send request <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
