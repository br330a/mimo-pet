# MIMO. — Pet Care & Shop (projeto demonstrativo)

Vitrine digital fictícia criada em **React + Vite + CSS próprio**, com identidade editorial, serviços para cães e gatos, uma agenda de horários de exemplo e um catálogo de produtos para diversos animais.

## Recursos implementados

- 8 cuidados para cães/gatos, filtráveis e com detalhes (no celular, a escolha leva ao painel de explicação);
- agenda de demonstração com dias futuros e horários simulados, indicação de vagas fictícias e resumo da escolha (horários indisponíveis são fictícios);
- formulário local com resumo do cuidado, pet, dia e horário, sem envio de informações;
- MIMO. Shop com 12 produtos fictícios, categorias (cães, gatos, aves, pequenos pets e peixes), busca e carrinho com quantidades e subtotal;
- painel para revisão **simulada** de pedido, com feedback de adição, indicadores de quantidade e busca com limpeza rápida: não existe pagamento, transação, estoque, entrega nem coleta de dados;
- galeria de fotos filtrável, FAQ, navegação responsiva e suporte a teclado e movimento reduzido.

## Executar e validar

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Limitações intencionais da demonstração

- **Não há agenda real:** os horários são criados localmente por regras fixas, sem consulta ou reserva no servidor. Uma implementação comercial precisaria integrar um sistema de disponibilidade e prevenir agendamentos concorrentes.
- **Não há e-commerce real:** preços e produtos são ilustrativos. O carrinho só altera o estado local da página e a revisão do pedido não finaliza compra. Para produção seriam necessários estoque, cálculo de frete, pagamento seguro, gestão de pedidos e requisitos legais.
- **Não há backend, login ou banco de dados.** Dados inseridos na solicitação não são transmitidos.
- Fotografias editoriais da V2 continuam vindo de `images.unsplash.com` e dependem de internet. São imagens ilustrativas, não fotos de clientes ou animais reais de uma empresa. Em projeto comercial, usar imagens autorizadas e otimizadas sob hospedagem própria. As ilustrações dos **produtos** são SVGs próprios gerados localmente, não dependem de terceiros.

Este é um **projeto de portfólio**, não uma empresa em operação. Todos os textos, nomes e valores dos produtos são fictícios.
