import { FadeUp, WordsPullUp } from '@/components/motion/Reveal'
import { experience } from '@/content/portfolio'

export default function Experience() {
  return (
    <section id="atuacao" className="scroll-mt-28 bg-ink px-3 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <h2 className="md:col-span-7">
            <WordsPullUp
              segments={[{ text: 'Como eu atuo na prática.' }]}
              className="block text-2xl leading-[1.05] tracking-[-0.02em] text-cream sm:text-3xl md:text-4xl [&>span]:mr-[0.22em]"
            />
          </h2>
          <FadeUp delay={0.15} className="md:col-span-5">
            <p className="text-sm text-muted md:text-base">
              Três frentes de atuação que se completam: compreender a operação, construir soluções
              funcionais e sustentar a evolução após a entrega.
            </p>
          </FadeUp>
        </div>

        <ol className="mt-14 border-l border-line pl-6 md:pl-10">
          {experience.map((item, index) => (
            <FadeUp key={item.role} delay={index * 0.1}>
              <li className="relative pb-12 last:pb-0">
                <span className="absolute -left-[1.6rem] top-2 h-2 w-2 rounded-full bg-cream/50 md:-left-[2.6rem]" />
                <div className="grid gap-4 rounded-[1.25rem] border border-line/70 bg-white/[0.03] p-5 md:grid-cols-12 md:gap-8 md:p-7">
                  <h3 className="text-base text-cream md:col-span-4 md:text-lg">{item.role}</h3>
                  <div className="md:col-span-8">
                    <p className="text-sm leading-relaxed text-muted">{item.description}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {item.skills.map((skill) => (
                        <li
                          key={skill}
                          className="rounded-full border border-line px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-cream/55"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            </FadeUp>
          ))}
        </ol>
      </div>
    </section>
  )
}
