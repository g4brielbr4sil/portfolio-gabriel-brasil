import type { ReactNode } from 'react'
import type { ProjectPreviewImage } from '@/content/portfolio'
import { cn } from '@/lib/utils'

export default function ProjectPreviewFrame({ image, children, className }: { image: ProjectPreviewImage; children: ReactNode; className?: string }) {
  const mobile = image.device === 'mobile'
  const light = image.theme === 'light'

  return (
    <div
      className={cn(
        'flex h-full min-h-0 flex-col overflow-hidden border shadow-[0_18px_45px_rgba(0,0,0,0.24)]',
        light ? 'border-black/10 bg-[#f6f3ed]' : 'border-white/10 bg-[#0b0b0b]',
        mobile ? 'mx-auto max-w-sm rounded-[12px]' : 'w-full rounded-[6px]',
        className,
      )}
    >
      <div
        className={cn(
          'flex h-8 shrink-0 items-center gap-1.5 border-b px-3',
          light ? 'border-black/10' : 'border-white/8',
        )}
        aria-hidden="true"
      >
        <span className={cn('h-1.5 w-1.5 rounded-full', light ? 'bg-black/20' : 'bg-cream/20')} />
        <span className={cn('h-1.5 w-1.5 rounded-full', light ? 'bg-black/15' : 'bg-cream/15')} />
        <span className={cn('h-1.5 w-1.5 rounded-full', light ? 'bg-black/10' : 'bg-cream/10')} />
        <span className={cn('ml-2 h-1.5 w-20 rounded-full', light ? 'bg-black/8' : 'bg-cream/8')} />
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  )
}
