import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowsOutSimple } from '@phosphor-icons/react/dist/csr/ArrowsOutSimple'
import { CaretLeft } from '@phosphor-icons/react/dist/csr/CaretLeft'
import { CaretRight } from '@phosphor-icons/react/dist/csr/CaretRight'
import { Pause } from '@phosphor-icons/react/dist/csr/Pause'
import { Play } from '@phosphor-icons/react/dist/csr/Play'
import type { PreviewTheme, ProjectPreviewImage } from '@/content/portfolio'
import { cn } from '@/lib/utils'
import { useProjectCarousel } from '@/hooks/useProjectCarousel'
import PreviewThemeToggle from '@/components/projects/PreviewThemeToggle'

type Props = {
  projectName: string
  theme: PreviewTheme
  images: ProjectPreviewImage[]
  canToggleTheme: boolean
  onThemeChange: (theme: PreviewTheme) => void
  onOpenGallery: (payload: { theme: PreviewTheme; index: number; opener: HTMLElement | null }) => void
  preload?: { theme: PreviewTheme; images: ProjectPreviewImage[] }
  className?: string
}

function pictureProps(image: ProjectPreviewImage, eager: boolean) {
  return {
    src: image.webp,
    alt: image.alt,
    width: image.width,
    height: image.height,
    loading: eager ? ('eager' as const) : ('lazy' as const),
    fetchPriority: eager ? ('high' as const) : ('auto' as const),
    decoding: 'async' as const,
  }
}

function PreviewPicture({ image, eager, className }: { image: ProjectPreviewImage; eager?: boolean; className?: string }) {
  return (
    <picture>
      <source srcSet={image.avif} type="image/avif" />
      <source srcSet={image.webp} type="image/webp" />
      <img {...pictureProps(image, Boolean(eager))} className={className} />
    </picture>
  )
}

function FallbackPreview({ projectName }: { projectName: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%),linear-gradient(180deg,#141414,#0a0a0a)] px-4 text-center">
      <div>
        <p className="font-serif text-lg italic text-cream/80">Prévia indisponível</p>
        <p className="mt-2 text-sm text-cream/40">{projectName}</p>
      </div>
    </div>
  )
}

export default function ProjectCardCarousel({
  projectName,
  theme,
  images,
  canToggleTheme,
  onThemeChange,
  onOpenGallery,
  preload,
  className,
}: Props) {
  const reduced = useReducedMotion()
  const carousel = useProjectCarousel({ length: images.length, reducedMotion: Boolean(reduced) })
  const current = images[carousel.index]
  const nextImage = images[(carousel.index + 1) % images.length]

  if (images.length === 0) {
    return <FallbackPreview projectName={projectName} />
  }

  return (
    <div
      ref={carousel.containerRef}
      role="region"
      aria-roledescription="carrossel"
      aria-label={`Capturas do projeto ${projectName}`}
      className={cn('relative h-full', className)}
      onMouseEnter={carousel.handlers.onMouseEnter}
      onMouseLeave={carousel.handlers.onMouseLeave}
      onFocusCapture={carousel.handlers.onFocusCapture}
      onBlurCapture={carousel.handlers.onBlurCapture}
    >
      <div className="absolute inset-0 overflow-hidden bg-[#f3efe8]">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),transparent_26%),radial-gradient(circle_at_top,rgba(43,74,112,0.14),transparent_45%)]" />

        <button
          type="button"
          onClick={(event) => onOpenGallery({ theme, index: carousel.index, opener: event.currentTarget })}
          aria-label="Abrir galeria do projeto"
          className="group absolute inset-0 z-10 cursor-pointer"
        >
          <span className="sr-only">Ver todas as telas</span>
        </button>

        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={current.id}
            initial={reduced ? { opacity: 0 } : { opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, x: -12 }}
            transition={{ duration: reduced ? 0.12 : 0.3, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <PreviewPicture
              image={current}
              eager={carousel.index === 0}
              className={cn(
                'h-full w-full object-contain object-top transition-transform duration-500 [@media(hover:hover)]:group-hover:scale-[1.01]',
                current.device === 'mobile' ? 'mx-auto max-w-[55%] object-contain md:max-w-[45%]' : '',
              )}
            />
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#ece6db]/70 via-transparent to-transparent" />

        {preload && preload.images[0] && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0">
            <PreviewPicture image={preload.images[0]} eager={false} className="h-full w-full object-contain" />
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 z-20 border-t border-black/10 bg-[#f7f2e9]/90 p-3 backdrop-blur-md md:p-3.5">
          <div className="flex items-end gap-2">
            <button
              type="button"
              onClick={() => carousel.previous()}
              aria-label="Imagem anterior"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/80 text-[#111111] shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-colors hover:border-black/20 hover:bg-white"
            >
              <CaretLeft size={18} weight="regular" aria-hidden="true" />
            </button>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={(event) => onOpenGallery({ theme, index: carousel.index, opener: event.currentTarget })}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-black/10 bg-white/90 px-3.5 text-xs text-[#111111] shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-colors hover:border-black/20 hover:bg-white"
                >
                  <ArrowsOutSimple size={14} weight="regular" aria-hidden="true" />
                  Ver todas as telas
                </button>

                <span className="font-mono text-[11px] tracking-[0.16em] text-[#111111]/70">
                  {String(carousel.index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                </span>
              </div>

              <div className="mt-2 flex items-center gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {images.map((image, itemIndex) => {
                  const active = itemIndex === carousel.index
                  return (
                    <button
                      key={image.id}
                      type="button"
                      onClick={() => carousel.goTo(itemIndex)}
                      aria-label={`Ir para a imagem ${itemIndex + 1} de ${images.length}`}
                      aria-current={active ? 'true' : undefined}
                      className={cn(
                        'h-2.5 min-w-2.5 rounded-full transition-all duration-300',
                        active ? 'w-6 bg-[#111111]' : 'bg-[#111111]/20 hover:bg-[#111111]/35',
                      )}
                    />
                  )
                })}
              </div>

              <div className="mt-2 flex items-center gap-2 text-[11px] text-[#111111]/70">
                <span className="truncate">{current.caption}</span>
                <span className="hidden md:inline">·</span>
                <span className="hidden md:inline truncate">
                  {carousel.isPlaying ? 'apresentação em andamento' : 'apresentação pausada'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => carousel.next()}
              aria-label="Próxima imagem"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/80 text-[#111111] shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-colors hover:border-black/20 hover:bg-white"
            >
              <CaretRight size={18} weight="regular" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={carousel.togglePlayback}
              aria-label={carousel.isPlaying ? 'Pausar apresentação' : 'Reproduzir apresentação'}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/80 text-[#111111] shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-colors hover:border-black/20 hover:bg-white"
            >
              {carousel.isPlaying ? (
                <Pause size={16} weight="regular" aria-hidden="true" />
              ) : (
                <Play size={16} weight="regular" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {canToggleTheme && (
          <PreviewThemeToggle
            theme={theme}
            onChange={onThemeChange}
            className="absolute left-3 top-3 z-20 shadow-[0_8px_22px_rgba(0,0,0,0.25)]"
          />
        )}

        <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-black/10 group-hover:ring-black/20" />
      </div>

      <p aria-live="polite" className="sr-only">
        {carousel.isPlaying ? `Imagem ${carousel.index + 1} de ${images.length}: ${current.caption}` : `Apresentação pausada. Imagem ${carousel.index + 1} de ${images.length}: ${current.caption}`}
      </p>

      {nextImage && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0">
          <PreviewPicture image={nextImage} eager={false} className="h-full w-full object-contain" />
        </div>
      )}
    </div>
  )
}