import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  children: ReactNode
  variant?: 'outline' | 'solid'
  className?: string
}

/** Badge editorial — cápsula discreta em creme sobre preto. */
export function Badge({ children, variant = 'outline', className }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em]',
        variant === 'outline'
          ? 'border border-line text-cream/70'
          : 'bg-black/60 text-cream/80 backdrop-blur',
        className,
      )}
    >
      {children}
    </span>
  )
}
