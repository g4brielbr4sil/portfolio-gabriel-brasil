import * as Popover from '@radix-ui/react-popover'
import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { CaretDown } from '@phosphor-icons/react/dist/csr/CaretDown'
import { MagnifyingGlass } from '@phosphor-icons/react/dist/csr/MagnifyingGlass'
import ActiveNavigationIndicator from '@/components/navigation/ActiveNavigationIndicator'
import BsbClock from '@/components/navigation/BsbClock'
import ScrollProgress from '@/components/navigation/ScrollProgress'
import {
  desktopSections,
  externalActions,
  primaryDesktopSections,
  secondaryDesktopSections,
  type NavSection,
  type SectionId,
} from '@/config/navigation'
import { cn } from '@/lib/utils'

type Props = {
  active: SectionId
  onNavigate: (id: SectionId) => void
  onOpenCommand: () => void
  shortcutLabel: string
  /** Verdadeiro depois que o usuário deixa a área principal do Hero. */
  scrolled: boolean
}

/**
 * Navbar desktop e tablet. A cápsula é sempre fixa — a mudança entre o estado
 * integrado ao Hero e o estado compacto é puramente visual, sem salto de layout.
 */
export default function DesktopNavigation(props: Props) {
  return (
    <>
      {/* lg+: todas as seções diretas. */}
      <NavShell {...props} items={desktopSections} more={false} className="hidden lg:flex" />
      {/* Tablet e notebooks estreitos: Formação e links externos vão para "Mais". */}
      <NavShell {...props} items={primaryDesktopSections} more className="hidden md:flex lg:hidden" />
    </>
  )
}

type ShellProps = Props & {
  items: NavSection[]
  more: boolean
  className?: string
}

function NavShell({
  active,
  onNavigate,
  onOpenCommand,
  shortcutLabel,
  scrolled,
  items,
  more,
  className,
}: ShellProps) {
  const indicatorId = more ? 'nav-indicator-compact' : 'nav-indicator-wide'

  return (
    <div
      className={cn(
        'pointer-events-auto relative w-fit max-w-[min(96vw,68rem)] items-center gap-2 whitespace-nowrap border border-line px-3 py-2',
        'transition-[background-color,box-shadow,border-radius,border-color,transform,opacity] duration-[380ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
        scrolled
          ? // Barra compacta destacada do topo, com desfoque discreto.
            'translate-y-3 rounded-full bg-ink/80 opacity-100 shadow-[0_12px_32px_rgba(0,0,0,0.55)] backdrop-blur-md'
          : // Integrada ao painel do Hero: preta, sem sombra, presa ao topo.
            'translate-y-0 rounded-b-3xl border-t-transparent bg-ink shadow-none',
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onNavigate('inicio')}
        aria-label="Ir para o início"
        className="rounded-full px-3 py-1.5 text-sm tracking-[-0.01em] text-cream transition-colors duration-200 hover:text-cream/70"
      >
        <span className="font-medium">GB</span>
        <span className="ml-2 hidden text-[10px] uppercase tracking-[0.24em] text-cream/35 xl:inline">
          Gabriel Brasil
        </span>
      </button>

      <span className="mx-1 h-5 w-px bg-line" aria-hidden="true" />

      <ul className="flex items-center gap-1">
        {items.map((section) => {
          const isActive = active === section.id
          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => onNavigate(section.id)}
                aria-current={isActive ? 'location' : undefined}
                className={cn(
                  'relative isolate rounded-full px-3.5 py-1.5 text-sm transition-colors duration-200',
                  isActive ? 'text-cream' : 'text-cream/55 hover:text-cream/90',
                )}
              >
                {isActive && <ActiveNavigationIndicator layoutId={indicatorId} />}
                {section.label}
              </button>
            </li>
          )
        })}

        {more && <MoreMenu active={active} onNavigate={onNavigate} />}
      </ul>

      <span className="mx-1 h-5 w-px bg-line" aria-hidden="true" />

      <BsbClock className="mr-1 hidden lg:inline-flex" />

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

      <button
        type="button"
        onClick={() => onNavigate('contato')}
        aria-current={active === 'contato' ? 'location' : undefined}
        className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-cream px-4 py-1.5 text-sm text-ink transition-all duration-200 hover:gap-2.5"
      >
        Contato
        <ArrowUpRight size={14} weight="regular" aria-hidden="true" />
      </button>

      <ScrollProgress />
    </div>
  )
}

function MoreMenu({
  active,
  onNavigate,
}: {
  active: SectionId
  onNavigate: (id: SectionId) => void
}) {
  const hasActive = secondaryDesktopSections.some((section) => section.id === active)

  return (
    <li>
      <Popover.Root>
        <Popover.Trigger
          className={cn(
            'group inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm transition-colors duration-200',
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
            className="z-50 w-56 rounded-2xl border border-line bg-ink p-2 shadow-[0_20px_60px_rgba(0,0,0,0.6)] data-[state=closed]:animate-[fade-out_180ms_ease] data-[state=open]:animate-[sheet-in_240ms_cubic-bezier(0.16,1,0.3,1)]"
          >
            {secondaryDesktopSections.map((section) => (
              <Popover.Close asChild key={section.id}>
                <button
                  type="button"
                  onClick={() => onNavigate(section.id)}
                  aria-current={active === section.id ? 'location' : undefined}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm text-cream/75 transition-colors duration-200 hover:bg-cream/[0.07] hover:text-cream"
                >
                  <section.icon size={16} weight="light" aria-hidden="true" />
                  {section.label}
                </button>
              </Popover.Close>
            ))}

            <span className="my-1.5 block h-px bg-line" aria-hidden="true" />

            {externalActions.map((action) => (
              <a
                key={action.id}
                href={action.href}
                download={action.download}
                target={action.external ? '_blank' : undefined}
                rel={action.external ? 'noreferrer' : undefined}
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
