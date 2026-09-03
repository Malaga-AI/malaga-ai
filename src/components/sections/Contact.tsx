import { useState, type FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import { useTexts } from '@/lib/texts'

const contactEndpoint = 'https://formsubmit.co/ajax/hello@malaga-ai.community'

type SubmitState = 'idle' | 'sending' | 'sent' | 'error'

type FormSubmitResponse = {
  success?: string | boolean
  message?: string
}

export function Contact() {
  const texts = useTexts().contact
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()

    formData.set('_subject', `Malaga-AI contact${name ? ` - ${name}` : ''}`)
    formData.set('_template', 'table')
    formData.set('message', message || 'No additional message.')

    setSubmitState('sending')
    setSubmitMessage('')

    try {
      const response = await fetch(contactEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      })
      const result = await response.json() as FormSubmitResponse

      if (!response.ok || result.success === false || result.success === 'false') {
        const message = result.message?.toLowerCase().includes('activation')
          ? texts.errorActivationMessage
          : result.message ?? texts.errorFallbackMessage

        setSubmitMessage(message)
        throw new Error('Contact request failed')
      }

      event.currentTarget.reset()
      setSubmitState('sent')
      setSubmitMessage(texts.successMessage)
    } catch {
      setSubmitState('error')
      setSubmitMessage((currentMessage) => currentMessage || texts.errorGenericMessage)
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 py-20 md:py-28" aria-labelledby="contact-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 rounded-[2rem] border border-border bg-surface p-8 shadow-glow md:p-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-ink">{texts.kicker}</p>
            <h2 id="contact-title" className="mt-3 font-safiro text-4xl leading-tight text-foreground md:text-5xl">
              {texts.heading}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              {texts.description}
            </p>
          </div>

          <form id="contact-form" className="grid gap-4 scroll-mt-24" onSubmit={handleContactSubmit}>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-muted-foreground" htmlFor="contact-name">
                {texts.nameLabel}
              </label>
              <input
                id="contact-name"
                name="name"
                required
                className="min-h-12 rounded-2xl border border-border bg-panel px-4 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary"
                placeholder={texts.namePlaceholder}
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-muted-foreground" htmlFor="contact-email">
                {texts.emailLabel}
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                className="min-h-12 rounded-2xl border border-border bg-panel px-4 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary"
                placeholder={texts.emailPlaceholder}
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-muted-foreground" htmlFor="contact-message">
                {texts.messageLabel}
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                className="resize-none rounded-2xl border border-border bg-panel px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary"
                placeholder={texts.messagePlaceholder}
              />
            </div>
            <button
              type="submit"
              disabled={submitState === 'sending'}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:-translate-y-0.5 hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
            >
              {submitState === 'sending' ? texts.submitSendingLabel : texts.submitIdleLabel} <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            {submitState === 'sent' && submitMessage ? (
              <p className="text-sm text-brand-ink">{submitMessage}</p>
            ) : null}
            {submitState === 'error' && submitMessage ? (
              <p className="text-sm text-danger">{submitMessage}</p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  )
}
