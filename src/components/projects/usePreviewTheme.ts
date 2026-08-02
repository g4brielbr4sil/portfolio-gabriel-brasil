import { useEffect, useState } from 'react'
import type { PreviewTheme, ProjectPreviewSet, ProjectPreviewThemes } from '@/content/portfolio'

type PreviewThemeState = {
  theme: PreviewTheme
  setTheme: (theme: PreviewTheme) => void
  /** Só há alternância quando existem capturas reais nos dois temas. */
  canToggle: boolean
  images?: ProjectPreviewSet
  /** Tema inativo, liberado depois do primeiro paint para aquecer o cache. */
  preload?: { theme: PreviewTheme; images: ProjectPreviewSet }
}

/**
 * Concentra a regra do seletor de tema da prévia: qual conjunto está ativo,
 * se o controle deve existir e quando o segundo tema pode ser pré-carregado.
 * Os componentes só consomem o resultado — a lógica não se repete em cada card.
 */
export function usePreviewTheme(previews?: ProjectPreviewThemes): PreviewThemeState {
  const canToggle = Boolean(previews?.dark && previews?.light)
  const [theme, setTheme] = useState<PreviewTheme>(previews?.default ?? 'dark')
  const [warm, setWarm] = useState(false)

  // O segundo tema só entra na fila depois que o tema padrão já pintou.
  useEffect(() => {
    if (!canToggle) return
    const timeout = window.setTimeout(() => setWarm(true), 600)
    return () => window.clearTimeout(timeout)
  }, [canToggle])

  if (!previews) return { theme, setTheme, canToggle: false }

  const other: PreviewTheme = theme === 'dark' ? 'light' : 'dark'
  const otherImages = previews[other]

  return {
    theme,
    setTheme,
    canToggle,
    images: previews[theme] ?? previews.dark ?? previews.light,
    preload: warm && otherImages ? { theme: other, images: otherImages } : undefined,
  }
}
