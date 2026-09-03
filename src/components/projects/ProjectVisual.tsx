import type { Project, ProjectPreviewImage } from '@/content/portfolio'

export function getProjectCover(project: Project): ProjectPreviewImage | null {
  const themes = project.previewThemes
  if (!themes) return null

  return themes[themes.default]?.cover ?? themes.dark?.cover ?? themes.light?.cover ?? null
}

export default function ProjectVisual({ project, className = '' }: { project: Project; className?: string }) {
  const cover = getProjectCover(project)

  if (cover) {
    const light = cover.theme === 'light'

    return (
      <picture className={`block h-full w-full ${light ? 'bg-[#f3f2ed]' : 'bg-[#080b0c]'} ${className}`}>
        <source srcSet={cover.avif} type="image/avif" />
        <source srcSet={cover.webp} type="image/webp" />
        <img
          src={cover.src}
          alt={cover.alt}
          width={cover.width}
          height={cover.height}
          loading="lazy"
          className="h-full w-full object-contain object-center"
        />
      </picture>
    )
  }

  return (
    <div
      className={`relative h-full overflow-hidden bg-[#070b0e] ${className}`}
      role="img"
      aria-label={`Composição abstrata do projeto ${project.name}`}
    >
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(77,131,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(77,131,255,.16)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute inset-x-[10%] top-[18%] rounded border border-[#4d83ff]/30 bg-black/45 p-3 shadow-[0_18px_45px_rgba(0,0,0,.42)]">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="size-1.5 rounded-full bg-white/70" />
          <span className="size-1.5 rounded-full bg-white/42" />
          <span className="size-1.5 rounded-full bg-[#728b84]" />
          <span className="ml-2 font-mono text-[8px] tracking-[0.18em] text-white/34">
            MÓDULOS
          </span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {['CLIENTES', 'SUPORTE', 'FLUXOS'].map((label) => (
            <span key={label} className="rounded border border-white/10 bg-white/[0.04] px-2 py-3 text-center font-mono text-[7px] text-white/45">
              {label}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute bottom-[14%] left-[18%] right-[18%] h-px bg-gradient-to-r from-transparent via-[#4d83ff]/60 to-transparent" />
    </div>
  )
}
