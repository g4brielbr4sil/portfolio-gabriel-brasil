import type { IconType } from 'react-icons'
import {
  SiAnimedotjs,
  SiCloudflarepages,
  SiCss,
  SiDocker,
  SiFastapi,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiMui,
  SiPnpm,
  SiPostgresql,
  SiPydantic,
  SiPython,
  SiRadixui,
  SiReact,
  SiReacthookform,
  SiReactrouter,
  SiRuff,
  SiSqlalchemy,
  SiSqlite,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiUbuntu,
  SiVite,
  SiWebgl,
} from 'react-icons/si'
import { ArrowsLeftRight } from '@phosphor-icons/react/dist/csr/ArrowsLeftRight'
import { BracketsCurly } from '@phosphor-icons/react/dist/csr/BracketsCurly'
import { Cube } from '@phosphor-icons/react/dist/csr/Cube'
import { Database } from '@phosphor-icons/react/dist/csr/Database'
import { Lightning } from '@phosphor-icons/react/dist/csr/Lightning'
import { PlugsConnected } from '@phosphor-icons/react/dist/csr/PlugsConnected'
import { Sparkle } from '@phosphor-icons/react/dist/csr/Sparkle'
import { WaveSine } from '@phosphor-icons/react/dist/csr/WaveSine'

const brandedIcons: Record<string, { icon: IconType; color: string }> = {
  React: { icon: SiReact, color: '#61dafb' },
  TypeScript: { icon: SiTypescript, color: '#3178c6' },
  Vite: { icon: SiVite, color: '#a97bff' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#38bdf8' },
  'Material UI': { icon: SiMui, color: '#42a5f5' },
  'React Hook Form': { icon: SiReacthookform, color: '#ec5990' },
  'React Router': { icon: SiReactrouter, color: '#f44250' },
  Python: { icon: SiPython, color: '#f7cf47' },
  FastAPI: { icon: SiFastapi, color: '#009688' },
  SQLAlchemy: { icon: SiSqlalchemy, color: '#d71f00' },
  Pydantic: { icon: SiPydantic, color: '#e92063' },
  SQLite: { icon: SiSqlite, color: '#69a9d3' },
  PostgreSQL: { icon: SiPostgresql, color: '#6696c5' },
  'Supabase Auth': { icon: SiSupabase, color: '#3ecf8e' },
  Git: { icon: SiGit, color: '#f05032' },
  GitHub: { icon: SiGithub, color: '#f0f2f4' },
  'GitHub Actions': { icon: SiGithubactions, color: '#4b98f7' },
  Docker: { icon: SiDocker, color: '#2496ed' },
  Ubuntu: { icon: SiUbuntu, color: '#e95420' },
  'Cloudflare Pages': { icon: SiCloudflarepages, color: '#f48120' },
  pnpm: { icon: SiPnpm, color: '#f9ad00' },
  'Anime.js': { icon: SiAnimedotjs, color: '#f05a9d' },
  WebGPU: { icon: SiWebgl, color: '#ef4b4d' },
  'Radix UI': { icon: SiRadixui, color: '#f0f2f4' },
  JWT: { icon: SiJsonwebtokens, color: '#d664d7' },
  Ruff: { icon: SiRuff, color: '#d9c34f' },
  HTML5: { icon: SiHtml5, color: '#e34f26' },
  CSS3: { icon: SiCss, color: '#1572b6' },
  JavaScript: { icon: SiJavascript, color: '#f7df1e' },
}

const semanticIcons = {
  Motion: WaveSine,
  'CSS nativo': BracketsCurly,
  Shaders: Sparkle,
  'APIs REST': PlugsConnected,
  'Banco relacional': Database,
  'Funções RPC': ArrowsLeftRight,
  Alembic: Database,
  Uvicorn: Lightning,
  HTTPX: PlugsConnected,
} as const

export default function TechnologyIcon({ name, size = 16, accent = '#aeb7b3' }: { name: string; size?: number; accent?: string }) {
  const branded = brandedIcons[name]

  if (branded) {
    const Icon = branded.icon
    return <Icon size={size} color={branded.color} aria-hidden="true" />
  }

  const Icon = semanticIcons[name as keyof typeof semanticIcons] ?? Cube
  return <Icon size={size} color={accent} weight="regular" aria-hidden="true" />
}
