import { FadeUp, WordsPullUp } from '@/components/motion/Reveal'
import { experience } from '@/content/portfolio'

const stageLabels = ['Entender', 'Construir', 'Evoluir']

export default function Experience() {
  return (
    <section id="atuacao" className="scroll-mt-28 bg-ink px-3 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 border-b border-line pb-10 md:grid-cols-12 md:items-end">
          <h2 className="md:col-span-7">
            <WordsPullUp
              segments={[{ text: 'Como eu atuo na prática.' }]}
              className="block text-2xl leading-[1.05] tracking-[-0.02em] text-cream sm:text-3xl md:text-4xl [&>span]:mr-[0.22em]"
            />
          </h2>
          <FadeUp delay={0.15} className="md:col-span-5">
            <p className="text-sm text-muted md:text-base">
              Três frentes que se completam: entender a operação, transformar contexto em produto e sustentar a evolução depois da entrega.
            </p>
          </FadeUp>
        </div>

        <div className="mt-10 grid gap-2 rounded-[1.25rem] border border-line bg-surface/70 p-2 sm:grid-cols-3">
          {stageLabels.map((label, index) => (
            <div key={label} className="flex items-center gap-3 rounded-xl px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-cream/50">
              <span className="font-mono text-cream/30">0{index + 1}</span>
              <span>{label}</span>
              {index < stageLabels.length - 1 && <span className="ml-auto hidden text-cream/20 sm:block" aria-hidden="true">→</span>}
            </div>
          ))}
        </div>

        <ol className="mt-5 grid gap-4 lg:grid-cols-3">
          {experience.map((item, index) => (
            <FadeUp key={item.role} delay={index * 0.1} scale>
              <li className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-surface p-6 transition-[transform,border-color,background-color] duration-500 [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-cream/25 [@media(hover:hover)]:hover:bg-card md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-xs tracking-[0.2em] text-cream/30">0{index + 1}</span>
                  <span className="rounded-full border border-line px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-cream/45">
                    {stageLabels[index]}
                  </span>
                </div>
                <h3 className="mt-8 text-lg leading-snug text-cream md:text-xl">{item.role}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">{item.description}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-8">
                  {item.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-line px-3 py-1 text-[10px] uppercase tracking-[0.1em] text-cream/50"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-cream/40 transition-transform duration-500 group-hover:scale-x-100 motion-reduce:transition-none" aria-hidden="true" />
              </li>
            </FadeUp>
          ))}
        </ol>
      </div>
    </section>
  )
}
