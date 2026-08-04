# Gabriel Brasil | Portfólio profissional

Este é meu portfólio profissional. Reuni aqui projetos reais, decisões técnicas, responsabilidades e exemplos do que já desenvolvi.

## Site

**Produção:** https://portfolio-gabriel-brasil.pages.dev/

## O que este portfólio mostra

- análise de sistemas e processos
- desenvolvimento web Full Stack
- APIs e integrações
- automações
- publicação e melhoria contínua
- acessibilidade
- responsividade

## Projetos apresentados

### Barthy Web Studio V2

Projeto autoral com temas claro e escuro, progressive enhancement, recurso visual com WebGPU, alternativa em CSS, navegação por teclado e formulário com validação.

### Levens Qualifica | PNQC

Plataforma educacional em produção com autenticação, perfis, cursos, módulos, aulas, progresso sequencial, avaliações por funções RPC e nota mínima de 70%.

### Hermes Command Center

Aplicação Full Stack privada para CRM, pipeline, finanças, tarefas, rotina, estudos, relatórios, memória, aprovações e integrações controladas. As imagens usadas no portfólio não expõem dados pessoais ou financeiros.

### SaaS de Suporte

Produto em desenvolvimento. Ele aparece separado dos projetos entregues para não passar a impressão de que algo ainda em construção já está pronto.

## Stack do portfólio

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Motion
- Radix UI
- Phosphor Icons
- Cloudflare Pages

## Arquitetura

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

Os textos dos projetos ficam em `src/content/portfolio.ts`. As imagens e suas versões AVIF e WebP ficam organizadas em `src/content/projectPreviews.ts`.

## Execução local

### Requisitos

- Node.js 22 ou compatível
- pnpm

```bash
pnpm install
pnpm dev
```

## Scripts

```bash
pnpm dev        # ambiente local
pnpm typecheck  # validação TypeScript
pnpm test       # salvaguardas de produção com node:test
pnpm build      # build de produção
pnpm check      # typecheck + testes + build
```

## Imagens e performance

As imagens dos projetos usam:

- AVIF como formato principal
- WebP como alternativa
- dimensões definidas
- carregamento sob demanda
- pré-carregamento limitado à próxima imagem
- galerias abertas somente depois da interação

## Acessibilidade

O projeto inclui:

- link para pular ao conteúdo
- navegação por teclado
- foco visível
- Dialog com retorno de foco
- controles de carrossel identificados
- suporte a `prefers-reduced-motion`
- áreas de toque adequadas no celular

## SEO e compartilhamento

- metadados Open Graph e Twitter
- JSON-LD do tipo `Person`
- canonical
- favicon e manifest
- robots.txt
- sitemap

## Deploy

A produção usa Cloudflare Pages.

```text
Build command: pnpm build
Output directory: dist
Production branch: main
```

Branches e Pull Requests podem gerar previews antes do merge.

## Privacidade

Não devem ser publicados neste repositório:

- credenciais
- variáveis privadas
- cópias de bancos
- código corporativo proprietário
- imagens com dados pessoais ou financeiros
- informações internas de clientes

## Contato

- LinkedIn: https://www.linkedin.com/in/gabrielbrasildev
- GitHub: https://github.com/g4brielbr4sil
- E-mail: g4brielbr4sil@gmail.com
