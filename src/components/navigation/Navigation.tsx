import { useCallback, useEffect, useRef, useState } from 'react'
import { useMotionValueEvent, useScroll } from 'motion/react'
import CommandNavigation from '@/components/navigation/CommandNavigation'
import DesktopNavigation from '@/components/navigation/DesktopNavigation'
import MobileDock from '@/components/navigation/MobileDock'
import MobileHeader from '@/components/navigation/MobileHeader'
import NavigationSheet from '@/components/navigation/NavigationSheet'
import type { SectionId } from '@/config/navigation'
import { useActiveSection } from '@/hooks/useActiveSection'
import {
  initialDockScrollState,
  isCommandShortcut,
  isEditableTarget,
  isVirtualKeyboardOccluding,
  nextTopbarScrolled,
  reduceDockScroll,
  type NavigationHandler,
} from '@/lib/navigation-state'

type Props = {
  overlayOpen?: boolean
}

type NavigationOverlay = 'menu' | 'command' | null

const DESKTOP_QUERY = '(min-width: 56rem)'

function useDesktopNavigation() {
  const [desktop, setDesktop] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY)
    const update = () => setDesktop(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return desktop
}

export default function Navigation({ overlayOpen = false }: Props) {
  const { active, navigate } = useActiveSection()
  const desktop = useDesktopNavigation()
  const [scrolled, setScrolled] = useState(false)
  const [dockHidden, setDockHidden] = useState(false)
  const [overlay, setOverlay] = useState<NavigationOverlay>(null)
  const [keyboardOpen, setKeyboardOpen] = useState(false)
  const [shortcutLabel, setShortcutLabel] = useState('Ctrl K')

  const overlayRef = useRef<NavigationOverlay>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const usingKeyboard = useRef(false)
  const keyboardBaseline = useRef(0)
  const { scrollY, scrollYProgress } = useScroll()
  const dockScroll = useRef({ ...initialDockScrollState, lastY: scrollY.get() })

  const restoreFocus = useCallback(() => {
    const target = returnFocusRef.current
    returnFocusRef.current = null
    window.requestAnimationFrame(() => {
      if (target?.isConnected) target.focus({ preventScroll: true })
    })
  }, [])

  const closeOverlay = useCallback(
    (shouldRestoreFocus = true) => {
      overlayRef.current = null
      setOverlay(null)
      if (shouldRestoreFocus) restoreFocus()
      else returnFocusRef.current = null
    },
    [restoreFocus],
  )

  const openOverlay = useCallback((next: Exclude<NavigationOverlay, null>) => {
    if (!overlayRef.current) {
      const current = document.activeElement
      returnFocusRef.current = current instanceof HTMLElement ? current : null
    }
    overlayRef.current = next
    setOverlay(next)
  }, [])

  useMotionValueEvent(scrollY, 'change', (value) => {
    setScrolled((current) => nextTopbarScrolled(current, value))

    if (usingKeyboard.current) return
    const nextDock = reduceDockScroll(dockScroll.current, value, performance.now())
    dockScroll.current = nextDock
    setDockHidden((current) => (current === nextDock.hidden ? current : nextDock.hidden))
  })

  useEffect(() => {
    const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)
    setShortcutLabel(isMac ? '⌘ K' : 'Ctrl K')

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Tab') {
        usingKeyboard.current = true
        dockScroll.current = { ...dockScroll.current, hidden: false, distance: 0 }
        setDockHidden(false)
      }
      if (!isCommandShortcut(event)) return

      event.preventDefault()
      if (overlayRef.current === 'command') closeOverlay()
      else openOverlay('command')
    }

    function onPointerDown() {
      usingKeyboard.current = false
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [closeOverlay, openOverlay])

  useEffect(() => {
    const viewport = window.visualViewport
    keyboardBaseline.current = Math.max(window.innerHeight, viewport?.height ?? 0)

    function updateKeyboard() {
      const focusedEditable = isEditableTarget(document.activeElement)
      if (!focusedEditable) {
        keyboardBaseline.current = Math.max(window.innerHeight, viewport?.height ?? 0)
        setKeyboardOpen(false)
        return
      }

      setKeyboardOpen(
        isVirtualKeyboardOccluding({
          focusedEditable,
          baselineHeight: keyboardBaseline.current,
          layoutHeight: window.innerHeight,
          viewportHeight: viewport?.height ?? window.innerHeight,
          viewportOffsetTop: viewport?.offsetTop ?? 0,
        }),
      )
    }

    function onFocusOut() {
      window.requestAnimationFrame(updateKeyboard)
    }

    function onOrientationChange() {
      setKeyboardOpen(false)
      window.setTimeout(() => {
        keyboardBaseline.current = Math.max(window.innerHeight, viewport?.height ?? 0)
        updateKeyboard()
      }, 250)
    }

    window.addEventListener('focusin', updateKeyboard)
    window.addEventListener('focusout', onFocusOut)
    window.addEventListener('resize', updateKeyboard)
    window.addEventListener('orientationchange', onOrientationChange)
    viewport?.addEventListener('resize', updateKeyboard)
    viewport?.addEventListener('scroll', updateKeyboard)
    return () => {
      window.removeEventListener('focusin', updateKeyboard)
      window.removeEventListener('focusout', onFocusOut)
      window.removeEventListener('resize', updateKeyboard)
      window.removeEventListener('orientationchange', onOrientationChange)
      viewport?.removeEventListener('resize', updateKeyboard)
      viewport?.removeEventListener('scroll', updateKeyboard)
    }
  }, [])

  useEffect(() => {
    const closeForNavigation = () => closeOverlay(false)
    window.addEventListener('hashchange', closeForNavigation)
    window.addEventListener('popstate', closeForNavigation)
    return () => {
      window.removeEventListener('hashchange', closeForNavigation)
      window.removeEventListener('popstate', closeForNavigation)
    }
  }, [closeOverlay])

  useEffect(() => {
    if (overlayOpen && overlayRef.current) closeOverlay(false)
  }, [closeOverlay, overlayOpen])

  const go = useCallback<NavigationHandler>(
    (id, options) => {
      if (overlayRef.current) closeOverlay(false)
      navigate(id, options)
    },
    [closeOverlay, navigate],
  )

  const handleOverlayChange = useCallback(
    (open: boolean) => {
      if (!open) closeOverlay()
    },
    [closeOverlay],
  )

  const dockVisible =
    !desktop && !dockHidden && !overlay && !keyboardOpen && !overlayOpen

  return (
    <>
      <nav
        aria-label="Navegação principal"
        className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 min-[56rem]:px-6 min-[56rem]:pt-6"
      >
        <div className="pointer-events-none w-full min-[56rem]:w-auto">
          {desktop ? (
            <DesktopNavigation
              active={active}
              scrolled={scrolled}
              onNavigate={go}
              onOpenCommand={() => openOverlay('command')}
              shortcutLabel={shortcutLabel}
              scrollProgress={scrollYProgress}
            />
          ) : (
            <MobileHeader
              scrolled={scrolled}
              onNavigate={go}
              onOpenMenu={() => openOverlay('menu')}
              scrollProgress={scrollYProgress}
            />
          )}
        </div>
      </nav>

      <MobileDock active={active} onNavigate={go} visible={dockVisible} />

      {overlay === 'menu' && (
        <NavigationSheet
          open
          onOpenChange={handleOverlayChange}
          active={active}
          onNavigate={go}
          onOpenCommand={() => openOverlay('command')}
          onCloseAutoFocus={() => undefined}
        />
      )}

      {overlay === 'command' && (
        <CommandNavigation
          open
          onOpenChange={handleOverlayChange}
          onNavigate={go}
          onCloseAutoFocus={() => undefined}
        />
      )}
    </>
  )
}
