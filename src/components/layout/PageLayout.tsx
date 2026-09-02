import type { ReactNode } from 'react'
import Navigation from '@/components/navigation/Navigation'
import Footer from '@/components/Footer'
import type { RouteKind } from '@/config/routes'

export default function PageLayout({
  children,
  current,
}: {
  children: ReactNode
  current: RouteKind
}) {
  return (
    <>
      <Navigation current={current} />

      {children}

      <Footer overlap={false} />
    </>
  )
}

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <header className="px-5 pb-14 pt-28 sm:px-8 md:pb-20 md:pt-32">
      <div className="portfolio-container rounded-[8px] border border-white/14 bg-[#111615] px-6 py-10 sm:px-8 md:py-14 xl:px-10">
        <p className="text-[12px] uppercase tracking-[0.22em] text-white/42 sm:text-[13px]">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-4xl leading-[1.02] tracking-[-0.035em] text-white/92 sm:text-5xl xl:text-6xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/56 md:text-[17px] xl:text-lg">{description}</p>
      </div>
    </header>
  )
}
