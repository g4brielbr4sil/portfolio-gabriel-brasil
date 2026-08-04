import { MagnifyingGlass } from '@phosphor-icons/react/dist/csr/MagnifyingGlass'
import { X } from '@phosphor-icons/react/dist/csr/X'
import BsbClock from '@/components/navigation/BsbClock'
import StatusDot from '@/components/ui/StatusDot'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@/components/ui/sheet'
import { externalActions, sections, type SectionId } from '@/config/navigation'
import { cn } from '@/lib/utils'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  active: SectionId
  onNavigate: (id: SectionId) => void
  onOpenCommand: () => void
}

/** Navegação completa do celular. O Radix cuida de foco, Escape e rolagem. */
export default function NavigationSheet({
  open,
  onOpenChange,
  active,
  onNavigate,
  onOpenCommand,
}: Props) {
  function go(id: SectionId) {
    onOpenChange(false)
    window.setTimeout(() => onNavigate(id), 0)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex flex-col gap-0 overflow-y-auto overscroll-contain p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <SheetTitle className="text-base text-cream">Gabriel Brasil</SheetTitle>
            <SheetDescription className="mt-1 text-[11px] uppercase tracking-[0.18em] text-cream/40">
              Analista de Sistemas e Desenvolvedor
            </SheetDescription>
          </div>
          <SheetClose
            aria-label="Fechar menu"
            className="-mr-1 -mt-1 rounded-full p-2 text-cream/70 transition-colors hover:text-cream"
          >
            <X size={18} weight="regular" aria-hidden="true" />
          </SheetClose>
        </div>

        <button
          type="button"
          onClick={onOpenCommand}
          className="mt-6 inline-flex min-h-[44px] w-full items-center gap-2.5 rounded-full border border-line px-4 text-sm text-cream/55 transition-colors hover:text-cream"
        >
          <MagnifyingGlass size={16} weight="regular" aria-hidden="true" />
          Navegação rápida
        </button>

        <p className="mt-8 text-[10px] uppercase tracking-[0.22em] text-cream/30">Seções</p>
        <ul className="mt-2 flex flex-col">
          {sections.map((section) => {
            const isActive = active === section.id
            return (
              <li key={section.id} className="border-b border-line/70 last:border-b-0">
                <a
                  href={section.href}
                  onClick={(event) => {
                    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
                    event.preventDefault()
                    go(section.id)
                  }}
                  aria-current={isActive ? 'location' : undefined}
                  className={cn(
                    'flex min-h-[52px] w-full items-center gap-3 py-3.5 text-left text-lg transition-colors duration-200',
                    isActive ? 'text-cream' : 'text-cream/60',
                  )}
                >
                  <section.icon
                    size={18}
                    weight="light"
                    aria-hidden="true"
                    className={isActive ? 'text-cream' : 'text-cream/35'}
                  />
                  {section.label}
                  {isActive && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cream/70" aria-hidden="true" />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        <p className="mt-8 text-[10px] uppercase tracking-[0.22em] text-cream/30">
          Ações secundárias
        </p>
        <ul className="mt-3 flex flex-col gap-1">
          {externalActions.map((action) => (
            <li key={action.id}>
              <a
                href={action.href}
                download={action.download}
                target={action.external ? '_blank' : undefined}
                rel={action.external ? 'noreferrer' : undefined}
                onClick={() => onOpenChange(false)}
                className="flex min-h-[44px] items-center gap-3 text-sm text-cream/60 transition-colors hover:text-cream"
              >
                <action.icon size={16} weight="light" aria-hidden="true" />
                {action.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-2 border-t border-line pt-6 text-[11px] uppercase tracking-[0.18em] text-cream/35">
          <span className="flex items-center justify-between gap-3">
            Brasília, Distrito Federal
            <BsbClock />
          </span>
          <span className="inline-flex items-center gap-2.5">
            <StatusDot />
            Aberto a novos desafios
          </span>
        </div>
      </SheetContent>
    </Sheet>
  )
}
