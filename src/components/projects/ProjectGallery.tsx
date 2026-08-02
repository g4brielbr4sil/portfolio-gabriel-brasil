import { useEffect, useMemo, useRef, useState, type PointerEvent } from 'react'
import { ArrowsOutSimple } from '@phosphor-icons/react/dist/csr/ArrowsOutSimple'
import { CaretLeft } from '@phosphor-icons/react/dist/csr/CaretLeft'
import { CaretRight } from '@phosphor-icons/react/dist/csr/CaretRight'
import type { PreviewTheme, ProjectPreviewImage, ProjectPreviewThemes } from '@/content/portfolio'
import { cn } from '@/lib/utils'
import PreviewThemeToggle from '@/components/projects/PreviewThemeToggle'

type Props = {
  projectName: string
  previewThemes?: ProjectPreviewThemes
  initialTheme: PreviewTheme
  initialIndex: number
  onThemeChange?: (theme: PreviewTheme) => void
  onOpenProject?: () => void
}

function PreviewPicture({ image, eager, className }: { image: ProjectPreviewImage; eager?: boolean; className?: string }) {
  return (
    <picture>
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
        className={className}
      />
    </picture>
  )
}

export default function ProjectGallery({
  projectName,
  previewThemes,
  initialTheme,
  initialIndex,
  onThemeChange,
  onOpenProject,
}: Props) {
  const hasToggle = Boolean(previewThemes?.dark && previewThemes?.light)
  const [theme, setTheme] = useState<PreviewTheme>(initialTheme)
  const [index, setIndex] = useState(initialIndex)
  const galleryRef = useRef<HTMLDivElement | null>(null)
  const touchStart = useRef<number | null>(null)

  useEffect(() => {
    setTheme(initialTheme)
    setIndex(initialIndex)
  }, [initialIndex, initialTheme])

  const images = useMemo(() => {
    const current = previewThemes?.[theme]
    const fallback = previewThemes?.dark ?? previewThemes?.light
    return current?.images ?? fallback?.images ?? []
  }, [previewThemes, theme])

  useEffect(() => {
    setIndex((current) => (current >= images.length ? 0 : current))
  }, [images.length])

  useEffect(() => {
    const node = galleryRef.current
    if (!node) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (!images.length) return
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setIndex((current) => (current - 1 + images.length) % images.length)
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        setIndex((current) => (current + 1) % images.length)
      }
      if (event.key === 'Home') {
        event.preventDefault()
        setIndex(0)
      }
      if (event.key === 'End') {
        event.preventDefault()
        setIndex(images.length - 1)
      }
    }

    node.addEventListener('keydown', onKeyDown)
    return () => node.removeEventListener('keydown', onKeyDown)
  }, [images.length])

  const current = images[index] ?? images[0]

  if (!current) {
    return (
      <div className="flex min-h-[24rem] items-center justify-center rounded-[1.5rem] border border-line bg-[#0c0c0c] text-cream/55">
        Prévia indisponível
      </div>
    )
  }

  function handleThemeChange(nextTheme: PreviewTheme) {
    setTheme(nextTheme)
    setIndex(0)
    onThemeChange?.(nextTheme)
  }

  const swipeHandlers = {
    onPointerDown: (event: PointerEvent<HTMLDivElement>) => {
      touchStart.current = event.clientX
    },
    onPointerUp: (event: PointerEvent<HTMLDivElement>) => {
      if (touchStart.current == null || !images.length) return
      const delta = event.clientX - touchStart.current
      touchStart.current = null
      if (Math.abs(delta) < 36) return
      setIndex((currentIndex) =>
        delta < 0 ? (currentIndex + 1) % images.length : (currentIndex - 1 + images.length) % images.length,
      )
    },
    onPointerCancel: () => {
      touchStart.current = null
    },
  }

  return (
    <div ref={galleryRef} tabIndex={0} className="flex h-full flex-col gap-4 outline-none">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-cream/35">Galeria real</p>
          <p className="mt-1 text-sm text-cream/60">{projectName}</p>
        </div>
        <span className="font-mono text-[11px] tracking-[0.16em] text-cream/45">
          {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </span>
      </div>

      {hasToggle && (
        <PreviewThemeToggle
          theme={theme}
          onChange={handleThemeChange}
          className="w-full justify-center md:w-auto md:justify-start"
        />
      )}

      <div
        className={cn(
          'relative touch-pan-y overflow-hidden rounded-[1.5rem] border border-line bg-black/40',
          current.device === 'mobile' ? 'mx-auto w-full max-w-[22rem] md:max-w-[24rem]' : 'w-full',
        )}
        {...swipeHandlers}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_55%)]" />
        <div className="flex min-h-[min(58vh,680px)] items-center justify-center p-4 md:min-h-[min(64vh,740px)]">
          <PreviewPicture image={current} eager className="h-full max-h-[min(58vh,680px)] w-full object-contain md:max-h-[min(64vh,740px)]" />
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 border-t border-white/8 bg-[#0a0a0a]/88 p-3 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setIndex((currentIndex) => (currentIndex - 1 + images.length) % images.length)}
            aria-label="Imagem anterior"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-cream transition-colors hover:bg-white/10"
          >
            <CaretLeft size={18} weight="regular" aria-hidden="true" />
          </button>
          <p className="min-w-0 flex-1 truncate text-center text-[11px] text-cream/55">{current.caption}</p>
          <button
            type="button"
            onClick={() => setIndex((currentIndex) => (currentIndex + 1) % images.length)}
            aria-label="Próxima imagem"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-cream transition-colors hover:bg-white/10"
          >
            <CaretRight size={18} weight="regular" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="flex snap-x gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {images.map((image, itemIndex) => {
          const active = itemIndex === index
          return (
            <button
              key={image.id}
              type="button"
              onClick={() => setIndex(itemIndex)}
              className={cn(
                'relative h-20 min-w-[6rem] snap-start overflow-hidden rounded-2xl border bg-black/35 p-1 transition-all duration-300 md:h-24 md:min-w-[7.5rem]',
                active ? 'border-cream/60 ring-1 ring-cream/25' : 'border-white/8 opacity-65 hover:opacity-90',
              )}
              aria-label={`Ir para a imagem ${itemIndex + 1} de ${images.length}`}
              aria-current={active ? 'true' : undefined}
            >
              <PreviewPicture image={image} className="h-full w-full object-contain" />
            </button>
          )
        })}
      </div>

      <div className="grid gap-2 text-sm text-cream/65 md:grid-cols-[1fr_auto] md:items-center">
        <p>{current.caption}</p>
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-cream/38">
          <ArrowsOutSimple size={13} weight="regular" aria-hidden="true" />
          {current.device === 'mobile' ? 'Captura mobile' : 'Captura desktop'}
        </div>
      </div>

      {onOpenProject && (
        <button
          type="button"
          onClick={onOpenProject}
          className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-line bg-white/5 px-4 text-sm text-cream/80 transition-colors hover:bg-white/10 hover:text-cream md:w-auto md:self-start"
        >
          <ArrowsOutSimple size={14} weight="regular" aria-hidden="true" />
          Abrir projeto real
        </button>
      )}
    </div>
  )
}
