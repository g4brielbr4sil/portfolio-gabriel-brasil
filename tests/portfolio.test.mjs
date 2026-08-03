import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

async function source(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8')
}

test('hero does not depend on a provisional third-party portrait', async () => {
  const hero = await source('src/components/Hero.tsx')
  assert.equal(hero.includes('images.unsplash.com'), false)
  assert.equal(hero.includes('imagem provisória'), false)
})

test('resume CTAs remain hidden until a real PDF is published', async () => {
  const portfolio = await source('src/content/portfolio.ts')
  assert.match(portfolio, /resume:\s*null/)
})

test('real project links are present', async () => {
  const portfolio = await source('src/content/portfolio.ts')
  assert.match(portfolio, /barthy-web-studio-v2/)
  assert.match(portfolio, /levens-qualifica-pnqc\.pages\.dev/)
  assert.match(portfolio, /hermes-agent-01l\.pages\.dev/)
})

test('production metadata and Cloudflare controls exist', async () => {
  const html = await source('index.html')
  const headers = await source('public/_headers')
  const robots = await source('public/robots.txt')

  assert.match(html, /rel="canonical"/)
  assert.match(html, /property="og:image"/)
  assert.match(headers, /Content-Security-Policy/)
  assert.match(robots, /Allow: \//)
})
