import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { EnvelopeSimple } from '@phosphor-icons/react/dist/csr/EnvelopeSimple'
import { MapPin } from '@phosphor-icons/react/dist/csr/MapPin'
import { FadeUp, WordsPullUp } from '@/components/motion/Reveal'
import { ActionButton } from '@/components/ui/Button'
import { contact } from '@/content/portfolio'
import ContactForm from '@/components/contact/ContactForm'

export default function Contact({ showFooter = true }: { showFooter?: boolean }) {
  return (
    <section id="contato" className="relative scroll-mt-28 bg-ink px-3 pb-8 pt-20 md:px-6 md:pt-28">
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.12]" />

      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] border border-line bg-surface px-6 py-16 md:rounded-[2.5rem] md:px-14 md:py-24">
        <h2>
          <WordsPullUp
            segments={[
              { text: 'Vamos construir algo que' },
              { text: ' funcione de verdade.', className: 'font-serif italic' },
            ]}
            className="block max-w-4xl text-3xl leading-[0.98] tracking-[-0.03em] text-cream sm:text-4xl md:text-6xl lg:text-7xl [&>span]:mr-[0.2em]"
          />
        </h2>

        <FadeUp delay={0.2}>
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            Vamos conversar sobre oportunidades, produtos digitais e desafios que envolvam sistemas,
            automações e desenvolvimento.
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
            <a href={contact.mailto} className="inline-flex items-center gap-2 transition-colors hover:text-cream">
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
          <span>Gabriel Brasil · Analista de Sistemas e Desenvolvedor</span>
          <span>Brasília · DF</span>
        </footer>
      )}
    </section>
  )
}
