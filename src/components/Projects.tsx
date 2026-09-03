import { lazy, Suspense, useLayoutEffect, useRef, useState } from 'react'
import { Code } from '@phosphor-icons/react/dist/csr/Code'
import { Eye } from '@phosphor-icons/react/dist/csr/Eye'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { displayProjects } from '@/content/displayProjects'
import type { Project } from '@/content/portfolio'
import ProjectVisual from '@/components/projects/ProjectVisual'

const ProjectCaseStudyDialog = lazy(() => import('@/components/projects/ProjectCaseStudyDialog'))

const EASE = [0.22, 1, 0.36, 1] as const

type Props = {
  onOverlayChange?: (open: boolean) => void
  showAllInitially?: boolean
}

export default function Projects({ onOverlayChange, showAllInitially = false }: Props) {
  const reduced = useReducedMotion()
  const [showAll, setShowAll] = useState(showAllInitially)
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const openerRef = useRef<HTMLElement | null>(null)
  const toggleRef = useRef<HTMLButtonElement | null>(null)
  const toggleAnchorRef = useRef<number | null>(null)
  const visibleProjects = showAll ? displayProjects : displayProjects.slice(0, 2)

  function handleToggleShowAll() {
    toggleAnchorRef.current = toggleRef.current?.getBoundingClientRect().top ?? null
    setShowAll((current) => !current)
  }

  useLayoutEffect(() => {
    const anchor = toggleAnchorRef.current
    if (anchor == null || !toggleRef.current) return

    const delta = toggleRef.current.getBoundingClientRect().top - anchor
    if (Math.abs(delta) > 1) window.scrollBy(0, delta)
    toggleAnchorRef.current = null
  }, [showAll])

  function openProject(project: Project, opener: HTMLElement | null) {
    openerRef.current = opener
    setActiveProject(project)
    onOverlayChange?.(true)
  }

  function handleOpenChange(open: boolean) {
    if (open) return

    const target = openerRef.current
    setActiveProject(null)
    onOverlayChange?.(false)
    window.setTimeout(() => {
      if (target?.isConnected) target.focus({ preventScroll: true })
    }, 0)
  }

  return (
    <section
      id="projetos"
      aria-labelledby="projects-title"
      className="portfolio-chapter projects-section px-4 sm:px-6 lg:px-8"
    >
      <div className="portfolio-container w-full px-0 py-16 sm:px-4 lg:px-5 xl:py-20">
        <motion.h2
          id="projects-title"
          className="flex items-center gap-3 text-[23px] font-semibold tracking-[-0.02em] text-white sm:text-2xl xl:text-[26px]"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.65 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <Code size={24} weight="bold" className="text-[#8198ad]" aria-hidden="true" />
          Projetos
        </motion.h2>

        <motion.div layout={!reduced} className="mt-9 grid gap-4 md:grid-cols-2 xl:gap-5">
          <AnimatePresence initial={false} mode="popLayout">
            {visibleProjects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
                reduced={Boolean(reduced)}
                onOpen={openProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {!showAllInitially && (
          <motion.div layout={!reduced} className="mt-8 flex justify-center">
            <button
              ref={toggleRef}
              type="button"
              onClick={handleToggleShowAll}
              aria-expanded={showAll}
              className="inline-flex min-h-11 items-center rounded-[4px] border border-white/20 bg-[#1b2421] px-5 text-[13px] font-semibold text-white/86 transition-colors hover:bg-[#26312d] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#93aaa2] sm:text-sm"
            >
              {showAll ? 'Mostrar menos' : 'Ver todos os projetos'}
            </button>
          </motion.div>
        )}
      </div>

      {activeProject && (
        <Suspense fallback={null}>
          <ProjectCaseStudyDialog project={activeProject} open onOpenChange={handleOpenChange} />
        </Suspense>
      )}
    </section>
  )
}

function ProjectCard({
  project,
  index,
  reduced,
  onOpen,
}: {
  project: Project
  index: number
  reduced: boolean
  onOpen: (project: Project, opener: HTMLElement | null) => void
}) {
  return (
    <motion.article
      layout={!reduced}
      initial={reduced ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, y: 14 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.48, delay: index * 0.06, ease: EASE, layout: { duration: 0.35, ease: EASE } }}
      className="group overflow-hidden rounded-[6px] border border-white/17 bg-[#141918] transition-[transform,border-color] duration-300 [@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:border-white/30"
    >
      <button
        type="button"
        onClick={(event) => onOpen(project, event.currentTarget)}
        className="block aspect-[16/8.5] w-full overflow-hidden border-b border-white/12 bg-[#090c0d] text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#93aaa2]"
        aria-label={`Ver detalhes de ${project.name}`}
      >
        <span className="block h-full transition-transform duration-500 [@media(hover:hover)]:group-hover:scale-[1.01] motion-reduce:transition-none">
          <ProjectVisual project={project} />
        </span>
      </button>

      <div className="p-4 sm:p-5 xl:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-snug text-white/92 sm:text-[17px] xl:text-lg">{project.name}</h3>
          {project.status && <span className="shrink-0 text-[11px] uppercase tracking-[0.08em] text-white/38 xl:text-[12px]">{project.status}</span>}
        </div>
        <p className="mt-2 line-clamp-2 text-sm leading-[1.6] text-white/50 sm:text-[15px] xl:text-base">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={(event) => onOpen(project, event.currentTarget)}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-[4px] border border-white/16 px-3 text-[12px] text-white/68 transition-colors hover:bg-white/[0.06] hover:text-white md:min-h-9 xl:text-[13px]"
          >
            <Eye size={11} aria-hidden="true" />
            Detalhes
          </button>

          {project.pagePath && (
            <a
              href={project.pagePath}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-[4px] border border-white/16 px-3 text-[12px] text-white/68 transition-colors hover:bg-white/[0.06] hover:text-white md:min-h-9 xl:text-[13px]"
            >
              <Code size={11} aria-hidden="true" />
              Case
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
