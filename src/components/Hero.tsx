import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { GitBranch } from '@phosphor-icons/react/dist/csr/GitBranch'
import { Pulse } from '@phosphor-icons/react/dist/csr/Pulse'
import { ActionButton } from '@/components/ui/Button'
import { ImageWithFallback } from '@/components/ui/ImageWithFallback'
import StatusDot from '@/components/ui/StatusDot'
import { WordsPullUp } from '@/components/motion/Reveal'
import { contact } from '@/content/portfolio'

const EASE = [0.16, 1, 0.3, 1] as const

const PORTRAIT =
  'https://images.unsplash.com/photo-1570216601541-fa11cfaf03e5?w=1600&h=2000&fit=crop&auto=format'

export default function Hero() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Deslocamento mínimo dos cards flutuantes — desativado com movimento reduzido.
  const cardDrift = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -28])
  const cardDriftSlow = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -14])

  const fade = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease: EASE },
  })

  return (
    <header id="inicio" ref={sectionRef} className="h-[100svh] min-h-[640px] p-3 md:p-6">
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-surface md:rounded-[2rem]">
        <ImageWithFallback
          src={PORTRAIT}
          alt="Retrato masculino em luz lateral dramática — imagem provisória"
          width={1600}
          height={2000}
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[65%_center] opacity-70 grayscale md:object-[70%_center]"
        />

        {/* Composição de sistemas: malha, fluxos e cartões de produto */}
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <SystemLines reduced={Boolean(reduced)} />
        <div className="pointer-events-none absolute inset-0 noise-overlay opacity-[0.55] mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/85" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/25 to-transparent" />

        <motion.div
          {...fade(0.9)}
          style={{ y: cardDrift }}
          className="pointer-events-none absolute right-4 top-24 hidden w-60 rounded-2xl border border-line bg-black/45 p-4 backdrop-blur-md lg:block xl:w-72"
        >
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-cream/50">
            <Pulse size={14} weight="light" />
            Fila de atendimento
          </div>
          <div className="mt-4 space-y-3">
            {[
              { label: 'Integração ERP · webhook', value: 'Resolvido' },
              { label: 'Homologação módulo fiscal', value: 'Em teste' },
              { label: 'Automação de relatórios', value: 'Ativa' },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-3 text-[11px]">
                <span className="text-cream/70">{row.label}</span>
                <span className="rounded-full border border-line px-2 py-0.5 text-cream/50">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          {...fade(1.1)}
          style={{ y: cardDriftSlow }}
          className="pointer-events-none absolute right-10 top-[22rem] hidden w-64 rounded-2xl border border-line bg-black/45 p-4 font-mono text-[11px] leading-relaxed text-cream/60 backdrop-blur-md xl:block"
        >
          <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-cream/40">
            <GitBranch size={14} weight="light" />
            api/tickets
          </div>
          <div>
            <span className="text-cream/85">POST</span> /v1/tickets
          </div>
          <div>&#123; "origem": "operacao",</div>
          <div>&nbsp;&nbsp;"prioridade": "alta" &#125;</div>
          <div className="mt-1 text-cream/40">201 · created in 84ms</div>
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 px-5 pb-8 md:px-10 md:pb-12">
          <motion.div
            {...fade(0.35)}
            className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.2em] text-cream/45"
          >
            <span>Brasília, Distrito Federal</span>
            <span className="hidden h-px w-8 bg-line sm:block" aria-hidden="true" />
            <span className="inline-flex items-center gap-2.5">
              <StatusDot />
              Aberto a novos desafios
            </span>
            <span className="hidden h-px w-8 bg-line sm:block" aria-hidden="true" />
            <span>Sistemas, automações e produtos digitais</span>
          </motion.div>

          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-10">
            <h1 className="lg:col-span-8">
              <WordsPullUp
                segments={[{ text: 'Gabriel Brasil' }]}
                asterisk
                className="block text-[17vw] font-medium leading-[0.85] tracking-[-0.06em] text-cream sm:text-[16vw] lg:text-[13vw]"
              />
            </h1>

            <div className="lg:col-span-4">
              <motion.p
                {...fade(0.5)}
                className="text-xs uppercase tracking-[0.22em] text-cream/60 sm:text-[13px]"
              >
                Analista de Sistemas e Desenvolvedor
              </motion.p>
              <motion.p
                {...fade(0.6)}
                className="mt-4 max-w-md text-sm leading-[1.35] text-primary/70 md:text-base"
              >
                Transformo processos, ideias e problemas reais em produtos digitais funcionais.
              </motion.p>
              <motion.div {...fade(0.75)} className="mt-7 flex flex-wrap items-center gap-3">
                <ActionButton href="#projetos">Ver projetos</ActionButton>
                <ActionButton href={contact.resume} variant="secondary" download>
                  Baixar currículo
                </ActionButton>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

/** Linhas discretas de fluxo — arquitetura, integrações e processos. */
function SystemLines({ reduced }: { reduced: boolean }) {
  const paths = [
    'M0 210 H180 V420 H340',
    'M180 210 V90 H430',
    'M1200 560 H980 V330 H820',
    'M980 560 V680 H700',
  ]
  const nodes = [
    [180, 210],
    [340, 420],
    [430, 90],
    [980, 560],
    [820, 330],
    [700, 680],
  ]

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-35"
      viewBox="0 0 1200 800"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g stroke="rgba(222,219,200,0.35)" strokeWidth="1" fill="none">
        {paths.map((d, index) => (
          <motion.path
            key={d}
            d={d}
            initial={reduced ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.4, delay: 0.6 + index * 0.18, ease: EASE }}
          />
        ))}
      </g>
      <g fill="rgba(222,219,200,0.5)">
        {nodes.map(([cx, cy], index) => (
          <motion.circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r={3}
            initial={reduced ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 1.6 + index * 0.12, ease: EASE }}
          />
        ))}
      </g>
    </svg>
  )
}
