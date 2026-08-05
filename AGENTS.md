# Instruções para agentes

Este repositório contém o portfólio profissional de Gabriel Brasil.

## Tarefa ativa

Trabalhe na issue #10:

`feat: rodada completa de evolução do portfólio, SEO, IA, currículo e contato`

Branch obrigatória:

`feat/portfolio-polish-round-2`

Não faça commits diretamente na `main` e não faça merge automático.

## Posicionamento

Apresentar Gabriel Brasil como:

**Analista de Sistemas e Desenvolvedor**

Não usar “estudante” como título principal. A formação acadêmica deve permanecer apenas na seção de formação.

## Regras de verdade

- Não inventar experiências, métricas, usuários, clientes, resultados ou certificações.
- Não inventar URLs, capturas, endpoints ou funcionalidades concluídas.
- Não publicar capturas reais do Hermes nesta rodada.
- Não publicar dados pessoais, financeiros, bancos, tokens ou arquivos `.env`.
- Não criar PDF de currículo vazio ou fictício.
- Quando faltar um arquivo, domínio, segredo ou conta, implementar o comportamento seguro e registrar a pendência.

## Identidade visual

Preservar a direção atual:

- editorial escuro
- preto e creme
- tipografia forte
- movimentos discretos
- cards arredondados
- capturas reais como evidência

Não redesenhar o produto do zero.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Motion
- Radix UI
- Phosphor Icons
- pnpm
- Cloudflare Pages

Não adicionar framework pesado sem justificar tecnicamente.

## Dados e links atuais

- Site: `https://portfolio-gabriel-brasil.pages.dev/`
- LinkedIn: `https://www.linkedin.com/in/gabrielbrasildev`
- GitHub: `https://github.com/g4brielbr4sil`
- E-mail: `g4brielbr4sil@gmail.com`
- Hermes: `https://hermes-agent-01l.pages.dev/`
- PNQC: `https://levens-qualifica-pnqc.pages.dev/`
- Barthy V2: `https://github.com/g4brielbr4sil/barthy-web-studio-v2`
- Barthy V1: `https://barthy-web-studio.pages.dev/`
- Barthy V1 GitHub: `https://github.com/g4brielbr4sil/barthy-web-studio`

Centralize essas informações em uma única configuração. Não replique strings de URL pelo projeto.

## Currículo

O caminho reservado é:

`public/curriculo-gabriel-brasil.pdf`

Enquanto o arquivo não existir, os CTAs devem permanecer ocultos e nenhum link pode retornar 404.

## Contato

O formulário deve funcionar com fallback por e-mail quando nenhum endpoint estiver configurado.

- `VITE_CONTACT_ENDPOINT` pode conter somente uma URL pública.
- Segredos de provedor devem existir apenas no servidor ou no ambiente da Cloudflare.
- Não escolha nem simule um provedor sem configuração real.

## Capturas

Barthy V2 e PNQC usam capturas reais.

- Não reconstruir as interfaces.
- Não usar inversão de cores.
- Não criar pares de tema inexistentes.
- Preservar proporção e legibilidade.
- Usar AVIF com WebP fallback.

Hermes deve continuar com apresentação abstrata e estudo de caso textual.

## SEO e descoberta

O conteúdo importante deve possuir URLs públicas estáveis e HTML rastreável.

Priorizar:

- títulos e descrições exclusivos
- canonical
- sitemap
- robots
- links internos com `<a href>`
- páginas públicas dos projetos
- JSON-LD factual
- breadcrumbs
- Open Graph
- Twitter Card
- OAI-SearchBot permitido
- `llms.txt` complementar

`llms.txt` não substitui sitemap, HTML semântico, links internos ou conteúdo público.

Não alterar a política de GPTBot sem registrar a decisão.

## Qualidade

Antes de começar:

```bash
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test
pnpm build
```

Antes de entregar:

```bash
pnpm typecheck
pnpm test
pnpm build
pnpm check
```

Corrigir erros e warnings relevantes. Não silenciar TypeScript com `any`, `@ts-ignore` ou casts inseguros sem justificativa.

## Acessibilidade

Garantir:

- navegação por teclado
- foco visível
- landmarks
- skip link
- headings corretos
- Dialog com retorno de foco
- `prefers-reduced-motion`
- áreas de toque de pelo menos 44px
- formulário com labels e mensagens acessíveis
- ausência de overflow horizontal em 320px

## Entrega

Abrir uma PR para `main` e manter o merge manual.

O relatório deve separar claramente:

- o que foi implementado
- o que foi validado
- o que depende de arquivo ou credencial do usuário
- o que permaneceu fora do escopo
- resultados dos testes e build
- mudanças de bundle e performance
- URL do preview da Cloudflare, quando disponível
