import type { SectionId } from '@/config/navigation'

export const TOPBAR_SCROLL_ENTER = 144
export const TOPBAR_SCROLL_EXIT = 88

export const DOCK_TOP_REVEAL = 160
export const DOCK_HIDE_START = 240
export const DOCK_DIRECTION_DISTANCE = 48
export const DOCK_TOGGLE_COOLDOWN = 220

const sectionIds = new Set<SectionId>([
  'inicio',
  'sobre',
  'projetos',
  'atuacao',
  'tecnologias',
  'formacao',
  'contato',
])

export type DockScrollState = {
  hidden: boolean
  lastY: number
  distance: number
  direction: -1 | 0 | 1
  lastToggleAt: number
}

export type NavigateOptions = {
  behavior?: ScrollBehavior
  focus?: boolean
  history?: 'push' | 'replace' | 'none'
}

export type NavigationHandler = (id: SectionId, options?: NavigateOptions) => void

export const initialDockScrollState: DockScrollState = {
  hidden: false,
  lastY: 0,
  distance: 0,
  direction: 0,
  lastToggleAt: 0,
}

export function normalizePathname(pathname: string) {
  if (pathname === '/') return pathname
  return `${pathname.replace(/\/+$/, '')}/`
}

export function sectionFromPathname(pathname: string): SectionId | null {
  const normalized = normalizePathname(pathname)
  if (normalized === '/sobre/') return 'sobre'
  if (normalized === '/projetos/' || normalized.startsWith('/projetos/')) return 'projetos'
  if (normalized === '/contato/') return 'contato'
  return normalized === '/' ? 'inicio' : null
}

export function sectionFromHash(hash: string): SectionId | null {
  const id = decodeURIComponent(hash.replace(/^#/, '')) as SectionId
  return sectionIds.has(id) ? id : null
}

export function shouldNavigateInPage(pathname: string, id: SectionId) {
  return normalizePathname(pathname) === '/' && sectionIds.has(id)
}

export function canResolveHashInPage(pathname: string, id: SectionId) {
  return normalizePathname(pathname) === '/' && sectionIds.has(id)
}

export function isModifiedNavigationEvent(event: {
  button: number
  ctrlKey: boolean
  metaKey: boolean
  shiftKey: boolean
  altKey: boolean
}) {
  return (
    event.button !== 0 ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey ||
    event.altKey
  )
}

export function nextTopbarScrolled(current: boolean, scrollY: number) {
  return current ? scrollY > TOPBAR_SCROLL_EXIT : scrollY >= TOPBAR_SCROLL_ENTER
}

export function reduceDockScroll(
  state: DockScrollState,
  nextY: number,
  now: number,
): DockScrollState {
  const y = Math.max(0, nextY)
  const delta = y - state.lastY

  if (y <= DOCK_TOP_REVEAL) {
    return {
      hidden: false,
      lastY: y,
      distance: 0,
      direction: 0,
      lastToggleAt: state.hidden ? now : state.lastToggleAt,
    }
  }

  if (Math.abs(delta) < 1) return { ...state, lastY: y }

  const direction = delta > 0 ? 1 : -1
  const distance = direction === state.direction ? state.distance + Math.abs(delta) : Math.abs(delta)
  const canToggle = now - state.lastToggleAt >= DOCK_TOGGLE_COOLDOWN

  if (
    canToggle &&
    !state.hidden &&
    direction === 1 &&
    y >= DOCK_HIDE_START &&
    distance >= DOCK_DIRECTION_DISTANCE
  ) {
    return { hidden: true, lastY: y, distance: 0, direction, lastToggleAt: now }
  }

  if (canToggle && state.hidden && direction === -1 && distance >= DOCK_DIRECTION_DISTANCE) {
    return { hidden: false, lastY: y, distance: 0, direction, lastToggleAt: now }
  }

  return { ...state, lastY: y, distance, direction }
}

type EditableTarget = {
  tagName?: string
  isContentEditable?: boolean
  closest?: (selector: string) => unknown
}

export function isEditableTarget(target: EventTarget | EditableTarget | null) {
  if (!target || typeof target !== 'object') return false
  const element = target as EditableTarget
  const tagName = element.tagName?.toLowerCase()
  if (tagName && ['input', 'textarea', 'select'].includes(tagName)) return true
  if (element.isContentEditable) return true
  return Boolean(element.closest?.('input, textarea, select, [contenteditable="true"]'))
}

export function isCommandShortcut(event: {
  key: string
  ctrlKey: boolean
  metaKey: boolean
  repeat: boolean
  target: EventTarget | EditableTarget | null
}) {
  return (
    event.key.toLowerCase() === 'k' &&
    (event.ctrlKey || event.metaKey) &&
    !event.repeat &&
    !isEditableTarget(event.target)
  )
}

export function isVirtualKeyboardOccluding({
  focusedEditable,
  baselineHeight,
  layoutHeight,
  viewportHeight,
  viewportOffsetTop,
}: {
  focusedEditable: boolean
  baselineHeight: number
  layoutHeight: number
  viewportHeight: number
  viewportOffsetTop: number
}) {
  if (!focusedEditable) return false
  const layoutLoss = baselineHeight - layoutHeight
  const viewportLoss = baselineHeight - viewportHeight
  return layoutLoss >= 140 || viewportLoss >= 140 || viewportOffsetTop >= 80
}
