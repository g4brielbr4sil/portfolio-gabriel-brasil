import type { CSSProperties } from 'react'
import TechnologyIcon from '@/components/projects/TechnologyIcon'

export default function ProjectTechTicker({ projectName, items, accent }: { projectName: string; items: string[]; accent: string }) {
  const technologies = items.slice(0, 12)
  const tickerStyle = {
    '--project-ticker-duration': `${Math.max(28, technologies.length * 4.8)}s`,
    '--project-ticker-accent': accent,
  } as CSSProperties

  return (
    <div
      className="project-tech-ticker relative overflow-hidden rounded-xl border border-white/10 bg-black/24 py-3 outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
      style={tickerStyle}
      tabIndex={0}
      aria-label={`Tecnologias utilizadas em ${projectName}. O movimento pausa ao receber foco.`}
    >
      <ul className="sr-only">
        {technologies.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-9 bg-gradient-to-r from-[#141817] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-9 bg-gradient-to-l from-[#141817] to-transparent" />

      <div className="overflow-hidden motion-reduce:hidden" aria-hidden="true">
        <div className="project-tech-track flex w-max">
          {[...technologies, ...technologies].map((technology, index) => (
            <span
              key={`${technology}-${index}`}
              className="mr-2 inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-lg border border-white/12 bg-white/[0.045] px-3.5 text-[12px] font-medium text-white/72 sm:text-[13px]"
            >
              <TechnologyIcon name={technology} size={15} accent={accent} />
              {technology}
            </span>
          ))}
        </div>
      </div>

      <div className="hidden snap-x gap-2 overflow-x-auto px-2 motion-reduce:flex" aria-hidden="true">
        {technologies.map((technology) => (
          <span
            key={technology}
            className="inline-flex h-10 shrink-0 snap-start items-center gap-2 rounded-lg border border-white/12 bg-white/[0.045] px-3.5 text-[12px] font-medium text-white/72 sm:text-[13px]"
          >
            <TechnologyIcon name={technology} size={15} accent={accent} />
            {technology}
          </span>
        ))}
      </div>
    </div>
  )
}
