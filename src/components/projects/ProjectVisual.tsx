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

  const isHermes = project.slug === 'hermes-command-center'

  if (isHermes) {
    return (
      <div
        className={`relative h-full overflow-hidden bg-[#06090f] ${className}`}
        role="img"
        aria-label="Mockup conceitual do Hermes Command Center, sem dados privados"
      >
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(77,131,255,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(77,131,255,.15)_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="absolute inset-[8%] overflow-hidden rounded-xl border border-[#4d83ff]/30 bg-[#090d15]/94 shadow-[0_22px_55px_rgba(0,0,0,.5)]">
          <div className="flex h-[19%] items-center border-b border-white/8 px-[4%]">
            <div className="flex gap-1" aria-hidden="true">
              <span className="size-1.5 rounded-full bg-[#27447f]" />
              <span className="size-1.5 rounded-full bg-[#3a65bd]" />
              <span className="size-1.5 rounded-full bg-[#4d83ff]" />
            </div>
            <span className="ml-3 font-mono text-[7px] uppercase tracking-[0.18em] text-white/42">Hermes · ambiente protegido</span>
          </div>
          <div className="grid h-[81%] grid-cols-[25%_75%]">
            <div className="border-r border-white/8 p-[10%]">
              {['Visão geral', 'CRM', 'Finanças', 'Rotina'].map((label, index) => (
                <div key={label} className={`mb-[8%] rounded px-2 py-1.5 font-mono text-[6px] uppercase tracking-[0.08em] ${index === 0 ? 'bg-[#4d83ff]/15 text-[#8eafff]' : 'text-white/28'}`}>
                  {label}
                </div>
              ))}
            </div>
            <div className="p-[5%]">
              <span className="font-mono text-[6px] uppercase tracking-[0.15em] text-[#81a4f8]">Command Center conceitual</span>
              <div className="mt-[5%] grid grid-cols-3 gap-2">
                {['Pipeline', 'Aprovações', 'Agenda'].map((label) => (
                  <div key={label} className="rounded-md border border-white/8 bg-white/[0.025] p-2.5">
                    <span className="font-mono text-[6px] uppercase tracking-[0.08em] text-white/42">{label}</span>
                    <div className="mt-2 h-1 rounded-full bg-[#4d83ff]/20"><div className="h-full w-2/3 rounded-full bg-[#4d83ff]/58" /></div>
                  </div>
                ))}
              </div>
              <div className="mt-2 grid grid-cols-[1.35fr_.65fr] gap-2">
                <div className="rounded-md border border-white/8 bg-white/[0.025] p-2.5">
                  <span className="font-mono text-[6px] uppercase tracking-[0.08em] text-white/42">Operação integrada</span>
                  <div className="mt-2 grid gap-1.5"><span className="h-1.5 w-4/5 rounded-full bg-white/8" /><span className="h-1.5 w-3/5 rounded-full bg-white/6" /></div>
                </div>
                <div className="rounded-md border border-[#4d83ff]/18 bg-[#4d83ff]/[0.05] p-2.5 font-mono text-[6px] uppercase tracking-[0.08em] text-[#8eafff]">Sem dados privados</div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
