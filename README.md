# Inteligência de vendas e rentabilidade

Dashboard demonstrativo desenvolvido por **Matheus Siqueira**, com direção visual Arc. Interface em português para receita, lucro bruto, margem, unidades, produtos e canais. Dados fictícios identificados na tela e no CSV.

Produção: https://business-intelligence-eight.vercel.app

## Executar e construir

Abra `index.html` no navegador. O site usa HTML, CSS, JavaScript nativo e SVG, sem framework ou dependências de produção. Inter vem do Google Fonts, com fallback Arial. Com Node 20 ou superior, `npm run build` copia apenas a interface para `dist/`.

## Testar

```powershell
npm ci
npx playwright install chromium
npm test
```

O workflow `.github/workflows/ui-checks.yml` executa esses passos no GitHub Actions. Para usar Chrome já instalado no Windows, defina `$env:CHROME_CHANNEL = 'chrome'`. Para verificar uma URL acessível, defina `TEST_URL`; para gerar capturas, defina `SCREENSHOT_DIR`. Dependências de teste são fixadas no lockfile.

## Comportamento

- Filtros de 7/30/90 dias e canal atualizam os indicadores, gráfico e tabela.
- Sete dias usam sete pontos, sem intervalos vazios artificiais. Rótulos indicam o último dia de cada intervalo.
- Busca filtra tabela e CSV nas visões Geral e Produtos. Em Canais, o CSV inclui todos os produtos do canal/período; a busca oculta não é aplicada.
- Limpar busca devolve o foco ao campo. Ir para o conteúdo não muda a aba.
- CSV contém BOM UTF-8, valores em reais, período, canal e marcador DEMONSTRACAO.
- Receita = unidades × preço. Lucro bruto = receita − custo dos produtos. Margem bruta = lucro bruto ÷ receita. Despesas operacionais, impostos e frete não estão incluídos.

## Publicação

O projeto Vercel `business-intelligence` está associado a este repositório. `vercel.json` define build Node sem instalação de dependências e publicação de `dist`. Conferir READY, commit de origem e HTTP do domínio antes de declarar uma versão publicada. Uma execução de teste não comprova dados reais.

## Documentação e limites

- [Direção visual](DESIGN.md)
- [Arquitetura implementada](docs/ARCHITECTURE.md)
- [Evidências e limites](docs/VALIDATION.md)
- [Próximos passos](docs/BACKLOG.md)
- [Proposta System Design em Word](docs/System-Design.docx)

O Word é a proposta inicial preservada do template; revisão visual completa permanece pendente. Não há autenticação, banco, API de negócio, importação ou dados reais. O dashboard é independente do frontend Loja Gestão do A3. A integração exige fonte, regras financeiras aprovadas e perfis definidos.
