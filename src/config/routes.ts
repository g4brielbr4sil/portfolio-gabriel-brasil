import { projects } from '@/content/portfolio'

export type RouteKind = 'home' | 'about' | 'projects' | 'project' | 'contact' | 'not-found'

export type PortfolioRoute = {
  path: string
  kind: RouteKind
  title: string
  description: string
  indexable: boolean
  projectSlug?: string
}

const fixedRoutes: PortfolioRoute[] = [
  {
    path: '/',
    kind: 'home',
    title: 'Gabriel Brasil | Desenvolvedor Full Stack e Analista de Sistemas',
    description:
      'Portfólio de Gabriel Brasil, Desenvolvedor Full Stack e Analista de Sistemas em Brasília, DF. Projetos Full Stack com interfaces, APIs, dados, automações e integrações.',
    indexable: true,
  },
  {
    path: '/sobre/',
    kind: 'about',
    title: 'Sobre Gabriel Brasil | Análise de Sistemas e Desenvolvimento',
    description:
      'Conheça a atuação de Gabriel Brasil em análise de sistemas, desenvolvimento Full Stack, automações, integrações e evolução de produtos digitais.',
    indexable: true,
  },
  {
    path: '/projetos/',
    kind: 'projects',
    title: 'Projetos de Gabriel Brasil | Sistemas e Produtos Digitais',
    description:
      'Projetos reais de Gabriel Brasil com contexto, decisões técnicas, stack, estado atual e evidências públicas de implementação.',
    indexable: true,
  },
  {
    path: '/contato/',
    kind: 'contact',
    title: 'Contato | Gabriel Brasil',
    description:
      'Entre em contato com Gabriel Brasil para conversar sobre análise de sistemas, desenvolvimento, automações e produtos digitais.',
    indexable: true,
  },
]

const projectRoutes: PortfolioRoute[] = projects
  .filter((project) => project.pagePath)
  .map((project) => ({
    path: project.pagePath!,
    kind: 'project',
    title: `${project.name} | Projeto de Gabriel Brasil`,
    description: project.description,
    indexable: true,
    projectSlug: project.slug,
  }))

export const publicRoutes = [...fixedRoutes, ...projectRoutes]

export const notFoundRoute: PortfolioRoute = {
  path: '/404/',
  kind: 'not-found',
  title: 'Página não encontrada | Gabriel Brasil',
  description: 'A página solicitada não foi encontrada no portfólio de Gabriel Brasil.',
  indexable: false,
}

export function normalizePathname(pathname: string) {
  const clean = `/${pathname.split(/[?#]/, 1)[0].replace(/^\/+|\/+$/g, '')}`
  return clean === '/' ? '/' : `${clean}/`
}

export function matchRoute(pathname: string) {
  const normalized = normalizePathname(pathname)
  return publicRoutes.find((route) => route.path === normalized) ?? notFoundRoute
}

export function projectForRoute(route: PortfolioRoute) {
  return route.projectSlug ? projects.find((project) => project.slug === route.projectSlug) ?? null : null
}
