import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { cn } from '@/lib/utils'

/** Linha de 1px na base da navbar representando o avanço vertical da página. */
export default function ScrollProgress({ className }: { className?: string }) {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  // Com movimento reduzido o valor é aplicado direto, sem interpolação por mola.
  const smooth = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.3 })
  const progress = reduced ? scrollYProgress : smooth

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-x-4 bottom-0 h-px overflow-hidden', className)}
    >
      <motion.span
        style={{ scaleX: progress }}
        className="block h-full origin-left bg-cream/45"
      />
    </div>
  )
}
