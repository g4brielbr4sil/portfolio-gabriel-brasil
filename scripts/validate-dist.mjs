import assert from 'node:assert/strict'
import { readdir, readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { gunzipSync, gzipSync } from 'node:zlib'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const dist = path.join(root, 'dist')
const { buildData } = await import(pathToFileURL(path.join(root, '.prerender', 'entry-server.js')).href)
const data = buildData()
const titles = new Set()
const descriptions = new Set()
const canonicals = new Set()

function routeFile(routePath) {
  return routePath === '/' ? path.join(dist, 'index.html') : path.join(dist, ...routePath.split('/').filter(Boolean), 'index.html')
}

function capture(html, pattern, label, routePath) {
  const match = html.match(pattern)
  assert.ok(match?.[1], `${label} ausente em ${routePath}`)
  return match[1]
}

for (const route of data.routes) {
  const html = await readFile(routeFile(route.path), 'utf8')
  assert.match(html, /data-prerendered="true"/, `HTML não prerenderizado em ${route.path}`)
  assert.ok(html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().length > 300, `Conteúdo textual insuficiente em ${route.path}`)
  const title = capture(html, /<title>([^<]+)<\/title>/, 'title', route.path)
  const description = capture(html, /<meta name="description" content="([^"]+)"/, 'description', route.path)
  const canonical = capture(html, /<link rel="canonical" href="([^"]+)"/, 'canonical', route.path)
  assert.equal(titles.has(title), false, `Título duplicado: ${title}`)
  assert.equal(descriptions.has(description), false, `Descrição duplicada: ${description}`)
  assert.equal(canonicals.has(canonical), false, `Canonical duplicado: ${canonical}`)
  titles.add(title)
  descriptions.add(description)
  canonicals.add(canonical)
  assert.match(html, /property="og:title"/)
  assert.match(html, /name="twitter:card"/)
  assert.match(html, /application\/ld\+json/)
}

const notFound = await readFile(path.join(dist, '404.html'), 'utf8')
assert.match(notFound, /noindex, nofollow/)
assert.match(notFound, /Página não encontrada/)

const sitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8')
for (const route of data.routes.filter((item) => item.indexable)) {
  assert.match(sitemap, new RegExp(new URL(route.path.replace(/^\//, ''), data.site.canonicalUrl).toString().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
}
assert.equal(sitemap.includes('/404/'), false)

const robots = await readFile(path.join(dist, 'robots.txt'), 'utf8')
assert.match(robots, /User-agent: OAI-SearchBot\s+Allow: \//)
assert.match(robots, /Sitemap:/)
for (const file of ['llms.txt', 'llms-full.txt', 'favicon.svg', 'og-image.svg', 'curriculo-gabriel-brasil.pdf', '_headers', '_redirects']) {
  assert.ok((await stat(path.join(dist, file))).isFile(), `Arquivo público ausente: ${file}`)
}

const assetNames = await readdir(path.join(dist, 'assets'))
const jsAssets = assetNames.filter((name) => name.endsWith('.js'))
let totalGzip = 0
let largestGzip = 0
for (const name of jsAssets) {
  const source = await readFile(path.join(dist, 'assets', name))
  const size = gzipSync(source).length
  totalGzip += size
  largestGzip = Math.max(largestGzip, size)
}
assert.ok(largestGzip <= 180 * 1024, `Maior chunk excede 180 KiB gzip: ${largestGzip}`)
assert.ok(totalGzip <= 300 * 1024, `JavaScript total excede 300 KiB gzip: ${totalGzip}`)

console.log(`Validação estática concluída: ${data.routes.length} rotas, ${jsAssets.length} chunks, ${Math.round(totalGzip / 1024)} KiB gzip de JavaScript.`)
