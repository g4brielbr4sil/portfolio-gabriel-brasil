import { barthyPreviews, hermesPreviews, modularPreviews, pnqcPreviews, radarPreviews } from '@/content/projectPreviews'
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
  caseStudy: ProjectCaseStudy
}

export const projects: Project[] = [
  {
    number: '01',
    slug: 'hermes-command-center',
    pagePath: '/projetos/hermes-command-center/',
    name: 'Hermes Command Center',
    status: 'Ambiente protegido',
    statusTooltip: 'Aplicação autoral privada. As capturas usam dados demonstrativos para preservar a operação real.',
    previewThemes: hermesPreviews,
    description:
      'Aplicação Full Stack autoral que reúne frontend, backend, APIs, banco de dados, automações, infraestrutura e uma operação multiagente com políticas, aprovações humanas e auditoria.',
    highlightsLabel: 'Principais capacidades',
    highlights: [
      'Runtime operacional multiagente',
      'CRM e pipeline comercial',
      'Policies e aprovações humanas',
      'Jobs e workers em background',
      'Auditoria e idempotência',
      'Deploy, backup e rollback documentados',
    ],
    tech: ['React', 'TypeScript', 'Python', 'FastAPI', 'SQLAlchemy', 'SQLite', 'Docker'],
    techExtra: ['Alembic', 'Uvicorn', 'Pydantic', 'HTTPX', 'JWT', 'GitHub Actions', 'Ubuntu', 'AWS Lightsail'],
    links: [
      {
        label: 'Interface privada (login necessário)',
        href: site.urls.hermes,
        external: true,
      },
    ],
    caseStudy: {
      category: 'Aplicação Full Stack privada',
      status: 'Operação multiagente em evolução contínua',
      context:
        'O Hermes começou como um Personal OS para centralizar rotina, projetos, CRM, finanças e relatórios e evoluiu para uma plataforma operacional com agentes especializados e governança humana.',
      problem:
        'Transformar objetivos e eventos em trabalho operacional rastreável, mantendo controle humano sobre ações sensíveis e comunicação externa.',
      role:
        'Concepção do produto, desenvolvimento Full Stack, modelagem dos módulos, APIs, jobs, políticas, aprovações e implantação dos ambientes.',
      decisions: [
        'Frontend em React e TypeScript e backend em Python e FastAPI.',
        'Persistência com SQLAlchemy, Alembic e SQLite.',
        'Agentes especializados coordenados por jobs, policies, guards e aprovações.',
        'Comunicação externa bloqueada por padrão e ações relevantes auditáveis.',
      ],
      features: [
        'Command Center operacional',
        'CRM e pipeline comercial',
        'Agentes para discovery, qualificação, copy, follow-up e propostas',
        'Policies, approvals e ActionLog',
        'Workers, jobs, backups e migrations',
      ],
      stackMain: ['React', 'TypeScript', 'Python', 'FastAPI', 'SQLAlchemy', 'SQLite', 'Docker'],
      stackExtra: ['Alembic', 'Uvicorn', 'Pydantic', 'HTTPX', 'JWT', 'GitHub Actions', 'Ubuntu', 'AWS Lightsail'],
      challenges: [
        'Permitir automações úteis sem liberar ações sensíveis de forma irrestrita.',
        'Distinguir claramente simulação, execução interna e ações externas reais.',
      ],
      solutions: [
        'Policies fail-closed, aprovações humanas, idempotência e auditoria.',
        'Estados explícitos para DryRun, contato manual confirmado e futuras integrações externas.',
      ],
      nextSteps: ['Evoluir integrações externas e autonomia sem remover as salvaguardas de aprovação e auditoria.'],
      links: [
        {
          label: 'Interface privada (login necessário)',
          href: site.urls.hermes,
          external: true,
        },
      ],
    },
  },
  {
    number: '02',
    slug: 'pnqc',
    pagePath: '/projetos/pnqc/',
    name: 'PNQC',
    status: 'Em produção',
    previewThemes: pnqcPreviews,
    description:
      'Plataforma web de formação de cuidadores com autenticação, perfis de acesso, cursos, módulos, aulas, progresso sequencial e avaliações.',
    highlightsLabel: 'Evidências da entrega',
    highlights: [
      'Autenticação e recuperação de acesso',
      'Perfis student, agency e admin',
      'Cursos, módulos e aulas',
      'Progresso sequencial',
      'Avaliações com nota mínima de 70%',
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
        'O PNQC organiza uma jornada educacional com diferentes perfis, conteúdos sequenciais e avaliações em uma aplicação web publicada.',
      problem:
        'Conduzir o aluno por cursos e módulos com controle de acesso e progressão, sem liberar etapas fora de ordem ou expor respostas de avaliação.',
      role:
        'Análise de requisitos, definição de regras de negócio, desenvolvimento da aplicação, integração da autenticação, testes, homologação e publicação.',
      decisions: [
        'Separação de rotas e permissões por perfil.',
        'Progresso persistido por aluno e liberação sequencial de conteúdo.',
        'Avaliações executadas por funções RPC, com regra mínima de 70%.',
        'Capturas selecionadas sem expor dados pessoais.',
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
      nextSteps: ['Evoluir certificados, badges e áreas administrativas que ainda permanecem em desenvolvimento.'],
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
    slug: 'barthy-web-studio-v2',
    pagePath: '/projetos/barthy-web-studio-v2/',
    name: 'Barthy Web Studio',
    status: 'Case autoral',
    previewThemes: barthyPreviews,
    description:
      'Projeto autoral voltado à criação de soluções digitais para pequenos negócios, combinando presença web, sistemas, automações e organização de processos comerciais.',
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
        label: 'Ver repositório',
        href: site.urls.barthyV2,
        external: true,
      },
    ],
    caseStudy: {
      category: 'Produto digital autoral',
      status: 'Versão atual em evolução',
      context:
        'A Barthy Web Studio foi construída para apresentar soluções digitais com identidade própria e servir de base para produtos, sistemas e automações aplicados a pequenos negócios.',
      problem:
        'Unificar identidade visual, apresentação comercial e demonstração técnica em uma interface consistente em diferentes dispositivos e condições de renderização.',
      role:
        'Levantamento da necessidade, definição da solução, arquitetura, desenvolvimento, testes, publicação e evolução contínua.',
      decisions: [
        'Progressive enhancement para preservar a experiência quando WebGPU não estiver disponível.',
        'Temas claro e escuro construídos como interfaces reais.',
        'Fallback estático quando o usuário solicita redução de movimento.',
        'Acessibilidade, responsividade e performance tratadas como requisitos do produto.',
      ],
      features: [
        'Landing institucional responsiva',
        'Dois temas completos',
        'Seções de soluções, projetos, processo e contato',
        'Formulário com validação',
        'Navegação acessível por teclado',
      ],
      stackMain: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'CSS nativo', 'Anime.js'],
      stackExtra: ['WebGPU', 'Shaders', 'GitHub Actions', 'pnpm', 'Cloudflare Pages'],
      challenges: [
        'Preservar legibilidade e identidade nos dois temas.',
        'Evitar que recursos visuais avançados se tornassem dependência para usar o site.',
      ],
      solutions: [
        'Separação entre camada visual avançada e fallback funcional.',
        'Componentes responsivos com estados de foco, movimento reduzido e tratamento de falhas.',
      ],
      nextSteps: ['Consolidar a versão pública e evoluir cases comerciais somente com evidências reais.'],
      links: [
        {
          label: 'Ver repositório',
          href: site.urls.barthyV2,
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
    statusTooltip: 'Projeto em desenvolvimento. A tela representa a direção do produto, sem indicar uma aplicação pública pronta.',
    previewThemes: radarPreviews,
    description:
      'Produto em pesquisa e desenvolvimento para centralizar oportunidades, currículo estruturado, matching, ingestão de vagas e acompanhamento de candidaturas.',
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
    caseStudy: {
      category: 'Produto em pesquisa e desenvolvimento',
      status: 'Sem aplicação pública divulgada',
      context:
        'O Radar DF nasce da necessidade de reunir oportunidades hoje dispersas e tornar a busca e o acompanhamento de candidaturas mais organizados.',
      problem:
        'Centralizar vagas, reduzir duplicidade e estruturar o processo de candidatura em um fluxo único.',
      role: 'Concepção do produto, estruturação do escopo e pesquisa da base técnica.',
      decisions: [
        'Manter candidato e currículo como núcleo da experiência.',
        'Tratar ingestão, normalização e matching como capacidades centrais.',
        'Não divulgar uma aplicação como pronta antes de existir uma versão demonstrável.',
      ],
      features: [
        'Centralização de oportunidades',
        'Currículo estruturado',
        'Matching e acompanhamento de candidaturas',
      ],
      stackMain: ['React', 'TypeScript', 'FastAPI'],
      stackExtra: ['APIs REST', 'Banco relacional'],
      challenges: ['Organizar fontes diferentes sem duplicar oportunidades apresentadas ao candidato.'],
      solutions: ['Evolução incremental guiada por casos de uso reais de busca e candidatura.'],
      nextSteps: ['Concluir uma primeira versão demonstrável antes de ampliar a divulgação pública.'],
      links: [],
    },
  },
  {
    number: '05',
    slug: 'sistema-modular-barthy-flow',
    name: 'Sistema Modular / Barthy Flow',
    status: 'Produto em validação',
    statusTooltip:
      'Visão de produto em validação. O primeiro contexto real é o Módulo Oficina; a tela demonstra a direção da interface sem declarar uma aplicação pública pronta.',
    previewThemes: modularPreviews,
    description:
      'Produto operacional modular com o Módulo Oficina como primeiro contexto real: atendimentos, clientes, histórico operacional, WhatsApp contextual, orçamento e check-in.',
    highlightsLabel: 'Frentes em validação',
    highlights: [
      'Atendimentos e histórico operacional',
      'CRM e relacionamento com clientes',
      'WhatsApp contextual',
      'Geração de orçamento',
      'Check-ins e rotinas',
      'Módulos conectáveis',
    ],
    techLabel: 'Arquitetura em validação',
    tech: ['React', 'TypeScript', 'FastAPI', 'Banco relacional', 'Docker'],
    links: [],
    caseStudy: {
      category: 'Produto SaaS em validação',
      status: 'Arquitetura modular em validação, sem aplicação pública',
      context:
        'O Módulo Oficina é o primeiro contexto real do Sistema Modular / Barthy Flow: atendimentos, clientes, histórico operacional, WhatsApp contextual, orçamento e check-in em um mesmo fluxo.',
      problem:
        'Organizar atendimentos, clientes e retornos que hoje ficam espalhados entre mensagens e planilhas em módulos conectáveis.',
      role: 'Estruturação do problema, visão de produto e arquitetura inicial dos módulos.',
      decisions: [
        'Atendimentos e histórico operacional como base comum entre módulos.',
        'WhatsApp tratado como canal contextual de operação e retorno.',
        'Módulo Oficina como primeiro contexto validado, com orçamento e check-in como fluxos concretos.',
        'Apresentação pública limitada ao estágio real de validação.',
      ],
      features: [
        'Atendimentos e histórico operacional por cliente',
        'WhatsApp contextual integrado ao atendimento',
        'Geração de orçamento e agendamento de check-in',
        'Módulos conectáveis para operação e acompanhamento',
      ],
      stackMain: ['React', 'TypeScript', 'FastAPI', 'Banco relacional', 'Docker'],
      challenges: [
        'Definir um núcleo comum que funcione para negócios de serviço diferentes.',
        'Manter a narrativa de produto fiel ao que ainda está em validação.',
      ],
      solutions: [
        'Arquitetura modular com capacidades separadas por contexto de operação.',
        'Tela do produto usada como referência visual sem declarar estágio além do real.',
      ],
      nextSteps: ['Validar os primeiros módulos com operações reais e definir o escopo da primeira versão demonstrável.'],
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

export const experience = [
  {
    role: 'Desenvolvedor Júnior',
    organization: 'Levens',
    description:
      'Desenvolvimento e publicação do PNQC e atuação em análise de sistemas, requisitos, testes, homologação e melhoria de processos no eCuid e demais portais da Levens.',
    meta: 'mar. 2026 a ago. 2026',
    details: [
      'Desenvolvimento do PNQC com React, TypeScript, Vite, Supabase Auth e PostgreSQL.',
      'Implementação de autenticação, perfis de acesso, cursos, módulos, aulas, avaliações e acompanhamento de progresso.',
      'Levantamento de requisitos, documentação de regras de negócio, mapeamento de processos e desenho de fluxos para eCuid e demais portais.',
      'Investigação de bugs, testes funcionais, homologação e acompanhamento de correções junto ao time responsável.',
      'Participação em automações, integrações, documentação técnica e melhorias operacionais.',
    ],
    skills: ['React', 'TypeScript', 'Vite', 'Supabase Auth', 'PostgreSQL', 'Análise de Sistemas', 'Testes', 'Git/GitHub'],
  },
  {
    role: 'Estagiário de Desenvolvimento de Jogos',
    organization: 'Acclivity',
    description:
      'Participação na fase inicial de desenvolvimento de uma plataforma voltada ao público gamer, com prototipação, organização de telas e estruturação de fluxos de navegação.',
    meta: 'jan. 2023 a jun. 2023',
    details: [
      'Estágio híbrido em Brasília, Distrito Federal, Brasil.',
      'Aplicação de lógica de programação, desenvolvimento web e conceitos de interface na construção inicial do produto.',
    ],
    skills: ['Desenvolvimento web', 'Lógica de programação', 'Prototipação', 'Design de interface', 'Análise de sistemas'],
  },
]

export type Certification = {
  title: string
  institution: string
  issued: string
  description: string
  skills: string[]
  expired?: string
  credentialCode?: string
  credentialUrl?: string
}

export const education = {
  degree: {
    shortTitle: 'Análise e Desenvolvimento de Sistemas',
    title: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
    kind: 'Curso Superior de Tecnologia',
    institution: 'UDF Centro Universitário',
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
      title: 'English for IT B2 / GSE 59-75',
      institution: 'Cisco',
      issued: 'ago. 2026',
      description: 'Certificação de inglês para tecnologia em nível B2 / GSE 59-75.',
      skills: ['English for IT', 'Inglês técnico', 'CEFR B2'],
      credentialUrl: site.urls.certifications.englishB2,
    },
    {
      title: 'Mestre em Engenharia de Prompt e Colaboração com IA',
      institution: 'Cruzeiro do Sul',
      issued: 'ago. 2026',
      credentialCode: '21186462-904d-4f54-8d4a-2a994a8382cc',
      credentialUrl: site.urls.certifications.promptEngineering,
      description: 'Engenharia de Prompt, pensamento crítico e colaboração com IA.',
      skills: ['Engenharia de Prompt', 'Pensamento crítico', 'Colaboração com IA'],
    },
    {
      title: 'Arquiteto de IA e Responsabilidade Digital',
      institution: 'Cruzeiro do Sul',
      issued: 'ago. 2026',
      credentialCode: 'aa1253e1-4ded-4c99-9ec9-492bb6cd337d',
      credentialUrl: site.urls.certifications.responsibleAI,
      description: 'Fundamentos de IA, Machine Learning e responsabilidade digital.',
      skills: ['Inteligência Artificial', 'Machine Learning', 'Responsabilidade Digital'],
    },
    {
      title: 'English for IT 1',
      institution: 'Cisco',
      issued: 'ago. 2026',
      description: 'Formação em inglês aplicado a contextos e vocabulário de tecnologia.',
      skills: ['English for IT', 'Inglês técnico'],
      credentialUrl: site.urls.certifications.englishIT1,
    },
  ] as Certification[],
}
