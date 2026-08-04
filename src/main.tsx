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

async function start() {
  const root = document.getElementById('root')
  if (!root) throw new Error('Elemento raiz não encontrado.')

  const route = matchRoute(window.location.pathname)
  const { default: Page } = await loadPage(route)
  const app = <App><Page route={route} /></App>

  if (root.hasChildNodes()) {
    hydrateRoot(root, app)
  } else {
    createRoot(root).render(app)
  }
}

void start()
