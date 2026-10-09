import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { LanguageContext } from '@/lib/language'
import { TEXTS } from '@/lib/texts'
import { Contact } from './Contact'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('Contact', () => {
  it('shows a success confirmation and resets the form after a successful submission', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: 'true', message: 'Form submitted successfully' }),
      }),
    )

    render(
      <LanguageContext.Provider value={{ language: 'es' }}>
        <Contact />
      </LanguageContext.Provider>,
    )

    const nameInput = screen.getByLabelText(TEXTS.es.contact.nameLabel)
    const emailInput = screen.getByLabelText(TEXTS.es.contact.emailLabel)
    const messageInput = screen.getByLabelText(TEXTS.es.contact.messageLabel)

    fireEvent.change(nameInput, { target: { value: 'Ada Lovelace' } })
    fireEvent.change(emailInput, { target: { value: 'ada@example.com' } })
    fireEvent.change(messageInput, { target: { value: 'Hola, Málaga AI' } })
    fireEvent.submit(screen.getByRole('button', { name: TEXTS.es.contact.submitIdleLabel }).closest('form')!)

    expect(await screen.findByText(TEXTS.es.contact.successMessage)).toBeInTheDocument()
    expect(nameInput).toHaveValue('')
    expect(emailInput).toHaveValue('')
    expect(messageInput).toHaveValue('')
  })
})
