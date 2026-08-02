import { useCallback, useEffect, useRef, useState, type FocusEvent } from 'react'

type Options = {
  length: number
  autoplayDelayMs?: number
  resumeDelayMs?: number
  reducedMotion?: boolean
  disabled?: boolean
}

type Handlers = {
  onMouseEnter: () => void
  onMouseLeave: () => void
  onFocusCapture: () => void
  onBlurCapture: (event: FocusEvent<HTMLElement>) => void
}

export function useProjectCarousel({
  length,
  autoplayDelayMs = 5000,
  resumeDelayMs = 8000,
  reducedMotion = false,
  disabled = false,
}: Options) {
  const [index, setIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [isPageVisible, setIsPageVisible] = useState(true)
  const [manualHoldUntil, setManualHoldUntil] = useState(0)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (typeof document === 'undefined') return
    const updateVisibility = () => setIsPageVisible(document.visibilityState === 'visible')
    updateVisibility()
    document.addEventListener('visibilitychange', updateVisibility)
    return () => document.removeEventListener('visibilitychange', updateVisibility)
  }, [])

  useEffect(() => {
    const node = containerRef.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.35 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (manualHoldUntil <= 0) return
    const delay = Math.max(0, manualHoldUntil - Date.now())
    const timeout = window.setTimeout(() => setManualHoldUntil(0), delay)
    return () => window.clearTimeout(timeout)
  }, [manualHoldUntil])

  useEffect(() => {
    if (length <= 1 || reducedMotion || disabled || !isPlaying || !isInView || !isPageVisible) return
    if (isHovered || isFocused || manualHoldUntil > 0) return

    const timeout = window.setTimeout(() => {
      setIndex((current) => (current + 1) % length)
    }, autoplayDelayMs)

    return () => window.clearTimeout(timeout)
  }, [autoplayDelayMs, disabled, isFocused, isHovered, isInView, isPageVisible, isPlaying, length, manualHoldUntil, reducedMotion])

  useEffect(() => {
    if (length <= 0) return
    setIndex((current) => (current >= length ? 0 : current))
  }, [length])

  const holdAfterInteraction = useCallback(() => {
    if (length <= 1) return
    setManualHoldUntil(Date.now() + resumeDelayMs)
  }, [length, resumeDelayMs])

  const goTo = useCallback(
    (nextIndex: number, interaction = true) => {
      if (length <= 0) return
      setIndex(((nextIndex % length) + length) % length)
      if (interaction) holdAfterInteraction()
    },
    [holdAfterInteraction, length],
  )

  const next = useCallback(
    (interaction = true) => {
      if (length <= 1) return
      setIndex((current) => (current + 1) % length)
      if (interaction) holdAfterInteraction()
    },
    [holdAfterInteraction, length],
  )

  const previous = useCallback(
    (interaction = true) => {
      if (length <= 1) return
      setIndex((current) => (current - 1 + length) % length)
      if (interaction) holdAfterInteraction()
    },
    [holdAfterInteraction, length],
  )

  const togglePlayback = useCallback(() => {
    if (length <= 1) return
    setIsPlaying((current) => !current)
    holdAfterInteraction()
  }, [holdAfterInteraction, length])

  const handlers: Handlers = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onFocusCapture: () => setIsFocused(true),
    onBlurCapture: (event) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
        setIsFocused(false)
      }
    },
  }

  return {
    containerRef,
    index,
    setIndex: goTo,
    next,
    previous,
    goTo,
    isPlaying,
    togglePlayback,
    isReducedMotion: reducedMotion,
    canAutoplay: !reducedMotion && !disabled && length > 1,
    isAutoplayActive: !reducedMotion && !disabled && length > 1 && isPlaying && isInView && isPageVisible && !isHovered && !isFocused && manualHoldUntil === 0,
    handlers,
  }
}