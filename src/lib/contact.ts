export const CONTACT_LIMITS = {
  name: 80,
  email: 254,
  subject: 120,
  message: 2000,
} as const

export type ContactPayload = {
  name: string
  email: string
  subject: string
  message: string
  website: string
}

export type ContactField = keyof Pick<ContactPayload, 'name' | 'email' | 'subject' | 'message'>
export type ContactErrors = Partial<Record<ContactField, string>>

export class ContactRequestError extends Error {
  readonly code: 'timeout' | 'cancelled' | 'network' | 'http'

  constructor(
    message: string,
    code: 'timeout' | 'cancelled' | 'network' | 'http',
  ) {
    super(message)
    this.name = 'ContactRequestError'
    this.code = code
  }
}

export function normalizeContactPayload(payload: ContactPayload): ContactPayload {
  return {
    name: payload.name.trim().replace(/\s+/g, ' '),
    email: payload.email.trim().toLowerCase(),
    subject: payload.subject.trim().replace(/\s+/g, ' '),
    message: payload.message.trim(),
    website: payload.website.trim(),
  }
}

export function validateContact(payload: ContactPayload): ContactErrors {
  const value = normalizeContactPayload(payload)
  const errors: ContactErrors = {}

  if (value.name.length < 2) errors.name = 'Informe seu nome com pelo menos 2 caracteres.'
  else if (value.name.length > CONTACT_LIMITS.name) errors.name = `Use no máximo ${CONTACT_LIMITS.name} caracteres.`

  if (!value.email) errors.email = 'Informe seu e-mail.'
  else if (value.email.length > CONTACT_LIMITS.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) errors.email = 'Informe um e-mail válido.'

  if (value.subject.length < 3) errors.subject = 'Informe um assunto com pelo menos 3 caracteres.'
  else if (value.subject.length > CONTACT_LIMITS.subject) errors.subject = `Use no máximo ${CONTACT_LIMITS.subject} caracteres.`

  if (value.message.length < 10) errors.message = 'Escreva uma mensagem com pelo menos 10 caracteres.'
  else if (value.message.length > CONTACT_LIMITS.message) errors.message = `Use no máximo ${CONTACT_LIMITS.message} caracteres.`

  return errors
}

export function buildContactMailto(recipient: string, payload: ContactPayload) {
  const value = normalizeContactPayload(payload)
  const query = new URLSearchParams({
    subject: value.subject,
    body: `Nome: ${value.name}\nE-mail: ${value.email}\n\n${value.message}`,
  })
  return `mailto:${recipient}?${query.toString()}`
}

export async function submitContactRequest(
  endpoint: string,
  payload: ContactPayload,
  options: { timeoutMs?: number; signal?: AbortSignal; fetcher?: typeof fetch } = {},
) {
  const timeoutMs = options.timeoutMs ?? 8000
  const fetcher = options.fetcher ?? fetch
  const controller = new AbortController()
  let timedOut = false

  const cancel = () => controller.abort()
  if (options.signal?.aborted) controller.abort()
  else options.signal?.addEventListener('abort', cancel, { once: true })

  const timeout = globalThis.setTimeout(() => {
    timedOut = true
    controller.abort()
  }, timeoutMs)

  try {
    const response = await fetcher(endpoint, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json; charset=utf-8',
      },
      credentials: 'omit',
      signal: controller.signal,
      body: JSON.stringify(normalizeContactPayload(payload)),
    })

    if (!response.ok) throw new ContactRequestError(`O canal respondeu HTTP ${response.status}.`, 'http')
    return { accepted: true as const }
  } catch (error) {
    if (error instanceof ContactRequestError) throw error
    if (timedOut) throw new ContactRequestError('O canal demorou mais que o limite de envio.', 'timeout')
    if (options.signal?.aborted) throw new ContactRequestError('O envio foi cancelado.', 'cancelled')
    throw new ContactRequestError('Não foi possível acessar o canal de contato.', 'network')
  } finally {
    globalThis.clearTimeout(timeout)
    options.signal?.removeEventListener('abort', cancel)
  }
}
