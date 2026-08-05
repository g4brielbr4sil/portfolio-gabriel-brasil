import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import ActiveNavigationIndicator from '@/components/navigation/ActiveNavigationIndicator'
import { dockSections, type SectionId } from '@/config/navigation'
import {
  isModifiedNavigationEvent,
  shouldNavigateInPage,
  type NavigationHandler,
} from '@/lib/navigation-state'
import { cn } from '@/lib/utils'

type Props = {
  active: SectionId
  onNavigate: NavigationHandler
  visible: boolean
}

/** Dock inferior exclusivo de celular, com os quatro destinos principais. */
export default function MobileDock({ active, onNavigate, visible }: Props) {
  const reduced = useReducedMotion()

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label="Navegação móvel"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={reduced ? { duration: 0 } : { duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] min-[56rem]:hidden"
        >
          <ul className="flex w-full max-w-sm items-center justify-between gap-1 rounded-[1.75rem] border border-line bg-ink/85 px-2 py-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.55)] backdrop-blur-md">
            {dockSections.map((section) => {
              const isActive = active === section.id
              return (
                <li key={section.id} className="flex-1">
                  <a
                    href={section.href}
                    onClick={(event) => {
                      if (isModifiedNavigationEvent(event)) return
                      if (!shouldNavigateInPage(window.location.pathname, section.id)) return
                      event.preventDefault()
                      onNavigate(section.id, { focus: event.detail === 0 })
                    }}
                    aria-label={section.label}
                    aria-current={isActive ? 'location' : undefined}
                    className={cn(
                      'relative isolate flex min-h-[44px] w-full flex-col items-center justify-center gap-0.5 rounded-[1.4rem] px-2 py-1.5 transition-colors duration-200',
                      isActive ? 'text-cream' : 'text-cream/50',
                    )}
                  >
                    {isActive && (
                      <ActiveNavigationIndicator
                        layoutId="dock-indicator"
                        className="rounded-[1.4rem]"
                      />
                    )}
                    <section.icon
                      size={19}
                      weight={isActive ? 'fill' : 'light'}
                      aria-hidden="true"
                    />
                    <span className="text-[10px] tracking-[0.04em]">{section.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
