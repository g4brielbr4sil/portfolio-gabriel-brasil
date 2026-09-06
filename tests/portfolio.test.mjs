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

test('reference-driven hero keeps factual positioning without legacy status chips', async () => {
  const hero = await source('src/components/Hero.tsx')
  const approvedCopy =
    'Sou Gabriel Brasil, Desenvolvedor Full Stack e Analista de Sistemas em Brasília, DF. Desenvolvo soluções digitais de ponta a ponta, conectando interfaces, APIs, dados, automações e integrações para transformar problemas reais em sistemas funcionais, bem estruturados e confiáveis.'
  assert.ok(hero.includes('OLÁ'))
  assert.match(hero, /hero-display/)
  assert.match(hero, /opacity: \[1, 1, 0, 0, 1\]/)
  assert.ok(hero.includes(approvedCopy))
  assert.match(hero, /min-h-\[100svh\]/)
  assert.equal(hero.includes('Aberto a novos desafios'), false)
  assert.equal(hero.includes('asterisk'), false)
  assert.equal(hero.includes('Ecossistema em construção'), false)
  assert.equal(hero.includes('Stack aplicada'), false)
})

test('resume CTAs point to the published real PDF and retain an absent-file fallback', async () => {
  const site = await source('src/config/site.ts')
  await access(new URL('../public/curriculo-gabriel-brasil.pdf', import.meta.url))
  assert.match(site, /path:\s*'\/curriculo-gabriel-brasil\.pdf'/)
  assert.match(site, /return available \? site\.resume\.path : null/)
})

test('public contact matches the professional profile address', async () => {
  const site = await source('src/config/site.ts')
  assert.match(site, /g4brielbr4sil@gmail\.com/)
  assert.equal(site.includes('contato.barthywebstudio@gmail.com'), false)
})

test('real project links have one configuration source', async () => {
  const site = await source('src/config/site.ts')
  const portfolio = await source('src/content/portfolio.ts')
  assert.match(site, /barthy-web-studio-v2/)
  assert.match(site, /www\.pnqc\.com\.br/)
  assert.equal(site.includes('levens-qualifica-pnqc.pages.dev'), false)
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
    "pagePath: '/projetos/radar-df/'",
  ]) {
    assert.match(`${routes}\n${await source('src/content/portfolio.ts')}`, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
  }
  assert.match(main, /import\('@\/pages\/HomePage'\)/)
  assert.match(main, /import\('@\/pages\/ProjectPage'\)/)
  assert.match(main, /prerenderedRoute === route\.path/)
  assert.match(main, /applyFallbackMetadata\(route\)/)
  assert.match(await source('scripts/prerender.mjs'), /data-route-path/)
})

test('Hermes project page uses sanitized real screenshots, not the raw captures', async () => {
  const projectPage = await source('src/pages/ProjectPage.tsx')
  const portfolio = await source('src/content/portfolio.ts')
  const previews = await source('src/content/projectPreviews.ts')
  assert.match(projectPage, /ProjectGallery/)
  assert.equal(projectPage.includes('Nenhuma captura real'), false)
  assert.match(portfolio, /slug: 'hermes-command-center'/)
  assert.match(portfolio, /previewThemes: hermesPreviews/)
  assert.match(previews, /export const hermesPreviews/)
  assert.match(previews, /hermes-command-center\.avif/)
  assert.match(previews, /dados demonstrativos/)
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
  assert.match(previews, /export const radarPreviews[\s\S]*default: 'dark'/)
  assert.match(previews, /export const modularPreviews[\s\S]*default: 'light'/)
  assert.match(previews, /radar-df-matching-dashboard/)
  assert.match(previews, /sistema-modular-atendimentos/)
})

test('Barthy opens in the light preview while PNQC remains dark-only', async () => {
  const theme = await source('src/components/projects/usePreviewTheme.ts')
  const frame = await source('src/components/projects/ProjectPreviewFrame.tsx')
  assert.match(theme, /canToggle \? 'light'/)
  assert.match(frame, /image\.theme === 'light'/)
})

test('education and experience follow the two-column timeline gate', async () => {
  const journey = await source('src/components/EducationExperience.tsx')
  const portfolio = await source('src/content/portfolio.ts')
  assert.match(journey, /md:grid-cols-2/)
  assert.match(journey, /border-l/)
  assert.match(journey, /Formação/)
  assert.match(journey, /Experiência/)
  assert.match(portfolio, /English for IT B2 \/ GSE 59-75/)
  assert.match(portfolio, /English for IT 1/)
  assert.match(portfolio, /Mestre em Engenharia de Prompt e Colaboração com IA/)
  assert.match(portfolio, /Arquiteto de IA e Responsabilidade Digital/)
  assert.match(portfolio, /Desenvolvedor Júnior/)
  assert.match(portfolio, /meta: 'mar\. 2026 a ago\. 2026'/)
  assert.match(portfolio, /Acclivity/)
  assert.equal(portfolio.includes('Expirou em ago. de 2026'), false)
  assert.equal(portfolio.includes('Cisco IT Essentials 1 e 2'), false)
  assert.equal(portfolio.includes('Conclusão prevista para dezembro de 2027'), false)
  assert.equal(journey.includes('rounded-[1.5rem]'), false)
})

test('experience timeline restores "Hello, World!" as the third entry, framed as a personal first line of code, not a job', async () => {
  const portfolio = await source('src/content/portfolio.ts')
  const experienceBlockMatch = portfolio.match(/export const experience = \[([\s\S]*?)\n\]/)
  assert.ok(experienceBlockMatch, 'experience array not found')
  const experienceBlock = experienceBlockMatch[1]

  const acclivityIndex = experienceBlock.indexOf("organization: 'Acclivity'")
  const helloWorldIndex = experienceBlock.indexOf("role: 'Hello, World!'")
  assert.ok(acclivityIndex > -1, 'Acclivity entry not found')
  assert.ok(helloWorldIndex > acclivityIndex, 'Hello, World! must come after Acclivity')

  const entries = experienceBlock.split(/\n  \{/).filter((chunk) => chunk.trim().length > 0)
  assert.equal(entries.length, 3)
  assert.match(entries[2], /role: 'Hello, World!'/)
  assert.match(entries[2], /organization: 'Minha primeira linha de código'/)
  assert.match(entries[2], /meta: '2022'/)
  assert.match(entries[2], /Primeiros passos em programação e início da minha trajetória em tecnologia\./)
  assert.equal(entries[2].includes('cargo'), false)

  assert.ok(portfolio.indexOf("role: 'Hello, World!'") < portfolio.indexOf('export const education'), 'Hello, World! must stay in experience, not education')
})

test('education and experience inline the date next to the institution instead of a separate column', async () => {
  const journey = await source('src/components/EducationExperience.tsx')
  assert.match(journey, /function yearOf/)
  assert.equal(journey.includes('justify-between'), false)
  assert.equal(/max-w-\[\d+px\][^`]*text-right/.test(journey), false)
  assert.match(journey, /entry\.org/)
  assert.match(journey, /entry\.dateLabel/)
  assert.match(journey, /entry\.body/)
})

test('home section order matches the desktop navigation sequence', async () => {
  const home = await source('src/pages/HomePage.tsx')
  assert.ok(home.indexOf('<EducationExperience />') < home.indexOf('<Stack />'))
  assert.ok(home.indexOf('<Stack />') < home.indexOf('<Projects />'))
  assert.ok(home.indexOf('<Projects />') < home.indexOf('<About />'))
  assert.equal(home.includes('<Skills />'), false)
})

test('home uses full viewport chapters on desktop without compressing the footer', async () => {
  const hero = await source('src/components/Hero.tsx')
  const journey = await source('src/components/EducationExperience.tsx')
  const stack = await source('src/components/Stack.tsx')
  const projects = await source('src/components/Projects.tsx')
  const about = await source('src/components/About.tsx')
  const footer = await source('src/components/Footer.tsx')
  const css = await source('src/index.css')

  assert.match(hero, /min-h-\[100svh\]/)
  for (const section of [journey, stack, projects, about]) {
    assert.match(section, /portfolio-chapter/)
  }
  assert.match(css, /\.portfolio-chapter[\s\S]*min-height: 100svh/)
  assert.match(css, /scroll-margin-top: 6rem/)
  assert.match(css, /max-width: 1520px/)
  assert.equal(footer.includes("-mt-[60px]"), false)
  assert.match(footer, /md:pb-8/)
})

test('tech stack follows the compact grouped composition from the video', async () => {
  const stack = await source('src/components/Stack.tsx')
  const groups = await source('src/components/icons/tech/stackGroups.ts')
  const icons = await source('src/components/icons/tech/TechIcons.tsx')
  const portfolio = await source('src/content/portfolio.ts')

  assert.match(stack, /stackGroups/)
  assert.match(stack, /flex flex-wrap/)
  assert.match(stack, /min-h-12/)
  assert.match(stack, />\s*Stack\s*</)
  assert.match(stack, /useReducedMotion/)
  assert.equal(stack.includes('StackTicker'), false)
  assert.equal(stack.includes('rounded-[1.5rem]'), false)
  for (const category of [
    'Front-end',
    'Interface & Motion',
    'Back-end & APIs',
    'Dados',
    'Infra & DevOps',
    'Ferramentas',
    'Ferramentas e Operação',
  ]) {
    assert.ok(groups.includes(category))
  }
  for (const technology of [
    'HTML5',
    'CSS3',
    'JavaScript',
    'TypeScript',
    'React',
    'Vite',
    'Tailwind CSS',
    'Material UI',
    'Motion',
    'React Hook Form',
    'Python',
    'FastAPI',
    'PHP',
    'APIs REST',
    'SQLite',
    'PostgreSQL',
    'Supabase',
    'SQL',
    'Docker',
    'Linux',
    'Cloudflare',
    'Railway',
    'AWS Lightsail',
    'n8n',
    'Git',
    'GitHub',
    'GitHub Copilot',
    'Figma',
    'Visual Studio Code',
    'Microsoft Office',
    'File Management',
    'Network Configuration',
    'Cable Management',
    'Data Entry',
  ]) {
    assert.ok(groups.includes(technology))
  }
  assert.equal(`${stack}${groups}${icons}${portfolio}`.includes('Google Calendar'), false)
  assert.equal(`${stack}${groups}${icons}${portfolio}`.includes('Gmail'), false)
  assert.equal(stack.includes('technologyMarks'), false)
  assert.match(icons, /SiReacthookform/)
  assert.match(icons, /SiPhp/)
  assert.match(icons, /viewBox="0 0 304 182"/)
  assert.match(icons, /VscVscode/)
  assert.match(icons, /FolderOpen/)
  assert.match(icons, /Network/)
  assert.match(icons, /PlugsConnected/)
  assert.match(icons, /Keyboard/)
})

test('projects follow the video grid, expansion and accessible modal structure', async () => {
  const projects = await source('src/components/Projects.tsx')
  const modal = await source('src/components/projects/ProjectCaseStudyDialog.tsx')
  const display = await source('src/content/displayProjects.ts')

  assert.match(projects, /md:grid-cols-2/)
  assert.match(projects, /AnimatePresence/)
  assert.match(projects, /gridTemplateRows/)
  assert.match(projects, /Ver todos os projetos/)
  assert.match(projects, /Mostrar menos/)
  assert.equal(projects.includes('ProjectActionLink'), false)
  assert.equal(projects.includes("const label = /repositório|código/i"), false)
  assert.match(modal, /y: 18, scale: 0\.975/)
  assert.match(modal, /min-\[1120px\]:grid-cols-\[minmax\(0,56fr\)_minmax\(0,44fr\)\]/)
  assert.match(modal, /rounded-\[20px\]/)
  assert.match(modal, /projectAccents/)
  assert.match(modal, /Case completo/)
  assert.match(modal, /object-contain/)
  assert.match(modal, /ProjectTechTicker/)
  assert.match(await source('src/components/projects/ProjectTechTicker.tsx'), /TechnologyIcon/)
  assert.match(await source('src/components/projects/TechnologyIcon.tsx'), /SiFastapi/)
  assert.match(display, /export \{ projects as displayProjects \} from '@\/content\/portfolio'/)
  const portfolio = await source('src/content/portfolio.ts')
  assert.match(portfolio, /slug: 'radar-df'[\s\S]*previewThemes: radarPreviews/)
  assert.match(portfolio, /slug: 'sistema-modular-barthy-flow'[\s\S]*previewThemes: modularPreviews/)
})

test('about follows the flat biography and hobbies composition from the video', async () => {
  const about = await source('src/components/About.tsx')

  assert.match(about, /Quem sou eu\?/)
  assert.match(about, /Hobbies/)
  assert.match(about, /Games/)
  assert.match(about, /Futebol/)
  assert.match(about, /Codar/)
  assert.match(about, /Corrida/)
  assert.match(about, /Música/)
  assert.match(about, /instalava\s+Windows/)
  assert.equal(about.includes('inteligência artificial aplicada'), false)
  assert.equal((about.match(/<p>/g) ?? []).length, 3)
  assert.match(about, /portfolio-container-narrow/)
  assert.match(about, /useReducedMotion/)
  assert.match(about, /brasiliense/)
  assert.equal(about.includes('rounded-[1.75rem]'), false)
  assert.equal(about.includes('ScrollRevealText'), false)
})

test('home closes with the reference footer while the contact route retains the form', async () => {
  const home = await source('src/pages/HomePage.tsx')
  const footer = await source('src/components/Footer.tsx')
  const contact = await source('src/components/Contact.tsx')
  const contactPage = await source('src/pages/ContactPage.tsx')

  assert.match(home, /<Footer \/>/)
  assert.equal(home.includes('<Contact />'), false)
  assert.match(footer, /Links rápidos/)
  assert.match(footer, /Vamos conversar/)
  assert.match(footer, /contact\.github/)
  assert.match(footer, /contact\.linkedin/)
  assert.match(footer, /contact\.mailto/)
  assert.match(footer, /useReducedMotion/)
  assert.match(footer, /BrandDots/)
  assert.match(contact, /<ContactForm \/>/)
  assert.match(contactPage, /<Contact showFooter=\{false\} \/>/)
})

test('professional positioning stays consistent as Full Stack Developer and Systems Analyst', async () => {
  const site = await source('src/config/site.ts')
  const routes = await source('src/config/routes.ts')
  const metadata = await source('src/seo/metadata.ts')
  const manifest = await source('public/site.webmanifest')
  const prerender = await source('scripts/prerender.mjs')
  const contact = await source('src/components/Contact.tsx')
  const hero = await source('src/components/Hero.tsx')
  const footer = await source('src/components/Footer.tsx')

  for (const file of [site, routes, metadata, manifest, prerender, contact]) {
    assert.match(file, /Desenvolvedor Full Stack e Analista de Sistemas/)
    assert.equal(file.includes('Analista de Sistemas e Desenvolvedor'), false)
  }
  assert.match(hero, /Desenvolvedor Full Stack e Analista de Sistemas/)
  assert.match(footer, /Desenvolvedor Full Stack e Analista de Sistemas/)
})

test('legacy Barthy Web Studio V1 public CTA stays removed', async () => {
  const files = await Promise.all([
    'src/config/site.ts',
    'src/content/portfolio.ts',
    'src/content/displayProjects.ts',
    'src/components/Projects.tsx',
    'src/components/projects/ProjectCaseStudyDialog.tsx',
  ].map(source))
  const combined = files.join('\n')
  assert.equal(combined.includes('Abrir versão pública V1'), false)
  assert.equal(/barthy-web-studio\.pages\.dev/.test(combined), false)
})

test('Sistema Modular / Barthy Flow is the single source of truth with no legacy SaaS de Suporte identity or invented route', async () => {
  const portfolio = await source('src/content/portfolio.ts')
  const display = await source('src/content/displayProjects.ts')
  const routes = await source('src/config/routes.ts')

  assert.equal(portfolio.includes('SaaS de Suporte'), false)
  assert.equal(display.includes('SaaS de Suporte'), false)
  assert.equal(/slug:\s*'saas-de-suporte'/.test(portfolio), false)
  assert.equal(/slug:\s*'saas-de-suporte'/.test(display), false)

  assert.match(portfolio, /name: 'Sistema Modular \/ Barthy Flow'/)
  assert.match(portfolio, /slug: 'sistema-modular-barthy-flow'/)

  assert.equal(/pagePath:\s*'\/projetos\/sistema-modular-barthy-flow\//.test(portfolio), false)
  assert.equal(/sistema-modular-barthy-flow/.test(routes), false)
})

test('public URL configuration rejects localhost targets', async () => {
  const site = await source('src/config/site.ts')
  assert.match(site, /\['localhost', '127\.0\.0\.1', '::1'\]/)
})

test('validation product remains explicit about its modular and non-final state', async () => {
  const editorial = await source('src/content/portfolio.ts')
  assert.match(editorial, /Sistema Modular \/ Barthy Flow/)
  for (const term of ['Módulo Oficina', 'Atendimentos e histórico operacional', 'WhatsApp contextual', 'Geração de orçamento']) {
    assert.match(editorial, new RegExp(term))
  }
  assert.match(editorial, /sem aplicação pública/)
})

test('carousel and dialog retain motion and focus safeguards', async () => {
  const carousel = await source('src/hooks/useProjectCarousel.ts')
  const carouselView = await source('src/components/projects/ProjectCardCarousel.tsx')
  const dialog = await source('src/components/projects/ProjectCaseStudyDialog.tsx')
  const projects = await source('src/components/Projects.tsx')
  const ticker = await source('src/components/stack/StackTicker.tsx')
  const reveal = await source('src/components/motion/Reveal.tsx')
  assert.match(carousel, /visibilitychange/)
  assert.match(carousel, /IntersectionObserver/)
  assert.match(carousel, /reducedMotion/)
  assert.match(carousel, /onFocusCapture/)
  assert.match(carouselView, /hidden items-center sm:flex/)
  assert.match(carouselView, /inline-flex h-11 w-11/)
  assert.doesNotMatch(dialog, /returnFocusRef/)
  assert.match(projects, /target\.focus\(\{ preventScroll: true \}\)/)
  assert.match(ticker, /motion-reduce:flex/)
  assert.match(ticker, /motion-reduce:hidden/)
  assert.match(reveal, /motion-reduce:!opacity-100/)
})

test('external links opened in a new tab use noopener and noreferrer', async () => {
  const files = [
    'src/components/Projects.tsx',
    'src/components/projects/ProjectCaseStudyDialog.tsx',
    'src/components/Hero.tsx',
    'src/components/ui/Button.tsx',
    'src/components/layout/PageLayout.tsx',
    'src/pages/ProjectPage.tsx',
  ]
  const combined = (await Promise.all(files.map(source))).join('\n')
  assert.equal(combined.includes("? 'noreferrer'"), false)
  assert.match(combined, /noopener noreferrer/)
})

test('canonical SEO configuration points to the official gabrielbrasil.dev domain', async () => {
  const site = await source('src/config/site.ts')
  const metadata = await source('src/seo/metadata.ts')
  const prerender = await source('scripts/prerender.mjs')
  const routes = await source('src/config/routes.ts')

  assert.match(site, /const canonicalUrl = 'https:\/\/gabrielbrasil\.dev\/'/)
  assert.equal(site.includes('portfolio-gabriel-brasil.pages.dev'), false)
  assert.equal(site.includes('futureDomain'), false)

  assert.match(metadata, /absoluteUrl\(route\.path\)/)
  assert.match(metadata, /route\.indexable \? 'index, follow/)
  assert.match(metadata, /'noindex, nofollow'/)
  assert.match(metadata, /twitter:card/)

  assert.match(prerender, /data\.site\.canonicalUrl/)
  assert.match(prerender, /sitemap\.xml/)
  assert.match(prerender, /robots\.txt/)
  assert.match(prerender, /llms\.txt/)
  assert.match(prerender, /llms-full\.txt/)
  assert.match(prerender, /Sitemap: \$\{new URL\('sitemap\.xml', data\.site\.canonicalUrl\)\}/)

  assert.match(routes, /indexable: false/)
  assert.equal(routes.match(/indexable: false/g)?.length, 1)
})

test('CI workflow pins third-party actions by commit SHA, not a mutable tag', async () => {
  const ci = await source('.github/workflows/ci.yml')
  const usesLines = [...ci.matchAll(/^\s*uses:\s*(\S+)/gm)].map((match) => match[1])
  assert.ok(usesLines.length > 0)
  for (const usesLine of usesLines) {
    assert.match(usesLine, /@[0-9a-f]{40}$/, `${usesLine} não está fixado por SHA de commit`)
  }
  assert.match(ci, /permissions:\s*\n\s*contents: read/)
})

test('ProfilePage JSON-LD links the Person as mainEntity instead of a generic about reference', async () => {
  const metadata = await source('src/seo/metadata.ts')
  assert.match(metadata, /route\.kind === 'about'[\s\S]{0,80}mainEntity: \{ '@id': `\$\{site\.canonicalUrl\}#gabriel-brasil` \}/)
  assert.match(metadata, /about: \{ '@id': `\$\{site\.canonicalUrl\}#gabriel-brasil` \}/)
})

test('project gallery thumbnail strip stays contained on narrow viewports', async () => {
  const gallery = await source('src/components/projects/ProjectGallery.tsx')
  const projectPage = await source('src/pages/ProjectPage.tsx')

  assert.match(gallery, /flex h-full min-w-0 flex-col/)
  assert.match(gallery, /flex min-w-0 snap-x gap-2 overflow-x-auto/)
  assert.match(projectPage, /className="min-w-0">\{project\.previewThemes/)
})
