import type { ComponentType } from 'react'
import { ArrowsLeftRight } from '@phosphor-icons/react/dist/csr/ArrowsLeftRight'
import { Database } from '@phosphor-icons/react/dist/csr/Database'
import { FolderOpen } from '@phosphor-icons/react/dist/csr/FolderOpen'
import { Keyboard } from '@phosphor-icons/react/dist/csr/Keyboard'
import { Network } from '@phosphor-icons/react/dist/csr/Network'
import { PlugsConnected } from '@phosphor-icons/react/dist/csr/PlugsConnected'
import type { IconType } from 'react-icons'
import {
  SiCloudflare,
  SiCss,
  SiDocker,
  SiFastapi,
  SiGit,
  SiGithub,
  SiGithubcopilot,
  SiHtml5,
  SiJavascript,
  SiLinux,
  SiMui,
  SiN8N,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiRailway,
  SiReact,
  SiReacthookform,
  SiSqlite,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'

export type TechIconProps = {
  size?: number
  className?: string
}

export type TechIconComponent = ComponentType<TechIconProps>

function createSingleColorIcon(
  Icon: IconType,
  color: string,
  displayName: string,
): TechIconComponent {
  const TechIcon = ({ size = 22, className }: TechIconProps) => (
    <Icon aria-hidden="true" className={className} color={color} size={size} />
  )

  TechIcon.displayName = displayName
  return TechIcon
}

export const HtmlIcon = createSingleColorIcon(SiHtml5, '#e34f26', 'HtmlIcon')
export const CssIcon = createSingleColorIcon(SiCss, '#1572b6', 'CssIcon')
export const JavascriptIcon = createSingleColorIcon(SiJavascript, '#f7df1e', 'JavascriptIcon')
export const TypescriptIcon = createSingleColorIcon(SiTypescript, '#3178c6', 'TypescriptIcon')
export const ReactIcon = createSingleColorIcon(SiReact, '#61dafb', 'ReactIcon')
export const ViteIcon = createSingleColorIcon(SiVite, '#a855f7', 'ViteIcon')
export const TailwindIcon = createSingleColorIcon(SiTailwindcss, '#38bdf8', 'TailwindIcon')
export const MuiIcon = createSingleColorIcon(SiMui, '#007fff', 'MuiIcon')
export const ReactHookFormIcon = createSingleColorIcon(
  SiReacthookform,
  '#ec5990',
  'ReactHookFormIcon',
)
export const FastApiIcon = createSingleColorIcon(SiFastapi, '#009688', 'FastApiIcon')
export const PhpIcon = createSingleColorIcon(SiPhp, '#777bb4', 'PhpIcon')
export const SqliteIcon = createSingleColorIcon(SiSqlite, '#5ba9d0', 'SqliteIcon')
export const PostgresqlIcon = createSingleColorIcon(SiPostgresql, '#4169e1', 'PostgresqlIcon')
export const SupabaseIcon = createSingleColorIcon(SiSupabase, '#3ecf8e', 'SupabaseIcon')
export const DockerIcon = createSingleColorIcon(SiDocker, '#2496ed', 'DockerIcon')
export const LinuxIcon = createSingleColorIcon(SiLinux, '#fcc624', 'LinuxIcon')
export const CloudflareIcon = createSingleColorIcon(SiCloudflare, '#f48120', 'CloudflareIcon')
export const RailwayIcon = createSingleColorIcon(SiRailway, '#f4f4f5', 'RailwayIcon')
export const N8nIcon = createSingleColorIcon(SiN8N, '#ea4b71', 'N8nIcon')
export const GitIcon = createSingleColorIcon(SiGit, '#f05032', 'GitIcon')
export const GithubIcon = createSingleColorIcon(SiGithub, '#f4f4f5', 'GithubIcon')
export const CopilotIcon = createSingleColorIcon(SiGithubcopilot, '#a6ffcb', 'CopilotIcon')
export const VscodeIcon = createSingleColorIcon(VscVscode, '#23a8f2', 'VscodeIcon')

const OPERATION_ICON_COLOR = '#b56d7c'

export function ApiRestIcon({ size = 22, className }: TechIconProps) {
  return <ArrowsLeftRight aria-hidden="true" className={className} color="#7ba1c4" size={size} weight="duotone" />
}

export function SqlIcon({ size = 22, className }: TechIconProps) {
  return <Database aria-hidden="true" className={className} color="#6fa6bc" size={size} weight="duotone" />
}

export function AwsIcon({ size = 22, className }: TechIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      height={size}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 304 182"
      width={Math.round(size * 1.67)}
    >
      <path
        fill="#ffffff"
        d="m86 66 2 9c0 3 1 5 3 8v2l-1 3-7 4-2 1-3-1-4-5-3-6c-8 9-18 14-29 14-9 0-16-3-20-8-5-4-8-11-8-19s3-15 9-20c6-6 14-8 25-8a79 79 0 0 1 22 3v-7c0-8-2-13-5-16-3-4-8-5-16-5l-11 1a80 80 0 0 0-14 5h-2c-1 0-2-1-2-3v-5l1-3c0-1 1-2 3-2l12-5 16-2c12 0 20 3 26 8 5 6 8 14 8 25v32zM46 82l10-2c4-1 7-4 10-7l3-6 1-9v-4a84 84 0 0 0-19-2c-6 0-11 1-15 4-3 2-4 6-4 11s1 8 3 11c3 2 6 4 11 4zm80 10-4-1-2-3-23-78-1-4 2-2h10l4 1 2 4 17 66 15-66 2-4 4-1h8l4 1 2 4 16 67 17-67 2-4 4-1h9c2 0 3 1 3 2v2l-1 2-24 78-2 4-4 1h-9l-4-1-1-4-16-65-15 64-2 4-4 1h-9zm129 3a66 66 0 0 1-27-6l-3-3-1-2v-5c0-2 1-3 2-3h2l3 1a54 54 0 0 0 23 5c6 0 11-2 14-4 4-2 5-5 5-9l-2-7-10-5-15-5c-7-2-13-6-16-10a24 24 0 0 1 5-34l10-5a44 44 0 0 1 20-2 110 110 0 0 1 12 3l4 2 3 2 1 4v4c0 3-1 4-2 4l-4-2c-6-2-12-3-19-3-6 0-11 0-14 2s-4 5-4 9c0 3 1 5 3 7s5 4 11 6l14 4c7 3 12 6 15 10s5 9 5 14l-3 12-7 8c-3 3-7 5-11 6l-14 2z"
      />
      <path d="M274 144A220 220 0 0 1 4 124c-4-3-1-6 2-4a300 300 0 0 0 263 16c5-2 10 4 5 8z" fill="#f90" />
      <path d="M287 128c-4-5-28-3-38-1-4 0-4-3-1-5 19-13 50-9 53-5 4 5-1 36-18 51-3 2-6 1-5-2 5-10 13-33 9-38z" fill="#f90" />
    </svg>
  )
}

export function MicrosoftOfficeIcon({ size = 22, className }: TechIconProps) {
  return (
    <svg aria-hidden="true" className={className} height={size} viewBox="0 0 24 24" width={size}>
      <path d="M2 2h9v9H2z" fill="#f25022" />
      <path d="M13 2h9v9h-9z" fill="#7fba00" />
      <path d="M2 13h9v9H2z" fill="#00a4ef" />
      <path d="M13 13h9v9h-9z" fill="#ffb900" />
    </svg>
  )
}

export function FileManagementIcon({ size = 22, className }: TechIconProps) {
  return <FolderOpen aria-hidden="true" className={className} color={OPERATION_ICON_COLOR} size={size} weight="duotone" />
}

export function NetworkConfigurationIcon({ size = 22, className }: TechIconProps) {
  return <Network aria-hidden="true" className={className} color={OPERATION_ICON_COLOR} size={size} weight="duotone" />
}

export function CableManagementIcon({ size = 22, className }: TechIconProps) {
  return <PlugsConnected aria-hidden="true" className={className} color={OPERATION_ICON_COLOR} size={size} weight="duotone" />
}

export function DataEntryIcon({ size = 22, className }: TechIconProps) {
  return <Keyboard aria-hidden="true" className={className} color={OPERATION_ICON_COLOR} size={size} weight="duotone" />
}

export function PythonIcon({ size = 22, className }: TechIconProps) {
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{ display: 'inline-flex', height: size, position: 'relative', width: size }}
    >
      <SiPython
        color="#3776ab"
        size={size}
        style={{ clipPath: 'inset(0 0 49% 0)', inset: 0, position: 'absolute' }}
      />
      <SiPython
        color="#ffd343"
        size={size}
        style={{ clipPath: 'inset(49% 0 0 0)', inset: 0, position: 'absolute' }}
      />
    </span>
  )
}

export function MotionIcon({ size = 22, className }: TechIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 1260 454"
      width={Math.round(size * 1.28)}
    >
      <path
        d="M475.753 0 226.8 453.6H0L194.392 99.4116C224.526 44.508 299.724 0 362.353 0h113.4Z"
        fill="#fff312"
      />
      <path
        d="M1031.93 113.4C1031.93 50.771 1082.7 0 1145.33 0s113.4 50.771 113.4 113.4-50.77 113.4-113.4 113.4-113.4-50.771-113.4-113.4Z"
        fill="#fff312"
      />
      <path d="M518.278 0h226.8L496.125 453.6h-226.8L518.278 0Z" fill="#fff312" />
    </svg>
  )
}

export function FigmaIcon({ size = 22, className }: TechIconProps) {
  return (
    <svg aria-hidden="true" className={className} height={size} viewBox="0 0 24 24" width={size}>
      <path d="M7.5 2h4.5v6H7.5a3 3 0 0 1 0-6Z" fill="#f24e1e" />
      <path d="M12 2h4.5a3 3 0 0 1 0 6H12V2Z" fill="#ff7262" />
      <path d="M7.5 8h4.5v6H7.5a3 3 0 0 1 0-6Z" fill="#a259ff" />
      <circle cx="15" cy="11" fill="#1abcfe" r="3" />
      <path d="M7.5 14H12v3a4.5 4.5 0 1 1-4.5-4.5V14Z" fill="#0acf83" />
    </svg>
  )
}
