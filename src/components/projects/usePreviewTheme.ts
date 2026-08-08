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
 * Mantém a seleção do conjunto real de capturas. Quando existem os dois temas,
 * a prévia começa pelo claro para dar contraste ao restante da seção escura.
 */
export function usePreviewTheme(previews?: ProjectPreviewThemes): PreviewThemeState {
  const canToggle = Boolean(previews?.dark && previews?.light)
  const initialTheme: PreviewTheme = canToggle ? 'light' : previews?.default ?? 'dark'
  const [theme, setTheme] = useState<PreviewTheme>(initialTheme)

  if (!previews) return { theme, setTheme, canToggle: false }

  return {
    theme,
    setTheme,
    canToggle,
    images: previews[theme] ?? previews.dark ?? previews.light,
  }
}
