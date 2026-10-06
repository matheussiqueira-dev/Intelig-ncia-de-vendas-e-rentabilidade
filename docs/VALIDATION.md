# Evidências e limites

Implementação e correções: Matheus Siqueira. Suíte: `tests/dashboard.cjs`.

## Verificação local executada

Node 24 e Chrome via Playwright 1.63.0: passaram filtros, busca, CSV com BOM e CRLF, exportação filtrada, recuperação do estado vazio, foco por teclado, alvos de toque de 44 px e ausência de erros JavaScript.

Períodos 7/30/90 em 320, 390, 768, 1024, 1440 e 1920 px: sem overflow da página ou valores. Regressões: sete pontos sem zeros artificiais; busca oculta não restringe CSV em Canais; atalho preserva aba e foco; gráfico recupera largura após navegação. Build executado, gerando `dist/index.html`.

Capturas desktop/mobile foram inspecionadas. Isso não equivale a auditoria WCAG completa, teste de backend ou homologação financeira. `TEST_URL` permite repetir a suíte em um endereço acessível.

## Validação de publicação

Conferir commit em main e workflow no GitHub. Na Vercel, conferir READY, SHA de origem e alias; comparar HTML servido com o versionado. IDs finais de commit, workflow e deployment serão registrados no card BI-01 após confirmação.

## Publicação confirmada da aplicação

Commit de código: `977170158ff2298f0ff56c0930da4dbad0596282`.
CI aprovado: https://github.com/matheussiqueira-dev/Intelig-ncia-de-vendas-e-rentabilidade/actions/runs/37402476433.
Deployment de código: `dpl_5W2qsaJznG9pJE8xoCEwywB4TANb`, READY, origem Git e SHA correspondente. Domínio canônico retornou HTTP 200 com HTML idêntico ao versionado.

A primeira execução CI identificou overflow da fonte no Linux em 390px/90 dias. A correção preserva o valor inteiro e a suíte espera a fonte carregar; segunda execução passou. Não foi desativado o teste para obter aprovação.

Índice da revisão e cards: [TRELLO.md](TRELLO.md). Commits posteriores somente de documentação não alteram a aplicação desse commit; a conferência final deve usar o SHA mais recente servido pela Vercel.

## Pendências

Sem fonte real, autenticação, banco, importação ou regras homologadas. Revisão visual completa do Word depende de renderizador disponível. Nenhum banco do A3 foi migrado nesta entrega.
