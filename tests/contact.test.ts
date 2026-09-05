import test from 'node:test'
import assert from 'node:assert/strict'
import {
  ContactRequestError,
  buildContactMailto,
  submitContactRequest,
  validateContact,
  type ContactPayload,
} from '../src/lib/contact.ts'

const valid: ContactPayload = {
  name: 'Gabriel Teste',
  email: 'gabriel@example.com',
  subject: 'Projeto digital',
  message: 'Quero conversar sobre um projeto digital real.',
  website: '',
}

test('contact validation rejects incomplete data and accepts a valid payload', () => {
  const errors = validateContact({ name: '', email: 'invalido', subject: '', message: 'curta', website: '' })
  assert.deepEqual(Object.keys(errors).sort(), ['email', 'message', 'name', 'subject'])
  assert.deepEqual(validateContact(valid), {})
})

test('mailto fallback keeps the provided fields without claiming delivery', () => {
  const mailto = buildContactMailto('destino@example.com', valid)
  assert.match(mailto, /^mailto:destino@example\.com\?/)
  const parsed = new URL(mailto)
  assert.equal(parsed.searchParams.get('subject'), 'Projeto digital')
  assert.match(parsed.searchParams.get('body') ?? '', /Gabriel Teste/)
})

test('configured endpoint accepts an HTTP success response', async () => {
  const fetcher = async () => new Response(JSON.stringify({ ok: true }), { status: 200 })
  assert.deepEqual(await submitContactRequest('/api/contact', valid, { fetcher: fetcher as typeof fetch }), { accepted: true })
})

test('configured endpoint reports network failures', async () => {
  const fetcher = async () => { throw new TypeError('offline') }
  await assert.rejects(
    submitContactRequest('/api/contact', valid, { fetcher: fetcher as typeof fetch }),
    (error: unknown) => error instanceof ContactRequestError && error.code === 'network',
  )
})

test('configured endpoint receives only the known contact fields, with no extra keys', async () => {
  let sentBody: unknown = null
  const fetcher = async (_input: RequestInfo | URL, init?: RequestInit) => {
    sentBody = JSON.parse(String(init?.body ?? '{}'))
    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  }
  await submitContactRequest('/api/contact', valid, { fetcher: fetcher as typeof fetch })
  assert.deepEqual(Object.keys(sentBody as object).sort(), ['email', 'message', 'name', 'subject', 'website'])
  assert.equal((sentBody as ContactPayload).subject, valid.subject)
  assert.equal((sentBody as ContactPayload).message, valid.message)
  assert.equal((sentBody as ContactPayload).email, valid.email)
  assert.equal((sentBody as ContactPayload).website, '')
})

test('configured endpoint aborts after the timeout', async () => {
  const fetcher = (_input: RequestInfo | URL, init?: RequestInit) => new Promise<Response>((_resolve, reject) => {
    init?.signal?.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')), { once: true })
  })
  await assert.rejects(
    submitContactRequest('/api/contact', valid, { timeoutMs: 5, fetcher: fetcher as typeof fetch }),
    (error: unknown) => error instanceof ContactRequestError && error.code === 'timeout',
  )
})
