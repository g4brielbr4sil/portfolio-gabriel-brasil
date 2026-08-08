import { Certificate } from '@phosphor-icons/react/dist/csr/Certificate'
import { GraduationCap } from '@phosphor-icons/react/dist/csr/GraduationCap'
import { Sparkle } from '@phosphor-icons/react/dist/csr/Sparkle'
import { FadeUp, WordsPullUp } from '@/components/motion/Reveal'
import { education } from '@/content/portfolio'

const certifications = {
  title: 'Certificações Cisco',
  description: 'Formação complementar em fundamentos de TI, hardware, sistemas e suporte técnico.',
  items: ['Cisco IT Essentials 1', 'Cisco IT Essentials 2'],
}

export default function Education() {
  const { degree, ecosystem } = education

  return (
    <section id="formacao" className="scroll-mt-28 bg-ink px-3 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 border-b border-line pb-10 md:grid-cols-12 md:items-end">
          <h2 className="md:col-span-7">
            <WordsPullUp
              segments={[{ text: 'Formação e desenvolvimento contínuo.' }]}
              className="block text-2xl leading-[1.05] tracking-[-0.02em] text-cream sm:text-3xl md:text-4xl [&>span]:mr-[0.22em]"
            />
          </h2>
          <FadeUp delay={0.12} className="md:col-span-5">
            <p className="text-sm leading-relaxed text-muted md:text-base">
              Formação acadêmica, ferramentas de desenvolvimento e certificações técnicas que sustentam a evolução dos projetos.
            </p>
          </FadeUp>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          <FadeUp scale>
            <article className="flex h-full flex-col rounded-[1.5rem] border border-line bg-surface p-7 md:p-9">
              <div className="flex items-center justify-between gap-4">
                <GraduationCap size={24} weight="light" aria-hidden="true" className="text-cream/65" />
                <span className="font-mono text-[10px] tracking-[0.22em] text-cream/30">01 · ACADÊMICO</span>
              </div>
              <h3 className="mt-7 text-lg leading-snug text-cream md:text-xl">{degree.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{degree.institution}</p>
              <div className="mt-auto pt-8">
                <div className="flex flex-wrap items-center gap-2 border-t border-line pt-5 text-[10px] uppercase tracking-[0.14em] text-cream/45">
                  <span className="rounded-full border border-line px-3 py-1">{degree.status}</span>
                  <span>{degree.note}</span>
                </div>
              </div>
            </article>
          </FadeUp>

          <FadeUp delay={0.1} scale>
            <article className="flex h-full flex-col rounded-[1.5rem] border border-line bg-surface p-7 md:p-9">
              <div className="flex items-center justify-between gap-4">
                <Sparkle size={24} weight="light" aria-hidden="true" className="text-cream/65" />
                <span className="font-mono text-[10px] tracking-[0.22em] text-cream/30">02 · ECOSSISTEMA</span>
              </div>
              <h3 className="mt-7 text-lg leading-snug text-cream md:text-xl">{ecosystem.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{ecosystem.description}</p>
              <ul className="mt-auto flex flex-wrap gap-2 pt-8">
                {ecosystem.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-cream/55"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </FadeUp>

          <FadeUp delay={0.2} scale>
            <article className="flex h-full flex-col rounded-[1.5rem] border border-line bg-surface p-7 md:p-9">
              <div className="flex items-center justify-between gap-4">
                <Certificate size={24} weight="light" aria-hidden="true" className="text-cream/65" />
                <span className="font-mono text-[10px] tracking-[0.22em] text-cream/30">03 · CERTIFICAÇÕES</span>
              </div>
              <h3 className="mt-7 text-lg leading-snug text-cream md:text-xl">{certifications.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{certifications.description}</p>
              <ul className="mt-auto space-y-3 pt-8">
                {certifications.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 border-t border-line pt-3 text-sm text-cream/70 first:border-t-0 first:pt-0">
                    <span className="h-1.5 w-1.5 rounded-full bg-cream/45" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
