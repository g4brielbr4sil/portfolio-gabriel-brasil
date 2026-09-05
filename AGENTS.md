# Instruções para agentes

Este repositório contém o portfólio profissional de Gabriel Brasil.

## Posicionamento

Apresentar Gabriel Brasil como:

**Desenvolvedor Full Stack e Analista de Sistemas**

Não usar “estudante” como título principal. A formação acadêmica deve permanecer na seção de formação.

## Prioridades de verdade e consistência

- Não inventar experiências, métricas, usuários, clientes, resultados ou certificações.
- Não inventar URLs, capturas, endpoints ou funcionalidades concluídas.
- Diferenciar claramente produto implementado, recurso em evolução e ideia em validação.
- Não afirmar que Gabriel desenvolveu diretamente sistemas em que sua atuação foi de análise, requisitos, testes e homologação.
- No PNQC, não tratar certificados, badges ou verificação pública como concluídos enquanto esses recursos seguirem em evolução.
- No Hermes, preservar a distinção entre automação real, DryRun, contato manual confirmado e futura comunicação externa automatizada.
- Não publicar dados pessoais, financeiros, bancos, tokens, credenciais ou arquivos `.env`.
- Não criar currículo, métricas ou evidências fictícias.

## Identidade visual

Preservar a direção atual:

- editorial escuro
- preto e creme
- tipografia forte
- movimentos discretos
- composição responsiva
- capturas reais somente quando sanitizadas e apropriadas

Não redesenhar o produto do zero sem solicitação explícita.

## Stack principal

- React
- TypeScript
- Vite
- Tailwind CSS
- Motion
- Radix UI
- Python
- FastAPI
- SQL
- Docker
- Git e GitHub
- Cloudflare Pages

Não adicionar framework pesado sem justificar tecnicamente.

## Dados e links canônicos

- Site: `https://gabrielbrasil.dev/`
- LinkedIn: `https://www.linkedin.com/in/gabrielbrasildev`
- GitHub: `https://github.com/g4brielbr4sil`
- E-mail: `g4brielbr4sil@gmail.com`
- Hermes: `https://hermes-agent-01l.pages.dev/`
- PNQC: `https://www.pnqc.com.br/`
- Barthy Web Studio: `https://github.com/g4brielbr4sil/barthy-web-studio-v2`

Centralize URLs públicas em `src/config/site.ts`. Evite replicar strings pelo projeto.

## Projetos prioritários

O portfólio deve priorizar como cases principais:

1. Hermes Command Center
2. PNQC
3. Barthy Web Studio

Projetos em pesquisa ou validação não devem receber o mesmo peso visual de produtos já implementados.

## Experiência profissional

### Levens · Desenvolvedor Júnior

Período de referência: `mar. 2026 a ago. 2026`.

- PNQC: desenvolvimento e publicação da plataforma.
- eCuid e demais portais: análise de sistemas, requisitos, regras de negócio, testes, homologação e acompanhamento de correções.
- Não afirmar que Gabriel desenvolveu diretamente o eCuid.

### Acclivity · Estagiário de Desenvolvimento de Jogos

Período de referência: `jan. 2023 a jun. 2023`.

- prototipação de telas
- fluxos de navegação
- lógica de programação
- desenvolvimento web e interface na fase inicial do produto

## Currículo

O arquivo público é:

`public/curriculo-gabriel-brasil.pdf`

Os CTAs só devem aparecer quando o arquivo estiver disponível.

## Contato

O formulário deve funcionar com fallback por e-mail quando nenhum endpoint estiver configurado.

- `VITE_CONTACT_ENDPOINT` aceita somente URL pública.
- Segredos de provedor ficam somente no servidor ou ambiente de deploy.
- Não simular provedor ou endpoint inexistente.

## Capturas e privacidade

- PNQC pode usar capturas reais sanitizadas.
- Hermes deve preservar dados demonstrativos ou composição sanitizada, sem expor a operação real.
- Barthy Web Studio pode usar capturas reais do próprio projeto.
- Preservar proporção e legibilidade.
- Preferir AVIF com WebP fallback quando aplicável.

## SEO e descoberta

Priorizar:

- títulos e descrições exclusivos
- canonical em `https://gabrielbrasil.dev/`
- sitemap
- robots
- links internos com `<a href>`
- páginas públicas dos cases
- JSON-LD factual
- breadcrumbs
- Open Graph
- Twitter Card
- `llms.txt` complementar

## Qualidade

Antes de entregar mudanças relevantes:

```bash
pnpm typecheck
pnpm test
pnpm build
pnpm check
```

Não silenciar TypeScript com `any`, `@ts-ignore` ou casts inseguros sem justificativa.

## Acessibilidade

Garantir:

- navegação por teclado
- foco visível
- landmarks
- skip link
- headings corretos
- retorno de foco em dialogs
- `prefers-reduced-motion`
- áreas de toque de pelo menos 44px
- formulário com labels e mensagens acessíveis
- ausência de overflow horizontal em 320px

## Git e entrega

Respeitar a estratégia de branch definida pela tarefa em andamento. Não assumir branch, issue ou PR antiga como instrução permanente.

O relatório de entrega deve separar:

- o que foi implementado
- o que foi validado
- o que depende de arquivo ou credencial externa
- o que permaneceu fora do escopo
- resultados de testes e build
