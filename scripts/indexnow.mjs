import path from 'node:path'
import { pathToFileURL } from 'node:url'

const key = process.env.INDEXNOW_KEY?.trim()

if (!key) {
  console.log('IndexNow não configurado: INDEXNOW_KEY ausente. Notificação ignorada sem erro.')
  process.exit(0)
}

if (!/^[a-zA-Z0-9-]{8,128}$/.test(key)) {
  throw new Error('INDEXNOW_KEY possui formato inválido.')
}

const { buildData } = await import(pathToFileURL(path.join(process.cwd(), '.prerender', 'entry-server.js')).href)
const data = buildData()
const hostUrl = new URL(process.env.DEPLOY_URL?.trim() || data.site.canonicalUrl)
const body = {
  host: hostUrl.host,
  key,
  keyLocation: new URL(`${key}.txt`, hostUrl).toString(),
  urlList: data.routes
    .filter((route) => route.indexable)
    .map((route) => new URL(route.path.replace(/^\//, ''), hostUrl).toString()),
}

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
})

if (!response.ok && response.status !== 202) {
  throw new Error(`IndexNow respondeu HTTP ${response.status}.`)
}

console.log(`IndexNow notificado para ${body.urlList.length} URLs em ${hostUrl.host}.`)
