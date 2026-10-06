# Direção Arc para inteligência de vendas

Interface demonstrativa em português para leitura de receita, lucro bruto, margem e unidades vendidas. Dataset fictício determinístico, independente do A3 e sem backend.

Fundo #E4E4E4, painel #FEFEFD, ações e foco #6FADE2, texto #2D2C2B, texto secundário #595956, série de receita #513EA3. Ação primária usa texto #172C3C para manter contraste. Os tokens de texto claro extraídos da referência Arc foram substituídos em superfícies claras para cumprir o requisito de contraste da própria skill.

Inter como fonte primária, fallback Arial. Heading desktop 53px/700, introdução 22px/500. Tipografia numérica tabular. Grade de espaçamento de 4px, viewport base 1920px, estrutura com minmax(0,1fr), bordas sutis e raios da escala Arc. Layout móvel reorganiza tabela em registros e navegação em linha. Nenhuma animação.

Filtros globais atualizam indicadores, gráfico, participação por canal e tabela. Busca afeta a lista de produtos e exportação. Exportação CSV aplica os filtros e identifica dados demonstrativos. Navegação alterna visão geral, produtos e canais. Lucro bruto exclui despesas operacionais, impostos e frete; receita do exemplo é quantidade vezes preço e custo é quantidade vezes custo unitário.

Sem autenticação, persistência ou integração de dados reais. Fonte externa Google Fonts fornece Inter quando disponível. Não representa resultado financeiro real.

Refinamento: a série de lucro bruto usa #37556A e linha tracejada para aumentar contraste e oferecer distinção além da cor. O azul #6FADE2 permanece nas ações, no foco e na participação da loja física. Receita em roxo, loja física em azul e marketplace em cinza têm correspondência consistente. Em 320 px, o símbolo monetário ocupa linha própria e o valor permanece inteiro. Alvos principais de toque medem no mínimo 44 px. O foco recebe uma borda interna escura além do outline azul.
