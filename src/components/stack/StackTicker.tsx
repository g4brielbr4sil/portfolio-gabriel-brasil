import { useReducedMotion } from 'motion/react'

type Props = {
  items: string[]
  /** Segundos para percorrer um ciclo completo — quanto maior, mais lento. */
  duration?: number
}

/**
 * Letreiro horizontal contínuo. A lista é duplicada e o trilho desloca exatamente
 * metade da própria largura, o que fecha o loop sem tranco no reinício.
 */
export default function StackTicker({ items, duration = 38 }: Props) {
  const reduced = useReducedMotion()

  // Movimento reduzido: grade estática, com o mesmo conteúdo.
  if (reduced) {
    return (
      <ul className="flex flex-wrap gap-2.5">
        {items.map((item) => (
          <li key={item}>
            <Chip>{item}</Chip>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="group relative -mx-7 overflow-hidden md:-mx-10">
      {/* Bordas esfumadas para o letreiro nascer e morrer dentro do card. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-surface to-transparent md:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-surface to-transparent md:w-16" />

      <ul
        aria-label="Stack principal"
        style={{ animationDuration: `${duration}s` }}
        className="flex w-max animate-[ticker_linear_infinite] [@media(hover:hover)]:group-hover:[animation-play-state:paused]"
      >
        {/* Sem `gap`: o espaçamento vive no item, então metade da trilha é
            exatamente a lista original e o loop fecha sem emenda. */}
        {[...items, ...items].map((item, index) => (
          <li key={`${item}-${index}`} aria-hidden={index >= items.length} className="pr-2.5 md:pr-3">
            <Chip>{item}</Chip>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Chip({ children }: { children: string }) {
  return (
    <span className="inline-block whitespace-nowrap rounded-full border border-line bg-ink/40 px-4 py-2 text-sm tracking-[-0.01em] text-cream sm:text-base md:px-5 md:text-lg">
      {children}
    </span>
  )
}
