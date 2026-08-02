import { useCallback, useEffect, useRef, useState } from 'react'
import { useMotionValueEvent, useScroll } from 'motion/react'
import CommandNavigation from '@/components/navigation/CommandNavigation'
import DesktopNavigation from '@/components/navigation/DesktopNavigation'
import MobileDock from '@/components/navigation/MobileDock'
import MobileHeader from '@/components/navigation/MobileHeader'
import NavigationSheet from '@/components/navigation/NavigationSheet'
import type { SectionId } from '@/config/navigation'
import { useActiveSection } from '@/hooks/useActiveSection'

type Props = {
  overlayOpen?: boolean
}

/** Distância a partir da qual a navbar deixa de estar integrada ao Hero. */
const SCROLL_THRESHOLD = 120

export default function Navigation({ overlayOpen = false }: Props) {
  const { active, navigate } = useActiveSection()
  const [scrolled, setScrolled] = useState(false)
  const [dockHidden, setDockHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)
  const [keyboardOpen, setKeyboardOpen] = useState(false)
  const [shortcutLabel, setShortcutLabel] = useState('Ctrl K')

  const lastScroll = useRef(0)
  const usingKeyboard = useRef(false)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (value) => {
    // Só troca de estado ao cruzar o limiar — nada de setState por pixel.
    setScrolled((current) => {
      const next = value > SCROLL_THRESHOLD
      return next === current ? current : next
    })

    const delta = value - lastScroll.current
    if (Math.abs(delta) > 24) {
      if (!usingKeyboard.current) setDockHidden(delta > 0 && value > 200)
      lastScroll.current = value
    }
  })

  // Atalho de navegação rápida: Ctrl + K e Command + K.
  useEffect(() => {
    const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)
    setShortcutLabel(isMac ? '⌘ K' : 'Ctrl K')

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Tab') {
        usingKeyboard.current = true
        setDockHidden(false)
      }
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setCommandOpen((open) => !open)
      }
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
  }, [])

  // Teclado virtual: esconde o dock para não cobrir campos de formulário.
  useEffect(() => {
    const viewport = window.visualViewport
    if (!viewport) return

    function onResize() {
      if (!viewport) return
      setKeyboardOpen(viewport.height < window.innerHeight * 0.75)
    }

    viewport.addEventListener('resize', onResize)
    return () => viewport.removeEventListener('resize', onResize)
  }, [])

  const go = useCallback(
    (id: SectionId) => {
      navigate(id)
    },
    [navigate],
  )

  const dockVisible = !dockHidden && !menuOpen && !commandOpen && !keyboardOpen && !overlayOpen

  return (
    <>
      <nav
        aria-label="Navegação principal"
        className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 md:px-6 md:pt-6"
      >
        <div className="pointer-events-none w-full md:w-auto">
          <MobileHeader scrolled={scrolled} onNavigate={go} onOpenMenu={() => setMenuOpen(true)} />
          <DesktopNavigation
            active={active}
            scrolled={scrolled}
            onNavigate={go}
            onOpenCommand={() => setCommandOpen(true)}
            shortcutLabel={shortcutLabel}
          />
        </div>
      </nav>

      <MobileDock active={active} onNavigate={go} visible={dockVisible} />

      <NavigationSheet
        open={menuOpen}
        onOpenChange={setMenuOpen}
        active={active}
        onNavigate={go}
        onOpenCommand={() => {
          setMenuOpen(false)
          window.setTimeout(() => setCommandOpen(true), 120)
        }}
      />

      <CommandNavigation open={commandOpen} onOpenChange={setCommandOpen} onNavigate={go} />
    </>
  )
}
