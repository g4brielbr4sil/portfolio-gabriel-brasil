import {
  CloudflareIcon,
  CopilotIcon,
  CssIcon,
  DockerIcon,
  FastApiIcon,
  FigmaIcon,
  GitIcon,
  GithubIcon,
  GmailIcon,
  HtmlIcon,
  JavascriptIcon,
  LinuxIcon,
  MotionIcon,
  MuiIcon,
  N8nIcon,
  PostgresqlIcon,
  PythonIcon,
  RailwayIcon,
  ReactHookFormIcon,
  ReactIcon,
  SqliteIcon,
  SupabaseIcon,
  TailwindIcon,
  TypescriptIcon,
  ViteIcon,
  VscodeIcon,
  type TechIconComponent,
} from './TechIcons'

export type StackItem = {
  name: string
  icon: TechIconComponent
}

export type StackGroup = {
  title: string
  area: 'frontend' | 'interface' | 'backend' | 'data' | 'devops' | 'automation' | 'tools'
  items: StackItem[]
}

export const stackGroups: StackGroup[] = [
  {
    title: 'Front-end',
    area: 'frontend',
    items: [
      { name: 'HTML5', icon: HtmlIcon },
      { name: 'CSS3', icon: CssIcon },
      { name: 'JavaScript', icon: JavascriptIcon },
      { name: 'TypeScript', icon: TypescriptIcon },
      { name: 'React', icon: ReactIcon },
      { name: 'Vite', icon: ViteIcon },
    ],
  },
  {
    title: 'Interface & Motion',
    area: 'interface',
    items: [
      { name: 'Tailwind CSS', icon: TailwindIcon },
      { name: 'Material UI', icon: MuiIcon },
      { name: 'Motion', icon: MotionIcon },
      { name: 'React Hook Form', icon: ReactHookFormIcon },
    ],
  },
  {
    title: 'Back-end & APIs',
    area: 'backend',
    items: [
      { name: 'Python', icon: PythonIcon },
      { name: 'FastAPI', icon: FastApiIcon },
    ],
  },
  {
    title: 'Dados & Autenticação',
    area: 'data',
    items: [
      { name: 'SQLite', icon: SqliteIcon },
      { name: 'PostgreSQL', icon: PostgresqlIcon },
      { name: 'Supabase', icon: SupabaseIcon },
    ],
  },
  {
    title: 'DevOps, Infra & Deploy',
    area: 'devops',
    items: [
      { name: 'Docker', icon: DockerIcon },
      { name: 'Linux', icon: LinuxIcon },
      { name: 'Cloudflare', icon: CloudflareIcon },
      { name: 'Railway', icon: RailwayIcon },
    ],
  },
  {
    title: 'Automação & Integrações',
    area: 'automation',
    items: [
      { name: 'n8n', icon: N8nIcon },
      { name: 'Gmail', icon: GmailIcon },
    ],
  },
  {
    title: 'Versionamento & Ferramentas',
    area: 'tools',
    items: [
      { name: 'Git', icon: GitIcon },
      { name: 'GitHub', icon: GithubIcon },
      { name: 'GitHub Copilot', icon: CopilotIcon },
      { name: 'Figma', icon: FigmaIcon },
      { name: 'Visual Studio Code', icon: VscodeIcon },
    ],
  },
]
