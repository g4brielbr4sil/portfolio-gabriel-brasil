import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

const dots = [0.4, 0.65, 0.95] as const

export default function BrandDots({ className = '' }: { className?: string }) {
  const reduced = useReducedMotion()

  return (
    <span className={cn('inline-flex shrink-0 items-center gap-1', className)} aria-hidden="true">
      {dots.map((intensity, index) => (
        <motion.span
          key={intensity}
          className="size-1.5 rounded-full"
          style={{ backgroundColor: `rgb(143 23 48 / ${intensity})` }}
          animate={reduced ? undefined : { opacity: [0.56, 1, 0.72, 0.56], y: [0, -1.5, 0, 0] }}
          transition={{ duration: 3.2, delay: index * 0.28, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </span>
  )
}
