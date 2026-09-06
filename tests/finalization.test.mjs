import test from 'node:test'
import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'

async function source(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8')
}

test('education and experience keep dates contextual instead of a detached right column', async () => {
  const journey = await source('src/components/EducationExperience.tsx')

  assert.match(journey, /certificationYear/)
  assert.match(journey, /metaLine: `\$\{certification\.institution\} · \$\{/)
  assert.match(journey, /metaLine: entry\.organization \? `\$\{entry\.organization\} · \$\{entry\.meta\}`/)
  assert.equal(journey.includes('justify-between'), false)
  assert.equal(journey.includes('font-mono'), false)
  assert.equal(journey.includes('text-right'), false)
})

test('SEO structured data keeps ProfilePage valid and adds breadcrumbs to public subpages', async () => {
  const metadata = await source('src/seo/metadata.ts')

  assert.match(metadata, /page\.mainEntity = \{ '@id': `\$\{site\.canonicalUrl\}#gabriel-brasil` \}/)
  assert.match(metadata, /fixedRouteBreadcrumb/)
  assert.match(metadata, /'@type': 'BreadcrumbList'/)
  assert.match(metadata, /og:image:type/)
  assert.match(metadata, /email: site\.contact\.email/)
})

test('generated QA artifacts and obsolete planning notes stay out of the public repository', async () => {
  await assert.rejects(access(new URL('../artifacts/structural-flow', import.meta.url)))
  await assert.rejects(access(new URL('../plans/go-attachment-src-imports-pasted-text-pr-staged-meteor.md', import.meta.url)))

  const gitignore = await source('.gitignore')
  assert.match(gitignore, /^artifacts\/$/m)
  assert.match(gitignore, /^plans\/$/m)
})

test('CI uses immutable action SHAs while Dependabot keeps GitHub Actions updates enabled', async () => {
  const workflow = await source('.github/workflows/ci.yml')
  const dependabot = await source('.github/dependabot.yml')

  assert.match(workflow, /actions\/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1/)
  assert.match(workflow, /pnpm\/action-setup@0977fd99725f1db4007ccb2928dbb4e90d06cc86/)
  assert.match(workflow, /actions\/setup-node@820762786026740c76f36085b0efc47a31fe5020/)
  assert.match(dependabot, /package-ecosystem: github-actions/)
})
