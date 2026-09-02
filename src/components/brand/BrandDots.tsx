import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

const dots = ['#720B1D', '#9F102A', '#C61A3A'] as const

export default function BrandDots({ className = '' }: { className?: string }) {
  const reduced = useReducedMotion()

  return (
    <span className={cn('inline-flex shrink-0 items-center gap-1', className)} aria-hidden="true">
      {dots.map((color, index) => (
        <motion.span
          key={color}
          className="size-1.5 rounded-full"
          style={{ backgroundColor: color }}
          animate={reduced ? undefined : { opacity: [0.56, 1, 0.72, 0.56], y: [0, -1.5, 0, 0] }}
          transition={{ duration: 3.2, delay: index * 0.28, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </span>
  )
}
