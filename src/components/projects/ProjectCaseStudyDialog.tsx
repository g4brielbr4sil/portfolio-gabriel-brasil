import { useEffect, useState, type ReactNode } from 'react'
import { Dialog, DialogCloseButton, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import type { PreviewTheme, Project } from '@/content/portfolio'
import ProjectGallery from '@/components/projects/ProjectGallery'

type Props = {
  project: Project | null
  open: boolean
  initialTheme: PreviewTheme
  initialIndex: number
  onOpenChange: (open: boolean) => void
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-2">
      <h4 className="text-[10px] uppercase tracking-[0.24em] text-cream/34">{title}</h4>
      <div className="text-sm leading-relaxed text-cream/70">{children}</div>
    </section>
  )
}

function ListBlock({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cream/45" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function ProjectCaseStudyDialog({
  project,
  open,
  initialTheme,
  initialIndex,
  onOpenChange,
}: Props) {
  const [galleryTheme, setGalleryTheme] = useState<PreviewTheme>(initialTheme)

  useEffect(() => {
    if (!open) return
    setGalleryTheme(initialTheme)
  }, [initialTheme, open])

  if (!project) return null

  const openProjectLink = project.caseStudy.links.find((link) => link.href)?.href

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[100dvh] flex-col p-0 md:h-auto md:max-h-[90dvh]">
        <div className="flex items-start justify-between gap-4 border-b border-line px-4 py-4 md:px-6">
          <div>
            <DialogTitle className="text-xl text-cream md:text-2xl">{project.name}</DialogTitle>
            <DialogDescription className="mt-1 text-[11px] uppercase tracking-[0.2em] text-cream/35">
              {project.caseStudy.category}
            </DialogDescription>
          </div>
          <DialogCloseButton />
        </div>

        <div className="grid flex-1 gap-6 overflow-y-auto overscroll-contain px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] md:grid-cols-[1.05fr_0.95fr] md:px-6 md:py-6">
          <div className="space-y-5">
            {project.previewThemes ? (
              <ProjectGallery
                projectName={project.name}
                previewThemes={project.previewThemes}
                initialTheme={galleryTheme}
                initialIndex={initialIndex}
                onThemeChange={setGalleryTheme}
                onOpenProject={openProjectLink ? () => window.open(openProjectLink, '_blank', 'noopener,noreferrer') : undefined}
              />
            ) : (
              <div className="rounded-[1.5rem] border border-line bg-[#0c0c0c] p-6 text-cream/55">
                Galeria real indisponível nesta rodada.
              </div>
            )}
          </div>

          <div className="space-y-5 md:pl-1">
            <Section title="Categoria e status">
              <p>{project.caseStudy.status}</p>
            </Section>
            <Section title="Contexto">
              <p>{project.caseStudy.context}</p>
            </Section>
            <Section title="Problema">
              <p>{project.caseStudy.problem}</p>
            </Section>
            <Section title="Minha atuação">
              <p>{project.caseStudy.role}</p>
            </Section>
            <Section title="Decisões técnicas">
              <ListBlock items={project.caseStudy.decisions} />
            </Section>
            <Section title="Principais funcionalidades">
              <ListBlock items={project.caseStudy.features} />
            </Section>
            <Section title="Stack principal">
              <ListBlock items={project.caseStudy.stackMain} />
            </Section>
            {project.caseStudy.stackExtra && (
              <Section title="Ecossistema complementar">
                <ListBlock items={project.caseStudy.stackExtra} />
              </Section>
            )}
            <Section title="Desafios">
              <ListBlock items={project.caseStudy.challenges} />
            </Section>
            <Section title="Soluções aplicadas">
              <ListBlock items={project.caseStudy.solutions} />
            </Section>
            <Section title="Próximos passos">
              <ListBlock items={project.caseStudy.nextSteps} />
            </Section>
            <Section title="Links públicos">
              <div className="flex flex-wrap gap-3">
                {project.caseStudy.links.map((link) =>
                  link.href ? (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-line bg-white/5 px-4 text-sm text-cream/80 transition-colors hover:bg-white/10 hover:text-cream"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <span
                      key={link.label}
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line px-4 text-sm text-cream/55"
                    >
                      {link.label}
                      {link.note && <span className="text-cream/35">{link.note}</span>}
                    </span>
                  ),
                )}
              </div>
            </Section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
