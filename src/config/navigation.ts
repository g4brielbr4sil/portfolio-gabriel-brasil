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
import { contact } from '@/content/portfolio'

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
  /** Descrição curta usada na navegação rápida. */
  description: string
  icon: Icon
  /** Aparece na fileira central da navbar desktop. */
  desktop: boolean
  /** Aparece no dock inferior do celular. */
  dock: boolean
  /** Recolhido em "Mais" quando o espaço horizontal é limitado. */
  secondary?: boolean
}

/** Fonte única da navegação — nenhum componente repete esta lista. */
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

/** Destinos externos e currículo — usados em "Mais", no Sheet e na navegação rápida. */
export const externalActions: NavAction[] = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    description: 'Abra o perfil profissional completo.',
    icon: LinkedinLogo,
    href: contact.linkedin,
    external: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    description: 'Veja repositórios e atividade de desenvolvimento.',
    icon: GithubLogo,
    href: contact.github,
    external: true,
  },
  {
    id: 'curriculo',
    label: 'Currículo',
    description: 'Baixe o currículo em PDF.',
    icon: DownloadSimple,
    href: contact.resume,
    download: true,
  },
]

export const desktopSections = sections.filter((section) => section.desktop)
export const dockSections = sections.filter((section) => section.dock)

/** Itens sempre visíveis na navbar desktop, mesmo em notebooks estreitos. */
export const primaryDesktopSections = desktopSections.filter((section) => !section.secondary)
/** Itens recolhidos em "Mais" quando não há espaço. */
export const secondaryDesktopSections = desktopSections.filter((section) => section.secondary)
