import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { PaperPlaneTilt } from '@phosphor-icons/react/dist/csr/PaperPlaneTilt'
import { site } from '@/config/site'
import {
  CONTACT_LIMITS,
  ContactRequestError,
  buildContactMailto,
  normalizeContactPayload,
  submitContactRequest,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactPayload,
} from '@/lib/contact'

const emptyForm: ContactPayload = { name: '', email: '', subject: '', message: '', website: '' }

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error' | 'fallback' | 'blocked'

export default function ContactForm() {
  const id = useId()
  const [form, setForm] = useState<ContactPayload>(emptyForm)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [state, setState] = useState<SubmissionState>('idle')
  const [feedback, setFeedback] = useState('')
  const request = useRef<AbortController | null>(null)
  const fallbackHref = buildContactMailto(site.contact.email, form)

  useEffect(() => () => request.current?.abort(), [])

  function update(field: keyof ContactPayload) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }))
      if (field !== 'website') setErrors((current) => ({ ...current, [field]: undefined }))
      if (state !== 'submitting') {
        setState('idle')
        setFeedback('')
      }
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'submitting') return

    if (form.website.trim()) {
      setState('blocked')
      setFeedback('Não foi possível processar este envio. Atualize a página e tente novamente.')
      return
    }

    const nextErrors = validateContact(form)
    setErrors(nextErrors)
    const firstInvalid = (Object.keys(nextErrors) as ContactField[])[0]
    if (firstInvalid) {
      document.getElementById(`${id}-${firstInvalid}`)?.focus()
      setState('error')
      setFeedback('Revise os campos indicados antes de continuar.')
      return
    }

    const payload = normalizeContactPayload(form)
    if (!site.contact.endpoint) {
      const mailto = buildContactMailto(site.contact.email, payload)
      setState('fallback')
      setFeedback('Seu aplicativo de e-mail foi aberto. Revise a mensagem e confirme o envio por lá.')
      window.location.assign(mailto)
      return
    }

    request.current?.abort()
    request.current = new AbortController()
    setState('submitting')
    setFeedback('Enviando pelo canal configurado…')

    try {
      await submitContactRequest(site.contact.endpoint, payload, { signal: request.current.signal })
      setState('success')
      setFeedback('O canal configurado recebeu sua solicitação.')
      setForm(emptyForm)
    } catch (error) {
      if (error instanceof ContactRequestError && error.code === 'cancelled') return
      setState('error')
      setFeedback(error instanceof ContactRequestError && error.code === 'timeout'
        ? 'O envio excedeu o tempo limite. Você pode usar o e-mail como alternativa.'
        : 'O canal direto não respondeu. Seus dados permanecem no formulário e o e-mail continua disponível.')
    } finally {
      request.current = null
    }
  }

  const fieldClass = 'mt-2 min-h-11 w-full rounded-xl border border-line bg-black/25 px-4 py-3 text-sm text-cream placeholder:text-cream/25 focus:border-cream/45 focus:outline-none'

  return (
    <form
      action={site.contact.mailto}
      method="post"
      encType="text/plain"
      onSubmit={onSubmit}
      noValidate
      className="mt-12 border-t border-line pt-10"
      aria-describedby={`${id}-privacy ${id}-feedback`}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Nome" id={`${id}-name`} error={errors.name}>
          <input id={`${id}-name`} name="name" value={form.name} onChange={update('name')} autoComplete="name" maxLength={CONTACT_LIMITS.name} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? `${id}-name-error` : undefined} className={fieldClass} />
        </Field>
        <Field label="E-mail" id={`${id}-email`} error={errors.email}>
          <input id={`${id}-email`} name="email" type="email" value={form.email} onChange={update('email')} autoComplete="email" maxLength={CONTACT_LIMITS.email} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? `${id}-email-error` : undefined} className={fieldClass} />
        </Field>
        <div className="md:col-span-2">
          <Field label="Assunto" id={`${id}-subject`} error={errors.subject}>
            <input id={`${id}-subject`} name="subject" value={form.subject} onChange={update('subject')} maxLength={CONTACT_LIMITS.subject} aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? `${id}-subject-error` : undefined} className={fieldClass} />
          </Field>
        </div>
        <div className="md:col-span-2">
          <Field label="Mensagem" id={`${id}-message`} error={errors.message}>
            <textarea id={`${id}-message`} name="message" value={form.message} onChange={update('message')} maxLength={CONTACT_LIMITS.message} rows={6} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? `${id}-message-error` : undefined} className={`${fieldClass} resize-y`} />
          </Field>
          <p className="mt-2 text-right text-[11px] text-cream/35">{form.message.length} / {CONTACT_LIMITS.message}</p>
        </div>
      </div>

      <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Não preencha este campo</label>
        <input id={`${id}-website`} name="website" value={form.website} onChange={update('website')} tabIndex={-1} autoComplete="off" />
      </div>

      <p id={`${id}-privacy`} className="mt-5 max-w-2xl text-xs leading-relaxed text-cream/40">
        Os dados são usados somente para responder ao contato. {site.contact.endpoint
          ? 'O envio direto usa apenas o endpoint público configurado, sem segredos no navegador.'
          : 'Como não há endpoint configurado, o formulário abre seu aplicativo de e-mail e não declara a mensagem como enviada.'}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={state === 'submitting'} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-cream px-5 text-sm font-bold text-ink transition-opacity disabled:cursor-wait disabled:opacity-55">
          <PaperPlaneTilt size={16} aria-hidden="true" />
          {state === 'submitting' ? 'Enviando…' : site.contact.endpoint ? 'Enviar mensagem' : 'Continuar por e-mail'}
        </button>
        <a href={fallbackHref} className="inline-flex min-h-11 items-center text-sm text-cream/60 underline decoration-cream/25 underline-offset-4 hover:text-cream">
          Abrir e-mail preenchido
        </a>
      </div>

      <p id={`${id}-feedback`} role={state === 'error' || state === 'blocked' ? 'alert' : 'status'} aria-live="polite" className="mt-5 min-h-5 text-sm text-cream/65">
        {feedback}
      </p>
    </form>
  )
}

function Field({ label, id, error, children }: { label: string; id: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-xs font-bold uppercase tracking-[0.16em] text-cream/60">{label}</label>
      {children}
      {error && <p id={`${id}-error`} className="mt-2 text-xs text-[#f0aaa0]">{error}</p>}
    </div>
  )
}
