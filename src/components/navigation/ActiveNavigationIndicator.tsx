import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

type Props = {
  /** Compartilhado entre os itens de um mesmo grupo para o indicador deslizar. */
  layoutId: string
  className?: string
}

/** Superfície discreta que desliza para trás do item ativo. */
export default function ActiveNavigationIndicator({ layoutId, className }: Props) {
  const reduced = useReducedMotion()

  return (
    <motion.span
      layoutId={reduced ? undefined : layoutId}
      aria-hidden="true"
      transition={{ type: 'spring', stiffness: 420, damping: 38, mass: 0.6 }}
      className={cn(
        'absolute inset-0 -z-10 rounded-full border border-line bg-cream/[0.07]',
        className,
      )}
    />
  )
}
