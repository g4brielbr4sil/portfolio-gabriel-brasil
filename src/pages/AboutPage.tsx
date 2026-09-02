import About from '@/components/About'
import EducationExperience from '@/components/EducationExperience'
import Skills from '@/components/Skills'
import Stack from '@/components/Stack'
import PageLayout, { PageIntro } from '@/components/layout/PageLayout'

export default function AboutPage() {
  return (
    <PageLayout current="about">
      <main id="conteudo" tabIndex={-1}>
        <PageIntro
          eyebrow="Sobre"
          title="Análise, desenvolvimento e evolução contínua."
          description="Minha atuação une entendimento da operação, construção de sistemas e acompanhamento técnico depois da publicação."
        />
        <About />
        <Skills />
        <EducationExperience detailed />
        <Stack />
      </main>
    </PageLayout>
  )
}
