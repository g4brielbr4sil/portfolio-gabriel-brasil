import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

/**
 * Ponto de status com pulso mínimo — anel expandindo devagar, sem brilho.
 * Estático quando o usuário pede movimento reduzido.
 */
export default function StatusDot({ className }: { className?: string }) {
  const reduced = useReducedMotion()

  return (
    <span
      aria-hidden="true"
      className={cn('relative inline-flex h-1.5 w-1.5 shrink-0 items-center justify-center', className)}
    >
      <span className="absolute inset-0 rounded-full bg-cream/70" />
      {!reduced && (
        <motion.span
          className="absolute inset-0 rounded-full border border-cream/45"
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: [0.5, 0, 0.5], scale: [1, 2.1, 1] }}
          transition={{ duration: 3.6, ease: 'easeInOut', repeat: Infinity }}
        />
      )}
    </span>
  )
}
