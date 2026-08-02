import type { MouseEvent } from 'react'

type Props = {
  label: string
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

export default function ProjectCaseStudyButton({ label, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line bg-white/5 px-4 text-xs text-cream/75 transition-colors hover:bg-white/10 hover:text-cream"
    >
      {label}
    </button>
  )
}