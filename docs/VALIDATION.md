# Evidências e limites

Implementação e correções: Matheus Siqueira. Suíte: `tests/dashboard.cjs`.

## Verificação local executada

Node 24 e Chrome via Playwright 1.63.0: passaram filtros, busca, CSV com BOM e CRLF, exportação filtrada, recuperação do estado vazio, foco por teclado, alvos de toque de 44 px e ausência de erros JavaScript.

Períodos 7/30/90 em 320, 390, 768, 1024, 1440 e 1920 px: sem overflow da página ou valores. Regressões: sete pontos sem zeros artificiais; busca oculta não restringe CSV em Canais; atalho preserva aba e foco; gráfico recupera largura após navegação. Build executado, gerando `dist/index.html`.

Capturas desktop/mobile foram inspecionadas. Isso não equivale a auditoria WCAG completa, teste de backend ou homologação financeira. `TEST_URL` permite repetir a suíte em um endereço acessível.

## Validação de publicação

Conferir commit em main e workflow no GitHub. Na Vercel, conferir READY, SHA de origem e alias; comparar HTML servido com o versionado. IDs finais de commit, workflow e deployment serão registrados no card BI-01 após confirmação.

## Pendências

Sem fonte real, autenticação, banco, importação ou regras homologadas. Revisão visual completa do Word depende de renderizador disponível. Nenhum banco do A3 foi migrado nesta entrega.
