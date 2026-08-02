# Portfólio Gabriel Brasil — protótipo visual completo

## Context

O usuário anexou dois arquivos de texto em `src/imports/pasted_text/`:

- `gabriel-brasil-portfolio-proto.md` — briefing detalhado do portfólio (8 seções, paleta, tipografia, conteúdo).
- `prisma-landing-page.tsx` — apesar da extensão, é um **prompt de referência** (não código exportado do Figma), descrevendo a landing page "Prisma": dark/cinematográfica, creme quente, Almarai + Instrument Serif, hero em painel inset com navbar cápsula, animações word-pull-up e cards de features.

O briefing pede explicitamente para **reinterpretar** a estética Prisma para um portfólio de tecnologia — não copiar identidade, textos ou composição. O projeto hoje é o scaffold padrão: `src/App.tsx` contém apenas uma demo de grid de pontos, e `src/index.css` só tem `@import 'tailwindcss'`.

Resultado esperado: uma home navegável, responsiva, em português, que posicione Gabriel como **Analista de Sistemas e Desenvolvedor** (nunca como estudante fora da seção de Formação).

## Dados reais confirmados

- LinkedIn: `https://www.linkedin.com/in/gabrielbrasildev`
- GitHub: `https://github.com/g4brielbr4sil`
- E-mail / "Entrar em contato": `mailto:g4brielbr4sil@gmail.com`
- Currículo: `/curriculo-gabriel-brasil.pdf` (arquivo será adicionado depois em `public/`)
- Localização: Brasília, Distrito Federal, Brasil
- Sem WhatsApp/Instagram nesta versão. Nenhum placeholder genérico tipo example.com.

## Dependências a instalar

`pnpm add motion lucide-react` — o pacote `motion` expõe a API do Framer Motion via `motion/react`. Nada mais é necessário; Tailwind v4 já está via plugin Vite.

## Fundação de estilo — `src/index.css`

Ordem obrigatória: `@import` do Google Fonts **antes** do `@import 'tailwindcss'`.

- Fontes: Almarai 300/400/700/800 + Instrument Serif italic (CSS2 `@import`, convenção documentada no AGENTS.md).
- Bloco `@theme` do Tailwind v4 com os tokens do briefing:
  `--color-ink: #000000`, `--color-surface: #101010`, `--color-card: #212121`,
  `--color-cream: #E1E0CC`, `--color-primary: #DEDBC8`, `--color-muted: #9CA3AF`,
  `--color-line: rgba(222,219,200,0.12)`, azul de sistema discreto (ex. `--color-signal: #1E3A5F`) só para detalhes de interface.
  `--font-sans: 'Almarai', ...`, `--font-serif: '"Instrument Serif"', serif`.
- `body { background: black; color: var(--color-cream); font-family: Almarai }` — sem reset universal novo.
- Utilitários de textura: `.noise-overlay` e `.bg-noise` (data-URI SVG com `feTurbulence`), e uma classe de grade/linhas finas para o motivo de "arquitetura de sistemas".
- `@media (prefers-reduced-motion: reduce)` neutralizando transições/animações.

## Estrutura de arquivos

`src/App.tsx` passa a compor as seções (substitui a demo atual). Novos arquivos:

```
src/components/
  Navbar.tsx            cápsula preta suspensa no topo do hero + menu compacto mobile
  Hero.tsx              painel inset, retrato, título monumental, CTAs, notas editoriais
  About.tsx             card #101010, título misto Almarai/Instrument Serif, reveal por scroll
  Projects.tsx          4 projetos, grid assimétrico
  Skills.tsx            "Da análise à entrega." — 4 pilares com ícones Lucide
  Stack.tsx             tecnologias por categoria (sem parede de logos)
  Experience.tsx        timeline vertical, conteúdo provisório marcado
  Education.tsx         UDF + certificações / GitHub Student Pack
  Contact.tsx           CTA final + links reais + footer
  motion/Reveal.tsx     WordsPullUp, WordsPullUpMultiStyle, ScrollRevealText, FadeUp
  ui/Button.tsx         CTA creme com círculo preto + seta; variante secundária
  ui/ImageWithFallback.tsx  wrapper de <img> com fallback
src/content/portfolio.ts  todo o texto/dados (projetos, stack, timeline, links)
```

Todo o copy vive em `src/content/portfolio.ts` para os componentes ficarem puramente visuais e o conteúdo provisório ser fácil de substituir.

## Componentes de animação (`motion/Reveal.tsx`)

Reinterpretando o kit do Prisma, todos com `useInView({ once: true })`:

- `WordsPullUp` — divide por palavras, cada `motion.span` sobe de `y:20`, stagger 0.08s, ease `[0.16,1,0.3,1]`. Prop `asterisk` para o `*` sobrescrito do título.
- `WordsPullUpMultiStyle` — array `{text, className}` preservando estilo por palavra (usado no título da seção Sobre, com o trecho "Analista de Sistemas e Desenvolvedor." em `font-serif italic`).
- `ScrollRevealText` — `useScroll` com `offset: ['start 0.8','end 0.2']`, opacidade por caractere de 0.2 → 1 (parágrafo da seção Sobre).
- `FadeUp` — wrapper genérico com delay, usado nos cards (escala 0.95 → 1 + opacidade, stagger 0.15s).

Movimentos lentos e controlados; nada flutuando em excesso.

## Seções (prioridade Hero → Sobre → Projetos)

**Hero** — `h-screen` com `p-4 md:p-6` (efeito de painel inserido), container `rounded-2xl md:rounded-[2rem] overflow-hidden`. Fundo: retrato masculino profissional em preto e branco / luz lateral dramática vindo do Unsplash (buscado via MCP; pessoa não identificável), `object-cover`, com camada de ruído, gradiente `from-black/40 via-transparent to-black/75`, e uma sobreposição autoral de "arquitetura de sistemas": linhas finas de fluxo em SVG, dois cards translúcidos de produto (ex. mini painel de tickets / trecho de requisição de API) em `backdrop-blur` com borda `--color-line`. Nada de neon nem código verde.

Conteúdo inferior em grade de 12 colunas: à esquerda o título monumental **Gabriel Brasil\*** (`text-[18vw]`–`text-[13vw]`, `leading-[0.85] tracking-[-0.06em]`, cor `#E1E0CC`, asterisco sobrescrito); à direita o posicionamento "Analista de Sistemas e Desenvolvedor" + a descrição do briefing e os dois botões — **Ver projetos** (creme, texto preto, círculo preto com `ArrowRight`, hover aumenta gap e escala o círculo) e **Baixar currículo** (transparente, borda creme, → `/curriculo-gabriel-brasil.pdf`). Notas editoriais discretas: Brasília, DF · Disponível para oportunidades em tecnologia · Desenvolvimento web, sistemas, automações e integrações.

**Navbar** — cápsula preta pendurada no topo (`rounded-b-2xl md:rounded-b-3xl`), itens Sobre / Projetos / Experiência / Tecnologias / Contato com scroll suave por âncora, e botão discreto de currículo ao final. Em mobile vira botão de menu (`Menu`/`X` do Lucide) com painel expansível.

**Sobre** — fundo preto, card central `bg-[#101010]` `rounded-[2rem]`, rótulo "Sobre mim", título via `WordsPullUpMultiStyle` (Instrument Serif italic só em "Analista de Sistemas e Desenvolvedor.") e parágrafo com `ScrollRevealText`.

**Projetos em destaque** — título "Produtos construídos para problemas reais." + subtítulo. Composição assimétrica: Hermes Command Center em card largo (2 colunas, área grande para screenshot/vídeo), Levens Qualifica | PNQC e Barthy Web Studio em cards médios, SaaS de Suporte com badge "Em desenvolvimento" tratado como produto em construção (linhas de blueprint, não vazio). Cada card: número (01–04), nome, descrição, chips de tecnologia, lista de destaques, links "Ver case" e "Ver projeto" com seta `ArrowUpRight`/rotacionada -45°, e área de mídia (mockups compostos em CSS/SVG + imagem Unsplash quando fizer sentido). Grid: 1 col mobile, 2 col tablet, assimétrico no desktop.

**Competências** — "Da análise à entrega.", 4 pilares (`ClipboardList`, `Code2`, `Workflow`, `Rocket`) com descrições do briefing.

**Tecnologias** — 5 categorias (Front-end, Back-end e APIs, Dados, Infraestrutura e deploy, Design e produtividade) em lista tipográfica/chips, sem parede de logos. Supabase fora.

**Experiência** — timeline vertical com linha `--color-line`; entradas provisórias explicitamente marcadas ("Conteúdo provisório — substituir"), descrevendo atividades (mapeamento de processos, implantação, suporte, automações, testes/homologação, documentação). Sem inventar empresas, datas ou métricas.

**Formação e certificações** — Tecnólogo em ADS, UDF (única menção acadêmica) + espaço para certificações e GitHub Student Developer Pack.

**Contato** — "Vamos construir algo que funcione de verdade." + texto do briefing, botões: Entrar em contato (`mailto:`), LinkedIn, GitHub, Baixar currículo; e-mail e localização visíveis; footer discreto.

## Acessibilidade e responsividade

Âncoras `id` por seção + `scroll-behavior: smooth`; `focus-visible` com anel creme; alvos ≥44px; hierarquia h1→h3 correta; `alt` descritivo nas imagens; contraste creme/preto bem acima de AA; `prefers-reduced-motion` desliga pull-ups e o scroll-linked reveal. Breakpoints: desktop grande, notebook, tablet (2 col), celular (1 col, tipografia monumental reduzida mas legível, botões empilhados, menu compacto).

## Verificação

1. `pnpm add motion lucide-react`.
2. Conferir o preview do Vite (já rodando) em desktop e em largura ~375px: hero ocupa a tela, título não estoura, navbar colapsa, cards viram 1 coluna.
3. Navegar pelos itens da navbar e confirmar o scroll suave até cada seção.
4. Tabular pela página verificando estados de foco; ativar "reduzir movimento" no SO e confirmar que a página aparece estática e legível.
5. Conferir os links: `mailto:`, LinkedIn, GitHub e `/curriculo-gabriel-brasil.pdf` (404 esperado até o PDF ser adicionado em `public/`).
6. `figma logs` apenas se algo falhar.
