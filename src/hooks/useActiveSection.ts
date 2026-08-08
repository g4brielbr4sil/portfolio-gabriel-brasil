import { useCallback, useEffect, useState } from 'react'
import { sectionIds, type SectionId } from '@/config/navigation'

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Observa as seções da página e devolve a que ocupa a faixa central da viewport.
 * Um único IntersectionObserver cuida de todas as seções; nada é recalculado a
 * cada pixel de scroll.
 */
export function useActiveSection() {
  const [active, setActive] = useState<SectionId>('inicio')

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (elements.length === 0) return

    const ratios = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        }

        let bestId: string | null = null
        let bestRatio = 0
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestId = id
          }
        }

        // Topo absoluto da página sempre pertence ao Início.
        if (window.scrollY < 8) bestId = 'inicio'
        if (bestId) setActive(bestId as SectionId)
      },
      {
        // Faixa central: evita que duas seções disputem o estado ativo.
        rootMargin: '-45% 0px -45% 0px',
        threshold: [0, 0.01, 0.25, 0.5, 0.75, 1],
      },
    )

    for (const element of elements) observer.observe(element)
    return () => observer.disconnect()
  }, [])

  /** Rola até a seção, atualiza o hash e move o foco sem recarregar a página. */
  const navigate = useCallback((id: SectionId) => {
    const element = document.getElementById(id)
    if (!element) return

    const navOffset = window.innerWidth < 768 ? 84 : 104
    const top = element.getBoundingClientRect().top + window.scrollY - navOffset
    window.scrollTo({
      top,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    })

    if (window.location.hash !== `#${id}`) {
      window.history.replaceState(null, '', `#${id}`)
    }

    // Foco programático sem rolagem adicional, para leitores de tela.
    const hadTabIndex = element.hasAttribute('tabindex')
    if (!hadTabIndex) element.setAttribute('tabindex', '-1')
    element.focus({ preventScroll: true })
    if (!hadTabIndex) {
      element.addEventListener('blur', () => element.removeAttribute('tabindex'), { once: true })
    }

    setActive(id)
  }, [])

  return { active, navigate }
}
