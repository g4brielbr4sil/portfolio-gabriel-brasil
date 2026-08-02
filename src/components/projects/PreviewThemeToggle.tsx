import { Moon } from '@phosphor-icons/react/dist/csr/Moon'
import { Sun } from '@phosphor-icons/react/dist/csr/Sun'
import type { PreviewTheme } from '@/content/portfolio'
import { cn } from '@/lib/utils'

type Props = {
  theme: PreviewTheme
  onChange: (theme: PreviewTheme) => void
  className?: string
}

const options = [
  { value: 'dark' as const, label: 'Escuro', Icon: Moon },
  { value: 'light' as const, label: 'Claro', Icon: Sun },
]

/**
 * Cápsula segmentada que troca apenas as capturas do projeto — o tema do
 * portfólio permanece o mesmo. O rótulo textual acompanha o ícone, e o estado
 * ativo é anunciado por `aria-pressed`, não só pelo contraste.
 */
export default function PreviewThemeToggle({ theme, onChange, className }: Props) {
  return (
    <div
      role="group"
      aria-label="Tema da visualização do projeto"
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full border border-line bg-ink/80 p-0.5 backdrop-blur-sm',
        className,
      )}
    >
      {options.map(({ value, label, Icon }) => {
        const active = theme === value

        return (
          <button
            key={value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(value)}
            className={cn(
              // 44px de alvo no toque; um pouco mais discreto onde há ponteiro fino.
              'inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-3.5 text-[11px] tracking-[0.02em] transition-colors duration-300 [@media(hover:hover)]:min-h-[34px] [@media(hover:hover)]:px-3',
              active ? 'bg-cream text-ink' : 'text-cream/55 hover:text-cream',
            )}
          >
            <Icon size={13} weight={active ? 'fill' : 'regular'} aria-hidden="true" />
            {label}
          </button>
        )
      })}
    </div>
  )
}
