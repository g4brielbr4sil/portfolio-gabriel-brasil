import { useEffect, useState, type MouseEvent } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { CaretDown } from '@phosphor-icons/react/dist/csr/CaretDown'
import { MagnifyingGlass } from '@phosphor-icons/react/dist/csr/MagnifyingGlass'
import type { MotionValue } from 'motion/react'
import ActiveNavigationIndicator from '@/components/navigation/ActiveNavigationIndicator'
import BsbClock from '@/components/navigation/BsbClock'
import ScrollProgress from '@/components/navigation/ScrollProgress'
import {
  desktopSections,
  externalActions,
  secondaryDesktopSections,
  type NavSection,
  type SectionId,
} from '@/config/navigation'
import {
  isModifiedNavigationEvent,
  shouldNavigateInPage,
  type NavigationHandler,
} from '@/lib/navigation-state'
import { cn } from '@/lib/utils'

type Props = {
  active: SectionId
  onNavigate: NavigationHandler
  onOpenCommand: () => void
  shortcutLabel: string
  scrolled: boolean
  scrollProgress: MotionValue<number>
}

function handleSectionClick(
  event: MouseEvent<HTMLAnchorElement>,
  section: Pick<NavSection, 'id'>,
  onNavigate: NavigationHandler,
) {
  if (isModifiedNavigationEvent(event)) return
  if (!shouldNavigateInPage(window.location.pathname, section.id)) return
  event.preventDefault()
  onNavigate(section.id, { focus: event.detail === 0 })
}

/** Uma única topbar responsiva para tablet e desktop. */
export default function DesktopNavigation({
  active,
  onNavigate,
  onOpenCommand,
  shortcutLabel,
  scrolled,
  scrollProgress,
}: Props) {
  return (
    <div
      data-navigation-bar
      className={cn(
        'pointer-events-auto relative hidden w-fit max-w-[calc(100vw-3rem)] items-center gap-1.5 whitespace-nowrap rounded-2xl border px-2.5 py-2 min-[56rem]:flex',
        'transition-[background-color,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
        scrolled
          ? 'border-line bg-ink/85 shadow-[0_12px_32px_rgba(0,0,0,0.55)] backdrop-blur-md'
          : 'border-line/70 bg-ink shadow-none',
      )}
    >
      <a
        href="/"
        onClick={(event) => handleSectionClick(event, { id: 'inicio' }, onNavigate)}
        aria-label="Ir para o início"
        aria-current={active === 'inicio' ? 'location' : undefined}
        className="rounded-full px-3 py-1.5 text-sm tracking-[-0.01em] text-cream transition-colors duration-200 hover:text-cream/70"
      >
        <span className="font-medium">GB</span>
        <span className="ml-2 hidden text-[10px] uppercase tracking-[0.24em] text-cream/35 min-[78rem]:inline">
          Gabriel Brasil
        </span>
      </a>

      <span className="mx-0.5 h-5 w-px bg-line" aria-hidden="true" />

      <ul className="flex items-center gap-0.5">
        {desktopSections.map((section) => {
          const isActive = active === section.id
          return (
            <li key={section.id} className={section.secondary ? 'hidden lg:block' : undefined}>
              <a
                href={section.href}
                onClick={(event) => handleSectionClick(event, section, onNavigate)}
                aria-current={isActive ? 'location' : undefined}
                className={cn(
                  'relative isolate rounded-full px-3 py-1.5 text-sm transition-colors duration-200',
                  isActive ? 'text-cream' : 'text-cream/55 hover:text-cream/90',
                )}
              >
                {isActive && <ActiveNavigationIndicator layoutId="desktop-nav-indicator" />}
                {section.label}
              </a>
            </li>
          )
        })}

        <MoreMenu active={active} onNavigate={onNavigate} />
      </ul>

      <span className="mx-0.5 h-5 w-px bg-line" aria-hidden="true" />

      <BsbClock className="mr-1 hidden min-[70rem]:inline-flex" />

      <button
        type="button"
        onClick={onOpenCommand}
        className="group inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs text-cream/55 transition-colors duration-200 hover:border-cream/30 hover:text-cream"
      >
        <MagnifyingGlass size={14} weight="regular" aria-hidden="true" />
        Navegar
        <kbd className="rounded border border-line px-1.5 py-0.5 font-sans text-[10px] tracking-[0.08em] text-cream/40">
          {shortcutLabel}
        </kbd>
      </button>

      <a
        href="/contato/"
        aria-current={active === 'contato' ? 'location' : undefined}
        className="ml-0.5 inline-flex items-center gap-1.5 rounded-full bg-cream px-3.5 py-1.5 text-sm text-ink transition-all duration-200 hover:gap-2.5"
      >
        Contato
        <ArrowUpRight size={14} weight="regular" aria-hidden="true" />
      </a>

      <ScrollProgress progress={scrollProgress} />
    </div>
  )
}

function MoreMenu({ active, onNavigate }: { active: SectionId; onNavigate: NavigationHandler }) {
  const [open, setOpen] = useState(false)
  const hasActive = secondaryDesktopSections.some((section) => section.id === active)

  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('resize', close)
    window.addEventListener('hashchange', close)
    window.addEventListener('popstate', close)
    return () => {
      window.removeEventListener('resize', close)
      window.removeEventListener('hashchange', close)
      window.removeEventListener('popstate', close)
    }
  }, [])

  return (
    <li className="lg:hidden">
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger
          aria-current={hasActive ? 'location' : undefined}
          className={cn(
            'group inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-colors duration-200',
            hasActive ? 'text-cream' : 'text-cream/55 hover:text-cream/90',
          )}
        >
          Mais
          <CaretDown
            size={12}
            weight="regular"
            aria-hidden="true"
            className="transition-transform duration-200 group-data-[state=open]:rotate-180"
          />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            align="end"
            sideOffset={10}
            className="z-[55] w-56 rounded-2xl border border-line bg-ink p-2 shadow-[0_20px_60px_rgba(0,0,0,0.6)] data-[state=closed]:animate-[fade-out_180ms_ease] data-[state=open]:animate-[sheet-in_240ms_cubic-bezier(0.16,1,0.3,1)]"
          >
            {secondaryDesktopSections.map((section) => (
              <a
                key={section.id}
                href={section.href}
                onClick={(event) => {
                  setOpen(false)
                  handleSectionClick(event, section, onNavigate)
                }}
                aria-current={active === section.id ? 'location' : undefined}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm text-cream/75 transition-colors duration-200 hover:bg-cream/[0.07] hover:text-cream"
              >
                <section.icon size={16} weight="light" aria-hidden="true" />
                {section.label}
              </a>
            ))}

            <span className="my-1.5 block h-px bg-line" aria-hidden="true" />

            {externalActions.map((action) => (
              <a
                key={action.id}
                href={action.href}
                download={action.download}
                target={action.external ? '_blank' : undefined}
                rel={action.external ? 'noopener noreferrer' : undefined}
                onClick={() => setOpen(false)}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-cream/60 transition-colors duration-200 hover:bg-cream/[0.07] hover:text-cream"
              >
                <action.icon size={16} weight="light" aria-hidden="true" />
                {action.label}
              </a>
            ))}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </li>
  )
}
