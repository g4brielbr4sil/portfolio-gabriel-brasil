import { FadeUp, ScrollRevealText, WordsPullUp } from '@/components/motion/Reveal'

export default function About() {
  return (
    <section id="sobre" className="scroll-mt-28 bg-ink px-3 py-20 md:px-6 md:py-32">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[1.75rem] border border-line bg-surface px-6 py-16 text-center md:rounded-[2.5rem] md:px-16 md:py-28">
        <FadeUp>
          <span className="text-[10px] uppercase tracking-[0.28em] text-primary sm:text-xs">
            Sobre mim
          </span>
        </FadeUp>

        <h2 className="mx-auto mt-8 max-w-3xl text-3xl leading-[0.95] tracking-[-0.02em] text-cream sm:text-4xl sm:leading-[0.9] md:text-5xl lg:text-6xl xl:text-[4.25rem]">
          <WordsPullUp
            segments={[
              { text: 'Eu sou Gabriel Brasil,' },
              { text: ' Analista de Sistemas e Desenvolvedor.', className: 'font-serif italic' },
              { text: ' Transformo processos, ideias e problemas reais em soluções digitais funcionais.' },
            ]}
            className="[&>span]:mr-[0.22em]"
          />
        </h2>

        <ScrollRevealText
          text="Minha atuação combina análise de sistemas, desenvolvimento web, automação de processos, integrações, testes, implantação e melhoria contínua. Gosto de compreender como uma operação funciona, identificar seus gargalos e construir soluções que tornem o trabalho mais organizado, eficiente e confiável."
          className="mx-auto mt-12 max-w-2xl text-sm leading-relaxed text-primary md:text-base"
        />
      </div>
    </section>
  )
}
