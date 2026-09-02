import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import PageLayout from '@/components/layout/PageLayout'
import ProjectGallery from '@/components/projects/ProjectGallery'
import { projects, type Project } from '@/content/portfolio'
import type { PortfolioRoute } from '@/config/routes'

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="border-t border-line pt-7">
      <h2 className="text-xs uppercase tracking-[0.22em] text-cream/40">{title}</h2>
      <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-cream/70">
        {items.map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cream/40" />{item}</li>)}
      </ul>
    </section>
  )
}

function AbstractPreview({ project }: { project: Project }) {
  return (
    <div className="overflow-hidden rounded-[8px] border border-white/14 bg-[#111615] p-5 md:p-7">
      <div className="bg-grid rounded-[6px] border border-white/12 p-6">
        <p className="text-[10px] uppercase tracking-[0.22em] text-cream/40">Apresentação abstrata</p>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/75">
          {project.previewNote ??
            `Nenhuma captura real do ${project.name} é publicada nesta rodada para preservar dados pessoais e operacionais.`}
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {project.highlights.slice(0, 4).map((item) => <span key={item} className="rounded-xl border border-line bg-black/25 p-4 text-sm text-cream/60">{item}</span>)}
        </div>
      </div>
    </div>
  )
}

export default function ProjectPage({ route }: { route: PortfolioRoute }) {
  const project = projects.find((item) => item.slug === route.projectSlug)

  if (!project) return null

  return (
    <PageLayout current="project">
      <main id="conteudo" tabIndex={-1} className="px-3 pb-12 pt-24 md:px-6 md:pb-20 md:pt-32">
        <article className="portfolio-container">
          <Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: 'Projetos', href: '/projetos/' }, { label: project.name }]} />

          <header className="grid gap-6 border-b border-line pb-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="text-[10px] uppercase tracking-[0.24em] text-cream/40">{project.caseStudy.category}</p>
              <h1 className="mt-4 text-4xl leading-none tracking-[-0.035em] text-cream sm:text-5xl md:text-7xl">{project.name}</h1>
            </div>
            <div className="md:col-span-4">
              <p className="text-sm uppercase tracking-[0.14em] text-cream/45">{project.caseStudy.status}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{project.description}</p>
            </div>
          </header>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            <div>{project.previewThemes ? <ProjectGallery projectName={project.name} previewThemes={project.previewThemes} initialTheme={project.previewThemes.default} initialIndex={0} /> : <AbstractPreview project={project} />}</div>
            <div className="grid content-start gap-7">
              <section><h2 className="text-xs uppercase tracking-[0.22em] text-cream/40">Contexto</h2><p className="mt-4 text-sm leading-relaxed text-cream/70">{project.caseStudy.context}</p></section>
              <section className="border-t border-line pt-7"><h2 className="text-xs uppercase tracking-[0.22em] text-cream/40">Problema</h2><p className="mt-4 text-sm leading-relaxed text-cream/70">{project.caseStudy.problem}</p></section>
              <section className="border-t border-line pt-7"><h2 className="text-xs uppercase tracking-[0.22em] text-cream/40">Minha atuação</h2><p className="mt-4 text-sm leading-relaxed text-cream/70">{project.caseStudy.role}</p></section>
              <DetailList title="Decisões técnicas" items={project.caseStudy.decisions} />
              <DetailList title="Funcionalidades" items={project.caseStudy.features} />
              <DetailList title="Stack principal" items={project.caseStudy.stackMain} />
              <DetailList title="Desafios" items={project.caseStudy.challenges} />
              <DetailList title="Soluções aplicadas" items={project.caseStudy.solutions} />
              <DetailList title="Situação atual e próximos passos" items={project.caseStudy.nextSteps} />
              {project.caseStudy.links.some((link) => link.href) && (
                <section className="border-t border-line pt-7">
                  <h2 className="text-xs uppercase tracking-[0.22em] text-cream/40">Links públicos</h2>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {project.caseStudy.links.filter((link) => link.href).map((link) => (
                      <a key={link.label} href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noopener noreferrer' : undefined} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm text-cream/75 hover:bg-white/5 hover:text-cream">
                        {link.label}<ArrowUpRight size={15} aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </article>
      </main>
    </PageLayout>
  )
}
