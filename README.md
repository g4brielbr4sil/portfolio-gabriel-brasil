# Gabriel Brasil | Portfólio profissional

Portfólio de **Gabriel Brasil, Desenvolvedor Full Stack e Analista de Sistemas**, com projetos reais em aplicações web, APIs, automações, integrações e produtos digitais.

**Site:** https://gabrielbrasil.dev  
**LinkedIn:** https://www.linkedin.com/in/gabrielbrasildev  
**GitHub:** https://github.com/g4brielbr4sil

## Sobre o projeto

O portfólio reúne minha trajetória, stack, experiência profissional e estudos de caso com foco em evidência técnica e estado real das entregas.

Os principais cases são:

- **Hermes Command Center:** aplicação Full Stack autoral com frontend React/TypeScript, backend Python/FastAPI, APIs REST, banco de dados, automações, infraestrutura e arquitetura multiagente com políticas e aprovações humanas.
- **PNQC:** plataforma web de formação de cuidadores com autenticação, perfis de acesso, cursos, módulos, aulas, progresso sequencial e avaliações.
- **Barthy Web Studio:** projeto autoral para produtos digitais, sistemas e automações voltados a pequenos negócios.

## Stack

- React
- TypeScript
- JavaScript
- Vite
- Tailwind CSS
- Python
- FastAPI
- SQL
- PostgreSQL
- SQLite
- Supabase
- Docker
- Linux
- Git e GitHub
- Cloudflare Pages
- AWS Lightsail

## Arquitetura do portfólio

O site usa React, TypeScript, Vite, Tailwind CSS, Motion e Radix UI. O build gera HTML estático por rota para melhorar descoberta, SEO, performance e compartilhamento.

```text
scripts/
  prerender.mjs
  validate-dist.mjs
  indexnow.mjs
src/
  components/
  config/
  content/
  pages/
  seo/
public/
```

## Rotas públicas

| Rota | Conteúdo |
| --- | --- |
| `/` | apresentação, experiência, stack, projetos e contato |
| `/sobre/` | perfil profissional e trajetória |
| `/projetos/` | visão geral dos projetos |
| `/projetos/barthy-web-studio-v2/` | case da Barthy Web Studio |
| `/projetos/pnqc/` | case do PNQC |
| `/projetos/hermes-command-center/` | case do Hermes |
| `/contato/` | canais profissionais e formulário |

## Configuração pública

`src/config/site.ts` centraliza os principais dados públicos:

- domínio canônico `gabrielbrasil.dev`
- LinkedIn e GitHub
- e-mail profissional
- URL pública do PNQC
- interface protegida do Hermes
- repositório da Barthy Web Studio
- currículo
- endpoint opcional do formulário

## Contato

O formulário possui validação, honeypot, limites de tamanho, prevenção de envio duplicado, timeout e cancelamento de requisição.

Sem `VITE_CONTACT_ENDPOINT`, o site usa fallback por e-mail. Segredos de provedor não são expostos no frontend.

## SEO e descoberta

Cada rota indexável recebe HTML textual, título, descrição, canonical, Open Graph, Twitter Card e dados estruturados.

O build gera:

- `sitemap.xml`
- `robots.txt`
- `llms.txt`
- `llms-full.txt`

O domínio canônico de produção é **https://gabrielbrasil.dev/**.

## Privacidade

O repositório não deve publicar tokens, credenciais, arquivos `.env`, bancos, dados financeiros ou informações privadas de clientes e operações.

Capturas e textos de projetos devem permanecer sanitizados e coerentes com o estado real das aplicações.

## Acessibilidade e performance

O projeto inclui navegação por teclado, foco visível, skip link, headings semânticos, suporte a `prefers-reduced-motion`, alvos de toque adequados, imagens otimizadas e divisão de código por rota.

## Desenvolvimento local

Requisitos:

- Node.js 22.13 ou superior
- pnpm 10.34.3

```bash
pnpm install --frozen-lockfile
pnpm dev
```

## Validação

```bash
pnpm typecheck
pnpm test
pnpm build
pnpm check
```

## Deploy

O frontend é preparado para publicação no Cloudflare Pages.

```text
Build command: pnpm build
Output directory: dist
Production branch: main
```

O projeto mantém validações de metadata, links, bundle, rotas públicas e conteúdo antes da entrega.
