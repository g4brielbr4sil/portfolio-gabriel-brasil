import { useCallback, useEffect, useState } from 'react'
import { sections, type SectionId } from '@/config/navigation'
import {
  canResolveHashInPage,
  type NavigateOptions,
  sectionFromHash,
  sectionFromPathname,
  shouldNavigateInPage,
} from '@/lib/navigation-state'

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function readLocationSection() {
  if (typeof window === 'undefined') return 'inicio'
  return sectionFromPathname(window.location.pathname) ?? 'inicio'
}

function readTopbarOffset() {
  const bar = document.querySelector<HTMLElement>('[data-navigation-bar]')
  return bar ? Math.ceil(bar.getBoundingClientRect().bottom) + 16 : 96
}

function focusSection(element: HTMLElement) {
  const hadTabIndex = element.hasAttribute('tabindex')
  if (!hadTabIndex) element.setAttribute('tabindex', '-1')
  element.focus({ preventScroll: true })
  if (!hadTabIndex) {
    element.addEventListener('blur', () => element.removeAttribute('tabindex'), { once: true })
  }
}

function scrollToSection(id: SectionId, behavior: ScrollBehavior, focus: boolean) {
  const element = document.getElementById(id)
  if (!element) return false

  const top = id === 'inicio'
    ? 0
    : Math.max(0, window.scrollY + element.getBoundingClientRect().top - readTopbarOffset())

  window.scrollTo({ top, behavior: behavior === 'auto' ? ('instant' as ScrollBehavior) : behavior })
  if (focus) focusSection(element)
  return true
}

export function useActiveSection() {
  const [active, setActive] = useState<SectionId>(readLocationSection)

  useEffect(() => {
    const routeSection = sectionFromPathname(window.location.pathname)
    if (window.location.pathname !== '/') {
      if (routeSection) setActive(routeSection)
      return
    }

    const elements = sections
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)
      .sort((a, b) => a.offsetTop - b.offsetTop)

    if (elements.length === 0) return

    let frame = 0
    const updateFromScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (window.scrollY < 8) {
          setActive('inicio')
          return
        }

        const marker = readTopbarOffset() + Math.min(window.innerHeight * 0.24, 180)
        let best = 'inicio' as SectionId
        for (const element of elements) {
          if (element.getBoundingClientRect().top <= marker) best = element.id as SectionId
        }
        setActive(best)
      })
    }

    const syncHash = (event?: Event) => {
      const hashSection = sectionFromHash(window.location.hash)
      if (hashSection && canResolveHashInPage(window.location.pathname, hashSection)) {
        setActive(hashSection)
        requestAnimationFrame(() => scrollToSection(hashSection, 'auto', false))
      } else if (!window.location.hash && (event?.type === 'popstate' || event?.type === 'hashchange')) {
        window.scrollTo({ top: 0, behavior: 'auto' })
        setActive('inicio')
      }
    }

    let stopInitialAlignment: () => void = () => {}

    const alignInitialHash = (hashSection: SectionId) => {
      let active = true
      let alignFrame = 0
      const align = () => {
        cancelAnimationFrame(alignFrame)
        alignFrame = requestAnimationFrame(() => {
          if (active) scrollToSection(hashSection, 'auto', false)
        })
      }
      const observer = new ResizeObserver(align)
      observer.observe(document.body)
      const interval = window.setInterval(align, 180)
      const timeout = window.setTimeout(() => stop(), 2400)

      function stop() {
        if (!active) return
        active = false
        cancelAnimationFrame(alignFrame)
        window.clearInterval(interval)
        window.clearTimeout(timeout)
        observer.disconnect()
        window.removeEventListener('load', align)
        window.removeEventListener('pointerdown', stop)
        window.removeEventListener('touchstart', stop)
        window.removeEventListener('wheel', stop)
        window.removeEventListener('keydown', stop)
      }

      window.addEventListener('load', align)
      window.addEventListener('pointerdown', stop, { once: true })
      window.addEventListener('touchstart', stop, { once: true })
      window.addEventListener('wheel', stop, { once: true })
      window.addEventListener('keydown', stop, { once: true })
      document.fonts?.ready.then(() => {
        if (active) align()
      })
      align()
      stopInitialAlignment = stop
    }

    window.addEventListener('scroll', updateFromScroll, { passive: true })
    window.addEventListener('resize', updateFromScroll)
    window.addEventListener('hashchange', syncHash)
    window.addEventListener('popstate', syncHash)
    window.addEventListener('pageshow', syncHash)

    const initialHash = sectionFromHash(window.location.hash)
    if (initialHash && canResolveHashInPage(window.location.pathname, initialHash)) {
      alignInitialHash(initialHash)
    } else {
      updateFromScroll()
    }

    return () => {
      cancelAnimationFrame(frame)
      stopInitialAlignment()
      window.removeEventListener('scroll', updateFromScroll)
      window.removeEventListener('resize', updateFromScroll)
      window.removeEventListener('hashchange', syncHash)
      window.removeEventListener('popstate', syncHash)
      window.removeEventListener('pageshow', syncHash)
    }
  }, [])

  const navigate = useCallback((id: SectionId, options: NavigateOptions = {}) => {
    const section = sections.find((item) => item.id === id)
    if (!section) return

    if (!shouldNavigateInPage(window.location.pathname, id)) {
      window.location.assign(section.href)
      return
    }

    const behavior = options.behavior ?? (prefersReducedMotion() ? 'auto' : 'smooth')
    const destination = id === 'inicio' ? '/' : `#${id}`
    const historyMode = options.history ?? 'push'

    if (historyMode !== 'none' && `${window.location.pathname}${window.location.hash}` !== destination) {
      window.history[historyMode === 'replace' ? 'replaceState' : 'pushState'](null, '', destination)
    }

    if (scrollToSection(id, behavior, options.focus ?? false)) setActive(id)
  }, [])

  return { active, navigate }
}
