import test from 'node:test'
import assert from 'node:assert/strict'
import {
  canResolveHashInPage,
  DOCK_TOGGLE_COOLDOWN,
  initialDockScrollState,
  isCommandShortcut,
  isModifiedNavigationEvent,
  isVirtualKeyboardOccluding,
  nextTopbarScrolled,
  normalizePathname,
  reduceDockScroll,
  sectionFromHash,
  sectionFromPathname,
  shouldNavigateInPage,
} from '../src/lib/navigation-state.ts'

test('topbar uses hysteresis instead of oscillating around one threshold', () => {
  assert.equal(nextTopbarScrolled(false, 120), false)
  assert.equal(nextTopbarScrolled(false, 144), true)
  assert.equal(nextTopbarScrolled(true, 115), true)
  assert.equal(nextTopbarScrolled(true, 88), false)
})

test('route and hash resolution keep internal pages as the route source', () => {
  assert.equal(normalizePathname('/sobre'), '/sobre/')
  assert.equal(sectionFromPathname('/sobre/'), 'sobre')
  assert.equal(sectionFromPathname('/projetos/pnqc/'), 'projetos')
  assert.equal(sectionFromPathname('/contato/'), 'contato')
  assert.equal(sectionFromHash('#tecnologias'), 'tecnologias')
  assert.equal(sectionFromHash('#desconhecida'), null)

  for (const section of ['inicio', 'sobre', 'projetos', 'atuacao', 'tecnologias', 'formacao', 'contato'] as const) {
    assert.equal(shouldNavigateInPage('/', section), true)
  }
  assert.equal(shouldNavigateInPage('/sobre/', 'atuacao'), false)
  assert.equal(shouldNavigateInPage('/projetos/', 'projetos'), false)
  assert.equal(canResolveHashInPage('/', 'sobre'), true)
  assert.equal(canResolveHashInPage('/', 'projetos'), true)
  assert.equal(canResolveHashInPage('/', 'contato'), true)
  assert.equal(canResolveHashInPage('/sobre/', 'atuacao'), false)
})

test('modified and non-primary link activations keep native browser behavior', () => {
  const plain = { button: 0, ctrlKey: false, metaKey: false, shiftKey: false, altKey: false }
  assert.equal(isModifiedNavigationEvent(plain), false)
  assert.equal(isModifiedNavigationEvent({ ...plain, ctrlKey: true }), true)
  assert.equal(isModifiedNavigationEvent({ ...plain, metaKey: true }), true)
  assert.equal(isModifiedNavigationEvent({ ...plain, button: 1 }), true)
})

test('dock requires deliberate direction and respects the toggle cooldown', () => {
  const afterSmallScroll = reduceDockScroll(initialDockScrollState, 230, 500)
  assert.equal(afterSmallScroll.hidden, false)

  const hidden = reduceDockScroll(afterSmallScroll, 290, 560)
  assert.equal(hidden.hidden, true)

  const tooSoon = reduceDockScroll(hidden, 220, 560 + DOCK_TOGGLE_COOLDOWN - 1)
  assert.equal(tooSoon.hidden, true)

  const revealed = reduceDockScroll(tooSoon, 150, 560 + DOCK_TOGGLE_COOLDOWN)
  assert.equal(revealed.hidden, false)
})

test('command shortcut ignores editable targets and repeated keydown', () => {
  const base = { key: 'k', ctrlKey: true, metaKey: false, repeat: false }
  assert.equal(isCommandShortcut({ ...base, target: null }), true)
  assert.equal(isCommandShortcut({ ...base, repeat: true, target: null }), false)
  assert.equal(isCommandShortcut({ ...base, target: { tagName: 'INPUT' } }), false)
  assert.equal(isCommandShortcut({ ...base, target: { tagName: 'TEXTAREA' } }), false)
  assert.equal(isCommandShortcut({ ...base, target: { isContentEditable: true } }), false)
})

test('virtual keyboard detection covers resized and overlay viewports without hiding for orientation alone', () => {
  const base = {
    focusedEditable: true,
    baselineHeight: 844,
    layoutHeight: 844,
    viewportHeight: 844,
    viewportOffsetTop: 0,
  }
  assert.equal(isVirtualKeyboardOccluding(base), false)
  assert.equal(isVirtualKeyboardOccluding({ ...base, viewportHeight: 500 }), true)
  assert.equal(isVirtualKeyboardOccluding({ ...base, layoutHeight: 560 }), true)
  assert.equal(isVirtualKeyboardOccluding({ ...base, viewportOffsetTop: 100 }), true)
  assert.equal(isVirtualKeyboardOccluding({ ...base, focusedEditable: false, viewportHeight: 500 }), false)
})
