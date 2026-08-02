import { useRef, useState } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { Plus } from '@phosphor-icons/react/dist/csr/Plus'
import { FadeUp, WordsPullUp } from '@/components/motion/Reveal'
import { Badge } from '@/components/ui/badge'
import { usePreviewTheme } from '@/components/projects/usePreviewTheme'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { projects, type Project, type ProjectLink } from '@/content/portfolio'
import ProjectCardCarousel from '@/components/projects/ProjectCardCarousel'
import ProjectCaseStudyButton from '@/components/projects/ProjectCaseStudyButton'
import ProjectCaseStudyDialog from '@/components/projects/ProjectCaseStudyDialog'

type Props = {
  onOverlayChange?: (open: boolean) => void
}

export default function Projects({ onOverlayChange }: Props) {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [activeTheme, setActiveTheme] = useState<'dark' | 'light'>('dark')
  const [activeIndex, setActiveIndex] = useState(0)
  const openerRef = useRef<HTMLElement | null>(null)

  function openProject(project: Project, theme: 'dark' | 'light', index: number, opener: HTMLElement | null) {
    openerRef.current = opener
    setActiveProject(project)
    setActiveTheme(theme)
    setActiveIndex(index)
    onOverlayChange?.(true)
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      setActiveProject(null)
      onOverlayChange?.(false)
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
              Projetos que conectam tecnologia, operação e experiência do usuário.
            </p>
          </FadeUp>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          <ProjectCard project={projects[0]} delay={0} className="lg:col-span-4" featured onOpenProject={openProject} />
          <ProjectCard project={projects[1]} delay={0.12} className="lg:col-span-2" onOpenProject={openProject} />
          <ProjectCard project={projects[2]} delay={0.24} className="lg:col-span-2" onOpenProject={openProject} />
          <ProjectCard project={projects[3]} delay={0.36} className="lg:col-span-4" featured onOpenProject={openProject} />
        </div>
      </div>

      <ProjectCaseStudyDialog
        project={activeProject}
        open={Boolean(activeProject)}
        initialTheme={activeTheme}
        initialIndex={activeIndex}
        onOpenChange={handleOpenChange}
        returnFocusRef={openerRef}
      />
    </section>
  )
}

type CardProps = {
  project: Project
  delay: number
  className?: string
  featured?: boolean
  onOpenProject: (project: Project, theme: 'dark' | 'light', index: number, opener: HTMLElement | null) => void
}

function ProjectCard({ project, delay, className, featured, onOpenProject }: CardProps) {
  const [expanded, setExpanded] = useState(false)
  const extra = project.techExtra ?? []
  const preview = usePreviewTheme(project.previewThemes)
  const canShowGallery = Boolean(preview.images && preview.images.images.length > 1)

  function openCurrentProject(opener: HTMLElement | null) {
    onOpenProject(project, preview.theme, 0, opener)
  }

  return (
    <FadeUp delay={delay} scale className={className}>
      <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-card transition-[transform,border-color] duration-500 [@media(hover:hover)]:group-hover:border-cream/25 [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-cream/25">
        <div
          className={`relative overflow-hidden border-b border-line bg-surface ${
            featured ? 'h-56 md:h-72' : 'h-44'
          }`}
        >
          <div className="absolute inset-0 transition-transform duration-700 [@media(hover:hover)]:group-hover:scale-[1.02]">
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
              <Mockup number={project.number} onOpenProject={(opener) => openCurrentProject(opener)} />
            )}
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          {project.status &&
            (project.statusTooltip ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="absolute right-4 top-4 cursor-help rounded-full"
                  >
                    <Badge variant="solid">{project.status}</Badge>
                  </button>
                </TooltipTrigger>
                <TooltipContent>{project.statusTooltip}</TooltipContent>
              </Tooltip>
            ) : (
              <Badge variant="solid" className="absolute right-4 top-4">
                {project.status}
              </Badge>
            ))}
          {project.editorialNote && (
            <span className="absolute left-5 top-4 font-serif text-sm italic text-cream/60">
              {project.editorialNote}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6 md:p-8">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs text-cream/35">{project.number}</span>
            <h3 className="text-lg text-cream md:text-xl">{project.name}</h3>
          </div>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">{project.description}</p>

          {preview.canToggle && project.previewNote && (
            <p className="mt-3 font-serif text-sm italic text-cream/45">{project.previewNote}</p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <ProjectCaseStudyButton
              label="Ver estudo de caso"
              onClick={(event) => openCurrentProject(event.currentTarget)}
            />
            {canShowGallery && (
              <ProjectCaseStudyButton
                label="Ver todas as telas"
                onClick={(event) => openCurrentProject(event.currentTarget)}
              />
            )}
          </div>

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

          <p className="mt-7 text-[10px] uppercase tracking-[0.22em] text-cream/35">
            {project.techLabel ?? 'Stack principal'}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>

          {extra.length > 0 && (
            <Collapsible open={expanded} onOpenChange={setExpanded} className="mt-4">
              <CollapsibleTrigger
                className="inline-flex items-center gap-1.5 text-[11px] text-cream/45 transition-colors duration-300 hover:text-cream/80"
              >
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

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-5">
            {project.links.map((link) => (
              <CardLink key={link.label} link={link} />
            ))}
          </div>
        </div>
      </article>
    </FadeUp>
  )
}

function CardLink({ link }: { link: ProjectLink }) {
  if (!link.href) {
    const note = link.note && (
      <Badge className="border-line/60 text-cream/45">{link.note}</Badge>
    )

    return (
      <span className="inline-flex min-h-[44px] items-center gap-2 text-xs text-cream/35">
        {link.label}
        {link.noteTooltip && note ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" className="cursor-help rounded-full">
                {note}
              </button>
            </TooltipTrigger>
            <TooltipContent>{link.noteTooltip}</TooltipContent>
          </Tooltip>
        ) : (
          note
        )}
      </span>
    )
  }

  return (
    <a
      href={link.href}
      target={link.external ? '_blank' : undefined}
      rel={link.external ? 'noreferrer' : undefined}
      className="group/link inline-flex min-h-[44px] items-center gap-1.5 text-xs text-cream/70 transition-colors duration-300 hover:text-cream"
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

/** Mockup abstrato de interface — placeholder para screenshot ou vídeo. */
function Mockup({ number, onOpenProject }: { number: string; onOpenProject: (opener: HTMLElement | null) => void }) {
  const bars = [72, 46, 88, 34, 60, 52]

  return (
    <div className="absolute inset-0 bg-grid opacity-70">
      <button
        type="button"
        onClick={(event) => onOpenProject(event.currentTarget)}
        className="absolute inset-0 z-10 cursor-pointer"
        aria-label="Abrir estudo de caso"
      >
        <span className="sr-only">Ver estudo de caso</span>
      </button>

      <div className="absolute inset-x-5 top-5 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-cream/20" />
        <span className="h-2 w-2 rounded-full bg-cream/15" />
        <span className="h-2 w-2 rounded-full bg-cream/10" />
        <span className="ml-3 h-2 w-24 rounded-full bg-cream/10" />
      </div>

      <div className="absolute inset-x-5 bottom-6 top-14 flex gap-3">
        <div className="hidden w-1/4 flex-col gap-2 rounded-lg border border-line bg-black/30 p-3 sm:flex">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="h-1.5 rounded-full bg-cream/12"
              style={{ width: `${90 - i * 15}%` }}
            />
          ))}
        </div>
        <div className="flex flex-1 items-end gap-2 rounded-lg border border-line bg-black/30 p-3">
          {bars.map((height, i) => (
            <span
              key={i}
              className="flex-1 rounded-sm bg-cream/15 transition-all duration-700 [@media(hover:hover)]:group-hover:bg-cream/25"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>

      <span className="absolute bottom-3 right-5 font-mono text-[10px] text-cream/25">
        preview · {number}
      </span>
    </div>
  )
}
