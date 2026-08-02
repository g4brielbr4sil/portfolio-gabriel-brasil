Faça uma rodada cirúrgica de redesign e evolução funcional do menu de navegação do portfólio atual de Gabriel Brasil.

IMPORTANTE

Não altere as demais seções do site.

Não reescreva conteúdos.

Não modifique projetos, stack, Hero, Sobre, experiência, formação ou contato.

Preserve integralmente:

Paleta preta e creme
Tipografia Almarai e Instrument Serif
Direção cinematográfica
Estética editorial
Bordas arredondadas
Texturas discretas
Phosphor Icons
motion/react
Componentes Radix e padrão shadcn já implementados

O foco desta rodada é somente:

1. Refinar visualmente o menu desktop
2. Criar navegação inteligente por seção
3. Adicionar progresso de leitura
4. Criar uma navegação própria e funcional para celular
5. Melhorar acessibilidade e comportamento responsivo

OBJETIVO VISUAL

O menu não deve parecer uma navbar genérica de template.

Ele deve parecer parte da identidade editorial do portfólio.

O resultado precisa transmitir:

Tecnologia
Organização
Precisão
Sofisticação
Clareza
Movimento controlado

Evite:

Glassmorphism exagerado
Neon
Sombras fortes
Fundos excessivamente transparentes
Ícones desnecessários
Menu ocupando muito espaço
Animações constantes
Navegação genérica de landing page

NAVEGAÇÃO PRINCIPAL

Usar estas seções:

Início
Sobre
Projetos
Atuação
Tecnologias
Formação
Contato

Usar os IDs reais existentes nas seções.

Caso algum ID não exista, adicionar IDs sem alterar a composição visual da seção.

Exemplo:

#inicio
#sobre
#projetos
#atuacao
#tecnologias
#formacao
#contato

Adicionar scroll-margin-top nas seções para impedir que o menu fixo cubra os títulos.

MENU DESKTOP

No topo do Hero, manter uma navbar em formato de cápsula, mas melhorar sua composição.

ESTADO INICIAL

Enquanto o usuário está no início da página:

A navbar deve ficar integrada ao painel do Hero
Fundo preto sólido ou quase sólido
Borda creme muito discreta
Raio grande
Altura compacta
Conteúdo centralizado
Espaçamento confortável
Sem sombra pesada

Composição:

Lado esquerdo:

Monograma GB ou texto Gabriel Brasil

Centro:

Sobre
Projetos
Atuação
Tecnologias
Formação

Lado direito:

Contato

O botão Contato deve possuir maior destaque, mas sem parecer um botão comercial genérico.

Usar fundo creme, texto preto e ícone ArrowUpRight ou EnvelopeSimple.

Não exibir “Início” no centro da navbar desktop.

O monograma ou nome no lado esquerdo deve funcionar como link para o início.

ESTADO APÓS O SCROLL

Depois que o usuário sair da área principal do Hero:

Transformar a navbar em uma barra fixa compacta.

Comportamento:

position fixed
top com distância segura
centralizada horizontalmente
largura baseada no conteúdo
max-width adequado
fundo preto com leve transparência
backdrop-blur discreto
borda creme sutil
sombra curta e escura
entrada suave com opacity e y

A navbar não deve ocupar toda a largura da tela.

Não criar header alto.

Não provocar salto de layout durante a transição.

A transformação entre os estados deve durar aproximadamente 300 a 450 ms.

NAVEGAÇÃO INTELIGENTE

Criar um sistema de scroll spy usando IntersectionObserver.

O menu deve identificar automaticamente qual seção está mais visível.

A seção ativa deve possuir:

Texto creme mais claro
Fundo discreto
Indicador visual animado
aria-current="location"

O indicador pode ser uma pequena cápsula ou superfície deslizante atrás do item ativo.

Usar motion/react com layoutId para animar o indicador entre os itens.

O indicador deve deslizar suavemente, sem desaparecer e reaparecer.

Não usar underline comum.

Não usar cores diferentes para cada seção.

Ao clicar em um item:

Usar scroll suave
Atualizar o hash da URL
Respeitar movimento reduzido
Mover corretamente o foco quando necessário
Não recarregar a página

PROGRESSO DE LEITURA

Adicionar uma linha muito fina na base da navbar desktop.

A linha representa o progresso vertical da página.

Estilo:

Altura de 1 ou 2 pixels
Cor creme
Baixa intensidade
Sem brilho
Sem números ou porcentagens

Usar useScroll e useSpring do motion/react.

O progresso deve começar em zero e chegar a 100% próximo ao final da página.

Com prefers-reduced-motion, atualizar sem interpolação animada.

MENU “MAIS”

Para evitar excesso de itens em notebooks menores, criar um item “Mais” quando não houver espaço suficiente.

O menu “Mais” deve usar DropdownMenu ou Popover acessível.

Dentro dele:

Formação
LinkedIn
GitHub
Baixar currículo

Não esconder itens importantes em desktop amplo.

O menu “Mais” deve aparecer somente quando a largura disponível exigir.

Não permitir quebra dos itens da navbar em duas linhas.

FUNCIONALIDADE NOVA: NAVEGAÇÃO RÁPIDA

Adicionar uma funcionalidade de navegação rápida acessível pelo teclado.

Atalho:

Ctrl + K no Windows e Linux
Command + K no macOS

Adicionar um pequeno botão discreto na navbar desktop:

Navegar

ou apenas um ícone MagnifyingGlass com indicação “⌘ K” ou “Ctrl K”.

Ao ativar, abrir um Command Dialog inspirado em command palette.

Usar componentes shadcn/Radix adaptados à identidade visual.

O painel deve permitir:

Buscar uma seção
Ir diretamente para Projetos
Ir para Tecnologias
Ir para Formação
Abrir LinkedIn
Abrir GitHub
Abrir contato
Acionar currículo quando disponível

Itens da navegação rápida:

Início
Sobre
Projetos
Atuação
Tecnologias
Formação
Contato
LinkedIn
GitHub
Currículo

Cada item deve possuir:

Ícone Phosphor
Nome
Descrição curta
Ação correta
Foco por teclado

Exemplos:

Projetos
Conheça os produtos e sistemas desenvolvidos.

Tecnologias
Veja o ecossistema técnico aplicado aos projetos.

Contato
Abra os canais profissionais de contato.

A Command Palette deve funcionar também no celular por meio de um botão “Navegar”.

Não depender apenas do atalho de teclado.

Não instalar biblioteca pesada de command palette caso seja possível implementar usando Dialog, input e lista filtrável.

MENU MOBILE

Não reutilizar simplesmente a navbar desktop comprimida.

Criar uma experiência própria para celular.

Usar duas estruturas complementares:

1. Barra superior compacta
2. Dock de navegação inferior

BARRA SUPERIOR MOBILE

No topo da tela, mostrar:

GB ou Gabriel Brasil
Botão Navegar
Botão do menu

O botão Navegar abre a Command Palette.

O botão do menu abre o Sheet com a navegação completa.

A barra superior deve:

Ficar dentro das margens do site
Respeitar safe-area
Ter fundo preto
Borda creme discreta
Raio arredondado
Não cobrir o conteúdo
Não ocupar altura excessiva

MENU SHEET MOBILE

Usar o Sheet já existente.

Apresentar:

Gabriel Brasil
Analista de Sistemas e Desenvolvedor

Links:

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

Adicionar no rodapé do Sheet:

Brasília, Distrito Federal
Aberto a novos desafios

O Sheet deve:

Abrir pela lateral direita
Ocupar entre 85% e 92% da largura
Ter largura máxima
Usar fundo preto
Usar bordas e divisões discretas
Controlar foco
Fechar por Escape
Fechar ao selecionar uma seção
Retornar o foco ao botão original
Bloquear a rolagem da página
Respeitar movimento reduzido

Não usar menu ocupando 100% da tela sem necessidade.

DOCK INFERIOR MOBILE

Criar uma barra de navegação fixa na parte inferior em celulares.

Mostrar somente quatro destinos principais:

Início
Projetos
Tecnologias
Contato

Ícones Phosphor sugeridos:

House
SquaresFour ou FolderOpen
Code
EnvelopeSimple

Cada item deve possuir:

Ícone
Label curto
Área de toque de pelo menos 44 por 44 pixels
Estado ativo
aria-label
aria-current quando ativo

A seção ativa deve ser sincronizada com o mesmo scroll spy do desktop.

Estilo:

Fundo preto com transparência discreta
Backdrop blur leve
Borda creme sutil
Cápsula centralizada
Margem lateral
Raio grande
Sem ocupar toda a largura
Sem efeito neon
Sem sombra excessiva

Usar um indicador deslizante discreto no item ativo.

O dock deve respeitar:

env(safe-area-inset-bottom)

Adicionar espaço no final da página para que o dock não cubra o rodapé ou os botões de contato.

VISIBILIDADE DO DOCK

Mostrar apenas em telas menores que aproximadamente 768px.

Ocultar temporariamente o dock quando:

O menu Sheet estiver aberto
A Command Palette estiver aberta
Um Dialog de projeto estiver aberto
O formulário de contato estiver aberto
O teclado virtual estiver ocupando grande parte da tela, quando detectável

O dock não pode cobrir campos de formulário.

Pode desaparecer suavemente quando o usuário rolar rapidamente para baixo e reaparecer ao rolar para cima.

Esse comportamento deve ser sutil e previsível.

Não esconder o dock quando o usuário estiver navegando por teclado.

COMPORTAMENTO EM TABLET

Entre aproximadamente 768px e 1024px:

Não usar o dock inferior.

Usar uma navbar superior compacta.

Reduzir o número de itens diretos se necessário.

Mover Formação e links externos para “Mais”.

Manter o botão de navegação rápida.

RESPONSIVIDADE

Validar:

320 x 568
360 x 800
390 x 844
430 x 932
768 x 1024
1024 x 768
1280 x 800
1366 x 768
1440 x 900
1920 x 1080

Verificar especialmente:

Nenhum overflow horizontal
Itens sem quebra inadequada
Botões com área de toque confortável
Nome sem ser esmagado
Indicador ativo alinhado
Dock sem cobrir o conteúdo
Sheet dentro da largura disponível
Command Palette utilizável com teclado virtual
Navbar sem sobrepor títulos

ÍCONES

Continuar usando apenas:

@phosphor-icons/react

Novos ícones aprovados:

House
SquaresFour
FolderOpen
Code
EnvelopeSimple
MagnifyingGlass
Command
List
X
ArrowUpRight
LinkedinLogo
GithubLogo
DownloadSimple
GraduationCap
User
Briefcase

Não reinstalar lucide-react.

Usar:

weight="light" para navegação editorial
weight="regular" para controles
weight="fill" somente no ícone do item ativo do dock, caso fique visualmente equilibrado

ANIMAÇÕES

Usar motion/react.

Adicionar:

Indicador ativo com layoutId
Entrada da navbar fixa
Progresso horizontal
Entrada e saída do dock
Mudança de item ativo
Abertura do Command Dialog
Abertura do Sheet
Hover e focus dos itens desktop

Duração:

Microinterações entre 160 e 250 ms
Mudanças estruturais entre 300 e 450 ms

Respeitar prefers-reduced-motion.

Com movimento reduzido:

Remover deslocamentos
Remover spring
Manter apenas alterações instantâneas ou fades mínimos

ACESSIBILIDADE

Garantir:

Nav com aria-label="Navegação principal"
Dock com aria-label="Navegação móvel"
Botões com nomes acessíveis
aria-current="location"
Foco visível
Ordem de tabulação correta
Atalho Ctrl ou Command + K documentado
Escape fechando diálogos
Nenhuma função disponível somente por hover
Nenhum conteúdo essencial apenas dentro de Tooltip
Contraste adequado
Área de toque mínima
Scroll spy sem mover foco inesperadamente

ESTRUTURA SUGERIDA

Refatorar o menu em componentes menores:

src/components/navigation/
  DesktopNavigation.tsx
  MobileHeader.tsx
  MobileDock.tsx
  NavigationSheet.tsx
  CommandNavigation.tsx
  ScrollProgress.tsx
  ActiveNavigationIndicator.tsx

Criar um hook compartilhado:

src/hooks/useActiveSection.ts

Responsabilidades:

IntersectionObserver
Seção ativa
Hash atual
Ação de navegação
Respeito a movimento reduzido

Criar configuração central:

src/config/navigation.ts

Ela deve conter:

IDs
Labels
Ícones
Descrições
Visibilidade desktop
Visibilidade mobile
Atalhos e ações

Não repetir manualmente a lista de navegação em vários componentes.

QUALIDADE

Não criar listeners duplicados.

Limpar IntersectionObserver e event listeners ao desmontar.

Não atualizar estado em cada pixel de scroll quando useScroll puder cuidar do progresso.

Não adicionar dependências grandes sem necessidade.

Não prejudicar o carregamento inicial.

Não aumentar significativamente o bundle.

Não alterar os links reais já configurados.

VALIDAÇÃO FINAL

Executar:

pnpm exec tsc --noEmit
pnpm build

Verificar:

Desktop navbar inicial
Desktop navbar após scroll
Indicador de seção ativa
Progresso de leitura
Command Palette
Ctrl + K
Command + K
Menu Sheet mobile
Dock inferior
Links externos
Currículo indisponível
Contato
Reduced motion
Navegação por teclado
Escape
Controle de foco
Safe area do iPhone
Ausência de overflow horizontal

ENTREGA

Ao finalizar, responder com:

1. Diagnóstico do menu anterior
2. Arquivos criados
3. Arquivos alterados
4. Estrutura de navegação criada
5. Funcionalidade adicionada
6. Comportamento desktop
7. Comportamento tablet
8. Comportamento mobile
9. Melhorias de acessibilidade
10. Ícones adicionados
11. Animações adicionadas
12. Resultado do TypeScript
13. Resultado do build
14. Impacto no bundle