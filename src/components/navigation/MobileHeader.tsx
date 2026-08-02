import { motion, useReducedMotion } from 'motion/react'
import { DotsThreeOutlineVertical } from '@phosphor-icons/react/dist/csr/DotsThreeOutlineVertical'
import BsbClock from '@/components/navigation/BsbClock'
import ScrollProgress from '@/components/navigation/ScrollProgress'
import type { SectionId } from '@/config/navigation'
import { cn } from '@/lib/utils'

type Props = {
  onNavigate: (id: SectionId) => void
  onOpenMenu: () => void
  scrolled: boolean
}

/** Barra superior compacta do celular: GB, relógio de Brasília e menu. */
export default function MobileHeader({ onNavigate, onOpenMenu, scrolled }: Props) {
  const reduced = useReducedMotion()
  const tap = reduced ? undefined : { scale: 0.94 }

  return (
    <div
      className={cn(
        'pointer-events-auto relative flex items-center justify-between gap-2 border border-line px-1.5 py-1 md:hidden',
        'transition-[background-color,box-shadow,border-radius,border-color,transform] duration-[380ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
        scrolled
          ? 'translate-y-2 rounded-full bg-ink/85 shadow-[0_10px_28px_rgba(0,0,0,0.5)] backdrop-blur-md'
          : 'translate-y-0 rounded-b-2xl border-t-transparent bg-ink shadow-none',
      )}
    >
      <motion.a
        href="#inicio"
        whileTap={tap}
        onClick={(event) => {
          event.preventDefault()
          onNavigate('inicio')
        }}
        aria-label="Ir para o início"
        className="inline-flex h-11 min-w-11 items-center justify-center rounded-full px-3 text-sm font-medium text-cream"
      >
        GB
      </motion.a>

      <BsbClock className="mx-auto" />

      <motion.button
        type="button"
        whileTap={tap}
        onClick={onOpenMenu}
        aria-label="Abrir menu de navegação"
        aria-haspopup="dialog"
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-cream/75 transition-colors hover:text-cream"
      >
        <DotsThreeOutlineVertical size={17} weight="regular" aria-hidden="true" />
      </motion.button>

      <ScrollProgress className="inset-x-3" />
    </div>
  )
}
