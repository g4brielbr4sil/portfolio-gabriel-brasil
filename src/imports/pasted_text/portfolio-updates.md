Faça uma nova rodada de ajustes no portfólio atual de Gabriel Brasil.

IMPORTANTE

Não redesenhe o site inteiro.
Não altere a identidade visual principal.
Não mexa no conteúdo técnico já validado dos projetos, stack, atuação, formação e contato, exceto onde eu pedir.
Preserve:
- paleta preta e creme
- tipografia Almarai + Instrument Serif
- atmosfera editorial/cinematográfica
- Phosphor Icons
- motion/react
- estrutura geral das seções

O foco desta rodada é:

1. Melhorar o header mobile
2. Transformar a faixa de tecnologias em um letreiro animado
3. Corrigir a navegação mobile e os anchors das seções
4. Adicionar e corrigir o relógio de Brasília (BSB)
5. Corrigir o status “Aberto a novos desafios”
6. Garantir que endpoints/links/ações funcionem bem no mobile
7. Ajustar responsividade e comportamento do menu

========================================
1. HEADER MOBILE
========================================

No mobile header:

- Clicar em “GB” deve levar de volta para o início da página
- “GB” deve funcionar como link para #inicio
- Remover o botão “Pesquisar” / “Navegar” do mobile header
- Deixar apenas:
  1. GB
  2. relógio BSB
  3. botão de menu com 3 pontinhos

Substituir o ícone de menu atual por “DotsThreeOutlineVertical” ou equivalente do Phosphor, mantendo coerência visual com o restante do projeto.

Composição do mobile header:
- lado esquerdo: GB
- centro ou centro-direita: relógio BSB
- lado direito: botão de menu (3 pontinhos)

O header mobile deve:
- respeitar safe area
- continuar compacto
- manter borda discreta
- manter fundo preto
- não esmagar o conteúdo
- continuar legível em 320px

========================================
2. RELÓGIO BSB
========================================

Adicionar / corrigir um relógio de Brasília no header mobile e também numa posição adequada no desktop/tablet.

Objetivo:
- demonstrar sofisticação técnica
- sugerir integração com API / dados dinâmicos
- reforçar o aspecto de produto tecnológico

Exibição:
- formato: HH:mm
- label: “BSB”
- exemplo visual: “14:32 BSB”

Regras:
- visual discreto, elegante e editorial
- não parecer widget chamativo
- pode usar um pequeno ícone de relógio
- não ocupar muito espaço no mobile
- não quebrar para duas linhas

Comportamento:
- atualizar em tempo real no cliente
- usar timezone de Brasília / America/Sao_Paulo
- estruturar de forma que depois possa ser facilmente conectado a uma API real, mas sem inventar endpoint externo agora
- se já existir implementação do relógio, revisar e estabilizar

Acessibilidade:
- usar elemento semântico <time> quando fizer sentido
- aria-label apropriado

========================================
3. LETREIRO / TELÃO DE TECNOLOGIAS
========================================

A área destacada de “Stack principal” no mobile está estática e pesada visualmente.

Transformar essa faixa de tecnologias em um letreiro horizontal animado, como um telão contínuo / ticker / marquee editorial.

Objetivo:
- dar vida ao bloco
- economizar espaço no mobile
- deixar a seção mais tecnológica e dinâmica

Aplicar isso ao bloco “Stack principal”.

Tecnologias:
React
TypeScript
Python
FastAPI
SQLAlchemy
SQLite
PostgreSQL
Docker

Como deve funcionar:
- uma faixa horizontal contínua
- os itens passam lateralmente em loop
- movimento suave, constante e elegante
- sem parecer banner publicitário
- sem velocidade alta
- sem efeito neon
- sem piscadas

Visual:
- cada tecnologia pode aparecer como chip/label discreta
- alternar espaçamento consistente
- fundo continua escuro
- borda continua sutil
- o título “Stack principal” permanece acima
- o letreiro deve parecer parte do layout, não um hack improvisado

Implementação:
- fazer loop contínuo sem trancos
- duplicar os itens para permitir continuidade visual
- pausar no hover apenas em desktop, se isso não complicar demais
- em touch/mobile não depende de hover

Acessibilidade:
- respeitar prefers-reduced-motion
- com reduced motion, transformar o letreiro em uma grade estática ou em uma lista sem animação
- não esconder conteúdo essencial

========================================
4. STATUS “ABERTO A NOVOS DESAFIOS”
========================================

Corrigir o status “Aberto a novos desafios”.

Atualmente o pontinho não está animando corretamente.

Ajustes:
- manter a frase “Aberto a novos desafios”
- corrigir o ponto de status para realmente pulsar
- a animação deve ser:
  - muito suave
  - pequena
  - elegante
  - sem neon
  - sem parecer indicador de notificação agressivo

Usar motion/react.
Respeitar prefers-reduced-motion.
Com reduced motion, o ponto fica estático.

========================================
5. NAVEGAÇÃO / MENU MOBILE
========================================

Corrigir completamente a navegação mobile.

Problema atual:
- o menu e os links precisam apontar corretamente para suas seções
- “Projetos” deve ir para Projetos
- “Tecnologias” deve ir para Tecnologias
- etc.

Garantir que todos os itens naveguem corretamente para os IDs certos:

#inicio
#sobre
#projetos
#atuacao
#tecnologias
#formacao
#contato

Se algum ID estiver inconsistente, corrigir.

Regras:
- clicar no item do menu deve fechar o Sheet/menu
- deve fazer scroll suave
- deve atualizar hash
- deve respeitar scroll-margin-top para o título da seção não ficar escondido atrás do header fixo
- o item ativo deve continuar identificado pelo scroll spy

Menu mobile:
- abrir pelo botão de 3 pontinhos
- manter foco correto
- fechar por Escape
- fechar ao clicar fora
- fechar ao escolher um item
- retornar foco ao botão original
- bloquear rolagem do body enquanto aberto

No conteúdo do menu mobile:
- organizar melhor a hierarquia
- separe navegação principal de ações secundárias

Navegação principal:
Início
Sobre
Projetos
Atuação
Tecnologias
Formação
Contato

Ações secundárias:
LinkedIn
GitHub
Currículo

Rodapé do menu:
Brasília, Distrito Federal
Aberto a novos desafios

========================================
6. ENDPOINTS / LINKS / AÇÕES NO MOBILE
========================================

Revisar todos os endpoints, links e ações para garantir bom funcionamento também no mobile.

Isso inclui:
- botão de contato
- LinkedIn
- GitHub
- currículo
- acessos dos projetos
- estudos de caso
- fallback do currículo
- formulário de contato
- botões externos
- status de ambiente privado
- status de acesso por perfil
- status de produto em desenvolvimento

Garantir no mobile:
- áreas de toque confortáveis
- botões sem overlap
- textos sem corte
- links abrindo corretamente
- nenhum destino quebrado
- nenhum botão encostando na dock ou no menu
- nenhum dialog cobrindo conteúdo crítico sem possibilidade clara de fechar

Se houver Dialogs dos estudos de caso:
- revisar layout no mobile
- garantir altura segura
- garantir scroll interno
- garantir botão de fechar claro
- garantir que os links públicos reais apareçam corretamente

========================================
7. AJUSTES DE RESPONSIVIDADE
========================================

Revisar especificamente o mobile layout na área do header e da seção de tecnologias.

Problema observado:
- o bloco da stack está apertado
- o header parece pouco funcional
- o menu ainda precisa mais coerência

Melhorar:
- espaçamento vertical
- paddings
- equilíbrio entre header e conteúdo
- legibilidade da seção “Tecnologia aplicada, do produto à operação”
- respiro entre o título da seção e o letreiro de stack
- largura e altura do card da stack
- relação com a dock inferior

Verificar:
320x568
360x800
390x844
430x932

Sem overflow horizontal.
Sem elementos encostando nas bordas.
Sem corte de texto.
Sem elementos competindo com o dock inferior.

========================================
8. ANIMAÇÕES
========================================

Adicionar / corrigir apenas estas animações:

1. Letreiro contínuo das tecnologias
2. Pulso do ponto em “Aberto a novos desafios”
3. Transição suave do menu mobile
4. Feedback visual do item ativo da navegação
5. Entrada sutil do relógio BSB, se fizer sentido
6. Microinteração no botão GB ao tocar/clicar
7. Microinteração leve no botão de 3 pontinhos

Não exagerar.
Nada muito chamativo.
Manter tudo editorial e controlado.

========================================
9. ESTRUTURA / ORGANIZAÇÃO
========================================

Se necessário, refatorar em componentes menores, por exemplo:

src/components/navigation/MobileHeader.tsx
src/components/navigation/MobileMenu.tsx
src/components/navigation/BsbClock.tsx
src/components/stack/StackTicker.tsx

ou equivalente.

Criar soluções reutilizáveis e limpas.

Se houver configuração central de navegação, manter uma única fonte de verdade para os itens do menu.

========================================
10. VALIDAÇÃO FINAL
========================================

Executar:
pnpm exec tsc --noEmit
pnpm build

Verificar:
- clicar em GB volta para o início
- botão de pesquisar/navegar removido do mobile header
- botão de 3 pontinhos funciona
- menu mobile abre e fecha corretamente
- todos os links do menu vão para a seção correta
- “Projetos” vai para projetos
- “Tecnologias” vai para tecnologias
- etc.
- relógio BSB aparece corretamente
- relógio BSB está estável
- ponto de “Aberto a novos desafios” pulsa corretamente
- letreiro da Stack principal funciona
- letreiro respeita reduced motion
- endpoints/links funcionam no mobile
- nenhum overflow horizontal
- nenhuma regressão visual importante
- nenhuma importação quebrada

ENTREGA FINAL

Ao finalizar, responder com:

1. Arquivos alterados
2. Componentes criados/refatorados
3. Ajustes no header mobile
4. Ajustes no menu mobile
5. Ajustes no relógio BSB
6. Ajustes no letreiro de tecnologias
7. Correções de navegação
8. Correções de links/endpoints no mobile
9. Ajustes de responsividade
10. Animações adicionadas/corrigidas
11. Resultado do TypeScript
12. Resultado do build
13. Pendências restantes, se houver