import { useState } from 'react'
import type { PreviewTheme, ProjectPreviewSet, ProjectPreviewThemes } from '@/content/portfolio'

type PreviewThemeState = {
  theme: PreviewTheme
  setTheme: (theme: PreviewTheme) => void
  canToggle: boolean
  images?: ProjectPreviewSet
  preload?: { theme: PreviewTheme; images: ProjectPreviewSet }
}

/**
 * Mantém a seleção do conjunto real de capturas. O tema inativo não é
 * pré-carregado automaticamente: ele entra no cache somente após interação.
 */
export function usePreviewTheme(previews?: ProjectPreviewThemes): PreviewThemeState {
  const canToggle = Boolean(previews?.dark && previews?.light)
  const [theme, setTheme] = useState<PreviewTheme>(previews?.default ?? 'dark')

  if (!previews) return { theme, setTheme, canToggle: false }

  return {
    theme,
    setTheme,
    canToggle,
    images: previews[theme] ?? previews.dark ?? previews.light,
  }
}
