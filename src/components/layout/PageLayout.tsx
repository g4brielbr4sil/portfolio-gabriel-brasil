import type { ReactNode } from 'react'
import { List } from '@phosphor-icons/react/dist/csr/List'
import { site } from '@/config/site'
import type { RouteKind } from '@/config/routes'

const pageLinks = [
  { href: '/sobre/', label: 'Sobre', kind: 'about' },
  { href: '/projetos/', label: 'Projetos', kind: 'projects' },
  { href: '/contato/', label: 'Contato', kind: 'contact' },
] as const

export default function PageLayout({
  children,
  current,
}: {
  children: ReactNode
  current: RouteKind
}) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-ink/90 px-3 py-3 backdrop-blur-md md:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="/" className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-bold text-cream">
            GB <span className="ml-2 hidden font-normal text-cream/45 sm:inline">Gabriel Brasil</span>
          </a>

          <nav aria-label="Navegação principal" className="hidden items-center gap-1 md:flex">
            {pageLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={current === link.kind || (current === 'project' && link.kind === 'projects') ? 'page' : undefined}
                className="inline-flex min-h-11 items-center rounded-full px-4 text-sm text-cream/65 transition-colors hover:bg-white/5 hover:text-cream aria-[current=page]:bg-white/8 aria-[current=page]:text-cream"
              >
                {link.label}
              </a>
            ))}
            {site.resume.available && (
              <a
                href={site.resume.path}
                download={site.resume.downloadName}
                className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm text-cream/70 hover:text-cream"
              >
                Currículo
              </a>
            )}
          </nav>

          <details className="group relative md:hidden">
            <summary className="flex min-h-11 min-w-11 cursor-pointer list-none items-center justify-center rounded-full border border-line text-cream/80 [&::-webkit-details-marker]:hidden">
              <List size={20} aria-hidden="true" />
              <span className="sr-only">Abrir menu</span>
            </summary>
            <nav
              aria-label="Navegação móvel"
              className="absolute right-0 top-13 z-50 grid min-w-52 gap-1 rounded-2xl border border-line bg-ink p-2 shadow-[0_18px_60px_rgba(0,0,0,0.65)]"
            >
              {pageLinks.map((link) => (
                <a key={link.href} href={link.href} className="flex min-h-11 items-center rounded-xl px-3 text-sm text-cream/75 hover:bg-white/5">
                  {link.label}
                </a>
              ))}
              {site.resume.available && (
                <a href={site.resume.path} download={site.resume.downloadName} className="flex min-h-11 items-center rounded-xl px-3 text-sm text-cream/75 hover:bg-white/5">
                  Baixar currículo
                </a>
              )}
            </nav>
          </details>
        </div>
      </header>

      {children}

      <footer className="border-t border-line px-5 py-8 text-sm text-cream/45 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <span>Gabriel Brasil · {site.role}</span>
          <div className="flex flex-wrap gap-5">
            <a href={site.urls.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:text-cream">LinkedIn</a>
            <a href={site.urls.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:text-cream">GitHub</a>
            <a href={site.contact.mailto} className="inline-flex min-h-11 items-center hover:text-cream">E-mail</a>
          </div>
        </div>
      </footer>
    </>
  )
}

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <header className="px-3 pb-16 pt-16 md:px-6 md:pb-24 md:pt-24">
      <div className="mx-auto max-w-7xl rounded-[1.75rem] border border-line bg-surface px-6 py-12 md:rounded-[2.5rem] md:px-12 md:py-20">
        <p className="text-[10px] uppercase tracking-[0.26em] text-cream/45">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-4xl leading-[0.98] tracking-[-0.035em] text-cream sm:text-5xl md:text-7xl">{title}</h1>
        <p className="mt-7 max-w-2xl text-sm leading-relaxed text-muted md:text-base">{description}</p>
      </div>
    </header>
  )
}
