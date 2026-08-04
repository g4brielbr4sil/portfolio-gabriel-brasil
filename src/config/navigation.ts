import type { Icon } from '@phosphor-icons/react'
import { Briefcase } from '@phosphor-icons/react/dist/csr/Briefcase'
import { Code } from '@phosphor-icons/react/dist/csr/Code'
import { DownloadSimple } from '@phosphor-icons/react/dist/csr/DownloadSimple'
import { EnvelopeSimple } from '@phosphor-icons/react/dist/csr/EnvelopeSimple'
import { GithubLogo } from '@phosphor-icons/react/dist/csr/GithubLogo'
import { GraduationCap } from '@phosphor-icons/react/dist/csr/GraduationCap'
import { House } from '@phosphor-icons/react/dist/csr/House'
import { LinkedinLogo } from '@phosphor-icons/react/dist/csr/LinkedinLogo'
import { SquaresFour } from '@phosphor-icons/react/dist/csr/SquaresFour'
import { User } from '@phosphor-icons/react/dist/csr/User'
import { resumeUrl, site } from '@/config/site'

export type SectionId =
  | 'inicio'
  | 'sobre'
  | 'projetos'
  | 'atuacao'
  | 'tecnologias'
  | 'formacao'
  | 'contato'

export type NavSection = {
  id: SectionId
  label: string
  description: string
  icon: Icon
  desktop: boolean
  dock: boolean
  secondary?: boolean
}

export const sections: NavSection[] = [
  {
    id: 'inicio',
    label: 'Início',
    description: 'Volte ao topo e à apresentação principal.',
    icon: House,
    desktop: false,
    dock: true,
  },
  {
    id: 'sobre',
    label: 'Sobre',
    description: 'Entenda o perfil profissional e a forma de trabalho.',
    icon: User,
    desktop: true,
    dock: false,
  },
  {
    id: 'projetos',
    label: 'Projetos',
    description: 'Conheça os produtos e sistemas desenvolvidos.',
    icon: SquaresFour,
    desktop: true,
    dock: true,
  },
  {
    id: 'atuacao',
    label: 'Atuação',
    description: 'Veja como a análise vira entrega na prática.',
    icon: Briefcase,
    desktop: true,
    dock: false,
  },
  {
    id: 'tecnologias',
    label: 'Tecnologias',
    description: 'Veja o ecossistema técnico aplicado aos projetos.',
    icon: Code,
    desktop: true,
    dock: true,
  },
  {
    id: 'formacao',
    label: 'Formação',
    description: 'Acompanhe a formação acadêmica e o estudo contínuo.',
    icon: GraduationCap,
    desktop: true,
    dock: false,
    secondary: true,
  },
  {
    id: 'contato',
    label: 'Contato',
    description: 'Abra os canais profissionais de contato.',
    icon: EnvelopeSimple,
    desktop: false,
    dock: true,
  },
]

export const sectionIds = sections.map((section) => section.id)

export type NavAction = {
  id: string
  label: string
  description: string
  icon: Icon
  href: string
  external?: boolean
  download?: boolean
}

const baseActions: NavAction[] = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    description: 'Abra o perfil profissional completo.',
    icon: LinkedinLogo,
    href: site.urls.linkedin,
    external: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    description: 'Veja repositórios e atividade de desenvolvimento.',
    icon: GithubLogo,
    href: site.urls.github,
    external: true,
  },
]

const publishedResume = resumeUrl()

export const externalActions: NavAction[] = publishedResume
  ? [
      ...baseActions,
      {
        id: 'curriculo',
        label: 'Currículo',
        description: 'Baixe o currículo em PDF.',
        icon: DownloadSimple,
        href: publishedResume,
        download: true,
      },
    ]
  : baseActions

export const desktopSections = sections.filter((section) => section.desktop)
export const dockSections = sections.filter((section) => section.dock)
export const primaryDesktopSections = desktopSections.filter((section) => !section.secondary)
export const secondaryDesktopSections = desktopSections.filter((section) => section.secondary)
