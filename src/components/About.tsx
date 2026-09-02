import { Code } from '@phosphor-icons/react/dist/csr/Code'
import { GameController } from '@phosphor-icons/react/dist/csr/GameController'
import { MusicNotes } from '@phosphor-icons/react/dist/csr/MusicNotes'
import { PersonSimpleRun } from '@phosphor-icons/react/dist/csr/PersonSimpleRun'
import { SoccerBall } from '@phosphor-icons/react/dist/csr/SoccerBall'
import { User } from '@phosphor-icons/react/dist/csr/User'
import { motion, useReducedMotion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1] as const

const hobbies = [
  { label: 'Games', icon: GameController, color: '#8fb1b8' },
  { label: 'Futebol', icon: SoccerBall, color: '#9ba79d' },
  { label: 'Codar', icon: Code, color: '#c1aa72' },
  { label: 'Corrida', icon: PersonSimpleRun, color: '#a78f94' },
  { label: 'Música', icon: MusicNotes, color: '#b88491' },
] as const

export default function About() {
  const reduced = useReducedMotion()

  return (
    <section
      id="sobre"
      aria-labelledby="about-title"
      className="portfolio-chapter px-4 sm:px-6 lg:px-8"
    >
      <div className="portfolio-container-narrow w-full px-0 py-16 sm:px-4 lg:px-5 xl:py-20">
        <motion.h2
          id="about-title"
          className="flex items-center gap-3 text-[23px] font-semibold tracking-[-0.02em] text-white sm:text-2xl xl:text-[26px]"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <User size={24} weight="fill" className="text-[#8198ad]" aria-hidden="true" />
          Sobre mim
        </motion.h2>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, delay: reduced ? 0 : 0.05, ease: EASE }}
          className="mt-5 rounded-[6px] border border-white/18 bg-[#141918] p-5 sm:p-6 xl:p-7"
        >
          <h3 className="text-lg font-semibold text-white/92 xl:text-xl">Quem sou eu?</h3>
          <div className="mt-4 space-y-4 text-[15px] leading-[1.72] text-white/64 sm:text-base xl:text-lg">
            <p>
              Sou Gabriel, brasiliense, curioso por natureza e do tipo que não sossega enquanto não entende como alguma
              coisa funciona. Gosto de aprender na prática, testar, quebrar a cabeça e encontrar meu próprio jeito de
              resolver as coisas.
            </p>
            <p>
              Foi meio assim que a tecnologia entrou na minha vida. Antes de pensar nisso como profissão, eu já mexia em
              computador, instalava Windows, formatava máquinas, configurava drivers, particionava discos e tentava
              consertar qualquer coisa que desse problema.
            </p>
            <p>
              Fora disso, gosto de games, futebol, corrida e música. Também curto tocar meus próprios projetos,
              experimentar ideias novas e ter coisas para construir além do trabalho.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.5, delay: reduced ? 0 : 0.12, ease: EASE }}
          className="mt-4 rounded-[6px] border border-white/18 bg-[#141918] p-5 sm:p-6 xl:p-7"
        >
          <h3 className="text-lg font-semibold text-white/92 xl:text-xl">Hobbies</h3>
          <ul className="mt-4 flex flex-wrap gap-2.5" aria-label="Hobbies de Gabriel Brasil">
            {hobbies.map(({ label, icon: Icon, color }) => (
              <li
                key={label}
                className="inline-flex min-h-11 items-center gap-2.5 rounded-lg border border-white/20 bg-black/10 px-4 text-[15px] font-medium text-white/80 sm:text-base xl:min-h-12 xl:px-5"
              >
                <Icon size={17} weight="bold" color={color} aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
