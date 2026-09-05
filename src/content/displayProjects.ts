import { projects, type Project } from '@/content/portfolio'

const [barthy, pnqc, hermes, radar, supportBase] = projects

const supportSaas: Project = {
  ...supportBase,
  name: 'Sistema Modular / Barthy Flow',
  status: 'Produto em validação',
  statusTooltip:
    'Visão de produto em validação. O primeiro contexto real é o Módulo Oficina; a tela oficial demonstra a direção da interface sem declarar uma aplicação pública pronta.',
  description:
    'Produto operacional modular com o Módulo Oficina como primeiro contexto real: atendimentos, clientes, histórico operacional, WhatsApp contextual, orçamento e check-in, pensado para se estender a outras rotinas de pequenos negócios.',
  highlightsLabel: 'Frentes em validação',
  highlights: [
    'Atendimentos e histórico operacional',
    'CRM e relacionamento com clientes',
    'WhatsApp contextual',
    'Geração de orçamento',
    'Check-ins e rotinas (Módulo Oficina)',
    'Módulos conectáveis',
  ],
  techLabel: 'Arquitetura em validação',
  caseStudy: {
    ...supportBase.caseStudy,
    category: 'Produto SaaS em validação',
    status: 'Arquitetura modular em validação, sem aplicação pública',
    context:
      'O Módulo Oficina é o primeiro contexto real do Sistema Modular / Barthy Flow: atendimentos, clientes, histórico operacional, WhatsApp contextual, orçamento e check-in em um mesmo fluxo, pensado para se estender a outras operações de serviço.',
    problem:
      'Organizar atendimentos, clientes e retornos que hoje ficam espalhados entre mensagens e planilhas em módulos conectáveis, mantendo o sistema simples de evoluir para outros contextos além da oficina.',
    role: 'Estruturação do problema, visão de produto e arquitetura inicial dos módulos.',
    decisions: [
      'Atendimentos e histórico operacional como base comum entre módulos.',
      'WhatsApp tratado como canal contextual de operação e retorno, não como sistema isolado.',
      'Módulo Oficina como primeiro contexto validado, com orçamento e check-in como fluxos concretos.',
      'Apresentação pública limitada ao estágio real de validação.',
    ],
    features: [
      'Atendimentos e histórico operacional por cliente',
      'WhatsApp contextual integrado ao atendimento',
      'Geração de orçamento e agendamento de check-in (Módulo Oficina)',
      'Módulos conectáveis para operação, suporte e acompanhamento',
    ],
    challenges: [
      'Definir um núcleo comum que funcione para negócios de serviço diferentes.',
      'Manter a narrativa de produto fiel ao que ainda está em validação.',
    ],
    solutions: [
      'Arquitetura modular com capacidades separadas por contexto de operação.',
      'Tela oficial do produto usada como referência visual da experiência modular.',
    ],
    nextSteps: ['Validar os primeiros módulos com operações reais e definir o escopo da primeira versão demonstrável.'],
  },
}

export const displayProjects: Project[] = [barthy, pnqc, hermes, radar, supportSaas]
