# Arquitetura implementada

O navegador recebe `index.html` estático da Vercel, contendo estilos, JavaScript e SVG. A base fictícia determinística tem 180 dias, cinco produtos e três canais. Valores monetários são mantidos em centavos inteiros. Nenhum serviço de negócio é chamado.

Filtros selecionam registros do período/canal; agregação calcula receita, custo e unidades. Lucro e margem derivam desses totais. O gráfico usa até dez intervalos, limitados aos dias disponíveis. Exportação aplica a busca somente onde ela está visível, registrando período, canal e origem no CSV.

Três visões usam fragmentos da URL. O atalho de conteúdo move o foco diretamente sem alterar o fragmento. Exportação anuncia o resultado junto à ação; busca tem rótulo e recuperação de foco.

`scripts/build.cjs` prepara somente `dist/index.html`, sem dependências externas. Vercel serve esse diretório. O workflow instala Playwright fixado e verifica comportamento em Chromium.

## Evolução proposta

Antes de conectar registros reais, definir fonte, contrato, moeda, fuso, estorno e autorização. O Word propõe responsabilidades de interface, consulta, adaptador, origem e observabilidade; essas camadas ainda não estão implementadas. A API do A3 pode ser avaliada como fonte futura, mas não está integrada.
