import { projectForRoute, type PortfolioRoute } from '@/config/routes'
import { absoluteUrl, site } from '@/config/site'

function escapeAttribute(value: string) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function personSchema() {
  return {
    '@type': 'Person',
    '@id': `${site.canonicalUrl}#gabriel-brasil`,
    name: site.name,
    jobTitle: site.role,
    url: site.canonicalUrl,
    email: site.contact.mailto,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.location.city,
      addressRegion: 'DF',
      addressCountry: 'BR',
    },
    sameAs: site.sameAs,
    knowsAbout: [
      'Análise de sistemas',
      'Desenvolvimento Full Stack',
      'React',
      'TypeScript',
      'Python',
      'FastAPI',
      'APIs REST',
      'Automação de processos',
      'Integrações',
    ],
  }
}

function structuredData(route: PortfolioRoute) {
  const canonical = absoluteUrl(route.path)
  const person = personSchema()

  if (route.kind === 'project') {
    const project = projectForRoute(route)
    if (!project) return { '@context': 'https://schema.org', '@graph': [person] }

    return {
      '@context': 'https://schema.org',
      '@graph': [
        person,
        {
          '@type': 'CreativeWork',
          '@id': `${canonical}#projeto`,
          name: project.name,
          description: project.description,
          url: canonical,
          creator: { '@id': `${site.canonicalUrl}#gabriel-brasil` },
          keywords: project.tech,
          sameAs: project.links.flatMap((link) => (link.href ? [link.href] : [])),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Início', item: site.canonicalUrl },
            { '@type': 'ListItem', position: 2, name: 'Projetos', item: absoluteUrl('/projetos/') },
            { '@type': 'ListItem', position: 3, name: project.name, item: canonical },
          ],
        },
      ],
    }
  }

  const pageType = route.kind === 'about' ? 'ProfilePage' : route.kind === 'contact' ? 'ContactPage' : 'WebPage'
  const graph: Record<string, unknown>[] = [
    person,
    {
      '@type': 'WebSite',
      '@id': `${site.canonicalUrl}#website`,
      name: site.name,
      url: site.canonicalUrl,
      inLanguage: 'pt-BR',
    },
    {
      '@type': pageType,
      '@id': `${canonical}#page`,
      name: route.title,
      description: route.description,
      url: canonical,
      inLanguage: 'pt-BR',
      isPartOf: { '@id': `${site.canonicalUrl}#website` },
      about: { '@id': `${site.canonicalUrl}#gabriel-brasil` },
    },
  ]

  return { '@context': 'https://schema.org', '@graph': graph }
}

export function renderMetadata(route: PortfolioRoute) {
  const title = escapeAttribute(route.title)
  const description = escapeAttribute(route.description)
  const canonical = absoluteUrl(route.path)
  const socialImage = absoluteUrl(site.socialImage)
  const robots = route.indexable ? 'index, follow, max-image-preview:large' : 'noindex, nofollow'
  const verification = [
    site.verification.google ? `<meta name="google-site-verification" content="${escapeAttribute(site.verification.google)}" />` : '',
    site.verification.bing ? `<meta name="msvalidate.01" content="${escapeAttribute(site.verification.bing)}" />` : '',
  ].filter(Boolean).join('\n    ')
  const jsonLd = JSON.stringify(structuredData(route)).replace(/</g, '\\u003c')

  return `<title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="author" content="${escapeAttribute(site.name)}" />
    <meta name="robots" content="${robots}" />
    ${route.indexable ? `<link rel="canonical" href="${canonical}" />` : ''}
    <meta property="og:type" content="${route.kind === 'project' ? 'article' : 'website'}" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:site_name" content="${escapeAttribute(site.name)}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${socialImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Gabriel Brasil, Analista de Sistemas e Desenvolvedor" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${socialImage}" />
    ${verification}
    <script type="application/ld+json">${jsonLd}</script>`
}
