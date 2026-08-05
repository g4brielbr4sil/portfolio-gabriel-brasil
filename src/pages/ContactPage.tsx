import Contact from '@/components/Contact'
import PageLayout, { PageIntro } from '@/components/layout/PageLayout'

export default function ContactPage() {
  return (
    <PageLayout current="contact">
      <main id="conteudo" tabIndex={-1}>
        <PageIntro
          eyebrow="Contato"
          title="Vamos conversar sobre o próximo desafio."
          description="Use o formulário ou escolha um dos canais profissionais. Sem endpoint configurado, o contato continua disponível pelo seu aplicativo de e-mail."
        />
        <Contact showFooter={false} />
      </main>
    </PageLayout>
  )
}
