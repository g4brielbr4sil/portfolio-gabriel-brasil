import type { ReactNode } from 'react'
import Navigation from '@/components/navigation/Navigation'
import { site } from '@/config/site'
import type { RouteKind } from '@/config/routes'

export default function PageLayout({
  children,
}: {
  children: ReactNode
  current: RouteKind
}) {
  return (
    <>
      <Navigation />

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
    <header className="px-3 pb-16 pt-24 md:px-6 md:pb-24 md:pt-32">
      <div className="mx-auto max-w-7xl rounded-[1.75rem] border border-line bg-surface px-6 py-12 md:rounded-[2.5rem] md:px-12 md:py-20">
        <p className="text-[10px] uppercase tracking-[0.26em] text-cream/45">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-4xl leading-[0.98] tracking-[-0.035em] text-cream sm:text-5xl md:text-7xl">{title}</h1>
        <p className="mt-7 max-w-2xl text-sm leading-relaxed text-muted md:text-base">{description}</p>
      </div>
    </header>
  )
}
