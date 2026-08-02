import { GraduationCap } from '@phosphor-icons/react/dist/csr/GraduationCap'
import { Sparkle } from '@phosphor-icons/react/dist/csr/Sparkle'
import { FadeUp, WordsPullUp } from '@/components/motion/Reveal'
import { education } from '@/content/portfolio'

export default function Education() {
  const { degree, ecosystem } = education

  return (
    <section id="formacao" className="scroll-mt-28 bg-ink px-3 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <h2>
          <WordsPullUp
            segments={[{ text: 'Formação e desenvolvimento contínuo.' }]}
            className="block text-2xl leading-[1.05] tracking-[-0.02em] text-cream sm:text-3xl md:text-4xl [&>span]:mr-[0.22em]"
          />
        </h2>

        <div className="mt-12 grid gap-4 lg:grid-cols-5">
          <FadeUp scale className="lg:col-span-2">
            <div className="h-full rounded-[1.5rem] border border-line bg-surface p-7 md:p-9">
              <GraduationCap size={22} weight="light" aria-hidden="true" className="text-cream/60" />
              <h3 className="mt-6 text-lg leading-snug text-cream md:text-xl">{degree.title}</h3>
              <p className="mt-3 text-sm text-muted">{degree.institution}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-5 text-[11px] uppercase tracking-[0.16em] text-cream/45">
                <span>{degree.status}</span>
                <span className="hidden h-px w-6 bg-line sm:block" />
                <span>{degree.note}</span>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.12} scale className="lg:col-span-3">
            <div className="h-full rounded-[1.5rem] border border-line bg-surface p-7 md:p-9">
              <Sparkle size={22} weight="light" aria-hidden="true" className="text-cream/60" />
              <h3 className="mt-6 text-lg leading-snug text-cream md:text-xl">{ecosystem.title}</h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                {ecosystem.description}
              </p>
              <ul className="mt-8 flex flex-wrap gap-2 border-t border-line pt-6">
                {ecosystem.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-cream/55"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
