# Gabriel Brasil | Portfólio profissional

Portfólio de **Gabriel Brasil**, Analista de Sistemas e Desenvolvedor em Brasília. O projeto apresenta produtos reais, decisões técnicas, responsabilidades assumidas e evidências visuais de entrega.

## Site

**Produção:** https://portfolio-gabriel-brasil.pages.dev/

## Objetivo

Este portfólio foi construído para apresentar experiência prática em:

- análise de sistemas e processos
- desenvolvimento web Full Stack
- APIs e integrações
- automações
- implantação e melhoria contínua
- acessibilidade e experiência responsiva

## Projetos apresentados

### Barthy Web Studio V2

Case autoral com temas claro e escuro reais, progressive enhancement, experiência visual com WebGPU, fallback em CSS, navegação por teclado e formulário com validação.

### Levens Qualifica | PNQC

Plataforma educacional em produção com autenticação, perfis, cursos, módulos, aulas, progresso sequencial, avaliações por funções RPC e nota mínima de 70%.

### Hermes Command Center

Aplicação Full Stack privada para CRM, pipeline, finanças, tarefas, rotina, estudos, relatórios, memória, aprovações e integrações controladas. O portfólio não publica capturas com dados pessoais.

### SaaS de Suporte

Produto em desenvolvimento apresentado separadamente dos cases entregues. Nenhuma tela, métrica ou funcionalidade não implementada é tratada como pronta.

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

Os conteúdos dos projetos ficam centralizados em `src/content/portfolio.ts`. As capturas reais e suas variantes AVIF/WebP são descritas em `src/content/projectPreviews.ts`.

## Execução local

Requisitos:

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

## Capturas e performance

As capturas dos projetos são servidas com:

- AVIF como formato preferencial
- WebP como fallback
- dimensões intrínsecas
- carregamento sob demanda
- pré-carregamento limitado à próxima imagem
- galerias abertas somente após interação

## Acessibilidade

O projeto inclui:

- link para pular ao conteúdo
- navegação por teclado
- foco visível
- Dialog com retorno de foco
- controles de carrossel nomeados
- suporte a `prefers-reduced-motion`
- áreas de toque adequadas no mobile

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

Branches e pull requests podem gerar previews separados antes do merge.

## Privacidade

Não publicar neste repositório:

- credenciais
- variáveis privadas
- bancos copiados
- código corporativo proprietário
- capturas com dados pessoais ou financeiros
- informações internas de clientes

## Padrão de contribuição

A documentação, os commits e as Pull Requests deste repositório usam português do Brasil, com linguagem técnica, clara e direta. Os commits seguem Conventional Commits com o prefixo técnico em inglês e a descrição em português, como `docs: atualizar apresentação dos projetos`.

O padrão completo está disponível em [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Contato

- LinkedIn: https://www.linkedin.com/in/gabrielbrasildev
- GitHub: https://github.com/g4brielbr4sil
- E-mail: g4brielbr4sil@gmail.com
