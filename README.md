# MIMO. — Pet Care & Shop

Projeto **conceitual** e **não comercial** em React + Vite + CSS separado. Demonstra uma experiência editorial para serviços pet, agendamento e loja fictícia, com foco em navegação mobile e acessibilidade.

## Começar

Requisitos: Node 22+ e npm. Na primeira vez, instale dependências com `npm install` se necessário.

```bash
npm run images:sync
npm run dev
```

`images:sync` **baixa seis fotografias gratuitas do Unsplash para `public/images/pets/`**, solicitando arquivos WebP menores. Ele pula arquivos válidos que já existem. O download precisa de internet uma vez, mas depois as fotos são locais e podem ser versionadas no Git. As origens específicas estão documentadas em [`scripts/photo-sources.json`](scripts/photo-sources.json). Licença: https://unsplash.com/license (uso comercial permitido na licença geral; mantenha atenção a marcas e pessoas identificáveis). Não há fotos de clientes do negócio fictício.

Para verificar:

```bash
npm run test
npm run lint
npm run build
```

`npm run clean:legacy` exclui apenas arquivos antigos **com o mesmo SHA-256 dos arquivos obsoletos identificados no ZIP original**, preservando qualquer modificação posterior.

## O que foi implementado

- 8 cuidados e filtragem por espécie; descrição do serviço e fluxo para a agenda.
- 8 datas de exemplo com horários **fictícios**, validação antes de mostrar o resumo e nomes tratados sem espaços extras.
- 12 itens de pet shop para cinco grupos de animais; busca, filtros e carrinho com limite de 20 unidades por item.
- Sacola com subtotal e revisão do pedido **sem checkout nem pagamentos reais**.
- Modal de sacola com portal fora da raiz, teclado (Tab, Shift+Tab e Escape), foco restaurado e fundo desativado enquanto aberto.
- Galeria filtrável, FAQ e navegação responsiva.

As funções de agenda e carrinho estão em `src/utils/` e têm testes independentes em `tests/` (Node test runner, sem bibliotecas extras).

## Publicação com Cloudflare Workers

O projeto tem `wrangler.jsonc` para deploy de recursos estáticos do Vite. O nome `mimo-pet-demo` é uma sugestão; altere caso já esteja ocupado. Configure o endereço **verdadeiro** depois de criar o Worker:

```bash
SITE_URL="https://SEU-ENDERECO-REAL.workers.dev" npm run build
npx wrangler deploy
```

O `SITE_URL` é usado no **build** para criar a URL canônica, Open Graph absoluto, `sitemap.xml` e `robots.txt`. Sem ele, `npm run build` funciona localmente, mas **não gera canonical ou sitemap**: é intencional para não divulgar domínio fictício.

`public/_headers` configura cabeçalhos de segurança de assets estáticos. Se adicionar serviços de terceiros, ajuste conscientemente a Content Security Policy. O site de demonstração pode ser incorporado no portfólio; por isso não foi configurado `frame-ancestors 'self'`.

## Limites da demonstração

- Horários, preços, produtos e pedidos são fictícios, não existe banco de dados, estoque, pagamento ou reserva.
- Nenhum dado do formulário é enviado a servidores ou persistido por este site.
- Uma operação real exigiria backend, disponibilidade transacional, pagamentos seguros, regras de privacidade e documentação legal própria.
- A imagem de compartilhamento em `public/social-preview.png` é original, gerada a partir da identidade do MIMO.; não precisa de imagens de terceiros.
