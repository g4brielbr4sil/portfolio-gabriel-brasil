import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { PreviewTheme, ProjectPreviewImage, ProjectPreviewSet } from '@/content/portfolio'
import { cn } from '@/lib/utils'

const themeLabel: Record<PreviewTheme, string> = {
  dark: 'modo escuro',
  light: 'modo claro',
}

type ImageProps = {
  image: ProjectPreviewImage
  projectName: string
  theme: PreviewTheme
  eager?: boolean
  className?: string
}

/** Captura real do projeto, com o tema descrito no texto alternativo. */
export function PreviewImage({ image, projectName, theme, eager, className }: ImageProps) {
  return (
    <img
      src={image.src}
      alt={`${image.caption} da interface da ${projectName} em ${themeLabel[theme]}.`}
      width={image.width}
      height={image.height}
      decoding="async"
      loading={eager ? 'eager' : 'lazy'}
      className={cn('h-full w-full object-cover object-top', className)}
    />
  )
}

type Props = {
  projectName: string
  theme: PreviewTheme
  images: ProjectPreviewSet
  preload?: { theme: PreviewTheme; images: ProjectPreviewSet }
}

/**
 * Área de capa do card. A imagem trocada fica em posição absoluta dentro do
 * mesmo container, então a altura não muda e a página não salta na alternância.
 */
export default function ProjectPreview({ projectName, theme, images, preload }: Props) {
  const reduced = useReducedMotion()

  return (
    <div className="absolute inset-0">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={theme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.2, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <PreviewImage image={images.cover} projectName={projectName} theme={theme} />
        </motion.div>
      </AnimatePresence>

      {/* Aquece o cache do outro tema para a primeira troca já ser instantânea. */}
      {preload && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-0">
          <PreviewImage
            image={preload.images.cover}
            projectName={projectName}
            theme={preload.theme}
          />
        </div>
      )}
    </div>
  )
}
