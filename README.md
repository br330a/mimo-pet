# MIMO. — Pet Care (projeto demonstrativo)

Landing page React + Vite para uma **marca fictícia** de serviços pet. Criado como demonstração de design e desenvolvimento web; **não representa um estabelecimento real**.

## Rodar localmente

```bash
npm install
npm run dev
npm run lint
npm run build
```

O projeto foi pensado para a estrutura padrão `npm create vite@latest mimo-pet -- --template react`.

## Funcionalidades

- Seleção de cuidados e painel de detalhes atualizável;
- Galeria ilustrada com filtros "Todos", "Cães" e "Gatos";
- Formulário de **simulação** de solicitação com resumo local;
- FAQ expansível, menu responsivo, âncoras e estados de interação;
- Acessibilidade básica e respeito a `prefers-reduced-motion`.

## Sobre os dados

O formulário não envia requisições, não usa banco de dados nem persiste as informações. O resumo é gerado apenas no estado React. Não há atendimento, reserva ou WhatsApp real. Conteúdos e marca são fictícios.

## Identidade

Tipografia Outfit e DM Sans (Google Fonts com fallback); ilustrações SVG locais originais em `public/illustrations` e favicon SVG próprio. O site não depende de fotos de terceiros nem de recursos gráficos externos para funcionar.

## Próxima etapa

Refinar o design e validar acessibilidade/performance em dispositivos reais; posteriormente adicionar funcionalidades como seleção por etapa ou páginas de serviços se fizer sentido ao projeto comercial. Ao publicar a demonstração, manter visível que o estabelecimento é fictício.
