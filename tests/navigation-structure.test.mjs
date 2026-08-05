import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

async function source(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8')
}

test('navigation mounts one responsive topbar and shares one scroll source', async () => {
  const navigation = await source('src/components/navigation/Navigation.tsx')
  const desktop = await source('src/components/navigation/DesktopNavigation.tsx')
  const mobile = await source('src/components/navigation/MobileHeader.tsx')
  const progress = await source('src/components/navigation/ScrollProgress.tsx')

  assert.match(navigation, /desktop \? \(/)
  assert.match(navigation, /useScroll\(\)/)
  assert.equal(desktop.includes('NavShell'), false)
  assert.equal(desktop.includes('nav-indicator-wide'), false)
  assert.equal(mobile.includes('useScroll('), false)
  assert.equal(progress.includes('useScroll('), false)
})

test('route links remain native while home hashes use explicit in-page navigation', async () => {
  const desktop = await source('src/components/navigation/DesktopNavigation.tsx')
  const dock = await source('src/components/navigation/MobileDock.tsx')
  const sheet = await source('src/components/navigation/NavigationSheet.tsx')
  const active = await source('src/hooks/useActiveSection.ts')

  for (const component of [desktop, dock, sheet]) {
    assert.match(component, /shouldNavigateInPage/)
    assert.match(component, /isModifiedNavigationEvent/)
  }
  assert.match(active, /pushState/)
  assert.match(active, /hashchange/)
  assert.match(active, /popstate/)
  assert.match(active, /pageshow/)
  assert.match(active, /data-navigation-bar/)
})

test('menu, command palette and project dialogs cannot expose the dock together', async () => {
  const navigation = await source('src/components/navigation/Navigation.tsx')
  const sheet = await source('src/components/navigation/NavigationSheet.tsx')
  const command = await source('src/components/navigation/CommandNavigation.tsx')

  assert.match(navigation, /type NavigationOverlay = 'menu' \| 'command' \| null/)
  assert.match(navigation, /overlay === 'menu'/)
  assert.match(navigation, /overlay === 'command'/)
  assert.match(navigation, /MutationObserver/)
  assert.match(navigation, /!dialogOpen/)
  assert.equal(sheet.includes('setTimeout'), false)
  assert.equal(command.includes('setTimeout'), false)
})

test('internal pages use the same navigation system as the home page', async () => {
  const pageLayout = await source('src/components/layout/PageLayout.tsx')
  assert.match(pageLayout, /import Navigation/)
  assert.match(pageLayout, /<Navigation current=\{current\} \/>/)
  assert.equal(pageLayout.includes('<details'), false)
})
