ADICIONAR VISUALIZAÇÃO DARK E LIGHT NAS IMAGENS DOS PROJETOS

Criar uma opção para alternar entre capturas em modo escuro e modo claro dentro dos cards e estudos de caso dos projetos.

IMPORTANTE

Não inverter cores por CSS.

Não aplicar filter: invert().

Não gerar automaticamente uma versão clara ou escura de uma captura.

Usar somente imagens reais capturadas em cada tema.

Quando o projeto não possuir capturas reais nos dois temas, não mostrar o controle de alternância.

1. CONTROLE DE TEMA DA PRÉVIA

Adicionar um controle segmentado discreto acima ou sobre a área de imagens:

Escuro
Claro

Também pode usar os ícones Phosphor:

Moon
Sun

O texto deve continuar visível para não depender apenas dos ícones.

Exemplo:

[ Lua  Escuro ] [ Sol  Claro ]

O controle muda apenas as imagens exibidas no projeto.

Ele não deve alterar o tema geral do portfólio.

2. BARTHY WEB STUDIO V2

A Barthy V2 possui capturas reais em modo escuro e claro.

Configurar as imagens correspondentes:

Modo escuro:

barthy-v2-hero-dark
barthy-v2-projetos-dark
barthy-v2-contato-dark, quando existir
barthy-v2-mobile-dark, quando existir

Modo claro:

barthy-v2-hero-light
barthy-v2-projetos-light
barthy-v2-contato-light, quando existir
barthy-v2-mobile-light, quando existir

No card principal da Barthy:

O modo escuro deve aparecer inicialmente, pois combina melhor com a identidade atual do portfólio.

O visitante poderá selecionar “Claro” para visualizar a implementação real do segundo tema.

Adicionar um pequeno texto editorial:

Visualize a interface nos dois temas implementados no projeto.

3. PNQC

O PNQC deve usar somente as capturas reais disponíveis.

Não criar versão escura ou clara artificialmente.

Caso existam capturas reais nos dois temas posteriormente, o mesmo controle poderá ser ativado pela configuração do projeto.

Enquanto existir somente uma variante, não mostrar o seletor.

4. ESTRUTURA DOS DADOS

Adicionar ao tipo dos projetos uma estrutura semelhante a:

previewThemes: {
  default: 'dark',
  dark?: {
    cover: string,
    desktop?: string[],
    mobile?: string[]
  },
  light?: {
    cover: string,
    desktop?: string[],
    mobile?: string[]
  }
}

Também pode ser utilizado:

supportsPreviewThemeToggle: boolean

O componente deve mostrar o controle somente quando dark e light possuírem imagens reais.

Não repetir essa lógica diretamente nos componentes.

Manter os caminhos das imagens centralizados no objeto do projeto.

5. COMPORTAMENTO

Ao mudar o tema da prévia:

Trocar a imagem principal
Trocar as imagens da galeria
Trocar a captura mobile correspondente, quando existir
Manter a posição atual da galeria
Não fechar o estudo de caso
Não mover a página inesperadamente

Usar transição curta de opacidade:

150 a 250 ms

Pode usar motion/react com AnimatePresence.

Não usar rotação 3D.

Não usar flash branco durante a troca.

Não alterar a altura do container entre as imagens.

6. MOBILE

No celular, usar um controle segmentado compacto.

Ele deve:

Caber em 320px
Ter área de toque mínima de 44px
Não cobrir a imagem
Não causar overflow horizontal
Continuar acessível dentro do Dialog ou Sheet do estudo de caso

Pode aparecer acima da imagem:

[ Escuro | Claro ]

Não colocar o controle dentro de um carrossel horizontal.

7. ACESSIBILIDADE

Usar semântica de grupo:

role="group"
aria-label="Tema da visualização do projeto"

Cada opção deve informar o estado ativo:

aria-pressed="true" ou aria-selected="true"

Os botões devem funcionar por teclado.

Os estados não podem depender apenas da cor.

Usar foco visível.

Os textos alternativos das imagens devem identificar o tema:

Interface da Barthy Web Studio V2 em modo escuro.

Interface da Barthy Web Studio V2 em modo claro.

8. CARREGAMENTO

Carregar inicialmente apenas as imagens do tema padrão.

As imagens do segundo tema podem ser carregadas após o primeiro paint ou quando o usuário interagir com o controle.

Usar:

AVIF como primeira opção
WebP como fallback
width e height definidos
decoding="async"
loading="lazy" nas imagens abaixo da dobra

Depois da primeira seleção, manter as duas variantes disponíveis em cache.

9. INTEGRAÇÃO VISUAL

O seletor deve seguir a estética do portfólio:

Fundo preto
Texto creme
Borda discreta
Cápsula compacta
Estado ativo em creme com texto preto
Sem neon
Sem sombra intensa
Sem aparência genérica de toggle de configurações

10. VALIDAÇÃO

Verificar:

A Barthy inicia no modo escuro
O botão Claro mostra as capturas claras reais
O botão Escuro retorna às capturas escuras
A galeria troca todas as imagens relacionadas
O tema geral do portfólio não é alterado
PNQC não exibe seletor sem possuir dois conjuntos reais
Nenhuma imagem é invertida artificialmente
O controle funciona no desktop e mobile
Nenhum layout shift significativo ocorre
Reduced motion é respeitado
TypeScript e build continuam limpos