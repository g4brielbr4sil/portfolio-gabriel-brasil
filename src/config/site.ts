declare const __PORTFOLIO_HAS_RESUME__: boolean

const canonicalUrl = 'https://gabrielbrasil.dev/'
const email = 'contato.barthywebstudio@gmail.com'
const linkedin = 'https://www.linkedin.com/in/gabrielbrasildev'
const github = 'https://github.com/g4brielbr4sil'

function readOptionalPublicUrl(value: string | undefined, variableName: string) {
  const candidate = value?.trim()
  if (!candidate) return null

  if (candidate.startsWith('/')) return candidate

  let parsed: URL
  try {
    parsed = new URL(candidate)
  } catch {
    throw new Error(`${variableName} precisa conter uma URL publica valida.`)
  }

  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    throw new Error(`${variableName} aceita somente URLs HTTP ou HTTPS.`)
  }

  if (['localhost', '127.0.0.1', '::1'].includes(parsed.hostname)) {
    throw new Error(`${variableName} nao aceita enderecos locais como URL publica.`)
  }

  return parsed.toString()
}

export const site = {
  name: 'Gabriel Brasil',
  title: 'Gabriel Brasil | Analista de Sistemas e Desenvolvedor',
  role: 'Analista de Sistemas e Desenvolvedor',
  description:
    'Portfólio de Gabriel Brasil, Analista de Sistemas e Desenvolvedor em Brasília. Projetos Full Stack, APIs, automações, integrações e produtos digitais.',
  canonicalUrl,
  location: {
    city: 'Brasília',
    region: 'Distrito Federal',
    country: 'Brasil',
    full: 'Brasília, Distrito Federal, Brasil',
  },
  contact: {
    email,
    mailto: `mailto:${email}`,
    endpoint: readOptionalPublicUrl(import.meta.env.VITE_CONTACT_ENDPOINT, 'VITE_CONTACT_ENDPOINT'),
  },
  urls: {
    linkedin,
    github,
    hermes: 'https://hermes-agent-01l.pages.dev/',
    pnqc: 'https://levens-qualifica-pnqc.pages.dev/',
    barthyV2: 'https://github.com/g4brielbr4sil/barthy-web-studio-v2',
    credentials: {
      promptEngineering:
        'https://www3.cruzeirodosulvirtual.com.br/badges/exibir/21186462-904d-4f54-8d4a-2a994a8382cc',
      responsibleAi:
        'https://www3.cruzeirodosulvirtual.com.br/badges/exibir/aa1253e1-4ded-4c99-9ec9-492bb6cd337d',
    },
  },
  resume: {
    path: '/curriculo-gabriel-brasil.pdf',
    downloadName: 'Gabriel-Brasil-Curriculo.pdf',
    available: __PORTFOLIO_HAS_RESUME__,
  },
  socialImage: '/og-image.svg',
  sameAs: [linkedin, github],
  verification: {
    google: import.meta.env.VITE_GOOGLE_SITE_VERIFICATION?.trim() || null,
    bing: import.meta.env.VITE_BING_SITE_VERIFICATION?.trim() || null,
  },
} as const

export function absoluteUrl(path = '/') {
  return new URL(path.replace(/^\//, ''), site.canonicalUrl).toString()
}

export function resumeUrl(available = site.resume.available) {
  return available ? site.resume.path : null
}
