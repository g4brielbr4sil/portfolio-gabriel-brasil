import type { ComponentType } from 'react'
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

export function GmailIcon({ size = 22, className }: TechIconProps) {
  return (
    <svg aria-hidden="true" className={className} height={size} viewBox="0 0 24 24" width={size}>
      <path d="M2.4 6.15 6.05 8.9v9.35H3.6c-.66 0-1.2-.54-1.2-1.2V6.15Z" fill="#4285f4" />
      <path d="M17.95 8.9 21.6 6.15v10.9c0 .66-.54 1.2-1.2 1.2h-2.45V8.9Z" fill="#34a853" />
      <path d="M17.95 5.75v3.16L12 13.36 6.05 8.91V5.75L12 10.2l5.95-4.45Z" fill="#ea4335" />
      <path d="M2.4 6.15V5.3c0-1.48 1.69-2.33 2.88-1.44l.77.58v4.47L2.4 6.15Z" fill="#c5221f" />
      <path d="M21.6 6.15 17.95 8.9V4.44l.77-.58c1.19-.89 2.88-.04 2.88 1.44v.85Z" fill="#fbbc04" />
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
