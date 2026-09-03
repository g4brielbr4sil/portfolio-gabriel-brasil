import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react'
import { ArrowSquareOut } from '@phosphor-icons/react/dist/csr/ArrowSquareOut'
import { CaretLeft } from '@phosphor-icons/react/dist/csr/CaretLeft'
import { CaretRight } from '@phosphor-icons/react/dist/csr/CaretRight'
import { motion, useReducedMotion } from 'motion/react'
import ProjectTechTicker from '@/components/projects/ProjectTechTicker'
import ProjectVisual from '@/components/projects/ProjectVisual'
import { Dialog, DialogCloseButton, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import type { Project, ProjectLink } from '@/content/portfolio'

type Props = {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const EASE = [0.22, 1, 0.36, 1] as const

const projectAccents: Record<string, string> = {
  'barthy-web-studio-v2': '#dc7655',
  pnqc: '#3f82ee',
  'hermes-command-center': '#4d83ff',
  'radar-df': '#7554e8',
  'saas-de-suporte': '#12a97f',
}

function ProjectDetailSection({ title, accent, children }: { title: string; accent: string; children: ReactNode }) {
  return (
    <section>
      <div className="flex items-center gap-3">
        <span className="h-px w-6" style={{ backgroundColor: accent }} aria-hidden="true" />
        <h3 className="text-[12px] font-semibold uppercase tracking-[0.16em] sm:text-[13px]" style={{ color: accent }}>
          {title}
        </h3>
      </div>
      <div className="mt-3 text-sm leading-[1.7] text-white/62 sm:text-[15px] xl:text-base">{children}</div>
    </section>
  )
}

export default function ProjectCaseStudyDialog({ project, open, onOpenChange }: Props) {
  const reduced = useReducedMotion()
  const [previewIndex, setPreviewIndex] = useState(0)
  const pointerStart = useRef<number | null>(null)

  useEffect(() => setPreviewIndex(0), [project?.slug])

  const previewImages = useMemo(() => {
    if (!project?.previewThemes) return []
    const preferred = project.previewThemes.light ?? project.previewThemes[project.previewThemes.default]
    return preferred?.images ?? []
  }, [project])

  if (!project) return null

  const accent = projectAccents[project.slug] ?? '#9f102a'
  const publicLinks = project.caseStudy.links.filter((link): link is ProjectLink & { href: string } => Boolean(link.href))
  const links: Array<ProjectLink & { href: string }> = [
    ...publicLinks,
    ...(project.pagePath ? [{ label: 'Case completo', href: project.pagePath }] : []),
  ]
  const technologies = [...project.caseStudy.stackMain, ...(project.caseStudy.stackExtra ?? [])]
  const currentPreview = previewImages[previewIndex] ?? previewImages[0]
  const dialogStyle = { '--project-accent': accent } as CSSProperties

  function movePreview(direction: number) {
    if (previewImages.length < 2) return
    setPreviewIndex((current) => (current + direction + previewImages.length) % previewImages.length)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        fullScreenMobile={false}
        className="h-[min(90dvh,860px)] w-[min(94vw,1160px)] rounded-[20px] border-0 bg-transparent p-0 shadow-none sm:rounded-[24px]"
      >
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 18, scale: 0.975 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="flex h-full min-h-0 flex-col overflow-hidden rounded-[20px] border border-white/14 bg-[#151918] shadow-[0_30px_110px_rgba(0,0,0,.76)] sm:rounded-[24px]"
          style={dialogStyle}
        >
          <header className="relative flex h-[56px] shrink-0 items-center border-b border-white/10 px-4 sm:px-5">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              {[0.58, 0.78, 1].map((opacity) => (
                <span key={opacity} className="size-2 rounded-full" style={{ backgroundColor: accent, opacity }} />
              ))}
            </div>
            <div className="pointer-events-none absolute inset-x-14 text-center">
              <DialogTitle className="truncate font-mono text-[11px] text-white/58 sm:text-[12px] xl:text-[13px]">
                {project.name}
              </DialogTitle>
              <DialogDescription className="sr-only">Detalhes do projeto {project.name}</DialogDescription>
            </div>
            <DialogCloseButton className="ml-auto size-10 rounded-xl border-0 bg-transparent hover:bg-white/[0.05]" />
          </header>

          <div className="grid min-h-0 flex-1 overflow-y-auto min-[1120px]:grid-cols-[minmax(0,56fr)_minmax(0,44fr)] min-[1120px]:overflow-hidden">
            <section className="flex min-w-0 flex-col border-b border-white/10 p-4 sm:p-5 min-[1120px]:min-h-0 min-[1120px]:border-b-0 min-[1120px]:border-r min-[1120px]:border-white/10 min-[1120px]:p-6">
              <div
                className={`relative w-full shrink-0 overflow-hidden rounded-2xl border border-white/12 p-2.5 sm:p-3 ${
                  currentPreview?.theme === 'light' ? 'bg-[#e9ebe8]' : 'bg-[#080b0c]'
                }`}
                onPointerDown={(event: PointerEvent<HTMLDivElement>) => {
                  pointerStart.current = event.clientX
                }}
                onPointerUp={(event: PointerEvent<HTMLDivElement>) => {
                  if (pointerStart.current == null) return
                  const delta = event.clientX - pointerStart.current
                  pointerStart.current = null
                  if (Math.abs(delta) >= 38) movePreview(delta < 0 ? 1 : -1)
                }}
                onPointerCancel={() => {
                  pointerStart.current = null
                }}
              >
                <div className="relative aspect-video overflow-hidden rounded-xl bg-[#080b0c]">
                  {currentPreview ? (
                    <picture className="block h-full w-full">
                      <source srcSet={currentPreview.avif} type="image/avif" />
                      <source srcSet={currentPreview.webp} type="image/webp" />
                      <img
                        src={currentPreview.webp}
                        alt={currentPreview.alt}
                        width={currentPreview.width}
                        height={currentPreview.height}
                        className="h-full w-full object-contain object-center"
                      />
                    </picture>
                  ) : (
                    <ProjectVisual project={project} />
                  )}

                  {previewImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => movePreview(-1)}
                        className="absolute left-2 top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-xl border border-white/15 bg-black/64 text-white/72 backdrop-blur-sm transition-colors hover:bg-black/82 hover:text-white sm:inline-flex"
                        aria-label="Screenshot anterior"
                      >
                        <CaretLeft size={17} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => movePreview(1)}
                        className="absolute right-2 top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-xl border border-white/15 bg-black/64 text-white/72 backdrop-blur-sm transition-colors hover:bg-black/82 hover:text-white sm:inline-flex"
                        aria-label="Próximo screenshot"
                      >
                        <CaretRight size={17} aria-hidden="true" />
                      </button>
                      <p className="absolute bottom-2 left-1/2 hidden max-w-[72%] -translate-x-1/2 truncate rounded-full border border-white/12 bg-black/68 px-3 py-1 text-center text-[12px] text-white/64 backdrop-blur-sm sm:block">
                        {currentPreview?.caption} · {previewIndex + 1}/{previewImages.length}
                      </p>
                    </>
                  )}
                </div>

                {previewImages.length > 1 && (
                  <div className="mt-2 grid grid-cols-[32px_minmax(0,1fr)_32px] items-center gap-2 sm:hidden">
                    <button
                      type="button"
                      onClick={() => movePreview(-1)}
                      className="inline-flex size-8 items-center justify-center rounded-lg border border-white/15 bg-black/42 text-white/72"
                      aria-label="Screenshot anterior"
                    >
                      <CaretLeft size={15} aria-hidden="true" />
                    </button>
                    <p className="truncate text-center text-[10px] text-white/58">
                      {currentPreview?.caption} · {previewIndex + 1}/{previewImages.length}
                    </p>
                    <button
                      type="button"
                      onClick={() => movePreview(1)}
                      className="inline-flex size-8 items-center justify-center rounded-lg border border-white/15 bg-black/42 text-white/72"
                      aria-label="Próximo screenshot"
                    >
                      <CaretRight size={15} aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <ProjectTechTicker projectName={project.name} items={technologies} accent={accent} />
              </div>

              {links.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2 border-t border-white/9 pt-4" aria-label="Ações do projeto">
                  {links.map((link) => (
                    <a
                      key={`${link.label}-${link.href}`}
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/14 bg-white/[0.025] px-4 text-[12px] font-medium text-white/72 transition-colors hover:border-white/28 hover:bg-white/[0.06] hover:text-white sm:text-[13px]"
                    >
                      <ArrowSquareOut size={14} color={accent} aria-hidden="true" />
                      {link.label}
                    </a>
                  ))}
                </div>
              )}

              {project.previewNote && <p className="mt-3 text-[12px] leading-relaxed text-white/42 sm:text-[13px]">{project.previewNote}</p>}
            </section>

            <aside className="min-w-0 space-y-6 p-5 sm:p-6 min-[1120px]:min-h-0 min-[1120px]:overflow-y-auto min-[1120px]:p-7">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/38 sm:text-[12px]">{project.caseStudy.status}</p>

              <ProjectDetailSection title="Sobre o projeto" accent={accent}>
                <p>{project.description}</p>
                <p className="mt-3 text-white/50">{project.caseStudy.context}</p>
              </ProjectDetailSection>

              <ProjectDetailSection title="O problema" accent={accent}>
                <p>{project.caseStudy.problem}</p>
              </ProjectDetailSection>

              {project.caseStudy.solutions.length > 0 && (
                <ProjectDetailSection title="Solução" accent={accent}>
                  <ul className="grid gap-2.5">
                    {project.caseStudy.solutions.slice(0, 2).map((solution) => (
                      <li key={solution} className="flex gap-2.5">
                        <span className="mt-[0.62em] size-1.5 shrink-0 rounded-full" style={{ backgroundColor: accent }} aria-hidden="true" />
                        {solution}
                      </li>
                    ))}
                  </ul>
                </ProjectDetailSection>
              )}

              <ProjectDetailSection title={project.highlightsLabel ?? 'Destaques'} accent={accent}>
                <ul className="grid gap-2.5">
                  {project.highlights.slice(0, 4).map((highlight) => (
                    <li key={highlight} className="flex gap-2.5">
                      <span className="mt-[0.62em] size-1.5 shrink-0 rounded-full" style={{ backgroundColor: accent }} aria-hidden="true" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </ProjectDetailSection>
            </aside>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
