import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

async function source(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8')
}

test('navigation uses one reference-driven topbar without legacy overlays', async () => {
  const navigation = await source('src/components/navigation/Navigation.tsx')

  assert.match(navigation, /data-navigation-bar/)
  assert.match(navigation, /navigationOrder: SectionId\[\] = \['inicio', 'formacao', 'tecnologias', 'projetos', 'sobre'\]/)
  assert.equal(navigation.includes('CommandNavigation'), false)
  assert.equal(navigation.includes('MobileDock'), false)
  assert.equal(navigation.includes('NavigationSheet'), false)
})

test('route links remain native while home hashes use explicit in-page navigation', async () => {
  const navigation = await source('src/components/navigation/Navigation.tsx')
  const active = await source('src/hooks/useActiveSection.ts')

  assert.match(navigation, /shouldNavigateInPage/)
  assert.match(navigation, /isModifiedNavigationEvent/)
  assert.match(active, /pushState/)
  assert.match(active, /hashchange/)
  assert.match(active, /popstate/)
  assert.match(active, /pageshow/)
  assert.match(active, /data-navigation-bar/)
})

test('hero follows the video composition without legacy technical decoration', async () => {
  const hero = await source('src/components/Hero.tsx')

  assert.ok(hero.includes('OLÁ'))
  assert.match(hero, /hero-display/)
  assert.match(hero, /opacity: \[1, 1, 0, 0, 1\]/)
  assert.equal(hero.includes('hero-letter'), false)
  assert.match(hero, /PersonalPortrait/)
  assert.match(hero, /gabriel-avatar\.webp/)
  assert.match(hero, /Email/)
  assert.match(hero, /LinkedIn/)
  assert.match(hero, /GitHub/)
  assert.equal(hero.includes('WordsPullUp'), false)
  assert.equal(hero.includes('SystemLines'), false)
  assert.equal(hero.includes('bg-grid'), false)
  assert.equal(hero.includes('handles.map'), false)
})

test('internal pages use the same navigation system as the home page', async () => {
  const pageLayout = await source('src/components/layout/PageLayout.tsx')
  assert.match(pageLayout, /import Navigation/)
  assert.match(pageLayout, /<Navigation current=\{current\} \/>/)
  assert.equal(pageLayout.includes('<details'), false)
})
