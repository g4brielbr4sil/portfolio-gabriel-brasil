import type { ReactNode } from 'react'
import type { ProjectPreviewImage } from '@/content/portfolio'
import { cn } from '@/lib/utils'

export default function ProjectPreviewFrame({ image, children, className }: { image: ProjectPreviewImage; children: ReactNode; className?: string }) {
  const mobile = image.device === 'mobile'

  return (
    <div className={cn('flex h-full min-h-0 flex-col overflow-hidden border border-white/10 bg-[#0b0b0b] shadow-[0_18px_45px_rgba(0,0,0,0.24)]', mobile ? 'mx-auto max-w-sm rounded-[1.75rem]' : 'w-full rounded-2xl', className)}>
      <div className="flex h-8 shrink-0 items-center gap-1.5 border-b border-white/8 px-3" aria-hidden="true">
        <span className="h-1.5 w-1.5 rounded-full bg-cream/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-cream/15" />
        <span className="h-1.5 w-1.5 rounded-full bg-cream/10" />
        <span className="ml-2 h-1.5 w-20 rounded-full bg-cream/8" />
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  )
}
