Faça uma nova rodada de refinamento no portfólio existente de Gabriel Brasil.

Antes de alterar qualquer coisa, leia os arquivos atuais do projeto, especialmente:

src/components/Hero.tsx
src/components/About.tsx
src/components/Navbar.tsx
src/components/Projects.tsx
src/components/Skills.tsx
src/components/Stack.tsx
src/components/Experience.tsx
src/components/Education.tsx
src/components/Contact.tsx
src/components/ui/Button.tsx
src/components/motion/Reveal.tsx
src/content/portfolio.ts
src/index.css
index.html
package.json

OBJETIVO DESTA RODADA

Preservar integralmente:

A direção visual cinematográfica
A paleta preta e creme
As fontes Almarai e Instrument Serif
A composição editorial
O Hero monumental
A estrutura das seções
Os conteúdos técnicos já corrigidos
A organização atual dos projetos
A hierarquia da stack
O conteúdo atual da seção Sobre

Não redesenhe o site.

Não reescreva novamente todos os textos.

Não simplifique a stack.

Não remova conteúdos técnicos já validados.

Esta rodada deve corrigir:

1. A linguagem de disponibilidade profissional
2. A repetição do posicionamento no Hero
3. A chamada final de contato
4. A biblioteca de ícones
5. Componentes interativos com shadcn/ui
6. Microinterações e animações
7. SEO técnico e compartilhamento social
8. Acessibilidade e performance

1. CORREÇÃO DO HERO

No Hero atual existe a frase:

Disponível para oportunidades em tecnologia

Ela deve ser removida completamente.

Não deixe essa frase escondida, duplicada, repetida em acessibilidade ou em outra variação.

Substitua a linha editorial do Hero por:

Brasília, Distrito Federal

Aberto a novos desafios

Sistemas, automações e produtos digitais

A apresentação deve formar uma única sequência horizontal no desktop, separada por linhas discretas.

No celular, permita quebra em duas ou três linhas sem reduzir excessivamente a fonte.

Use “Aberto a novos desafios” como um pequeno status profissional, não como um grande anúncio de busca por emprego.

Pode incluir um ponto de status discreto com animação de pulso muito suave.

Não usar:

Disponível para oportunidades em tecnologia
Open to work
Procurando emprego
Em busca de recolocação
Disponível imediatamente

2. REMOVER REPETIÇÃO NO TEXTO DO HERO

O Hero já apresenta:

Analista de Sistemas e Desenvolvedor

Por isso, o parágrafo abaixo não deve repetir novamente o cargo.

Substituir:

Analista de Sistemas e Desenvolvedor focado em transformar processos, ideias e problemas reais em produtos digitais funcionais.

Por:

Transformo processos, ideias e problemas reais em produtos digitais funcionais.

Manter:

Gabriel Brasil*
Analista de Sistemas e Desenvolvedor
Ver projetos
Baixar currículo

3. SEÇÃO SOBRE

Não alterar o conteúdo atual da seção Sobre nesta rodada.

Manter exatamente a ideia atual:

Eu sou Gabriel Brasil, Analista de Sistemas e Desenvolvedor. Transformo processos, ideias e problemas reais em soluções digitais funcionais.

Minha atuação combina análise de sistemas, desenvolvimento web, automação de processos, integrações, testes, implantação e melhoria contínua. Gosto de compreender como uma operação funciona, identificar seus gargalos e construir soluções que tornem o trabalho mais organizado, eficiente e confiável.

Não tente inserir linguagem filosófica.

Não usar frases sobre observador, identidade, consciência ou “observar sistemas”.

Não tornar o texto excessivamente poético.

4. CORREÇÃO DA SEÇÃO DE CONTATO

Remover o texto atual:

Estou disponível para oportunidades em tecnologia, projetos digitais e conversas sobre sistemas, automações e desenvolvimento.

Substituir por:

Vamos conversar sobre oportunidades, produtos digitais e desafios que envolvam sistemas, automações e desenvolvimento.

Manter o título:

Vamos construir algo que funcione de verdade.

Manter os botões:

Entrar em contato
LinkedIn
GitHub
Baixar currículo

Manter:

g4brielbr4sil@gmail.com
Brasília, Distrito Federal, Brasil

5. PHOSPHOR ICONS

O projeto utiliza lucide-react atualmente.

Substitua lucide-react por:

@phosphor-icons/react

Remova lucide-react do package.json quando nenhuma importação restante depender dele.

Use Phosphor Icons com estilo consistente:

weight="light" para ícones editoriais
weight="regular" para controles e botões
weight="bold" somente quando a legibilidade exigir
Tamanho e espessura coerentes em todo o site

Mapeamento sugerido:

Activity para Pulse
GitBranch para GitBranch
Menu para List
X para X
ArrowRight para ArrowRight
ArrowUpRight para ArrowUpRight
Mail para EnvelopeSimple
MapPin para MapPin
ClipboardList para ClipboardText
Code2 para Code
Rocket para RocketLaunch
Workflow para FlowArrow
GraduationCap para GraduationCap
Sparkles para Sparkle
Plus para Plus

Revise todos os imports destes arquivos:

src/components/Hero.tsx
src/components/Navbar.tsx
src/components/Projects.tsx
src/components/Skills.tsx
src/components/Education.tsx
src/components/Contact.tsx
src/components/ui/Button.tsx

Não misture Lucide e Phosphor.

Não transformar o site em uma vitrine de ícones.

Os ícones devem apoiar a leitura, não competir com a tipografia.

6. SHADCN/UI

Introduza shadcn/ui seletivamente.

Não aplique a aparência padrão do shadcn.

Todos os componentes devem seguir a identidade atual preta, creme, editorial e cinematográfica.

Não substituir componentes personalizados que já funcionam sem motivo.

Usar shadcn/ui somente nos pontos em que melhorar comportamento, acessibilidade e manutenção.

Aplicações aprovadas:

Navbar mobile:

Usar Sheet para abrir e fechar o menu móvel
Controle correto de foco
Fechamento por Escape
Bloqueio de rolagem
Retorno de foco ao botão original
Manter a cápsula visual atual

Ecossistema dos projetos:

Usar Collapsible para o botão:

Ecossistema do projeto · N

Ao abrir, revelar as tecnologias complementares com altura, opacidade e deslocamento suaves.

O botão deve informar corretamente aria-expanded e aria-controls.

Status e explicações:

Usar Tooltip para informações curtas como:

Ambiente privado
Acesso por perfil
Aplicado especificamente no PNQC
Produto em desenvolvimento

Não esconder informações essenciais somente dentro de tooltips.

Elementos opcionais:

Separator em divisões editoriais
Badge customizado para status
Button como base interna, preservando completamente o estilo visual atual

Criar apenas os componentes necessários em:

src/components/ui/

Adicionar apenas as dependências Radix necessárias para os componentes usados.

Adicionar uma função cn reutilizável caso necessária.

Não instalar toda a biblioteca shadcn sem uso.

7. ANIMAÇÕES

O projeto já utiliza motion/react.

Continuar usando motion/react.

Não instalar framer-motion separadamente.

Preservar:

WordsPullUp
FadeUp
ScrollRevealText
useReducedMotion
A curva de animação atual

Adicionar refinamentos discretos:

Hero:

Animar as linhas de arquitetura do componente SystemLines com pathLength de 0 para 1.

A animação deve acontecer uma vez, com duração lenta e atraso discreto.

Os pontos das conexões podem aparecer com fade e escala leve.

Não criar linhas em movimento contínuo.

Cards flutuantes do Hero:

Adicionar deslocamento vertical muito sutil baseado no scroll.

O movimento máximo deve ser pequeno.

Não usar parallax agressivo.

Desabilitar o efeito com prefers-reduced-motion.

Status “Aberto a novos desafios”:

Adicionar um ponto pequeno com pulso suave.

Não usar neon.

Não usar brilho verde intenso.

Não sugerir status online em tempo real.

Projetos:

Na entrada da viewport, manter escala de aproximadamente 0.97 para 1 e opacidade de 0 para 1.

No hover do desktop:

Elevação máxima de poucos pixels
Borda um pouco mais visível
Imagem ou preview com escala máxima próxima de 1.02
Seta com deslocamento curto

Não aplicar hover dependente de mouse em dispositivos touch.

Collapsible das tecnologias:

Animar altura, opacidade e y.

Manter o conteúdo no DOM de forma acessível.

Ícones:

Pequena rotação ou deslocamento somente em botões e links apropriados.

Não animar todos os ícones ao mesmo tempo.

Regras gerais:

Movimentos controlados
Sem animações infinitas decorativas, exceto o pulso mínimo do status
Sem cursor personalizado
Sem scroll hijacking
Sem transições demoradas que atrasem a navegação
Respeitar prefers-reduced-motion em tudo

8. SEO TÉCNICO

O index.html atual possui título vazio e atributo de idioma provisório.

Corrigir isso.

Definir:

<html lang="pt-BR">

Título:

Gabriel Brasil | Analista de Sistemas e Desenvolvedor

Meta description:

Portfólio de Gabriel Brasil, Analista de Sistemas e Desenvolvedor em Brasília. Projetos Full Stack, APIs, automações, integrações, implantação e produtos digitais.

Adicionar:

meta charset
meta viewport
meta author com Gabriel Brasil
meta robots com index, follow
meta theme-color com #000000
color-scheme dark
referrer policy apropriada

Open Graph:

og:type website
og:locale pt_BR
og:title Gabriel Brasil | Analista de Sistemas e Desenvolvedor
og:description igual à descrição principal
og:site_name Gabriel Brasil

Twitter:

twitter:card summary_large_image
twitter:title
twitter:description

Não inventar domínio.

Não adicionar canonical com URL falsa.

Não adicionar og:url com URL falsa.

Criar uma configuração central para receber a URL definitiva quando o domínio .me for conectado.

Só adicionar og:image se existir uma imagem real dentro de public.

Não referenciar arquivos inexistentes.

9. DADOS ESTRUTURADOS

Adicionar JSON-LD válido para Person.

Usar apenas dados reais:

name: Gabriel Brasil
jobTitle: Analista de Sistemas e Desenvolvedor
email: mailto:g4brielbr4sil@gmail.com
addressLocality: Brasília
addressRegion: DF
addressCountry: BR

sameAs:

https://www.linkedin.com/in/gabrielbrasildev
https://github.com/g4brielbr4sil

Adicionar conhecimentos profissionais coerentes com o conteúdo do site:

Análise de sistemas
Desenvolvimento Full Stack
React
TypeScript
Python
FastAPI
APIs REST
Automação de processos
Integrações
Docker
Cloudflare Pages

Não adicionar empresa atual, salário, telefone, certificado, avaliação, prêmio ou dado não fornecido.

10. FONTES E PERFORMANCE

Atualmente as fontes são importadas por @import dentro do CSS.

Mover o carregamento para index.html usando:

preconnect para fonts.googleapis.com
preconnect para fonts.gstatic.com com crossorigin

Carregar:

Almarai nos pesos 300, 400, 700 e 800
Instrument Serif somente em itálico

Usar display=swap.

Remover os @import correspondentes do src/index.css após confirmar que as fontes continuam funcionando.

Manter as famílias definidas no tema atual.

Outras melhorias:

Não fazer lazy load da imagem principal do Hero
Adicionar fetchpriority="high" quando o componente utilizado permitir
Aplicar lazy loading nas imagens abaixo da dobra
Definir width e height ou aspect-ratio para evitar layout shift
Não aumentar desnecessariamente o bundle
Não adicionar bibliotecas pesadas para efeitos pequenos

11. SEMÂNTICA E ACESSIBILIDADE

Garantir apenas um h1, usado por Gabriel Brasil.

Usar h2 para títulos principais de seção.

Usar h3 para títulos internos e projetos.

Manter:

Header
Nav
Main
Section
Footer

Adicionar ou revisar:

aria-label nos botões somente com ícone
aria-expanded e aria-controls em elementos expansíveis
aria-current quando uma seção estiver ativa, caso esse comportamento exista
alt descritivo em imagens reais
alt vazio em imagens puramente decorativas
foco visível
contraste adequado
áreas de clique confortáveis
navegação completa por teclado

O asterisco de Gabriel Brasil* é decorativo.

Ocultá-lo de leitores de tela usando aria-hidden.

Não deixar o leitor anunciar “asterisco” como parte do nome.

12. CONTEÚDO E VERACIDADE

Não alterar nesta rodada:

As descrições atuais dos projetos
As stacks corrigidas
Os grupos de tecnologia
Os pilares
A seção Como eu atuo na prática
A formação
O GitHub Student Developer Pack
Os links reais
Os status privado, por perfil e em desenvolvimento

Não inventar:

Métricas
Clientes
Empresas
Certificações
Resultados
Domínio
URLs
Funcionalidades
Experiências
Anos de atuação
Níveis de domínio técnico

13. VALIDAÇÃO FINAL

Depois das alterações, executar:

npm install ou comando equivalente necessário
npx tsc --noEmit
npm run build

Também verificar:

Nenhuma importação de lucide-react restante
Nenhum texto “Disponível para oportunidades em tecnologia” restante
Nenhum domínio inventado
Nenhum arquivo de imagem inexistente referenciado
Menu mobile acessível
Collapsibles funcionando
Tooltips acessíveis
prefers-reduced-motion respeitado
Layout responsivo preservado
Sem erros no console
Sem overlay antigo do HMR

Ao finalizar, responder com:

Arquivos alterados
Dependências adicionadas
Dependências removidas
Textos modificados
Componentes shadcn utilizados
Ícones Phosphor utilizados
Animações adicionadas
Melhorias de SEO aplicadas
Resultado do typecheck
Resultado do build