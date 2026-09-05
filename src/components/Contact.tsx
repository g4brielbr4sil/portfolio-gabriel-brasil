import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { EnvelopeSimple } from '@phosphor-icons/react/dist/csr/EnvelopeSimple'
import { MapPin } from '@phosphor-icons/react/dist/csr/MapPin'
import { FadeUp, WordsPullUp } from '@/components/motion/Reveal'
import { ActionButton } from '@/components/ui/Button'
import { contact } from '@/content/portfolio'
import ContactForm from '@/components/contact/ContactForm'

export default function Contact({ showFooter = true }: { showFooter?: boolean }) {
  return (
    <section id="contato" className="relative scroll-mt-28 px-5 pb-8 pt-10 sm:px-8 md:pt-16">
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.12]" />

      <div className="portfolio-container relative overflow-hidden rounded-[8px] border border-white/14 bg-[#111615] px-6 py-12 md:px-10 md:py-16">
        <h2>
          <WordsPullUp
            segments={[
              { text: 'Vamos construir algo que' },
              { text: ' funcione de verdade.', className: 'font-serif italic' },
            ]}
            className="block max-w-4xl text-3xl leading-[1] tracking-[-0.03em] text-white/92 sm:text-4xl md:text-5xl xl:text-6xl [&>span]:mr-[0.2em]"
          />
        </h2>

        <FadeUp delay={0.2}>
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            Vamos conversar sobre oportunidades, sistemas, automações, produtos digitais e desafios que precisem sair da ideia e virar operação.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ActionButton href={contact.mailto}>Entrar em contato</ActionButton>
            <ActionButton href={contact.linkedin} variant="secondary" external>
              LinkedIn
            </ActionButton>
            <ActionButton href={contact.github} variant="secondary" external>
              GitHub
            </ActionButton>
            {contact.resume && (
              <ActionButton href={contact.resume} variant="secondary" download={contact.resumeDownloadName}>
                Baixar currículo
              </ActionButton>
            )}
          </div>
        </FadeUp>

        <FadeUp delay={0.4}>
          <div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-line pt-8 text-sm text-cream/70">
            <a href={contact.mailto} className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-cream">
              <EnvelopeSimple size={16} weight="light" aria-hidden="true" />
              {contact.email}
              <ArrowUpRight size={14} weight="regular" aria-hidden="true" />
            </a>
            <span className="inline-flex items-center gap-2 text-cream/50">
              <MapPin size={16} weight="light" aria-hidden="true" />
              {contact.location}
            </span>
          </div>
        </FadeUp>

        <FadeUp delay={0.45}>
          <ContactForm />
        </FadeUp>
      </div>

      {showFooter && (
        <footer className="mx-auto mt-8 flex max-w-7xl flex-wrap items-center justify-between gap-3 px-2 pb-8 text-[11px] uppercase tracking-[0.18em] text-cream/30">
          <span>Gabriel Brasil · Desenvolvedor Full Stack e Analista de Sistemas</span>
          <span>Brasília · DF</span>
        </footer>
      )}
    </section>
  )
}
