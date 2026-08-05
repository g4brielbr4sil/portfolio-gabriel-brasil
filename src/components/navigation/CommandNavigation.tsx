import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { MagnifyingGlass } from '@phosphor-icons/react/dist/csr/MagnifyingGlass'
import {
  externalActions,
  sections,
  type NavAction,
  type NavSection,
  type SectionId,
} from '@/config/navigation'
import type { NavigationHandler } from '@/lib/navigation-state'
import { cn } from '@/lib/utils'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onNavigate: NavigationHandler
  onCloseAutoFocus: () => void
}

type Entry =
  | { kind: 'section'; key: string; item: NavSection }
  | { kind: 'action'; key: string; item: NavAction }

const entries: Entry[] = [
  ...sections.map((item): Entry => ({ kind: 'section', key: item.id, item })),
  ...externalActions.map((item): Entry => ({ kind: 'action', key: item.id, item })),
]

/** Remove acentos e caixa para a busca aceitar "atuacao" e "Atuação". */
function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

/**
 * Navegação rápida no estilo command palette, construída sobre o Dialog do Radix
 * já usado no projeto — sem biblioteca adicional.
 */
export default function CommandNavigation({ open, onOpenChange, onNavigate, onCloseAutoFocus }: Props) {
  const [query, setQuery] = useState('')
  const [highlight, setHighlight] = useState(0)
  const listId = useId()
  const listRef = useRef<HTMLDivElement>(null)

  const results = useMemo(() => {
    const term = normalize(query.trim())
    if (!term) return entries
    return entries.filter((entry) =>
      normalize(`${entry.item.label} ${entry.item.description}`).includes(term),
    )
  }, [query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setHighlight(0)
    }
  }, [open])

  useEffect(() => {
    setHighlight(0)
  }, [query])

  useEffect(() => {
    listRef.current
      ?.querySelector('[data-highlighted="true"]')
      ?.scrollIntoView({ block: 'nearest' })
  }, [highlight, results.length])

  function run(entry: Entry) {
    if (entry.kind === 'section') {
      onNavigate(entry.item.id, { focus: true })
      return
    }

    const action = entry.item
    onOpenChange(false)
    if (action.download) {
      const link = document.createElement('a')
      link.href = action.href
      link.download = ''
      link.click()
      return
    }
    const opened = window.open(action.href, action.external ? '_blank' : '_self', 'noopener,noreferrer')
    if (!opened && action.external) window.location.assign(action.href)
  }

  function onKeyDown(event: KeyboardEvent) {
    if (results.length === 0) return
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setHighlight((index) => (index + 1) % results.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setHighlight((index) => (index - 1 + results.length) % results.length)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      const entry = results[highlight]
      if (entry) run(entry)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-[2px] data-[state=closed]:animate-[fade-out_180ms_ease] data-[state=open]:animate-[fade-in_220ms_ease] motion-reduce:animate-none motion-reduce:transition-none" />
        <Dialog.Content
          onKeyDown={onKeyDown}
          onCloseAutoFocus={(event) => {
            event.preventDefault()
            onCloseAutoFocus()
          }}
          className="fixed left-1/2 top-[12vh] z-[70] w-[min(94vw,34rem)] -translate-x-1/2 overflow-hidden rounded-2xl border border-line bg-ink shadow-[0_28px_90px_rgba(0,0,0,0.7)] data-[state=closed]:animate-[fade-out_180ms_ease] data-[state=open]:animate-[sheet-in_260ms_cubic-bezier(0.16,1,0.3,1)] motion-reduce:animate-none motion-reduce:transition-none"
        >
          <Dialog.Title className="sr-only">Navegação rápida</Dialog.Title>
          <Dialog.Description className="sr-only">
            Busque uma seção do portfólio ou um canal profissional e pressione Enter.
          </Dialog.Description>

          <div className="flex items-center gap-3 border-b border-line px-5 py-4">
            <MagnifyingGlass size={18} weight="light" aria-hidden="true" className="text-cream/45" />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar seção, perfil ou currículo"
              aria-label="Buscar destino"
              role="combobox"
              aria-expanded="true"
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={results[highlight] ? `${listId}-${results[highlight].key}` : undefined}
              className="w-full bg-transparent text-sm text-cream placeholder:text-cream/30 focus:outline-none"
            />
            <kbd className="hidden rounded border border-line px-1.5 py-0.5 font-sans text-[10px] uppercase tracking-[0.12em] text-cream/35 sm:block">
              Esc
            </kbd>
          </div>

          <div
            ref={listRef}
            id={listId}
            role="listbox"
            aria-label="Destinos"
            className="max-h-[min(56vh,26rem)] overflow-y-auto overscroll-contain p-2"
          >
            {results.length === 0 && (
              <p className="px-3 py-6 text-center text-xs text-cream/40">Nenhum destino encontrado.</p>
            )}

            {results.map((entry, index) => {
              const Icon = entry.item.icon
              const highlighted = index === highlight
              return (
                <button
                  key={entry.key}
                  id={`${listId}-${entry.key}`}
                  type="button"
                  role="option"
                  aria-selected={highlighted}
                  data-highlighted={highlighted}
                  onMouseMove={() => setHighlight(index)}
                  onClick={() => run(entry)}
                  className={cn(
                    'flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-200',
                    highlighted ? 'bg-cream/[0.08]' : 'bg-transparent',
                  )}
                >
                  <Icon
                    size={18}
                    weight="light"
                    aria-hidden="true"
                    className={cn('mt-0.5 shrink-0', highlighted ? 'text-cream' : 'text-cream/45')}
                  />
                  <span className="min-w-0">
                    <span className="block text-sm text-cream">{entry.item.label}</span>
                    <span className="block truncate text-xs text-cream/45">
                      {entry.item.description}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
