import { barthyPreviews, pnqcPreviews } from '@/content/projectPreviews'

export const contact = {
  email: 'g4brielbr4sil@gmail.com',
  mailto: 'mailto:g4brielbr4sil@gmail.com',
  linkedin: 'https://www.linkedin.com/in/gabrielbrasildev',
  github: 'https://github.com/g4brielbr4sil',
  /** O CTA só deve reaparecer quando o PDF real existir em public/. */
  resume: null as string | null,
  location: 'Brasília, Distrito Federal, Brasil',
}

export type ProjectLink = {
  label: string
  href?: string
  external?: boolean
  note?: string
  noteTooltip?: string
}

export type PreviewTheme = 'dark' | 'light'

export type ProjectPreviewImage = {
  id: string
  src: string
  avif: string
  webp: string
  width: number
  height: number
  caption: string
  alt: string
  theme?: PreviewTheme
  device: 'desktop' | 'mobile'
  order: number
}

export type ProjectPreviewSet = {
  cover: ProjectPreviewImage
  desktop?: ProjectPreviewImage[]
  mobile?: ProjectPreviewImage[]
  images: ProjectPreviewImage[]
}

export type ProjectPreviewThemes = {
  default: PreviewTheme
  dark?: ProjectPreviewSet
  light?: ProjectPreviewSet
}

export type ProjectCaseStudy = {
  category: string
  status: string
  context: string
  problem: string
  role: string
  decisions: string[]
  features: string[]
  stackMain: string[]
  stackExtra?: string[]
  challenges: string[]
  solutions: string[]
  nextSteps: string[]
  links: ProjectLink[]
}

export type Project = {
  number: string
  name: string
  status?: string
  statusTooltip?: string
  editorialNote?: string
  description: string
  techLabel?: string
  tech: string[]
  techExtra?: string[]
  highlightsLabel?: string
  highlights: string[]
  links: ProjectLink[]
  previewThemes?: ProjectPreviewThemes
  previewNote?: string
  caseStudy: ProjectCaseStudy
}

export const projects: Project[] = [
  {
    number: '01',
    name: 'Barthy Web Studio V2',
    status: 'Case autoral',
    previewThemes: barthyPreviews,
    description:
      'Site institucional e portfólio desenvolvido para apresentar soluções digitais com identidade própria, dois temas reais, experiência responsiva e progressive enhancement.',
    highlightsLabel: 'Evidências da entrega',
    highlights: [
      'Temas claro e escuro reais',
      'WebGPU com fallback em CSS',
      'Modo estático para movimento reduzido',
      'Formulário com validação e tratamento de falhas',
      'Navegação por teclado',
      'Auditorias automatizadas de qualidade',
    ],
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'CSS nativo', 'Anime.js', 'Cloudflare Pages'],
    techExtra: ['WebGPU', 'Shaders', 'GitHub Actions', 'pnpm', 'TypeScript Project References'],
    links: [
      {
        label: 'Ver repositório V2',
        href: 'https://github.com/g4brielbr4sil/barthy-web-studio-v2',
        external: true,
      },
      {
        label: 'Abrir versão pública V1',
        href: 'https://barthy-web-studio.pages.dev/',
        external: true,
      },
    ],
    caseStudy: {
      category: 'Portfólio institucional autoral',
      status: 'V2 em evolução com base pública versionada',
      context:
        'A Barthy Web Studio precisava apresentar serviços e capacidade técnica sem parecer um template genérico. A V2 foi desenhada como uma experiência editorial, responsiva e acessível.',
      problem:
        'Unificar identidade visual, apresentação comercial e demonstração técnica em uma interface que funcionasse bem em dispositivos e condições de renderização diferentes.',
      role:
        'Concepção da experiência, desenvolvimento front-end, organização dos componentes, implementação dos temas e preparação da publicação.',
      decisions: [
        'Progressive enhancement para preservar a experiência quando WebGPU não estiver disponível.',
        'Temas claro e escuro construídos como interfaces reais, sem inversão artificial de cores.',
        'Fallback estático quando o usuário solicita redução de movimento.',
        'Capturas reais otimizadas em AVIF e WebP para comprovar a entrega.',
      ],
      features: [
        'Landing institucional responsiva',
        'Dois temas completos',
        'Seções de serviços, projetos, processo e contato',
        'Formulário com validação',
        'Navegação acessível por teclado',
      ],
      stackMain: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'CSS nativo', 'Anime.js'],
      stackExtra: ['WebGPU', 'Shaders', 'GitHub Actions', 'pnpm', 'Cloudflare Pages'],
      challenges: [
        'Preservar legibilidade e identidade nos dois temas.',
        'Evitar que recursos visuais avançados se tornassem uma dependência para usar o site.',
      ],
      solutions: [
        'Separação entre camada visual avançada e fallback funcional.',
        'Componentes responsivos com estados de foco, movimento reduzido e tratamento de falhas.',
      ],
      nextSteps: ['Consolidar a V2 pública e evoluir os cases comerciais com evidências reais.'],
      links: [
        {
          label: 'Ver repositório V2',
          href: 'https://github.com/g4brielbr4sil/barthy-web-studio-v2',
          external: true,
        },
        {
          label: 'Abrir versão pública V1',
          href: 'https://barthy-web-studio.pages.dev/',
          external: true,
        },
      ],
    },
  },
  {
    number: '02',
    name: 'Levens Qualifica | PNQC',
    status: 'Em produção',
    previewThemes: pnqcPreviews,
    description:
      'Plataforma educacional em produção para organizar cursos, módulos, aulas, progresso sequencial, avaliações e perfis de acesso.',
    highlightsLabel: 'Evidências da entrega',
    highlights: [
      'Autenticação e perfis',
      'Cursos, módulos e aulas',
      'Progresso sequencial',
      'Avaliações por funções RPC',
      'Nota mínima de 70%',
      'Rotas protegidas por perfil',
    ],
    tech: ['React', 'TypeScript', 'Vite', 'React Router', 'Tailwind CSS', 'Supabase Auth', 'PostgreSQL'],
    techExtra: ['Material UI', 'Emotion', 'Radix UI', 'React Hook Form', 'Recharts', 'Funções RPC', 'Cloudflare Pages'],
    links: [
      {
        label: 'Abrir plataforma',
        href: 'https://levens-qualifica-pnqc.pages.dev/',
        external: true,
      },
    ],
    caseStudy: {
      category: 'Plataforma educacional',
      status: 'Em produção',
      context:
        'O Levens Qualifica | PNQC organiza uma jornada educacional com diferentes perfis, conteúdos sequenciais e avaliações dentro de uma aplicação web publicada.',
      problem:
        'Conduzir o aluno por cursos e módulos com controle de acesso e progressão, sem liberar etapas fora de ordem ou expor respostas de avaliação.',
      role:
        'Desenvolvimento da interface, estruturação dos fluxos educacionais, integração da autenticação e validação das rotas protegidas.',
      decisions: [
        'Separação de rotas e permissões por perfil.',
        'Progresso persistido por aluno e liberação sequencial de conteúdo.',
        'Avaliações executadas por funções RPC, com regra mínima de 70%.',
        'Capturas públicas e internas selecionadas sem expor dados pessoais.',
      ],
      features: [
        'Landing pública',
        'Autenticação e perfis student, agency e admin',
        'Cursos, módulos e aulas',
        'Painel de progresso',
        'Avaliações e bloqueio sequencial',
      ],
      stackMain: ['React', 'TypeScript', 'Vite', 'React Router', 'Tailwind CSS', 'Supabase Auth', 'PostgreSQL'],
      stackExtra: ['Material UI', 'Emotion', 'Radix UI', 'React Hook Form', 'Recharts', 'Funções RPC', 'Cloudflare Pages'],
      challenges: [
        'Coordenar progressão, avaliação e permissões sem tornar a navegação confusa.',
        'Manter respostas corretas protegidas no fluxo de avaliação.',
      ],
      solutions: [
        'Rotas protegidas e componentes orientados por perfil.',
        'Regras de avaliação e progresso tratadas no backend por RPC.',
      ],
      nextSteps: ['Evoluir a experiência educacional e concluir recursos ainda em desenvolvimento sem prometer certificação pronta.'],
      links: [
        {
          label: 'Abrir plataforma',
          href: 'https://levens-qualifica-pnqc.pages.dev/',
          external: true,
        },
      ],
    },
  },
  {
    number: '03',
    name: 'Hermes Command Center',
    status: 'Ambiente protegido',
    statusTooltip: 'Aplicação autoral privada. Nenhuma captura com dados pessoais é publicada nesta versão.',
    description:
      'Aplicação Full Stack autoral para centralizar CRM, pipeline, finanças, tarefas, rotina, estudos, relatórios, memória, aprovações e integrações.',
    highlightsLabel: 'Principais capacidades',
    highlights: [
      'CRM e pipeline Kanban',
      'Finanças e relatórios',
      'Tarefas, rotina e estudos',
      'IA com políticas de permissão',
      'Integrações controladas',
      'Auditoria, backup e rollback',
    ],
    tech: ['React', 'TypeScript', 'Material UI', 'Python', 'FastAPI', 'SQLAlchemy', 'SQLite', 'Docker'],
    techExtra: ['Alembic', 'Uvicorn', 'Pydantic', 'HTTPX', 'JWT', 'Recharts', 'dnd-kit', 'Ubuntu', 'AWS Lightsail'],
    links: [
      {
        label: 'Abrir interface protegida',
        href: 'https://hermes-agent-01l.pages.dev/',
        external: true,
      },
    ],
    caseStudy: {
      category: 'Aplicação Full Stack privada',
      status: 'Ambiente protegido em evolução contínua',
      context:
        'O Hermes nasceu para concentrar áreas pessoais e comerciais que estavam distribuídas entre planilhas, mensagens e ferramentas isoladas.',
      problem:
        'Reunir domínios diferentes em uma operação única, mantendo permissões, rastreabilidade e possibilidade de rollback.',
      role:
        'Concepção do produto, desenvolvimento Full Stack, modelagem dos módulos, integração da API e implantação dos ambientes.',
      decisions: [
        'API em FastAPI com persistência via SQLAlchemy e SQLite.',
        'Módulos separados para CRM, finanças, rotina, estudos e relatórios.',
        'Ações sensíveis condicionadas a políticas de permissão e aprovação.',
        'Auditoria, backups e migrations controladas.',
      ],
      features: [
        'Dashboard operacional',
        'CRM e pipeline Kanban',
        'Finanças, tarefas, rotina e estudos',
        'Relatórios e memória',
        'Integrações e aprovações controladas',
      ],
      stackMain: ['React', 'TypeScript', 'Material UI', 'Python', 'FastAPI', 'SQLAlchemy', 'SQLite', 'Docker'],
      stackExtra: ['Alembic', 'Uvicorn', 'Pydantic', 'HTTPX', 'JWT', 'Recharts', 'dnd-kit', 'Ubuntu', 'AWS Lightsail'],
      challenges: [
        'Centralizar muitos domínios sem transformar a interface em um conjunto desorganizado de telas.',
        'Permitir automações sem liberar ações sensíveis de forma irrestrita.',
      ],
      solutions: [
        'Arquitetura modular com API única e contratos claros.',
        'Camada de políticas, aprovações, auditoria e rollback para ações críticas.',
      ],
      nextSteps: ['Continuar a evolução das integrações e publicar apenas demonstrações sem dados privados.'],
      links: [
        {
          label: 'Abrir interface protegida',
          href: 'https://hermes-agent-01l.pages.dev/',
          external: true,
        },
      ],
    },
  },
  {
    number: '04',
    name: 'SaaS de Suporte',
    status: 'Produto em desenvolvimento',
    statusTooltip: 'Arquitetura e escopo em definição. Ainda não existe aplicação pública.',
    description:
      'Produto voltado a pequenas empresas que precisam organizar atendimento, clientes, solicitações, tickets, conhecimento e automações.',
    highlightsLabel: 'Capacidades planejadas',
    highlights: [
      'Tickets e solicitações',
      'Gestão de clientes',
      'Base de conhecimento',
      'Automações de atendimento',
      'Indicadores operacionais',
      'Histórico e prioridades',
    ],
    techLabel: 'Arquitetura planejada',
    tech: ['React', 'TypeScript', 'FastAPI', 'Banco relacional', 'Docker'],
    links: [],
    caseStudy: {
      category: 'Produto em desenvolvimento',
      status: 'Arquitetura planejada, sem aplicação pública',
      context:
        'Conceito de produto para pequenas operações que precisam organizar suporte, clientes e conhecimento em um único fluxo.',
      problem:
        'Definir um produto vendável sem apresentar funcionalidades ainda não implementadas como se já estivessem prontas.',
      role: 'Estruturação do problema, escopo inicial e arquitetura planejada.',
      decisions: [
        'Separar tickets, clientes, conhecimento e automações por domínio.',
        'Manter a descrição pública limitada ao que está realmente planejado.',
      ],
      features: ['Tickets', 'Gestão de clientes', 'Base de conhecimento', 'Automações e indicadores planejados'],
      stackMain: ['React', 'TypeScript', 'FastAPI', 'Banco relacional', 'Docker'],
      challenges: ['Transformar a visão em escopo enxuto e validável.'],
      solutions: ['Apresentação explícita como produto em desenvolvimento, sem screenshots ou métricas inventadas.'],
      nextSteps: ['Validar o escopo e construir a primeira versão demonstrável.'],
      links: [],
    },
  },
]

export const pillars = [
  {
    title: 'Análise de Sistemas',
    description:
      'Levantamento de requisitos, mapeamento de processos, documentação de regras de negócio e identificação de gargalos operacionais.',
  },
  {
    title: 'Desenvolvimento Full Stack',
    description:
      'Construção de interfaces responsivas, APIs REST, persistência de dados, autenticação, integrações e componentes reutilizáveis.',
  },
  {
    title: 'Automação e Integrações',
    description:
      'Criação de rotinas automatizadas, webhooks e conexões controladas entre sistemas, serviços externos e fluxos internos.',
  },
  {
    title: 'Implantação e Evolução',
    description:
      'Testes, homologação, diagnóstico de bugs, documentação, suporte, deploy, backup, rollback e melhoria contínua.',
  },
]

export const mainStack = ['React', 'TypeScript', 'Python', 'FastAPI', 'SQLAlchemy', 'SQLite', 'PostgreSQL', 'Docker']

export const stackGroups: { category: string; items: string[]; note?: string }[] = [
  {
    category: 'Front-end e aplicações web',
    items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Vite', 'React Router'],
  },
  {
    category: 'Interface e experiência',
    items: ['Tailwind CSS', 'Material UI', 'Emotion', 'Radix UI', 'React Hook Form', 'Motion', 'Anime.js', 'Recharts', 'dnd-kit', 'Phosphor Icons'],
  },
  {
    category: 'Back-end e APIs',
    items: ['Python', 'FastAPI', 'Uvicorn', 'Pydantic', 'SQLAlchemy', 'Alembic', 'HTTPX', 'APIs REST'],
  },
  {
    category: 'Dados, autenticação e segurança',
    items: ['SQLite', 'PostgreSQL', 'Supabase Auth', 'Funções RPC', 'JWT', 'OAuth', 'bcrypt', 'Cryptography', 'WebAuthn', 'CORS'],
    note: 'Supabase Auth aparece especificamente como tecnologia aplicada no PNQC.',
  },
  {
    category: 'Infraestrutura e entrega',
    items: ['Git', 'GitHub', 'GitHub Actions', 'Docker', 'Docker Compose', 'Linux', 'Ubuntu', 'AWS', 'Amazon Lightsail', 'Cloudflare Pages', 'CI/CD'],
  },
  {
    category: 'Qualidade e testes',
    items: ['TypeScript typecheck', 'Ruff', 'unittest', 'Build automatizado', 'Auditoria de dependências', 'Scripts de validação', 'Migrations controladas', 'Backup e rollback'],
  },
  {
    category: 'Automações, integrações e produtividade',
    items: ['n8n', 'Webhooks', 'Gmail OAuth', 'Google Calendar', 'Telegram', 'Figma', 'GitHub Copilot', 'GitHub Codespaces'],
  },
]

export const evolvingStack = ['Next.js', 'PHP', 'Laravel', 'Bootstrap', 'Sass']

export const experience = [
  {
    role: 'Sistemas, processos e operação',
    description:
      'Entendimento de processos, levantamento de requisitos, organização de regras de negócio, documentação de fluxos e acompanhamento da evolução de sistemas usados em operações reais.',
    skills: ['Análise de sistemas', 'Levantamento de requisitos', 'Mapeamento de processos', 'Regras de negócio', 'Documentação'],
  },
  {
    role: 'Construção de produtos digitais',
    description:
      'Desenvolvimento de aplicações web, interfaces responsivas, APIs, bancos de dados e integrações por meio de projetos autorais e produtos em produção.',
    skills: ['React', 'TypeScript', 'Python', 'FastAPI', 'SQLAlchemy', 'SQLite', 'PostgreSQL'],
  },
  {
    role: 'Implantação, suporte e melhoria contínua',
    description:
      'Validação de funcionalidades, testes, homologação, diagnóstico de bugs, acompanhamento de incidentes, suporte e melhoria após a publicação.',
    skills: ['Testes funcionais', 'Homologação', 'Suporte técnico', 'Deploy', 'Monitoramento', 'Backup e rollback'],
  },
]

export const education = {
  degree: {
    title: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
    institution: 'UDF, Centro Universitário do Distrito Federal',
    status: 'Formação em andamento',
    note: 'Conclusão prevista para dezembro de 2027',
  },
  ecosystem: {
    title: 'Ecossistema de desenvolvimento',
    description:
      'Acesso educacional ativo a ferramentas profissionais para desenvolvimento, colaboração, infraestrutura, aprendizado e publicação de projetos.',
    items: ['GitHub Pro', 'GitHub Copilot', 'GitHub Codespaces', 'GitHub Actions', 'Ferramentas parceiras do GitHub Education'],
  },
}
