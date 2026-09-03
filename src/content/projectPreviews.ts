import type { ProjectPreviewThemes } from '@/content/portfolio'

import barthyHeroDarkAvif from '@/assets/projects/barthy-v2/barthy-v2-hero-dark.avif'
import barthyHeroDarkWebp from '@/assets/projects/barthy-v2/barthy-v2-hero-dark.webp'
import barthySolucoesDarkAvif from '@/assets/projects/barthy-v2/barthy-v2-projetos-dark.avif'
import barthySolucoesDarkWebp from '@/assets/projects/barthy-v2/barthy-v2-projetos-dark.webp'
import barthyContatoDarkAvif from '@/assets/projects/barthy-v2/barthy-v2-contato-dark.avif'
import barthyContatoDarkWebp from '@/assets/projects/barthy-v2/barthy-v2-contato-dark.webp'
import barthyHeroLightAvif from '@/assets/projects/barthy-v2/barthy-v2-hero-light.avif'
import barthyHeroLightWebp from '@/assets/projects/barthy-v2/barthy-v2-hero-light.webp'
import barthySolucoesLightAvif from '@/assets/projects/barthy-v2/barthy-v2-projetos-light.avif'
import barthySolucoesLightWebp from '@/assets/projects/barthy-v2/barthy-v2-projetos-light.webp'
import barthyProcessoMobileLightAvif from '@/assets/projects/barthy-v2/barthy-v2-mobile-light.avif'
import barthyProcessoMobileLightWebp from '@/assets/projects/barthy-v2/barthy-v2-mobile-light.webp'
import pnqcHeroAvif from '@/assets/projects/pnqc/pnqc-home.avif'
import pnqcHeroWebp from '@/assets/projects/pnqc/pnqc-home.webp'
import pnqcTrilhasAvif from '@/assets/projects/pnqc/pnqc-trilhas.avif'
import pnqcTrilhasWebp from '@/assets/projects/pnqc/pnqc-trilhas.webp'
import pnqcPainelAvif from '@/assets/projects/pnqc/pnqc-painel.avif'
import pnqcPainelWebp from '@/assets/projects/pnqc/pnqc-painel.webp'
import pnqcCursoAvif from '@/assets/projects/pnqc/pnqc-curso.avif'
import pnqcCursoWebp from '@/assets/projects/pnqc/pnqc-curso.webp'
import radarMatchingAvif from '@/assets/projects/radar-df/radar-df-matching-dashboard.avif'
import radarMatchingWebp from '@/assets/projects/radar-df/radar-df-matching-dashboard.webp'
import modularAtendimentosAvif from '@/assets/projects/sistema-modular/sistema-modular-atendimentos.avif'
import modularAtendimentosWebp from '@/assets/projects/sistema-modular/sistema-modular-atendimentos.webp'

function previewImage(options: {
  id: string
  avif: string
  webp: string
  width: number
  height: number
  caption: string
  alt: string
  theme?: 'dark' | 'light'
  device: 'desktop' | 'mobile'
  order: number
}) {
  return {
    ...options,
    src: options.webp,
  }
}

/** A Barthy V2 implementa os dois temas, então o seletor aparece no card. */
export const barthyPreviews: ProjectPreviewThemes = {
  default: 'light',
  dark: {
    cover: previewImage({
      id: 'barthy-v2-hero-dark',
      avif: barthyHeroDarkAvif,
      webp: barthyHeroDarkWebp,
      width: 1906,
      height: 1079,
      caption: 'Página inicial',
      alt: 'Interface da Barthy Web Studio V2 em modo escuro — página inicial.',
      theme: 'dark',
      device: 'desktop',
      order: 0,
    }),
    desktop: [
      previewImage({
        id: 'barthy-v2-hero-dark',
        avif: barthyHeroDarkAvif,
        webp: barthyHeroDarkWebp,
        width: 1906,
        height: 1079,
        caption: 'Página inicial',
        alt: 'Interface da Barthy Web Studio V2 em modo escuro — página inicial.',
        theme: 'dark',
        device: 'desktop',
        order: 0,
      }),
      previewImage({
        id: 'barthy-v2-projetos-dark',
        avif: barthySolucoesDarkAvif,
        webp: barthySolucoesDarkWebp,
        width: 1903,
        height: 1079,
        caption: 'Seção “O que construímos”',
        alt: 'Interface da Barthy Web Studio V2 em modo escuro — seção “O que construímos”.',
        theme: 'dark',
        device: 'desktop',
        order: 1,
      }),
      previewImage({
        id: 'barthy-v2-contato-dark',
        avif: barthyContatoDarkAvif,
        webp: barthyContatoDarkWebp,
        width: 1902,
        height: 1079,
        caption: 'Seção de contato',
        alt: 'Interface da Barthy Web Studio V2 em modo escuro — seção de contato.',
        theme: 'dark',
        device: 'desktop',
        order: 2,
      }),
    ],
    images: [
      previewImage({
        id: 'barthy-v2-hero-dark',
        avif: barthyHeroDarkAvif,
        webp: barthyHeroDarkWebp,
        width: 1906,
        height: 1079,
        caption: 'Página inicial',
        alt: 'Interface da Barthy Web Studio V2 em modo escuro — página inicial.',
        theme: 'dark',
        device: 'desktop',
        order: 0,
      }),
      previewImage({
        id: 'barthy-v2-projetos-dark',
        avif: barthySolucoesDarkAvif,
        webp: barthySolucoesDarkWebp,
        width: 1903,
        height: 1079,
        caption: 'Seção “O que construímos”',
        alt: 'Interface da Barthy Web Studio V2 em modo escuro — seção “O que construímos”.',
        theme: 'dark',
        device: 'desktop',
        order: 1,
      }),
      previewImage({
        id: 'barthy-v2-contato-dark',
        avif: barthyContatoDarkAvif,
        webp: barthyContatoDarkWebp,
        width: 1902,
        height: 1079,
        caption: 'Seção de contato',
        alt: 'Interface da Barthy Web Studio V2 em modo escuro — seção de contato.',
        theme: 'dark',
        device: 'desktop',
        order: 2,
      }),
    ],
  },
  light: {
    cover: previewImage({
      id: 'barthy-v2-hero-light',
      avif: barthyHeroLightAvif,
      webp: barthyHeroLightWebp,
      width: 1904,
      height: 1079,
      caption: 'Página inicial',
      alt: 'Interface da Barthy Web Studio V2 em modo claro — página inicial.',
      theme: 'light',
      device: 'desktop',
      order: 0,
    }),
    desktop: [
      previewImage({
        id: 'barthy-v2-hero-light',
        avif: barthyHeroLightAvif,
        webp: barthyHeroLightWebp,
        width: 1904,
        height: 1079,
        caption: 'Página inicial',
        alt: 'Interface da Barthy Web Studio V2 em modo claro — página inicial.',
        theme: 'light',
        device: 'desktop',
        order: 0,
      }),
      previewImage({
        id: 'barthy-v2-projetos-light',
        avif: barthySolucoesLightAvif,
        webp: barthySolucoesLightWebp,
        width: 1904,
        height: 1079,
        caption: 'Seção “O que construímos”',
        alt: 'Interface da Barthy Web Studio V2 em modo claro — seção “O que construímos”.',
        theme: 'light',
        device: 'desktop',
        order: 1,
      }),
    ],
    mobile: [
      previewImage({
        id: 'barthy-v2-mobile-light',
        avif: barthyProcessoMobileLightAvif,
        webp: barthyProcessoMobileLightWebp,
        width: 576,
        height: 992,
        caption: 'Processo em visualização mobile',
        alt: 'Interface da Barthy Web Studio V2 em modo claro — processo em visualização mobile.',
        theme: 'light',
        device: 'mobile',
        order: 2,
      }),
    ],
    images: [
      previewImage({
        id: 'barthy-v2-hero-light',
        avif: barthyHeroLightAvif,
        webp: barthyHeroLightWebp,
        width: 1904,
        height: 1079,
        caption: 'Página inicial',
        alt: 'Interface da Barthy Web Studio V2 em modo claro — página inicial.',
        theme: 'light',
        device: 'desktop',
        order: 0,
      }),
      previewImage({
        id: 'barthy-v2-projetos-light',
        avif: barthySolucoesLightAvif,
        webp: barthySolucoesLightWebp,
        width: 1904,
        height: 1079,
        caption: 'Seção “O que construímos”',
        alt: 'Interface da Barthy Web Studio V2 em modo claro — seção “O que construímos”.',
        theme: 'light',
        device: 'desktop',
        order: 1,
      }),
      previewImage({
        id: 'barthy-v2-mobile-light',
        avif: barthyProcessoMobileLightAvif,
        webp: barthyProcessoMobileLightWebp,
        width: 576,
        height: 992,
        caption: 'Processo em visualização mobile',
        alt: 'Interface da Barthy Web Studio V2 em modo claro — processo em visualização mobile.',
        theme: 'light',
        device: 'mobile',
        order: 2,
      }),
    ],
  },
}

/** O PNQC só tem capturas em modo escuro — sem o segundo conjunto, sem seletor. */
export const pnqcPreviews: ProjectPreviewThemes = {
  default: 'dark',
  dark: {
    cover: previewImage({
      id: 'pnqc-home',
      avif: pnqcHeroAvif,
      webp: pnqcHeroWebp,
      width: 1919,
      height: 1079,
      caption: 'Página inicial pública da plataforma',
      alt: 'Interface do Levens Qualifica | PNQC — página inicial pública da plataforma.',
      theme: 'dark',
      device: 'desktop',
      order: 0,
    }),
    desktop: [
      previewImage({
        id: 'pnqc-home',
        avif: pnqcHeroAvif,
        webp: pnqcHeroWebp,
        width: 1919,
        height: 1079,
        caption: 'Página inicial pública da plataforma',
        alt: 'Interface do Levens Qualifica | PNQC — página inicial pública da plataforma.',
        theme: 'dark',
        device: 'desktop',
        order: 0,
      }),
      previewImage({
        id: 'pnqc-trilhas',
        avif: pnqcTrilhasAvif,
        webp: pnqcTrilhasWebp,
        width: 1918,
        height: 1079,
        caption: 'Trilhas de aprendizagem disponíveis',
        alt: 'Interface do Levens Qualifica | PNQC — trilhas de aprendizagem disponíveis.',
        theme: 'dark',
        device: 'desktop',
        order: 1,
      }),
      previewImage({
        id: 'pnqc-painel',
        avif: pnqcPainelAvif,
        webp: pnqcPainelWebp,
        width: 1919,
        height: 1079,
        caption: 'Painel do aluno com progresso e módulos',
        alt: 'Interface do Levens Qualifica | PNQC — painel do aluno com progresso e módulos.',
        theme: 'dark',
        device: 'desktop',
        order: 2,
      }),
      previewImage({
        id: 'pnqc-curso',
        avif: pnqcCursoAvif,
        webp: pnqcCursoWebp,
        width: 1918,
        height: 1079,
        caption: 'Detalhes do curso e organização das aulas',
        alt: 'Interface do Levens Qualifica | PNQC — detalhes do curso e organização das aulas.',
        theme: 'dark',
        device: 'desktop',
        order: 3,
      }),
    ],
    images: [
      previewImage({
        id: 'pnqc-home',
        avif: pnqcHeroAvif,
        webp: pnqcHeroWebp,
        width: 1919,
        height: 1079,
        caption: 'Página inicial pública da plataforma',
        alt: 'Interface do Levens Qualifica | PNQC — página inicial pública da plataforma.',
        theme: 'dark',
        device: 'desktop',
        order: 0,
      }),
      previewImage({
        id: 'pnqc-trilhas',
        avif: pnqcTrilhasAvif,
        webp: pnqcTrilhasWebp,
        width: 1918,
        height: 1079,
        caption: 'Trilhas de aprendizagem disponíveis',
        alt: 'Interface do Levens Qualifica | PNQC — trilhas de aprendizagem disponíveis.',
        theme: 'dark',
        device: 'desktop',
        order: 1,
      }),
      previewImage({
        id: 'pnqc-painel',
        avif: pnqcPainelAvif,
        webp: pnqcPainelWebp,
        width: 1919,
        height: 1079,
        caption: 'Painel do aluno com progresso e módulos',
        alt: 'Interface do Levens Qualifica | PNQC — painel do aluno com progresso e módulos.',
        theme: 'dark',
        device: 'desktop',
        order: 2,
      }),
      previewImage({
        id: 'pnqc-curso',
        avif: pnqcCursoAvif,
        webp: pnqcCursoWebp,
        width: 1918,
        height: 1079,
        caption: 'Detalhes do curso e organização das aulas',
        alt: 'Interface do Levens Qualifica | PNQC — detalhes do curso e organização das aulas.',
        theme: 'dark',
        device: 'desktop',
        order: 3,
      }),
    ],
  },
}

const radarMatching = previewImage({
  id: 'radar-df-matching-dashboard',
  avif: radarMatchingAvif,
  webp: radarMatchingWebp,
  width: 1302,
  height: 838,
  caption: 'Painel de vagas, ingestão e matching',
  alt: 'Mockup oficial do Radar DF em tema escuro, com vaga, indicadores, ranking de candidatos, ingestão e requisitos extraídos.',
  theme: 'dark',
  device: 'desktop',
  order: 0,
})

export const radarPreviews: ProjectPreviewThemes = {
  default: 'dark',
  dark: {
    cover: radarMatching,
    desktop: [radarMatching],
    images: [radarMatching],
  },
}

const modularAtendimentos = previewImage({
  id: 'sistema-modular-atendimentos',
  avif: modularAtendimentosAvif,
  webp: modularAtendimentosWebp,
  width: 1304,
  height: 814,
  caption: 'Atendimentos e histórico operacional',
  alt: 'Mockup oficial do Sistema Modular em tema claro, com atendimentos, histórico operacional, módulo oficina e WhatsApp contextual.',
  theme: 'light',
  device: 'desktop',
  order: 0,
})

export const modularPreviews: ProjectPreviewThemes = {
  default: 'light',
  light: {
    cover: modularAtendimentos,
    desktop: [modularAtendimentos],
    images: [modularAtendimentos],
  },
}
