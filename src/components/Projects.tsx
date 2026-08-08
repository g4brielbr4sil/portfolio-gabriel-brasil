import { lazy, Suspense, useRef, useState } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { Plus } from '@phosphor-icons/react/dist/csr/Plus'
import { FadeUp, WordsPullUp } from '@/components/motion/Reveal'
import { Badge } from '@/components/ui/badge'
import { usePreviewTheme } from '@/components/projects/usePreviewTheme'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { displayProjects } from '@/content/displayProjects'
import type { Project, ProjectLink } from '@/content/portfolio'
import ProjectCardCarousel from '@/components/projects/ProjectCardCarousel'
import ProjectCaseStudyButton from '@/components/projects/ProjectCaseStudyButton'

const ProjectCaseStudyDialog = lazy(() => import('@/components/projects/ProjectCaseStudyDialog'))

type Props = {
  onOverlayChange?: (open: boolean) => void
}

export default function Projects({ onOverlayChange }: Props) {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [activeTheme, setActiveTheme] = useState<'dark' | 'light'>('dark')
  const [activeIndex, setActiveIndex] = useState(0)
  const openerRef = useRef<HTMLElement | null>(null)

  const [barthy, pnqc, hermes, supportSaas] = displayProjects

  function openProject(project: Project, theme: 'dark' | 'light', index: number, opener: HTMLElement | null) {
    openerRef.current = opener
    setActiveProject(project)
    setActiveTheme(theme)
    setActiveIndex(index)
    onOverlayChange?.(true)
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      const target = openerRef.current
      setActiveProject(null)
      onOverlayChange?.(false)
      window.setTimeout(() => {
        if (target?.isConnected) target.focus({ preventScroll: true })
      }, 0)
    }
  }

  return (
    <section id="projetos" className="relative scroll-mt-28 bg-ink px-3 pb-24 md:px-6 md:pb-32">
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.12]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-6 border-b border-line pb-10 md:grid-cols-12 md:items-end">
          <h2 className="md:col-span-7">
            <WordsPullUp
              segments={[{ text: 'Produtos construídos para problemas reais.' }]}
              className="block max-w-2xl text-2xl leading-[1.05] tracking-[-0.02em] text-cream sm:text-3xl md:text-4xl lg:text-5xl [&>span]:mr-[0.22em]"
            />
          </h2>
          <FadeUp delay={0.15} className="md:col-span-5">
            <p className="text-sm text-muted md:text-base">
              Cases com evidências reais, decisões técnicas e responsabilidade explícita em cada entrega.
            </p>
          </FadeUp>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-12">
          <ProjectCard project={barthy} delay={0} className="lg:col-span-7" featured onOpenProject={openProject} />
          <ProjectCard project={pnqc} delay={0.1} className="lg:col-span-5" featured onOpenProject={openProject} />
          <ProjectCard project={hermes} delay={0.2} className="lg:col-span-12" onOpenProject={openProject} />
        </div>

        <div className="mt-16 border-t border-line pt-10">
          <div className="grid gap-5 md:grid-cols-12 md:items-start">
            <div className="md:col-span-4">
              <p className="text-[10px] uppercase tracking-[0.26em] text-cream/35">Em validação</p>
              <h3 className="mt-3 text-xl text-cream md:text-2xl">Uma base operacional, vários módulos.</h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                A próxima tese de produto conecta relacionamento, WhatsApp, check-ins e operação em módulos que podem crescer conforme a realidade de cada negócio.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.12em] text-cream/45">
                {['CRM', 'WhatsApp', 'Check-in', 'Rotina', 'Operação', 'Suporte'].map((item) => (
                  <span key={item} className="rounded-full border border-line px-3 py-1">{item}</span>
                ))}
              </div>
            </div>
            <ProjectCard
              project={supportSaas}
              delay={0.15}
              className="md:col-span-8"
              compact
              onOpenProject={openProject}
            />
          </div>
        </div>
      </div>

      {activeProject && (
        <Suspense fallback={null}>
          <ProjectCaseStudyDialog
            project={activeProject}
            open
            initialTheme={activeTheme}
            initialIndex={activeIndex}
            onOpenChange={handleOpenChange}
          />
        </Suspense>
      )}
    </section>
  )
}

type CardProps = {
  project: Project
  delay: number
  className?: string
  featured?: boolean
  compact?: boolean
  onOpenProject: (project: Project, theme: 'dark' | 'light', index: number, opener: HTMLElement | null) => void
}

function ProjectCard({ project, delay, className, featured, compact, onOpenProject }: CardProps) {
  const [expanded, setExpanded] = useState(false)
  const extra = project.techExtra ?? []
  const preview = usePreviewTheme(project.previewThemes)
  const canShowGallery = Boolean(preview.images && preview.images.images.length > 1)

  function openCurrentProject(opener: HTMLElement | null) {
    onOpenProject(project, preview.theme, 0, opener)
  }

  return (
    <FadeUp delay={delay} scale className={className}>
      <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-card transition-[transform,border-color] duration-500 [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-cream/25">
        <div
          className={`relative overflow-hidden border-b border-line bg-surface ${
            compact ? 'h-52 md:h-60' : featured ? 'h-72 md:h-[22rem]' : 'h-64 md:h-72'
          }`}
        >
          <div className="absolute inset-0 transition-transform duration-700 [@media(hover:hover)]:group-hover:scale-[1.01]">
            {preview.images && canShowGallery ? (
              <ProjectCardCarousel
                projectName={project.name}
                theme={preview.theme}
                images={preview.images.images}
                canToggleTheme={preview.canToggle}
                onThemeChange={preview.setTheme}
                preload={preview.preload ? { theme: preview.preload.theme, images: preview.preload.images.images } : undefined}
                onOpenGallery={({ theme, index, opener }) => onOpenProject(project, theme, index, opener)}
              />
            ) : (
              <Mockup project={project} onOpenProject={(opener) => openCurrentProject(opener)} />
            )}
          </div>
          {project.status &&
            (project.statusTooltip ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button type="button" className="absolute right-4 top-4 z-30 inline-flex min-h-11 items-center rounded-full cursor-help">
                    <Badge variant="solid">{project.status}</Badge>
                  </button>
                </TooltipTrigger>
                <TooltipContent>{project.statusTooltip}</TooltipContent>
              </Tooltip>
            ) : (
              <Badge variant="solid" className="absolute right-4 top-4 z-30">
                {project.status}
              </Badge>
            ))}
        </div>

        <div className="flex flex-1 flex-col p-6 md:p-8">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs text-cream/35">{project.number}</span>
            <h3 className="text-lg text-cream md:text-xl">{project.name}</h3>
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">{project.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <ProjectCaseStudyButton label="Explorar projeto" onClick={(event) => openCurrentProject(event.currentTarget)} />
            {project.pagePath && (
              <a
                href={project.pagePath}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-line bg-white/5 px-4 text-xs text-cream/75 transition-colors hover:bg-white/10 hover:text-cream"
              >
                Ver estudo de caso
                <ArrowUpRight size={14} weight="regular" aria-hidden="true" />
              </a>
            )}
            {project.links
              .filter((link) => Boolean(link.href))
              .slice(0, 1)
              .map((link) => (
                <CardLink key={link.label} link={link} pill />
              ))}
          </div>

          {!compact && (
            <>
              <p className="mt-7 text-[10px] uppercase tracking-[0.22em] text-cream/35">
                {project.highlightsLabel ?? 'Principais capacidades'}
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-cream/60">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-cream/40" aria-hidden="true" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </>
          )}

          <p className="mt-7 text-[10px] uppercase tracking-[0.22em] text-cream/35">
            {project.techLabel ?? 'Stack principal'}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>

          {extra.length > 0 && !compact && (
            <Collapsible open={expanded} onOpenChange={setExpanded} className="mt-4">
              <CollapsibleTrigger className="inline-flex min-h-[44px] items-center gap-1.5 text-[11px] text-cream/45 transition-colors duration-300 hover:text-cream/80">
                <Plus
                  size={12}
                  weight="regular"
                  aria-hidden="true"
                  className={`transition-transform duration-500 ${expanded ? 'rotate-45' : ''}`}
                />
                {expanded ? 'Ocultar ecossistema' : `Ecossistema do projeto · ${extra.length}`}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-wrap gap-2 pt-3">
                  {extra.map((tech) => (
                    <Badge key={tech} className="border-line/60 text-cream/35">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}

          {project.links.length > 1 && (
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-5">
              {project.links.slice(1).map((link) => (
                <CardLink key={link.label} link={link} />
              ))}
            </div>
          )}
        </div>
      </article>
    </FadeUp>
  )
}

function CardLink({ link, pill = false }: { link: ProjectLink; pill?: boolean }) {
  if (!link.href) return null

  return (
    <a
      href={link.href}
      target={link.external ? '_blank' : undefined}
      rel={link.external ? 'noopener noreferrer' : undefined}
      className={
        pill
          ? 'inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-line bg-white/5 px-4 text-xs text-cream/75 transition-colors hover:bg-white/10 hover:text-cream'
          : 'group/link inline-flex min-h-[44px] items-center gap-1.5 text-xs text-cream/70 transition-colors duration-300 hover:text-cream'
      }
    >
      {link.label}
      <ArrowUpRight
        size={14}
        weight="regular"
        aria-hidden="true"
        className="transition-transform duration-500 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
      />
    </a>
  )
}

function Mockup({ project, onOpenProject }: { project: Project; onOpenProject: (opener: HTMLElement | null) => void }) {
  const labels = project.highlights.slice(0, 4)

  return (
    <div className="absolute inset-0 bg-grid opacity-90">
      <button
        type="button"
        onClick={(event) => onOpenProject(event.currentTarget)}
        className="absolute inset-0 z-10 cursor-pointer"
        aria-label={`Explorar estudo de caso de ${project.name}`}
      />

      <div className="absolute inset-x-5 top-5 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-cream/20" />
        <span className="h-2 w-2 rounded-full bg-cream/15" />
        <span className="h-2 w-2 rounded-full bg-cream/10" />
        <span className="ml-3 h-2 w-24 rounded-full bg-cream/10" />
      </div>

      <div className="absolute inset-x-5 bottom-6 top-14 grid gap-3 sm:grid-cols-[0.75fr_1.25fr]">
        <div className="rounded-xl border border-line bg-black/35 p-4">
          <p className="text-[10px] uppercase tracking-[0.22em] text-cream/35">Visão do produto</p>
          <div className="mt-4 space-y-2">
            {labels.map((label) => (
              <div key={label} className="rounded-lg border border-line bg-white/[0.03] px-3 py-2 text-[11px] text-cream/55">
                {label}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center rounded-xl border border-line bg-black/35 p-5">
          <div className="relative h-32 w-32 rounded-full border border-cream/15">
            <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream/60" />
            <span className="absolute left-1/2 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-cream/30" />
            <span className="absolute bottom-5 left-4 h-2 w-2 rounded-full bg-cream/25" />
            <span className="absolute bottom-5 right-4 h-2 w-2 rounded-full bg-cream/25" />
            <span className="absolute inset-6 rounded-full border border-cream/10" />
          </div>
        </div>
      </div>
    </div>
  )
}
