import { renderToString } from 'react-dom/server'
import App from './App'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import ProjectsPage from '@/pages/ProjectsPage'
import ProjectPage from '@/pages/ProjectPage'
import ContactPage from '@/pages/ContactPage'
import NotFoundPage from '@/pages/NotFoundPage'
import { matchRoute, publicRoutes, notFoundRoute, type PortfolioRoute } from '@/config/routes'
import { renderMetadata } from '@/seo/metadata'
import { projects } from '@/content/portfolio'
import { site } from '@/config/site'

function pageFor(route: PortfolioRoute) {
  switch (route.kind) {
    case 'home': return <HomePage />
    case 'about': return <AboutPage />
    case 'projects': return <ProjectsPage />
    case 'project': return <ProjectPage route={route} />
    case 'contact': return <ContactPage />
    default: return <NotFoundPage />
  }
}

export function render(pathname: string) {
  const route = matchRoute(pathname)
  return {
    route,
    appHtml: renderToString(<App>{pageFor(route)}</App>),
    headHtml: renderMetadata(route),
  }
}

export function buildData() {
  return {
    routes: publicRoutes,
    notFoundRoute,
    site,
    projects: projects.map((project) => ({
      name: project.name,
      slug: project.slug,
      pagePath: project.pagePath,
      description: project.description,
      status: project.caseStudy.status,
      category: project.caseStudy.category,
      role: project.caseStudy.role,
      stack: project.caseStudy.stackMain,
      links: project.caseStudy.links,
      privacy: project.slug === 'hermes-command-center'
        ? 'Sem capturas reais para preservar dados pessoais e operacionais.'
        : 'Somente capturas reais selecionadas para o portfólio.',
    })),
  }
}
