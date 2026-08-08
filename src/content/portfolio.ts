import { barthyPreviews, pnqcPreviews } from '@/content/projectPreviews'

const contactEmail = (import.meta.env.VITE_CONTACT_EMAIL as string | undefined)?.trim() || ''

export const contact = {
  email: contactEmail,
  mailto: contactEmail ? `mailto:${contactEmail}` : '',
  linkedin: 'https://www.linkedin.com/in/gabrielbrasildev',
  github: 'https://github.com/g4brielbr4sil',
  resume: '/curriculo-gabriel-brasil.pdf',
  location: 'Brasília, Distrito Federal, Brasil',
}

export type ProjectLink = {
  label: string
  href?: string
  external?: boolean
  /** Mostrado quando não há destino público — evita sugerir acesso inexistente. */
  note?: string
  /** Explicação curta do selo, exibida em tooltip. */
  noteTooltip?: string
}

export type PreviewTheme = 'dark' | 'light'

export type ProjectPreviewImage = {
  id: string
  /** URL emitida pelo Vite a partir do import do arquivo. */
  src: string
  avif: string
  webp: string
  /** Dimensões intrínsecas, para reservar o espaço e não haver salto. */
  width: number
  height: number
  /** O que a tela mostra — compõe o texto alternativo junto com o tema. */
  caption: string
  alt: string
  theme?: PreviewTheme
  device: 'desktop' | 'mobile'
  order: number
}

/** Um conjunto de capturas reais de um tema. Nada é gerado ou invertido. */
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
  /** Rótulo da lista de tecnologias — "Arquitetura planejada" para produtos em construção. */
  techLabel?: string
  tech: string[]
  techExtra?: string[]
  highlightsLabel?: string
  highlights: string[]
  links: ProjectLink[]
  /** Capturas reais por tema. O seletor só aparece quando os dois existem. */
  previewThemes?: ProjectPreviewThemes
  /** Nota editorial exibida junto ao seletor de tema da prévia. */
  previewNote?: string
  caseStudy: ProjectCaseStudy
}

export const projects: Project[] = [
  {
    number: '01',
    name: 'Hermes Command Center',
    description:
      'Aplicação Full Stack autoral criada para centralizar CRM, pipeline comercial, finanças, tarefas, rotina, estudos, relatórios, memória, aprovações, automações e integrações em um ambiente operacional privado.',
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
    techExtra: [
      'Alembic',
      'Uvicorn',
      'Pydantic',
      'HTTPX',
      'JWT',
      'Recharts',
      'dnd-kit',
      'Ubuntu',
      'Amazon Lightsail',
      'Cloudflare Pages',
      'GitHub Actions',
    ],
    links: [
      {
        label: 'Acessar interface',
        note: 'Ambiente privado',
        noteTooltip: 'Interface protegida e repositório privado — o código completo não é público.',
      },
    ],
    caseStudy: {
      category: 'Aplicação privada',
      status: 'Ambiente privado',
      context:
        'Aplicação Full Stack autoral criada para centralizar CRM, pipeline comercial, finanças, tarefas, rotina, estudos, relatórios, memória, aprovações, automações e integrações em um ambiente operacional privado.',
      problem:
        'Unificar diferentes áreas operacionais em uma interface privada, com rastreabilidade, permissões e integração controlada.',
      role: 'Concepção e desenvolvimento do ambiente operacional privado.',
      decisions: [
        'CRM e pipeline Kanban',
        'Finanças e relatórios',
        'Tarefas, rotina e estudos',
        'IA com políticas de permissão',
        'Integrações controladas',
        'Auditoria, backup e rollback',
      ],
      features: [
        'CRM e pipeline Kanban',
        'Finanças e relatórios',
        'Tarefas, rotina e estudos',
        'IA com políticas de permissão',
        'Integrações controladas',
        'Auditoria, backup e rollback',
      ],
      stackMain: ['React', 'TypeScript', 'Material UI', 'Python', 'FastAPI', 'SQLAlchemy', 'SQLite', 'Docker'],
      stackExtra: ['Alembic', 'Uvicorn', 'Pydantic', 'HTTPX', 'JWT', 'Recharts', 'dnd-kit', 'Ubuntu', 'Amazon Lightsail', 'Cloudflare Pages', 'GitHub Actions'],
      challenges: [
        'Centralizar domínios distintos em uma única operação privada.',
        'Manter integrações e automações sob controle explícito.',
      ],
      solutions: [
        'Separação por áreas funcionais dentro do mesmo produto.',
        'Políticas de permissão para IA e rotinas de auditoria, backup e rollback.',
      ],
      nextSteps: ['Evolução contínua dos fluxos e integrações controladas.'],
      links: [
        {
          label: 'Acessar interface',
          note: 'Ambiente privado',
          noteTooltip: 'Interface protegida e repositório privado — o código completo não é público.',
        },
      ],
    },
  },
  {
    number: '02',
    name: 'Levens Qualifica | PNQC',
    previewThemes: pnqcPreviews,
    description:
      'Plataforma educacional em produção criada para organizar cursos, módulos, aulas, progresso sequencial, avaliações e diferentes perfis de acesso.',
    highlightsLabel: 'Principais capacidades',
    highlights: [
      'Autenticação e perfis',
      'Cursos, módulos e aulas',
      'Progresso sequencial',
      'Avaliações por funções RPC',
      'Nota mínima de 70%',
      'Rotas protegidas por perfil',
    ],
    tech: [
      'React',
      'TypeScript',
      'Vite',
      'React Router',
      'Tailwind CSS',
      'Supabase Auth',
      'PostgreSQL',
      'Cloudflare Pages',
    ],
    techExtra: [
      'Material UI',
      'Emotion',
      'Radix UI',
      'React Hook Form',
      'Recharts',
      'Framer Motion',
      'Lucide React',
      'Funções RPC',
      'GitHub Actions',
    ],
    links: [
      {
        label: 'Acessar plataforma',
        note: 'Acesso por perfil',
        noteTooltip: 'Plataforma em produção, com rotas e conteúdos liberados conforme o perfil do usuário.',
      },
    ],
    caseStudy: {
      category: 'Plataforma educacional',
      status: 'Em produção',
      context:
        'Plataforma educacional em produção criada para organizar cursos, módulos, aulas, progresso sequencial, avaliações e diferentes perfis de acesso.',
      problem:
        'Estruturar a jornada do aluno com autenticação, rotas protegidas e avaliação sequencial sem prometer certificação concluída.',
      role: 'Desenvolvimento da interface e do fluxo educacional com autenticação e perfis.',
      decisions: [
        'Autenticação e perfis',
        'Cursos, módulos e aulas',
        'Progresso sequencial',
        'Avaliações por funções RPC',
        'Nota mínima de 70%',
        'Rotas protegidas por perfil',
      ],
      features: [
        'Autenticação e perfis',
        'Cursos, módulos e aulas',
        'Progresso sequencial',
        'Avaliações por funções RPC',
        'Nota mínima de 70%',
        'Rotas protegidas por perfil',
      ],
      stackMain: ['React', 'TypeScript', 'Vite', 'React Router', 'Tailwind CSS', 'Supabase Auth', 'PostgreSQL', 'Cloudflare Pages'],
      stackExtra: ['Material UI', 'Emotion', 'Radix UI', 'React Hook Form', 'Recharts', 'Framer Motion', 'Lucide React', 'Funções RPC', 'GitHub Actions'],
      challenges: [
        'Conduzir o aluno por uma progressão sequencial sem abrir mão de perfis e rotas protegidas.',
        'Sustentar avaliações por RPC com regra de nota mínima.',
      ],
      solutions: [
        'Uso de autenticação e controle de perfil para liberar conteúdo e rotas.',
        'Fluxo sequencial com avaliações por funções RPC e regra de 70%.',
      ],
      nextSteps: ['Evoluir a experiência educacional conforme a operação.'],
      links: [
        {
          label: 'Acessar plataforma',
          note: 'Acesso por perfil',
          noteTooltip: 'Plataforma em produção, com rotas e conteúdos liberados conforme o perfil do usuário.',
        },
      ],
    },
  },
  {
    number: '03',
    name: 'Barthy Web Studio',
    previewThemes: barthyPreviews,
    previewNote: 'Visualize a interface nos dois temas implementados no projeto.',
    description:
      'Site institucional e portfólio profissional desenvolvido para apresentar projetos, soluções digitais e competências em desenvolvimento web por meio de uma experiência editorial, responsiva e acessível.',
    highlightsLabel: 'Principais capacidades',
    highlights: [
      'Temas claro e escuro',
      'Progressive enhancement',
      'Experiência visual com WebGPU',
      'Fallback animado em CSS',
      'Modo estático para movimento reduzido',
      'Formulário com validação e tratamento de falhas',
      'Navegação por teclado',
      'Auditorias automatizadas de qualidade',
    ],
    tech: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'CSS nativo',
      'Anime.js',
      'Lucide React',
      'Cloudflare Pages',
    ],
    techExtra: [
      'WebGPU',
      'Shaders',
      'GitHub Actions',
      'pnpm',
      'TypeScript Project References',
      'Scripts próprios de auditoria',
    ],
    links: [{ label: 'Ver repositório', href: 'https://github.com/g4brielbr4sil', external: true }],
    caseStudy: {
      category: 'Portfólio institucional',
      status: 'V2 em produção',
      context:
        'Site institucional e portfólio profissional desenvolvido para apresentar projetos, soluções digitais e competências em desenvolvimento web por meio de uma experiência editorial, responsiva e acessível.',
      problem:
        'Atualizar a presença pública com duas implementações visuais reais, mantendo responsividade, acessibilidade e qualidade de interface.',
      role: 'Desenvolvimento da V2 com foco em identidade visual, experiência e qualidade técnica.',
      decisions: [
        'Temas claro e escuro',
        'Progressive enhancement',
        'Experiência visual com WebGPU',
        'Fallback animado em CSS',
        'Modo estático para movimento reduzido',
        'Formulário com validação e tratamento de falhas',
        'Navegação por teclado',
        'Auditorias automatizadas de qualidade',
      ],
      features: [
        'Temas claro e escuro',
        'Progressive enhancement',
        'Experiência visual com WebGPU',
        'Fallback animado em CSS',
        'Modo estático para movimento reduzido',
        'Formulário com validação e tratamento de falhas',
        'Navegação por teclado',
        'Auditorias automatizadas de qualidade',
      ],
      stackMain: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'CSS nativo', 'Anime.js', 'Lucide React', 'Cloudflare Pages'],
      stackExtra: ['WebGPU', 'Shaders', 'GitHub Actions', 'pnpm', 'TypeScript Project References', 'Scripts próprios de auditoria'],
      challenges: [
        'Manter a identidade visual entre o tema escuro e o claro.',
        'Preservar responsividade e acessibilidade com diferentes modos de renderização.',
      ],
      solutions: [
        'Uso de progressive enhancement com fallback visual explícito.',
        'Separação entre experiências animadas e modo estático para movimento reduzido.',
      ],
      nextSteps: ['Manutenção evolutiva da V2.'],
      links: [{ label: 'Ver repositório', href: 'https://github.com/g4brielbr4sil', external: true }],
    },
  },
  {
    number: '04',
    name: 'SaaS de Suporte',
    status: 'Produto em validação',
    statusTooltip: 'O conceito está em validação; ainda não há interface pública ou implementação consolidada.',
    description:
      'Plataforma operacional em validação, pensada para centralizar operação, atendimento e gestão em um ecossistema modular, com espaço para CRM, WhatsApp, check-in, rotina, oficina, suporte e acompanhamento.',
    highlightsLabel: 'Conceito em construção',
    highlights: [
      'Operação centralizada',
      'Atendimento e suporte',
      'Gestão de rotina',
      'Fluxos modulares',
      'Arquitetura pensada para evolução',
      'Validação de contexto real',
    ],
    techLabel: 'Arquitetura em validação',
    tech: ['React', 'TypeScript', 'FastAPI', 'Banco relacional', 'Docker'],
    links: [
      {
        label: 'Conhecer a visão do produto',
        note: 'Em desenvolvimento',
        noteTooltip: 'Produto em construção — sem interface pública disponível no momento.',
      },
    ],
    caseStudy: {
      category: 'Produto em desenvolvimento',
      status: 'Produto em desenvolvimento',
      context:
        'Plataforma operacional em validação, pensada para centralizar operação, atendimento e gestão em um ecossistema modular, com espaço para CRM, WhatsApp, check-in, rotina, oficina, suporte e acompanhamento.',
      problem:
        'Apresentar um produto com narrativa profissional sem prometer uma implementação pronta ou uma interface já consolidada.',
      role: 'Estruturação conceitual do produto e definição da visão inicial.',
      decisions: [
        'Operação centralizada',
        'Atendimento e suporte',
        'Gestão de rotina',
        'Fluxos modulares',
        'Arquitetura pensada para evolução',
        'Validação de contexto real',
      ],
      features: [
        'Operação centralizada',
        'Atendimento e suporte',
        'Gestão de rotina',
        'Fluxos modulares',
        'Arquitetura pensada para evolução',
        'Validação de contexto real',
      ],
      stackMain: ['React', 'TypeScript', 'FastAPI', 'Banco relacional', 'Docker'],
      challenges: [
        'Evitar tratar a visão como produto já entregue.',
        'Manter o escopo alinhado ao que está efetivamente em validação.',
      ],
      solutions: [
        'Apresentação explícita como produto em validação.',
        'Uso de uma nota discreta para indicar o estágio do conceito.',
      ],
      nextSteps: ['Definir escopo e consolidar a primeira versão quando houver implementação pública.'],
      links: [
        {
          label: 'Conhecer a visão do produto',
          note: 'Em desenvolvimento',
          noteTooltip: 'Produto em construção — sem interface pública disponível no momento.',
        },
      ],
    },
  },
]

export const pillars = [
  {
    title: 'Análise de Sistemas',
    description:
      'Levantamento de requisitos, mapeamento de processos, documentação de regras de negócio, definição de fluxos e identificação de gargalos operacionais.',
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
      'Testes, homologação, diagnóstico de bugs, documentação, suporte técnico, deploy, backup, rollback e melhoria contínua.',
  },
]

/** Nível 1 da hierarquia: o núcleo aplicado em produção. */
export const mainStack = [
  'React',
  'TypeScript',
  'Python',
  'FastAPI',
  'SQLAlchemy',
  'SQLite',
  'PostgreSQL',
  'Docker',
]

/** Nível 2: ecossistema aplicado, organizado por função. */
export const stackGroups: { category: string; items: string[]; note?: string }[] = [
  {
    category: 'Front-end e aplicações web',
    items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Vite', 'React Router'],
  },
  {
    category: 'Interface e experiência',
    items: [
      'Tailwind CSS',
      'Material UI',
      'Emotion',
      'Radix UI',
      'React Hook Form',
      'Motion',
      'Framer Motion',
      'GSAP',
      'Anime.js',
      'Recharts',
      'dnd-kit',
      'Lucide React',
      'Embla Carousel',
    ],
  },
  {
    category: 'Back-end e APIs',
    items: ['Python', 'FastAPI', 'Uvicorn', 'Pydantic', 'SQLAlchemy', 'Alembic', 'HTTPX', 'APIs REST'],
  },
  {
    category: 'Dados, autenticação e segurança',
    items: [
      'SQLite',
      'PostgreSQL',
      'Supabase Auth',
      'Funções RPC',
      'JWT',
      'OAuth',
      'bcrypt',
      'Cryptography',
      'WebAuthn',
      'CORS',
    ],
    note: 'Supabase Auth aplicado especificamente no PNQC.',
  },
  {
    category: 'Infraestrutura e entrega',
    items: [
      'Git',
      'GitHub',
      'GitHub Actions',
      'Docker',
      'Docker Compose',
      'Linux',
      'Ubuntu',
      'AWS',
      'Amazon Lightsail',
      'Cloudflare Pages',
      'CI/CD',
    ],
  },
  {
    category: 'Qualidade e testes',
    items: [
      'TypeScript typecheck',
      'ESLint',
      'Ruff',
      'unittest',
      'Build automatizado',
      'Auditoria de dependências',
      'Scripts de validação',
      'Migrations controladas',
      'Backup e rollback',
    ],
  },
  {
    category: 'Automações, integrações e produtividade',
    items: [
      'n8n',
      'Webhooks',
      'Gmail OAuth',
      'Google Calendar',
      'Telegram',
      'Figma',
      'GitHub Copilot',
      'GitHub Codespaces',
    ],
  },
]

/** Nível 3: contato e estudo em andamento — nunca apresentado como stack aplicada. */
export const evolvingStack = ['Next.js', 'PHP', 'Laravel', 'Bootstrap', 'Sass']

export const experience = [
  {
    role: 'Sistemas, processos e operação',
    description:
      'Atuação no entendimento de processos operacionais, levantamento de requisitos, organização de regras de negócio, documentação de fluxos e acompanhamento da evolução de sistemas utilizados em operações reais.',
    skills: [
      'Análise de sistemas',
      'Levantamento de requisitos',
      'Mapeamento de processos',
      'Regras de negócio',
      'Documentação',
    ],
  },
  {
    role: 'Construção de produtos digitais',
    description:
      'Desenvolvimento de aplicações web, interfaces responsivas, APIs, bancos de dados e integrações por meio de projetos como Hermes Command Center, Levens Qualifica e Barthy Web Studio.',
    skills: ['React', 'TypeScript', 'Python', 'FastAPI', 'SQLAlchemy', 'SQLite', 'PostgreSQL'],
  },
  {
    role: 'Implantação, suporte e melhoria contínua',
    description:
      'Validação de funcionalidades, testes, homologação, diagnóstico de bugs, acompanhamento de incidentes, suporte aos usuários e melhoria de soluções após a publicação.',
    skills: [
      'Testes funcionais',
      'Homologação',
      'Suporte técnico',
      'Deploy',
      'Monitoramento',
      'Backup e rollback',
    ],
  },
]

export const education = {
  degree: {
    title: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
    institution: 'UDF — Centro Universitário do Distrito Federal',
    status: 'Formação em andamento',
    note: 'Conclusão prevista para dezembro de 2027',
  },
  ecosystem: {
    title: 'Ecossistema de desenvolvimento',
    description:
      'Acesso educacional ativo a ferramentas profissionais para desenvolvimento, colaboração, infraestrutura, aprendizado e publicação de projetos.',
    items: [
      'GitHub Pro',
      'GitHub Copilot',
      'GitHub Codespaces',
      'GitHub Actions',
      'Ferramentas parceiras do GitHub Education',
    ],
  },
  certifications: {
    title: 'Certificações Cisco',
    description: 'Formação contínua em fundamentos técnicos e ambientes de suporte.',
    items: ['Cisco IT Essentials 1', 'Cisco IT Essentials 2'],
  },
}
