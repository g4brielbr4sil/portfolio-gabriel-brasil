import { projects, type Project } from '@/content/portfolio'

const [barthy, pnqc, hermes, radar, supportBase] = projects

const supportSaas: Project = {
  ...supportBase,
  name: 'Sistema modular em validação',
  status: 'Produto em validação',
  statusTooltip:
    'Visão de produto em validação. A tela oficial demonstra a direção da interface sem declarar uma aplicação pública pronta.',
  description:
    'Produto operacional modular pensado para centralizar relacionamento, atendimento e rotinas de pequenos negócios, conectando CRM, WhatsApp, check-ins, operação, suporte e acompanhamento conforme o contexto de uso.',
  highlightsLabel: 'Frentes em validação',
  highlights: [
    'CRM e relacionamento',
    'Atendimento por WhatsApp',
    'Check-ins e rotinas',
    'Oficina e operação',
    'Suporte e acompanhamento',
    'Módulos conectáveis',
  ],
  techLabel: 'Arquitetura em validação',
  caseStudy: {
    ...supportBase.caseStudy,
    category: 'Produto SaaS em validação',
    status: 'Arquitetura modular em validação, sem aplicação pública',
    context:
      'Visão de produto para operações de serviço que hoje distribuem clientes, retornos, mensagens, check-ins e rotinas entre ferramentas isoladas.',
    problem:
      'Organizar diferentes necessidades operacionais em módulos conectáveis sem transformar a proposta em um sistema monolítico ou prometer funcionalidades ainda não construídas.',
    role: 'Estruturação do problema, visão de produto e arquitetura inicial dos módulos.',
    decisions: [
      'CRM e relacionamento como base comum entre módulos.',
      'WhatsApp tratado como canal de operação e retorno, não como sistema isolado.',
      'Check-ins, rotina, oficina/operação e suporte concebidos como módulos ativáveis por contexto.',
      'Apresentação pública limitada ao estágio real de validação.',
    ],
    features: [
      'CRM e relacionamento planejados',
      'Atendimento e retornos por WhatsApp planejados',
      'Check-ins e rotinas planejados',
      'Módulos para operação, oficina, suporte e acompanhamento',
    ],
    challenges: [
      'Definir um núcleo comum que funcione para negócios de serviço diferentes.',
      'Manter a narrativa de produto fiel ao que ainda está em validação.',
    ],
    solutions: [
      'Arquitetura modular com capacidades separadas por contexto de operação.',
      'Mockup oficial integrado com comunicação explícita do estágio real do produto.',
    ],
    nextSteps: ['Validar os primeiros módulos com operações reais e definir o escopo da primeira versão demonstrável.'],
  },
}

export const displayProjects: Project[] = [barthy, pnqc, hermes, radar, supportSaas]
