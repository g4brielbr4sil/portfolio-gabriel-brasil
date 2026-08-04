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

test('production metadata and Cloudflare controls are generated from route data', async () => {
  const metadata = await source('src/seo/metadata.ts')
  const headers = await source('public/_headers')
  const prerender = await source('scripts/prerender.mjs')

  assert.match(metadata, /rel=\"canonical\"/)
  assert.match(metadata, /property=\"og:image\"/)
  assert.match(metadata, /BreadcrumbList/)
  assert.match(headers, /Content-Security-Policy/)
  assert.match(prerender, /User-agent: OAI-SearchBot/)
  assert.match(prerender, /llms\.txt/)
  assert.match(prerender, /sitemap\.xml/)
})

test('all required public routes are declared and dynamically loaded', async () => {
  const routes = await source('src/config/routes.ts')
  const main = await source('src/main.tsx')
  for (const path of [
    "path: '/'",
    "path: '/sobre/'",
    "path: '/projetos/'",
    "path: '/contato/'",
    "pagePath: '/projetos/barthy-web-studio-v2/'",
    "pagePath: '/projetos/pnqc/'",
    "pagePath: '/projetos/hermes-command-center/'",
  ]) {
    assert.match(`${routes}\n${await source('src/content/portfolio.ts')}`, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
  }
  assert.match(main, /import\('@\/pages\/HomePage'\)/)
  assert.match(main, /import\('@\/pages\/ProjectPage'\)/)
})

test('Hermes project page keeps screenshots private', async () => {
  const projectPage = await source('src/pages/ProjectPage.tsx')
  const portfolio = await source('src/content/portfolio.ts')
  assert.match(projectPage, /Nenhuma captura real/)
  assert.match(portfolio, /slug: 'hermes-command-center'/)
  assert.equal(portfolio.includes('hermes-screenshot'), false)
})

test('project previews use real AVIF and WebP assets with an error fallback', async () => {
  const picture = await source('src/components/projects/ResponsivePicture.tsx')
  const previews = await source('src/content/projectPreviews.ts')
  assert.match(picture, /type="image\/avif"/)
  assert.match(picture, /type="image\/webp"/)
  assert.match(picture, /onError/)
  assert.match(picture, /object-contain/)
  assert.match(previews, /export const barthyPreviews[\s\S]*dark:[\s\S]*light:/)
  assert.match(previews, /export const pnqcPreviews[\s\S]*dark:/)
  assert.doesNotMatch(previews.match(/export const pnqcPreviews[\s\S]*/)?.[0] ?? '', /light:/)
})

test('carousel and dialog retain motion and focus safeguards', async () => {
  const carousel = await source('src/hooks/useProjectCarousel.ts')
  const dialog = await source('src/components/projects/ProjectCaseStudyDialog.tsx')
  assert.match(carousel, /visibilitychange/)
  assert.match(carousel, /IntersectionObserver/)
  assert.match(carousel, /reducedMotion/)
  assert.match(carousel, /onFocusCapture/)
  assert.match(dialog, /returnFocusRef/)
  assert.match(dialog, /target\.focus\(\)/)
})

test('external links opened in a new tab use noopener and noreferrer', async () => {
  const files = [
    'src/components/Projects.tsx',
    'src/components/projects/ProjectCaseStudyDialog.tsx',
    'src/components/navigation/DesktopNavigation.tsx',
    'src/components/navigation/NavigationSheet.tsx',
    'src/components/ui/Button.tsx',
    'src/components/layout/PageLayout.tsx',
    'src/pages/ProjectPage.tsx',
  ]
  const combined = (await Promise.all(files.map(source))).join('\n')
  assert.equal(combined.includes("? 'noreferrer'"), false)
  assert.match(combined, /noopener noreferrer/)
})
