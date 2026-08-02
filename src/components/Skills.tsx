import { ClipboardText } from '@phosphor-icons/react/dist/csr/ClipboardText'
import { Code } from '@phosphor-icons/react/dist/csr/Code'
import { FlowArrow } from '@phosphor-icons/react/dist/csr/FlowArrow'
import { RocketLaunch } from '@phosphor-icons/react/dist/csr/RocketLaunch'
import { FadeUp, WordsPullUp } from '@/components/motion/Reveal'
import { pillars } from '@/content/portfolio'

const icons = [ClipboardText, Code, FlowArrow, RocketLaunch]

export default function Skills() {
  return (
    <section className="bg-ink px-3 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <h2>
          <WordsPullUp
            segments={[{ text: 'Da análise à entrega.' }]}
            className="block text-2xl leading-[1.05] tracking-[-0.02em] text-cream sm:text-3xl md:text-4xl lg:text-5xl [&>span]:mr-[0.22em]"
          />
        </h2>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => {
            const Icon = icons[index]

            return (
              <FadeUp key={pillar.title} delay={index * 0.1}>
                <div className="h-full bg-ink p-7 transition-colors duration-500 hover:bg-surface md:p-8">
                  <Icon size={22} weight="light" aria-hidden="true" className="text-cream/70" />
                  <h3 className="mt-6 text-base text-cream md:text-lg">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{pillar.description}</p>
                </div>
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}
