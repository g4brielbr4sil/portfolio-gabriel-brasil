import type { ReactNode } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { EnvelopeSimple } from '@phosphor-icons/react/dist/csr/EnvelopeSimple'
import { GithubLogo } from '@phosphor-icons/react/dist/csr/GithubLogo'
import { LinkedinLogo } from '@phosphor-icons/react/dist/csr/LinkedinLogo'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { contact } from '@/content/portfolio'
import gabrielAvatar from '@/assets/profile/gabriel-avatar.webp'

const EASE = [0.22, 1, 0.36, 1] as const

const HERO_COPY =
  'Sou Gabriel Brasil, Desenvolvedor Full Stack e Analista de Sistemas em Brasília, DF. Desenvolvo soluções digitais de ponta a ponta, conectando interfaces, APIs, dados, automações e integrações para transformar problemas reais em sistemas funcionais, bem estruturados e confiáveis.'

const sequence: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.12, staggerChildren: 0.08 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.46, ease: EASE },
  },
}

const contactCards = [
  {
    label: 'Email',
    value: contact.email,
    href: contact.mailto,
    icon: <EnvelopeSimple size={18} weight="regular" aria-hidden="true" />,
  },
  {
    label: 'LinkedIn',
    value: 'gabrielbrasildev',
    href: contact.linkedin,
    icon: <LinkedinLogo size={18} weight="regular" aria-hidden="true" />,
    external: true,
  },
  {
    label: 'GitHub',
    value: 'g4brielbr4sil',
    href: contact.github,
    icon: <GithubLogo size={18} weight="regular" aria-hidden="true" />,
    external: true,
  },
] satisfies Array<{
  label: string
  value: string
  href: string
  icon: ReactNode
  external?: boolean
}>

export default function Hero() {
  const reduced = useReducedMotion()

  return (
    <header
      id="inicio"
      className="relative flex min-h-[100svh] scroll-mt-24 items-center overflow-hidden px-4 pb-12 pt-[104px] sm:px-6 lg:px-8 xl:pb-16 xl:pt-[112px]"
    >
      <motion.div
        className="hero-grid portfolio-container relative z-10 grid items-center gap-10 sm:gap-12 min-[860px]:grid-cols-[minmax(0,1fr)_350px] min-[860px]:gap-[42px] xl:grid-cols-[minmax(0,1fr)_410px] xl:gap-16 2xl:grid-cols-[minmax(0,1fr)_440px] 2xl:gap-20"
        variants={sequence}
        initial={reduced ? false : 'hidden'}
        animate="visible"
      >
        <div className="contents min-[860px]:block">
          <motion.h1
            variants={item}
            className="hero-area-title hero-display text-[68px] leading-[0.78] text-white sm:text-[70px]"
          >
            OLÁ
            <motion.span
              animate={reduced ? undefined : { opacity: [1, 1, 0, 0, 1] }}
              transition={{ duration: 1.7, times: [0, 0.47, 0.5, 0.97, 1], repeat: Infinity, ease: 'linear' }}
            >
              !
            </motion.span>
          </motion.h1>

          <motion.p
            variants={item}
            className="hero-area-text mt-6 max-w-[540px] text-[15px] leading-[1.65] text-white/74 sm:mt-7 sm:text-base lg:text-[17px] xl:mt-8 xl:max-w-[650px] xl:text-[18px]"
          >
            {HERO_COPY}
          </motion.p>

          <motion.div
            variants={item}
            className="hero-area-cards mt-7 grid max-w-[540px] grid-cols-1 gap-3 min-[470px]:grid-cols-3 sm:mt-8 xl:mt-9 xl:max-w-[650px] xl:gap-4"
          >
            {contactCards.map((card) => (
              <ContactCard key={card.label} {...card} />
            ))}
          </motion.div>
        </div>

        <motion.div variants={item} className="hero-area-avatar">
          <PersonalPortrait />
        </motion.div>
      </motion.div>

    </header>
  )
}

function ContactCard({
  label,
  value,
  href,
  icon,
  external = false,
}: {
  label: string
  value: string
  href: string
  icon: ReactNode
  external?: boolean
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group flex min-h-[106px] min-w-0 flex-col justify-between rounded-[11px] border border-white/24 bg-black/42 p-3.5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] backdrop-blur-sm transition-colors duration-200 hover:border-white/42 hover:bg-black/52 xl:min-h-[114px] xl:p-4"
      aria-label={`${label}: ${value}`}
    >
      <span className="flex items-start justify-between gap-3 text-white/75">
        {icon}
        <ArrowUpRight
          size={14}
          weight="regular"
          className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
      <span>
        <span className="block text-[13px] font-semibold text-white xl:text-sm">{label}</span>
        <span className="mt-0.5 block truncate text-[11px] text-white/50 xl:text-[12px]">{value}</span>
      </span>
    </a>
  )
}

function PersonalPortrait() {
  const reduced = useReducedMotion()

  return (
    <div
      className="relative aspect-square w-full max-w-[350px] overflow-visible rounded-[3px] bg-[#2d171c] shadow-[0_24px_80px_rgba(69,22,31,0.18)] xl:max-w-[410px] 2xl:max-w-[440px]"
      role="img"
      aria-label="Ilustração de Gabriel Brasil"
    >
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: reduced ? 0 : 0.18, ease: EASE }}
        className="absolute inset-0 overflow-hidden rounded-[3px] bg-[#170f12]"
      >
        <motion.img
          src={gabrielAvatar}
          alt=""
          width="1200"
          height="896"
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover object-center opacity-[0.88] saturate-[0.78] brightness-[0.88]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/24 via-black/[0.04] to-black/14" />
      </motion.div>
    </div>
  )
}
