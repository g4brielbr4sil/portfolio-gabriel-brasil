# Meu portfólio profissional

Sou **Gabriel Brasil**, Analista de Sistemas e Desenvolvedor em Brasília.

Criei este portfólio para apresentar de forma direta o que venho construindo na prática: sistemas, aplicações web, APIs, automações, integrações e produtos digitais voltados a problemas reais.

## Acessar o portfólio

**Produção:** https://portfolio-gabriel-brasil.pages.dev/

## O que quero mostrar com este projeto

Meu objetivo aqui não é apenas listar tecnologias. Quero mostrar como penso, como estruturo um problema e como transformo uma necessidade em uma solução funcional.

Neste portfólio apresento experiência prática com:

- análise de sistemas e processos
- levantamento de requisitos
- desenvolvimento web Full Stack
- APIs e integrações
- automação de fluxos
- testes, homologação e suporte
- implantação e melhoria contínua
- acessibilidade e responsividade

## Projetos em destaque

### Barthy Web Studio V2

Projeto autoral criado para apresentar soluções digitais com identidade própria, temas claro e escuro reais, progressive enhancement, experiência responsiva e recursos visuais com fallback seguro.

**Principais pontos:**

- React, TypeScript, Vite e Tailwind CSS
- WebGPU com fallback em CSS
- temas claro e escuro implementados de forma real
- navegação por teclado
- suporte a movimento reduzido
- formulário com validação e tratamento de falhas
- publicação pela Cloudflare Pages

**Repositório:** https://github.com/g4brielbr4sil/barthy-web-studio-v2

### Levens Qualifica | PNQC

Plataforma educacional em produção para organizar cursos, módulos, aulas, progresso sequencial, avaliações e diferentes perfis de acesso.

Minha atuação envolveu a construção e validação dos fluxos da plataforma, incluindo:

- autenticação e perfis
- cursos, módulos e aulas
- progresso persistido
- liberação sequencial de conteúdo
- avaliações por funções RPC
- nota mínima de 70%
- rotas protegidas por perfil

**Aplicação:** https://levens-qualifica-pnqc.pages.dev/

### Hermes Command Center

Aplicação Full Stack autoral criada para centralizar CRM, pipeline, finanças, tarefas, rotina, estudos, relatórios, memória, aprovações e integrações controladas.

O projeto usa React e TypeScript no front-end, FastAPI e SQLAlchemy no back-end, SQLite para persistência e Docker na infraestrutura.

O ambiente é privado e protegido porque trabalha com contexto operacional e dados pessoais. Por isso, não publico capturas sensíveis nem exponho o código completo.

**Interface protegida:** https://hermes-agent-01l.pages.dev/

### SaaS de Suporte

Produto em desenvolvimento voltado a pequenas empresas que precisam organizar clientes, tickets, solicitações, conhecimento e automações de atendimento.

Ainda está em fase de arquitetura e validação. Não apresento telas, métricas ou funcionalidades como concluídas antes de realmente existirem.

## Stack deste portfólio

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Motion
- Radix UI
- Phosphor Icons
- Cloudflare Pages

## Como organizei o projeto

```text
src/
  components/
    navigation/
    projects/
    ui/
  content/
    portfolio.ts
    projectPreviews.ts
  hooks/
  assets/projects/
public/
  _headers
  _redirects
  robots.txt
  sitemap.xml
  favicon.svg
  og-image.svg
```

Centralizei os conteúdos dos projetos em `src/content/portfolio.ts` e organizei as capturas reais em `src/content/projectPreviews.ts`.

Os componentes de carrossel, galeria e estudo de caso ficam separados para evitar lógica duplicada e facilitar manutenção.

## Rodar localmente

Requisitos:

- Node.js 22 ou compatível
- pnpm

```bash
pnpm install
pnpm dev
```

## Comandos disponíveis

```bash
pnpm dev        # inicia o ambiente local
pnpm typecheck  # valida o TypeScript
pnpm test       # executa os testes de salvaguarda
pnpm build      # gera o build de produção
pnpm check      # executa typecheck, testes e build
```

## Imagens e performance

Usei capturas reais dos projetos em AVIF, com WebP como fallback.

Também configurei:

- dimensões intrínsecas para evitar layout shift
- carregamento sob demanda
- pré-carregamento limitado à próxima imagem
- galeria carregada somente após interação
- Dialog de estudo de caso importado com lazy loading

## Acessibilidade

Implementei cuidados como:

- link para pular ao conteúdo
- foco visível
- navegação por teclado
- retorno de foco ao fechar Dialogs
- controles de carrossel com nomes acessíveis
- suporte a `prefers-reduced-motion`
- áreas de toque adequadas no mobile

## SEO e publicação

O projeto inclui:

- metadados Open Graph e Twitter
- JSON-LD do tipo `Person`
- canonical
- favicon e manifest
- robots.txt
- sitemap
- cabeçalhos de segurança e cache para Cloudflare Pages

## Deploy

A produção usa Cloudflare Pages.

```text
Build command: pnpm build
Output directory: dist
Production branch: main
```

As branches e pull requests podem gerar previews separados antes do merge.

## Privacidade e segurança

Não publico neste repositório:

- credenciais
- variáveis privadas
- bancos de dados copiados
- código corporativo proprietário
- capturas com dados pessoais ou financeiros
- informações internas de clientes

## Contato

- LinkedIn: https://www.linkedin.com/in/gabrielbrasildev
- GitHub: https://github.com/g4brielbr4sil
- E-mail: g4brielbr4sil@gmail.com
