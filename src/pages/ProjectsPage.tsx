import Projects from '@/components/Projects'
import PageLayout, { PageIntro } from '@/components/layout/PageLayout'

export default function ProjectsPage() {
  return (
    <PageLayout current="projects">
      <main id="conteudo" tabIndex={-1}>
        <PageIntro
          eyebrow="Projetos"
          title="Sistemas e produtos construídos para problemas reais."
          description="Cada projeto apresenta o contexto, minha atuação, decisões técnicas, stack e estado atual sem métricas ou resultados inventados."
        />
        <Projects />
      </main>
    </PageLayout>
  )
}
