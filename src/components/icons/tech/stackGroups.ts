import {
  ApiRestIcon,
  AwsIcon,
  CloudflareIcon,
  CopilotIcon,
  CableManagementIcon,
  CssIcon,
  DataEntryIcon,
  DockerIcon,
  FastApiIcon,
  FigmaIcon,
  FileManagementIcon,
  GitIcon,
  GithubIcon,
  HtmlIcon,
  JavascriptIcon,
  LinuxIcon,
  MotionIcon,
  MuiIcon,
  MicrosoftOfficeIcon,
  N8nIcon,
  NetworkConfigurationIcon,
  PhpIcon,
  PostgresqlIcon,
  PythonIcon,
  RailwayIcon,
  ReactHookFormIcon,
  ReactIcon,
  SqliteIcon,
  SqlIcon,
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
  area: 'frontend' | 'interface' | 'backend' | 'data' | 'devops' | 'tools' | 'operations'
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
      { name: 'PHP', icon: PhpIcon },
      { name: 'APIs REST', icon: ApiRestIcon },
    ],
  },
  {
    title: 'Dados',
    area: 'data',
    items: [
      { name: 'SQL', icon: SqlIcon },
      { name: 'SQLite', icon: SqliteIcon },
      { name: 'PostgreSQL', icon: PostgresqlIcon },
      { name: 'Supabase', icon: SupabaseIcon },
    ],
  },
  {
    title: 'Infra & DevOps',
    area: 'devops',
    items: [
      { name: 'Docker', icon: DockerIcon },
      { name: 'Linux', icon: LinuxIcon },
      { name: 'Cloudflare', icon: CloudflareIcon },
      { name: 'Railway', icon: RailwayIcon },
      { name: 'AWS Lightsail', icon: AwsIcon },
    ],
  },
  {
    title: 'Ferramentas',
    area: 'tools',
    items: [
      { name: 'Git', icon: GitIcon },
      { name: 'GitHub', icon: GithubIcon },
      { name: 'GitHub Copilot', icon: CopilotIcon },
      { name: 'Visual Studio Code', icon: VscodeIcon },
      { name: 'n8n', icon: N8nIcon },
    ],
  },
  {
    title: 'Ferramentas e Operação',
    area: 'operations',
    items: [
      { name: 'Figma', icon: FigmaIcon },
      { name: 'Microsoft Office', icon: MicrosoftOfficeIcon },
      { name: 'File Management', icon: FileManagementIcon },
      { name: 'Network Configuration', icon: NetworkConfigurationIcon },
      { name: 'Cable Management', icon: CableManagementIcon },
      { name: 'Data Entry', icon: DataEntryIcon },
    ],
  },
]
