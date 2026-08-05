import { motion, useReducedMotion, useSpring, type MotionValue } from 'motion/react'
import { cn } from '@/lib/utils'

/** Linha de 1px na base da navbar representando o avanço vertical da página. */
export default function ScrollProgress({
  className,
  progress,
}: {
  className?: string
  progress: MotionValue<number>
}) {
  const reduced = useReducedMotion()
  // Com movimento reduzido o valor é aplicado direto, sem interpolação por mola.
  const smooth = useSpring(progress, { stiffness: 180, damping: 30, mass: 0.3 })
  const scaleX = reduced ? progress : smooth

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-x-4 bottom-0 h-px overflow-hidden', className)}
    >
      <motion.span
        style={{ scaleX }}
        className="block h-full origin-left bg-cream/45"
      />
    </div>
  )
}
