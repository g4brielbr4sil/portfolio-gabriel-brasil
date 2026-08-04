import test from 'node:test'
import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'

async function source(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8')
}

test('hero does not depend on a provisional third-party portrait', async () => {
  const hero = await source('src/components/Hero.tsx')
  assert.equal(hero.includes('images.unsplash.com'), false)
  assert.equal(hero.includes('imagem provisória'), false)
})

test('resume CTAs point to the published real PDF and retain an absent-file fallback', async () => {
  const site = await source('src/config/site.ts')
  await access(new URL('../public/curriculo-gabriel-brasil.pdf', import.meta.url))
  assert.match(site, /path:\s*'\/curriculo-gabriel-brasil\.pdf'/)
  assert.match(site, /return available \? site\.resume\.path : null/)
})

test('real project links have one configuration source', async () => {
  const site = await source('src/config/site.ts')
  const portfolio = await source('src/content/portfolio.ts')
  assert.match(site, /barthy-web-studio-v2/)
  assert.match(site, /levens-qualifica-pnqc\.pages\.dev/)
  assert.match(site, /hermes-agent-01l\.pages\.dev/)
  assert.equal(portfolio.includes('https://'), false)
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
