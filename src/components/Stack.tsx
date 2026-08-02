import { FadeUp, WordsPullUp } from '@/components/motion/Reveal'
import StackTicker from '@/components/stack/StackTicker'
import { evolvingStack, mainStack, stackGroups } from '@/content/portfolio'

export default function Stack() {
  return (
    <section id="tecnologias" className="scroll-mt-28 bg-ink px-3 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 border-b border-line pb-10 md:grid-cols-12 md:items-end">
          <h2 className="md:col-span-7">
            <WordsPullUp
              segments={[{ text: 'Tecnologia aplicada, do produto à operação.' }]}
              className="block text-2xl leading-[1.05] tracking-[-0.02em] text-cream sm:text-3xl md:text-4xl [&>span]:mr-[0.22em]"
            />
          </h2>
          <FadeUp delay={0.15} className="md:col-span-5">
            <p className="text-sm text-muted md:text-base">
              Um ecossistema de ferramentas utilizadas para construir interfaces, APIs, bancos de
              dados, integrações, automações e ambientes de produção.
            </p>
          </FadeUp>
        </div>

        {/* Nível 1 — stack principal */}
        <FadeUp delay={0.1}>
          <div className="mt-12 overflow-hidden rounded-[1.5rem] border border-line bg-surface p-7 md:mt-14 md:p-10">
            <span className="text-[10px] uppercase tracking-[0.28em] text-primary">
              Stack principal
            </span>
            <div className="mt-7 md:mt-8">
              <StackTicker items={mainStack} />
            </div>
          </div>
        </FadeUp>

        {/* Nível 2 — ecossistema aplicado */}
        <FadeUp delay={0.15}>
          <p className="mt-14 text-[10px] uppercase tracking-[0.28em] text-cream/40">
            Ecossistema aplicado
          </p>
        </FadeUp>

        <dl className="mt-2">
          {stackGroups.map((group, index) => (
            <FadeUp key={group.category} delay={index * 0.06}>
              <div className="grid gap-3 border-b border-line py-7 md:grid-cols-12 md:items-baseline md:gap-8">
                <dt className="text-[11px] uppercase tracking-[0.22em] text-cream/45 md:col-span-4">
                  {group.category}
                </dt>
                <dd className="md:col-span-8">
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {group.items.map((item) => (
                      <span key={item} className="text-base text-cream/85 md:text-lg">
                        {item}
                      </span>
                    ))}
                  </div>
                  {group.note && (
                    <p className="mt-3 text-[11px] text-cream/35">{group.note}</p>
                  )}
                </dd>
              </div>
            </FadeUp>
          ))}
        </dl>

        {/* Nível 3 — em evolução */}
        <FadeUp delay={0.1}>
          <div className="mt-12 flex flex-col gap-4 rounded-[1.25rem] border border-line/60 border-dashed p-6 md:flex-row md:items-center md:gap-10 md:p-7">
            <span className="text-[10px] uppercase tracking-[0.28em] text-cream/35">
              Em evolução
            </span>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {evolvingStack.map((item) => (
                <span key={item} className="text-sm text-cream/45 md:text-base">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
