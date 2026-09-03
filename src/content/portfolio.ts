import { barthyPreviews, modularPreviews, pnqcPreviews, radarPreviews } from '@/content/projectPreviews'
import { resumeUrl, site } from '@/config/site'

export const contact = {
  email: site.contact.email,
  mailto: site.contact.mailto,
  linkedin: site.urls.linkedin,
  github: site.urls.github,
  resume: resumeUrl(),
  resumeDownloadName: site.resume.downloadName,
  location: site.location.full,
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
  slug: string
  pagePath?: string
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
    slug: 'barthy-web-studio-v2',
    pagePath: '/projetos/barthy-web-studio-v2/',
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
        href: site.urls.barthyV2,
        external: true,
      },
      {
        label: 'Abrir versão pública V1',
        href: site.urls.barthyV1,
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
          href: site.urls.barthyV2,
          external: true,
        },
        {
          label: 'Abrir versão pública V1',
          href: site.urls.barthyV1,
          external: true,
        },
      ],
    },
  },
  {
    number: '02',
    slug: 'pnqc',
    pagePath: '/projetos/pnqc/',
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
        href: site.urls.pnqc,
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
          href: site.urls.pnqc,
          external: true,
        },
      ],
    },
  },
  {
    number: '03',
    slug: 'hermes-command-center',
    pagePath: '/projetos/hermes-command-center/',
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
        href: site.urls.hermes,
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
          href: site.urls.hermes,
          external: true,
        },
      ],
    },
  },
  {
    number: '04',
    slug: 'radar-df',
    pagePath: '/projetos/radar-df/',
    name: 'Radar DF',
    status: 'Em desenvolvimento',
    statusTooltip: 'Projeto em desenvolvimento. A tela oficial representa a direção visual do produto, sem indicar uma aplicação pública pronta.',
    previewThemes: radarPreviews,
    description:
      'Plataforma em desenvolvimento para centralizar e organizar oportunidades, currículo estruturado, matching, ingestão de vagas e acompanhamento de candidaturas.',
    highlightsLabel: 'Capacidades em desenvolvimento',
    highlights: [
      'Centralização de oportunidades',
      'Currículo estruturado',
      'Matching entre perfil e vaga',
      'Ingestão e normalização de vagas',
      'Acompanhamento de candidaturas',
    ],
    tech: ['React', 'TypeScript', 'FastAPI'],
    techExtra: ['APIs REST', 'Banco relacional'],
    links: [],
    previewNote: 'Mockup oficial do produto em desenvolvimento. Não representa uma aplicação pública concluída.',
    caseStudy: {
      category: 'Plataforma de oportunidades do Distrito Federal',
      status: 'Em desenvolvimento, sem aplicação pública divulgada',
      context:
        'O Radar DF nasce da necessidade de reunir oportunidades hoje dispersas e tornar a busca e o acompanhamento de candidaturas mais organizados.',
      problem:
        'Centralizar vagas, reduzir duplicidade e estruturar o processo de candidatura sem apresentar recursos planejados como funcionalidades concluídas.',
      role: 'Concepção do produto, estruturação do escopo e desenvolvimento da base técnica.',
      decisions: [
        'Manter candidato e currículo como núcleo da experiência.',
        'Tratar ingestão, normalização e matching como capacidades em desenvolvimento.',
        'Usar o mockup oficial como representação visual sem apresentar recursos planejados como concluídos.',
      ],
      features: [
        'Centralização de oportunidades em desenvolvimento',
        'Currículo estruturado planejado',
        'Matching e acompanhamento de candidaturas em desenvolvimento',
      ],
      stackMain: ['React', 'TypeScript', 'FastAPI'],
      stackExtra: ['APIs REST', 'Banco relacional'],
      challenges: ['Organizar fontes diferentes sem duplicar oportunidades ou prometer cobertura ainda não validada.'],
      solutions: ['Evolução incremental com comunicação pública limitada ao estágio comprovado do projeto.'],
      nextSteps: ['Concluir a primeira versão demonstrável antes de divulgar uma URL pública.'],
      links: [],
    },
  },
  {
    number: '05',
    slug: 'saas-de-suporte',
    name: 'SaaS de Suporte',
    status: 'Produto em desenvolvimento',
    statusTooltip: 'Arquitetura e escopo em definição. Ainda não existe aplicação pública.',
    previewThemes: modularPreviews,
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
    previewNote: 'Mockup oficial do Sistema Modular em validação. Não representa uma aplicação pública concluída.',
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
    items: ['n8n', 'Webhooks', 'Telegram', 'Figma', 'GitHub Copilot', 'GitHub Codespaces'],
  },
]

export const evolvingStack = ['Next.js', 'PHP', 'Laravel', 'Bootstrap', 'Sass']

export const experience = [
  {
    role: 'Desenvolvedor Júnior',
    organization: 'Levens',
    description:
      'Desenvolvimento e evolução de aplicações do ecossistema de cuidados, com interfaces, APIs, automações, testes e suporte a produção.',
    meta: 'jun. 2025 a ago. 2026',
    details: [
      'Desenvolvimento com React, TypeScript e Vite, integração com APIs REST, autenticação e controle de acesso.',
      'Testes, homologação, deploy na Cloudflare Pages e suporte a sistemas em produção.',
    ],
    skills: ['React', 'TypeScript', 'Vite', 'APIs REST', 'Autenticação', 'Cloudflare Pages'],
  },
  {
    role: 'Estagiário de Desenvolvimento de Jogos',
    organization: 'Acclivity',
    description:
      'Prototipação de interfaces, organização de telas e estruturação de fluxos para uma plataforma voltada ao público gamer.',
    meta: 'jan. 2023 a jun. 2023',
    details: [
      'Estágio híbrido em Brasília, Distrito Federal, Brasil.',
      'Contato prático com desenvolvimento web, lógica de programação, design de interfaces e organização de projetos digitais.',
    ],
    skills: ['Automação de processos', 'TypeScript'],
  },
  {
    role: 'Hello, World!',
    description: 'Primeira linha de código e início da jornada em desenvolvimento.',
    meta: '2022',
    milestone: true,
    skills: [],
  },
]

export const education = {
  degree: {
    shortTitle: 'Análise e Desenvolvimento de Sistemas',
    title: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
    kind: 'Tecnólogo',
    institution: 'UDF, Centro Universitário do Distrito Federal',
    status: 'Em andamento',
  },
  ecosystem: {
    title: 'Ecossistema de desenvolvimento',
    description:
      'Acesso educacional ativo a ferramentas profissionais para desenvolvimento, colaboração, infraestrutura, aprendizado e publicação de projetos.',
    items: ['GitHub Pro', 'GitHub Copilot', 'GitHub Codespaces', 'GitHub Actions', 'Ferramentas parceiras do GitHub Education'],
  },
  certifications: [
    {
      title: 'Cisco IT Essentials 1 e 2',
      institution: 'Cisco',
      issued: 'Formação complementar',
      description: 'Fundamentos de TI, hardware, sistemas, redes e suporte técnico.',
      skills: ['IT Essentials 1', 'IT Essentials 2'],
    },
    {
      title: 'Mestre em Engenharia de Prompt e Colaboração com IA',
      institution: 'Cruzeiro do Sul',
      issued: 'ago. 2026',
      expired: 'Expirou em ago. de 2026',
      credentialCode: '21186462-904d-4f54-8d4a-2a994a8382cc',
      credentialUrl: site.urls.credentials.promptEngineering,
      description: 'Engenharia de Prompt, pensamento crítico e colaboração com IA.',
      skills: ['Engenharia de Prompt', 'Pensamento crítico', 'Colaboração com IA'],
    },
    {
      title: 'Arquiteto de IA e Responsabilidade Digital',
      institution: 'Cruzeiro do Sul',
      issued: 'ago. 2026',
      expired: 'Expirou em ago. de 2026',
      credentialCode: 'aa1253e1-4ded-4c99-9ec9-492bb6cd337d',
      credentialUrl: site.urls.credentials.responsibleAi,
      description: 'IA fraca e forte, Machine Learning e responsabilidade digital.',
      skills: ['Diferenciação de IA Fraca e IA Forte', 'Machine Learning', 'Responsabilidade Digital'],
    },
  ],
}
