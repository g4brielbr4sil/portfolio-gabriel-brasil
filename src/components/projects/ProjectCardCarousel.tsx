import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowsOutSimple } from '@phosphor-icons/react/dist/csr/ArrowsOutSimple'
import { CaretLeft } from '@phosphor-icons/react/dist/csr/CaretLeft'
import { CaretRight } from '@phosphor-icons/react/dist/csr/CaretRight'
import { Pause } from '@phosphor-icons/react/dist/csr/Pause'
import { Play } from '@phosphor-icons/react/dist/csr/Play'
import { useEffect, useState, type KeyboardEvent } from 'react'
import type { PreviewTheme, ProjectPreviewImage } from '@/content/portfolio'
import { cn } from '@/lib/utils'
import { useProjectCarousel } from '@/hooks/useProjectCarousel'
import PreviewThemeToggle from '@/components/projects/PreviewThemeToggle'
import ResponsivePicture from '@/components/projects/ResponsivePicture'
import ProjectPreviewFrame from '@/components/projects/ProjectPreviewFrame'

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
  const [announcement, setAnnouncement] = useState('')
  const current = images[carousel.index]
  const nextImage = images[(carousel.index + 1) % images.length]

  useEffect(() => {
    carousel.goTo(0, false)
  }, [theme])

  if (images.length === 0) return <FallbackPreview projectName={projectName} />

  function announce(index: number) {
    const image = images[index]
    if (image) setAnnouncement(`Imagem ${index + 1} de ${images.length}: ${image.caption}`)
  }

  function previous() {
    const index = (carousel.index - 1 + images.length) % images.length
    carousel.previous()
    announce(index)
  }

  function next() {
    const index = (carousel.index + 1) % images.length
    carousel.next()
    announce(index)
  }

  function goTo(index: number) {
    carousel.goTo(index)
    announce(index)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      previous()
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      next()
    }
    if (event.key === 'Home') {
      event.preventDefault()
      goTo(0)
    }
    if (event.key === 'End') {
      event.preventDefault()
      goTo(images.length - 1)
    }
  }

  function changeTheme(nextTheme: PreviewTheme) {
    onThemeChange(nextTheme)
    setAnnouncement(`Tema ${nextTheme === 'dark' ? 'escuro' : 'claro'} selecionado.`)
  }

  return (
    <div
      ref={carousel.containerRef}
      role="region"
      aria-roledescription="carrossel"
      aria-label={`Capturas do projeto ${projectName}`}
      tabIndex={0}
      className={cn('relative h-full outline-none', className)}
      onKeyDown={handleKeyDown}
      onMouseEnter={carousel.handlers.onMouseEnter}
      onMouseLeave={carousel.handlers.onMouseLeave}
      onFocusCapture={carousel.handlers.onFocusCapture}
      onBlurCapture={carousel.handlers.onBlurCapture}
    >
      <div className="absolute inset-0 overflow-hidden bg-[#101010]">
        <button
          type="button"
          onClick={(event) => onOpenGallery({ theme, index: carousel.index, opener: event.currentTarget })}
          aria-label={`Abrir galeria de ${projectName}`}
          className="group absolute inset-0 z-10 cursor-pointer"
        >
          <span className="sr-only">Explorar projeto</span>
        </button>

        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={current.id}
            initial={reduced ? { opacity: 0 } : { opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, x: -12 }}
            transition={{ duration: reduced ? 0.01 : 0.3, ease: 'easeOut' }}
            className="absolute inset-0 p-3 pb-[4.75rem]"
          >
            <ProjectPreviewFrame image={current}>
              <ResponsivePicture image={current} imgClassName="object-contain object-top transition-transform duration-300 [@media(hover:hover)]:group-hover:scale-[1.01]" />
            </ProjectPreviewFrame>
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

        <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/8 bg-[#0a0a0a]/88 px-3 py-2.5 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={previous}
              aria-label="Imagem anterior"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-cream transition-colors hover:bg-white/10"
            >
              <CaretLeft size={18} weight="regular" aria-hidden="true" />
            </button>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <div className="hidden items-center sm:flex" aria-label={`Imagem ${carousel.index + 1} de ${images.length}`}>
                  {images.map((image, index) => (
                    <button
                      key={image.id}
                      type="button"
                      onClick={() => goTo(index)}
                      aria-label={`Ir para a imagem ${index + 1} de ${images.length}`}
                      aria-current={index === carousel.index ? 'true' : undefined}
                      className="group inline-flex h-11 w-11 items-center justify-center rounded-full"
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          'h-2.5 rounded-full transition-all duration-300',
                          index === carousel.index
                            ? 'w-6 bg-cream'
                            : 'w-2.5 bg-cream/25 group-hover:bg-cream/45',
                        )}
                      />
                    </button>
                  ))}
                </div>
                <span className="hidden font-mono text-[11px] tracking-[0.14em] text-cream/55 sm:inline">
                  {String(carousel.index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            {images.length > 1 && (
              <button
                type="button"
                onClick={carousel.togglePlayback}
                aria-label={carousel.isPlaying ? 'Pausar apresentação' : 'Reproduzir apresentação'}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-cream transition-colors hover:bg-white/10 motion-reduce:hidden"
              >
                {carousel.isPlaying ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
              </button>
            )}

            <button
              type="button"
              onClick={next}
              aria-label="Próxima imagem"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-cream transition-colors hover:bg-white/10"
            >
              <CaretRight size={18} weight="regular" aria-hidden="true" />
            </button>
          </div>
        </div>

        {canToggleTheme && (
          <PreviewThemeToggle
            theme={theme}
            onChange={changeTheme}
            className="absolute left-3 top-3 z-20 shadow-[0_8px_22px_rgba(0,0,0,0.25)]"
          />
        )}

        <button
          type="button"
          onClick={(event) => onOpenGallery({ theme, index: carousel.index, opener: event.currentTarget })}
          className="absolute right-3 top-3 z-20 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/10 bg-black/65 px-3.5 text-xs text-cream/80 backdrop-blur-md transition-colors hover:bg-black/80 hover:text-cream"
        >
          <ArrowsOutSimple size={14} weight="regular" aria-hidden="true" />
          <span className="hidden sm:inline">Galeria</span>
        </button>
      </div>

      <p aria-live="polite" className="sr-only">{announcement}</p>

      {nextImage && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0">
          <ResponsivePicture image={nextImage} imgClassName="object-contain" />
        </div>
      )}

      {preload?.images[0] && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0">
          <ResponsivePicture image={preload.images[0]} imgClassName="object-contain" />
        </div>
      )}
    </div>
  )
}
