import type { ComponentType } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import { matchRoute, type PortfolioRoute } from '@/config/routes'
import './index.css'

type PageModule = { default: ComponentType<{ route: PortfolioRoute }> }

async function loadPage(route: PortfolioRoute): Promise<PageModule> {
  switch (route.kind) {
    case 'home':
      return import('@/pages/HomePage') as Promise<PageModule>
    case 'about':
      return import('@/pages/AboutPage') as Promise<PageModule>
    case 'projects':
      return import('@/pages/ProjectsPage') as Promise<PageModule>
    case 'project':
      return import('@/pages/ProjectPage') as Promise<PageModule>
    case 'contact':
      return import('@/pages/ContactPage') as Promise<PageModule>
    default:
      return import('@/pages/NotFoundPage') as Promise<PageModule>
  }
}

function applyFallbackMetadata(route: PortfolioRoute) {
  document.title = route.title

  const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
  if (description) description.content = route.description

  const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
  if (robots) robots.content = route.indexable ? 'index, follow, max-image-preview:large' : 'noindex, nofollow'

  if (!route.indexable) document.querySelector('link[rel="canonical"]')?.remove()
}

async function start() {
  const root = document.getElementById('root')
  if (!root) throw new Error('Elemento raiz não encontrado.')

  const route = matchRoute(window.location.pathname)
  const { default: Page } = await loadPage(route)
  const app = <App><Page route={route} /></App>
  const prerenderedRoute = root.dataset.routePath

  if (root.hasChildNodes() && prerenderedRoute === route.path) {
    hydrateRoot(root, app)
  } else {
    root.replaceChildren()
    applyFallbackMetadata(route)
    createRoot(root).render(app)
  }
}

void start()
