import { execFileSync } from 'node:child_process'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const dist = path.join(root, 'dist')
const serverEntry = path.join(root, '.prerender', 'entry-server.js')
const { render, buildData } = await import(pathToFileURL(serverEntry).href)
const data = buildData()
const template = await readFile(path.join(dist, 'index.html'), 'utf8')

if (!template.includes('<!--app-head-->') || !template.includes('<div id="root"></div>')) {
  throw new Error('O template HTML não contém os pontos de prerender esperados.')
}

function outputPath(routePath) {
  if (routePath === '/') return path.join(dist, 'index.html')
  return path.join(dist, ...routePath.split('/').filter(Boolean), 'index.html')
}

async function writeRoute(route) {
  const result = render(route.path)
  const html = template
    .replace('<!--app-head-->', result.headHtml)
    .replace('<div id="root"></div>', `<div id="root" data-prerendered="true">${result.appHtml}</div>`)
  const destination = outputPath(route.path)
  await mkdir(path.dirname(destination), { recursive: true })
  await writeFile(destination, html)
}

for (const route of data.routes) await writeRoute(route)

const notFound = render(data.notFoundRoute.path)
const notFoundHtml = template
  .replace('<!--app-head-->', notFound.headHtml)
  .replace('<div id="root"></div>', `<div id="root" data-prerendered="true">${notFound.appHtml}</div>`)
await writeFile(path.join(dist, '404.html'), notFoundHtml)

let lastModified = null
try {
  const dirty = execFileSync('git', ['status', '--porcelain', '--untracked-files=no'], { encoding: 'utf8' }).trim()
  if (!dirty) {
    lastModified = execFileSync('git', ['show', '-s', '--format=%cI', 'HEAD'], { encoding: 'utf8' }).trim().slice(0, 10)
  }
} catch {
  lastModified = null
}

const sitemapEntries = data.routes
  .filter((route) => route.indexable)
  .map((route) => `  <url>\n    <loc>${new URL(route.path.replace(/^\//, ''), data.site.canonicalUrl)}</loc>${lastModified ? `\n    <lastmod>${lastModified}</lastmod>` : ''}\n  </url>`)
  .join('\n')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`
await writeFile(path.join(dist, 'sitemap.xml'), sitemap)

const robots = `User-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap.xml', data.site.canonicalUrl)}\n`
await writeFile(path.join(dist, 'robots.txt'), robots)

const projectLines = data.projects
  .filter((project) => project.pagePath)
  .map((project) => `- [${project.name}](${new URL(project.pagePath.replace(/^\//, ''), data.site.canonicalUrl)}): ${project.status}`)
  .join('\n')
const llms = `# Gabriel Brasil\n\nAnalista de Sistemas e Desenvolvedor em ${data.site.location.full}.\n\n## Áreas de atuação\n\n- Análise de sistemas\n- Desenvolvimento Full Stack\n- APIs e integrações\n- Automações\n- Implantação e evolução de produtos digitais\n\n## Páginas canônicas\n\n- [Início](${data.site.canonicalUrl})\n- [Sobre](${new URL('sobre/', data.site.canonicalUrl)})\n- [Projetos](${new URL('projetos/', data.site.canonicalUrl)})\n- [Contato](${new URL('contato/', data.site.canonicalUrl)})\n\n## Projetos públicos\n\n${projectLines}\n\n## Contato\n\n- E-mail: ${data.site.contact.email}\n- LinkedIn: ${data.site.urls.linkedin}\n- GitHub: ${data.site.urls.github}\n\n## Privacidade das capturas\n\nBarthy Web Studio V2 e PNQC usam somente capturas reais selecionadas. O Hermes Command Center não publica capturas reais ou dados operacionais nesta rodada.\n`
await writeFile(path.join(dist, 'llms.txt'), llms)

const fullProjects = data.projects
  .filter((project) => project.pagePath)
  .map((project) => `## ${project.name}\n\n- Página: ${new URL(project.pagePath.replace(/^\//, ''), data.site.canonicalUrl)}\n- Categoria: ${project.category}\n- Estado: ${project.status}\n- Descrição: ${project.description}\n- Minha atuação: ${project.role}\n- Stack principal: ${project.stack.join(', ')}\n- Privacidade: ${project.privacy}`)
  .join('\n\n')
await writeFile(path.join(dist, 'llms-full.txt'), `${llms}\n# Detalhes dos projetos\n\n${fullProjects}\n`)

const indexNowKey = process.env.INDEXNOW_KEY?.trim()
if (indexNowKey) {
  if (!/^[a-zA-Z0-9-]{8,128}$/.test(indexNowKey)) {
    throw new Error('INDEXNOW_KEY possui formato inválido.')
  }
  await writeFile(path.join(dist, `${indexNowKey}.txt`), indexNowKey)
}

const headersPath = path.join(dist, '_headers')
let headers = await readFile(headersPath, 'utf8')
if (data.site.contact.endpoint?.startsWith('http')) {
  const endpointOrigin = new URL(data.site.contact.endpoint).origin
  headers = headers.replace("connect-src 'self'", `connect-src 'self' ${endpointOrigin}`)
}
await writeFile(headersPath, headers)

console.log(`Prerender concluído: ${data.routes.length} rotas indexáveis ou públicas e página 404.`)
