import type { ReactNode } from 'react'
import { ArrowRight } from '@phosphor-icons/react/dist/csr/ArrowRight'

type Props = {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary'
  download?: boolean
  external?: boolean
}

export function ActionButton({
  href,
  children,
  variant = 'primary',
  download,
  external,
}: Props) {
  const base =
    'group inline-flex items-center gap-2 rounded-full text-sm font-medium transition-all duration-500 hover:gap-3 sm:text-base'

  if (variant === 'primary') {
    return (
      <a
        href={href}
        download={download}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
        className={`${base} bg-cream py-1.5 pl-6 pr-1.5 text-ink`}
      >
        {children}
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink transition-transform duration-500 group-hover:scale-110 sm:h-10 sm:w-10">
          <ArrowRight size={16} weight="regular" aria-hidden="true" className="text-cream" />
        </span>
      </a>
    )
  }

  return (
    <a
      href={href}
      download={download}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className={`${base} border border-line px-6 py-3 text-cream/85 hover:border-cream/40 hover:text-cream`}
    >
      {children}
    </a>
  )
}
