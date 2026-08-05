# Gabriel Brasil | Portfólio profissional

Este é meu portfólio como Analista de Sistemas e Desenvolvedor. Eu apresento projetos reais, decisões técnicas, responsabilidades e o estado atual de cada entrega sem inventar métricas, clientes ou funcionalidades.

## Objetivo

Eu uso este projeto para reunir minha atuação em análise de sistemas, desenvolvimento Full Stack, APIs, integrações, automações, implantação e evolução de produtos digitais. A direção visual permanece editorial escura, com preto, creme, tipografia forte, movimentos discretos e capturas reais como evidência.

## Arquitetura

O site usa React, TypeScript, Vite, Tailwind CSS, Motion, Radix UI e Cloudflare Pages. A geração estática foi implementada sem adicionar um framework de rotas pesado.

```text
scripts/
  prerender.mjs       gera HTML, sitemap, robots e arquivos para IA
  validate-dist.mjs   valida rotas, metadata, links e orçamento de bundle
  indexnow.mjs        notifica o IndexNow somente quando configurado
src/
  components/
    contact/
    layout/
    navigation/
    projects/
  config/
    site.ts           fonte única de links e configuração pública
    routes.ts         rotas e metadata base
  content/            conteúdo factual dos projetos
  pages/              páginas públicas
  seo/                metadata e dados estruturados
public/               arquivos copiados sem transformação
```

O build gera um bundle cliente dividido por página, um bundle temporário de renderização e o HTML final em `dist/`. O diretório `.prerender/` é temporário e não é versionado.

## Rotas públicas

| Rota | Conteúdo |
| --- | --- |
| `/` | apresentação, atuação, projetos, formação e contato |
| `/sobre/` | perfil profissional, atuação, stack e formação |
| `/projetos/` | visão geral dos projetos reais e do produto em desenvolvimento |
| `/projetos/barthy-web-studio-v2/` | estudo de caso e capturas reais da Barthy V2 |
| `/projetos/pnqc/` | estudo de caso e quatro capturas reais do PNQC |
| `/projetos/hermes-command-center/` | estudo de caso textual e composição abstrata, sem capturas reais |
| `/contato/` | canais profissionais e formulário progressivo |

Uma página `404.html` útil é gerada com `noindex`. As versões sem barra final são redirecionadas para as URLs canônicas.

## Fonte única de configuração

Todos os links públicos e campos de integração ficam em `src/config/site.ts`. Hero, navegação, contato, projetos, JSON-LD, Open Graph, Twitter Card, sitemap, robots, `llms.txt` e testes consomem essa configuração direta ou indiretamente.

Os campos documentados incluem:

- URL canônica do portfólio
- LinkedIn, GitHub e e-mail
- Hermes, PNQC, Barthy V2 e Barthy V1
- currículo
- endpoint público opcional de contato
- domínio futuro, atualmente não configurado
- redes usadas em `sameAs`

## Currículo

O PDF real fornecido está em `public/curriculo-gabriel-brasil.pdf`. O Vite verifica a existência do arquivo durante o build:

- presente: os CTAs aparecem no Hero, na navegação e no contato
- ausente: os CTAs ficam ocultos e nenhum link gera 404

O download usa o nome amigável `Gabriel-Brasil-Curriculo.pdf`. O repositório não gera PDF vazio nem currículo fictício.

## Contato

O formulário possui nome, e-mail, assunto e mensagem, com labels, erros acessíveis, honeypot, limites de tamanho, prevenção de envio duplicado, timeout e cancelamento de requisição.

O repositório não contém um endpoint nem um provedor de e-mail inventado. Sem `VITE_CONTACT_ENDPOINT`, o formulário abre o aplicativo de e-mail com os dados preenchidos e informa que o usuário ainda precisa confirmar o envio. Com um endpoint público configurado, o front-end envia JSON e preserva o fallback por e-mail em falhas de rede ou timeout.

Se o endpoint tiver origem externa, o build acrescenta somente essa origem ao `connect-src` do `_headers` gerado. Segredos de provedor nunca devem usar prefixo `VITE_`.

## Variáveis de ambiente

Copie `.env.example` somente quando precisar configurar valores reais:

| Variável | Finalidade |
| --- | --- |
| `VITE_CONTACT_ENDPOINT` | URL pública opcional de envio do formulário |
| `VITE_GOOGLE_SITE_VERIFICATION` | verificação pública opcional do Google Search Console |
| `VITE_BING_SITE_VERIFICATION` | verificação pública opcional do Bing Webmaster Tools |
| `INDEXNOW_KEY` | chave usada no build e na notificação opcional do IndexNow |
| `DEPLOY_URL` | origem do preview ou produção que será notificada ao IndexNow |

Não há valores fictícios no exemplo. Arquivos `.env` continuam ignorados pelo Git.

## SEO e descoberta por IA

Cada rota indexável recebe HTML textual, título, descrição, canonical, Open Graph, Twitter Card e JSON-LD próprios. Os estudos de caso usam `CreativeWork` e `BreadcrumbList`; as páginas de perfil usam dados factuais de `Person`, `WebSite` e `ProfilePage` quando aplicável.

O build gera:

- `sitemap.xml` somente com URLs canônicas e indexáveis
- `robots.txt` com permissão explícita para `OAI-SearchBot`
- `llms.txt` como resumo factual complementar
- `llms-full.txt` com detalhes factuais dos projetos

Não existe regra dedicada nova para `GPTBot`; ele continua sob a política geral de `User-agent: *`. Essa decisão evita misturar descoberta em busca com uma mudança não solicitada de política de treinamento.

As verificações do Google e do Bing só entram no HTML quando as variáveis correspondentes existem. Nenhum código de verificação falso é publicado.

## IndexNow

O suporte é opcional. O build cria o arquivo público da chave apenas quando `INDEXNOW_KEY` está configurada. O comando `pnpm indexnow`:

- encerra com sucesso e informa que pulou a etapa quando a chave não existe
- usa as rotas indexáveis da fonte de configuração
- aceita `DEPLOY_URL` para notificar um preview específico
- envia a notificação somente quando executado explicitamente

## Capturas e privacidade

- Barthy V2 mantém conjuntos reais Dark e Light, incluindo a captura mobile existente
- PNQC mantém quatro capturas reais e não recebe seletor de tema
- Hermes mantém somente composição abstrata e texto, sem capturas ou dados operacionais
- imagens usam AVIF com WebP, dimensões intrínsecas, `object-contain`, lazy loading e fallback de erro

Não devem ser adicionados tokens, credenciais, bancos, arquivos `.env`, nomes de clientes privados nem capturas com dados pessoais ou financeiros.

## Acessibilidade e movimento

O projeto inclui landmarks, skip link, headings por página, foco visível, alvos de toque de 44 px, navegação por teclado, retorno de foco do Dialog e mensagens acessíveis no formulário. Carrosséis pausam fora da viewport, com hover, com foco e quando a aba fica oculta. `prefers-reduced-motion` desativa autoplay e reduz animações.

## Performance

O build divide o código por rota e mantém o Dialog e as galerias sob demanda. A validação automática aplica estes orçamentos:

- maior chunk JavaScript: até 180 KiB gzip
- JavaScript total: até 300 KiB gzip

Datas de `lastmod` só são incluídas no sitemap quando o build corresponde a um commit Git limpo. Caso contrário, o campo é omitido para não inventar uma data.

## Desenvolvimento local

Requisitos:

- Node.js 22.13 ou superior
- pnpm 10.34.3

```bash
pnpm install --frozen-lockfile
pnpm dev
```

## Scripts

```bash
pnpm typecheck      # valida TypeScript
pnpm test           # executa testes funcionais e salvaguardas
pnpm build          # cliente, SSR temporário e prerender final
pnpm validate:dist  # valida HTML, metadata, arquivos públicos e bundle
pnpm check          # executa toda a validação de entrega
pnpm indexnow       # notificação opcional e explícita
```

## Cloudflare Pages

Configuração esperada:

```text
Build command: pnpm build
Output directory: dist
Production branch: main
```

Branches e pull requests podem gerar previews quando a integração do repositório com a Cloudflare Pages estiver ativa. Este projeto não faz merge nem deploy de produção automaticamente.

## Estado real das integrações

- currículo: publicado com o PDF fornecido
- contato direto: não configurado no repositório; fallback por e-mail ativo
- domínio futuro: não ligado
- IndexNow: preparado, mas depende de chave e execução explícita
- Search Console e Bing Webmaster: preparados, mas dependem dos códigos reais das contas
