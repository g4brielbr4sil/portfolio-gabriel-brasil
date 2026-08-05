import { useState } from 'react'
import type { ProjectPreviewImage } from '@/content/portfolio'
import { cn } from '@/lib/utils'

type Props = {
  image: ProjectPreviewImage
  eager?: boolean
  className?: string
  imgClassName?: string
}

export default function ResponsivePicture({ image, eager = false, className, imgClassName }: Props) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div role="img" aria-label={`${image.alt} Prévia indisponível.`} className={cn('flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.07),transparent_58%),#0b0b0b] p-6 text-center', className)}>
        <div><p className="font-serif text-lg italic text-cream/75">Prévia indisponível</p><p className="mt-2 text-xs text-cream/40">{image.caption}</p></div>
      </div>
    )
  }

  return (
    <picture className={cn('block h-full w-full', className)}>
      <source srcSet={image.avif} type="image/avif" />
      <source srcSet={image.webp} type="image/webp" />
      <img
        src={image.webp}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding="async"
        onError={() => setFailed(true)}
        className={cn('h-full w-full object-contain', imgClassName)}
      />
    </picture>
  )
}
