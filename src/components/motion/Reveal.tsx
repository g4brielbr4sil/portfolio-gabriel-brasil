import { useRef, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react'

const EASE = [0.16, 1, 0.3, 1] as const

type FadeUpProps = {
  children: ReactNode
  delay?: number
  className?: string
  scale?: boolean
}

export function FadeUp({ children, delay = 0, className, scale = false }: FadeUpProps) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24, scale: scale ? 0.97 : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

type Segment = { text: string; className?: string }

type WordsPullUpProps = {
  segments: Segment[]
  className?: string
  delay?: number
  asterisk?: boolean
}

/** Cada palavra sobe de baixo para cima, com atraso encadeado. */
export function WordsPullUp({ segments, className, delay = 0, asterisk }: WordsPullUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()

  const words = segments.flatMap((segment) =>
    segment.text.split(' ').filter(Boolean).map((word) => ({ word, className: segment.className })),
  )

  return (
    <span ref={ref} className={className}>
      {words.map((entry, index) => {
        const isLast = index === words.length - 1

        return (
          <motion.span
            key={`${entry.word}-${index}`}
            className={`relative inline-block ${entry.className ?? ''}`}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, delay: delay + index * 0.08, ease: EASE }}
          >
            {entry.word}
            {asterisk && isLast && (
              <span
                aria-hidden="true"
                className="absolute -right-[0.32em] top-[0.6em] text-[0.28em] font-normal"
              >
                *
              </span>
            )}
            {!isLast && ' '}
          </motion.span>
        )
      })}
    </span>
  )
}

/** Revelação progressiva: cada caractere ganha opacidade conforme o scroll avança. */
export function ScrollRevealText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.35'] })
  const chars = text.split('')

  if (reduced) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    )
  }

  return (
    <p ref={ref} className={className}>
      {chars.map((char, index) => (
        <AnimatedChar
          key={index}
          char={char}
          progress={scrollYProgress}
          start={index / chars.length - 0.1}
          end={index / chars.length + 0.05}
        />
      ))}
    </p>
  )
}

function AnimatedChar({
  char,
  progress,
  start,
  end,
}: {
  char: string
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  start: number
  end: number
}) {
  const opacity = useTransform(progress, [start, end], [0.2, 1])

  return <motion.span style={{ opacity }}>{char}</motion.span>
}
