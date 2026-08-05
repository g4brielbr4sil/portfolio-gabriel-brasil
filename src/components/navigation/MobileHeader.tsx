import { motion, useReducedMotion } from 'motion/react'
import { DotsThreeOutlineVertical } from '@phosphor-icons/react/dist/csr/DotsThreeOutlineVertical'
import type { MotionValue } from 'motion/react'
import BsbClock from '@/components/navigation/BsbClock'
import ScrollProgress from '@/components/navigation/ScrollProgress'
import type { SectionId } from '@/config/navigation'
import {
  isModifiedNavigationEvent,
  shouldNavigateInPage,
  type NavigationHandler,
} from '@/lib/navigation-state'
import { cn } from '@/lib/utils'

type Props = {
  onNavigate: NavigationHandler
  onOpenMenu: () => void
  scrolled: boolean
  scrollProgress: MotionValue<number>
}

/** Barra superior compacta do celular: GB, relógio de Brasília e menu. */
export default function MobileHeader({ onNavigate, onOpenMenu, scrolled, scrollProgress }: Props) {
  const reduced = useReducedMotion()
  const tap = reduced ? undefined : { scale: 0.94 }

  return (
    <div
      data-navigation-bar
      className={cn(
        'pointer-events-auto relative flex items-center justify-between gap-2 rounded-2xl border border-line px-1.5 py-1 min-[56rem]:hidden',
        'transition-[background-color,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
        scrolled
          ? 'bg-ink/85 shadow-[0_10px_28px_rgba(0,0,0,0.5)] backdrop-blur-md'
          : 'bg-ink shadow-none',
      )}
    >
      <motion.a
        href="/"
        whileTap={tap}
        onClick={(event) => {
          if (isModifiedNavigationEvent(event)) return
          if (!shouldNavigateInPage(window.location.pathname, 'inicio')) return
          event.preventDefault()
          onNavigate('inicio', { focus: event.detail === 0 })
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

      <ScrollProgress className="inset-x-3" progress={scrollProgress} />
    </div>
  )
}
