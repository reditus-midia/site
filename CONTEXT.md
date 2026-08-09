# CONTEXT.md — Reditus Mídia (site institucional)

> Este arquivo define o padrão de trabalho deste repositório. Qualquer agente (humano ou IA, de qualquer modelo/ferramenta) deve ler este documento **antes** de implementar qualquer mudança. Ele tem precedência sobre preferências individuais de estilo.

## 1. Sobre o projeto

Site institucional estático da Reditus Mídia (`index.html`, `styles.css`, `script.js`, `midia-kit-page/`), publicado via Vercel. Sem backend, sem banco de dados, sem autenticação de usuário.

## 2. Fluxo de trabalho: Issues e Pull Requests

- **Toda tarefa vira uma Issue antes de qualquer código ser escrito.** Cada Issue recebe exatamente uma das três labels de tipo:
  - `Correção` — bug fix, comportamento incorreto, regressão.
  - `Melhoria` — otimização, refino de algo que já existe (performance, UX, copy, acessibilidade).
  - `Nova função` — funcionalidade ou seção inteiramente nova.
- **Toda entrega/deploy passa por Pull Request** — nunca commit direto em `main` (exceção: commits de configuração inicial de repositório, feitos uma única vez na fundação do projeto).
- **Todo Pull Request deve conter, na descrição, obrigatoriamente:**
  1. **Issue relacionada** — `Closes #<número>` ou `Refs #<número>`.
  2. **O que mudou** — resumo objetivo das alterações.
  3. **Como foi validado** — passos de teste manual, screenshots antes/depois quando visual, resultado dos checks automatizados (lint, testes, build).
  4. **Riscos, limitações e próximos passos** — o que pode quebrar, o que ficou de fora do escopo, o que precisa de acompanhamento.
- O template em `.github/PULL_REQUEST_TEMPLATE.md` já traz essa estrutura pronta — sempre usá-lo, não apagar seções.
- `main` é protegida: exige PR + checks de CI (`.github/workflows/ci.yml`) passando antes do merge.

## 3. Esteira de qualidade (o que está ativo e por quê)

Escopo definido para **evitar overengineering** em um site estático sem backend — cada item abaixo só entrou porque se aplica de fato a este projeto:

**Ativo agora:**
- **Biome** — lint e formatação de JS/JSON/CSS (`biome.json`).
- **Commitlint** — mensagens de commit no padrão Conventional Commits (`commitlint.config.cjs`).
- **Playwright** — smoke test end-to-end mínimo (a página carrega, título correto, sem erros de console) em `tests/e2e/`.
- **GitHub Actions** (`.github/workflows/ci.yml`) — roda lint + commitlint + Playwright em todo PR contra `main`.

**Deliberadamente fora de escopo por ora** (reavaliar apenas se o projeto ganhar backend, autenticação ou tráfego que justifique o custo/complexidade):
- Sentry / Datadog / New Relic / OpenTelemetry — observabilidade de aplicação/backend; não há aplicação rodando para instrumentar, só HTML/CSS/JS estático servido por CDN.
- Stryker (mutation testing) — custo alto de configuração/execução sem massa crítica de testes unitários que justifique.
- Codecov — não faz sentido sem suíte de testes unitários ainda existente.
- Rate limiting / separação backend-frontend — não existe backend.
- arch-contract / Knip — reavaliar se o projeto crescer para múltiplos módulos/pacotes; hoje é HTML/CSS/JS solto, sem grafo de dependências que justifique.

**Fora do escopo técnico, requer aprovação jurídica humana:**
- Termos de uso e política de privacidade — podem ser rascunhados a pedido, mas a aprovação final é sempre de um responsável jurídico da Reditus, nunca automatizada.

## 4. Princípios de arquitetura

- Evitar overengineering: a solução mais simples que resolve o problema atual vence.
- Evitar bottlenecks: nada de operações síncronas pesadas bloqueando a renderização inicial; imagens e vídeos grandes usam lazy loading.
- Componentizar desde o início: blocos de UI repetidos (cards, seções, modais) viram padrões reutilizáveis em CSS/JS, não copy-paste.
- DRY com critério: só abstrair quando o padrão já se repetiu de fato (regra prática: na 3ª repetição, não na 1ª) — nunca criar abstração especulativa "para o futuro".
- Antes de criar um componente novo, verificar se já existe algo equivalente no projeto e reaproveitar/estender em vez de reconstruir.

## 5. Motion e UX (skill Motion Principles)

Antes de qualquer mudança visual ou de interação, consultar a skill **Motion Principles** (`kylezantos/design-motion-principles`) para calibrar o tipo e a intensidade da animação ao contexto (ver `references/` da skill: cookbook, checklist de auditoria, anti-padrões, acessibilidade, performance).

Toda interface do sistema deve ter, quando fizer sentido para o elemento em questão:
- Lazy loading de imagens/vídeos/seções fora da viewport inicial.
- Skeleton screens durante carregamento de conteúdo assíncrono.
- Animações suaves de entrada e saída (nunca aparecimento/desaparecimento abrupto).
- Estados de progresso visíveis em elementos interativos (loading, enviando, sucesso, erro).
- Feedback visual imediato para toda ação do usuário (hover, clique, foco, envio de formulário).
- Transições consistentes entre telas, cards, modais e listas — mesma curva de easing e duração para o mesmo tipo de transição em todo o site.
- `prefers-reduced-motion` sempre respeitado — nenhuma animação é decorativa a ponto de prejudicar quem desativou movimento no sistema.

A regra de ouro: a melhor animação é a que passa despercebida — ela remove atrito, nunca chama atenção para si mesma.

## 6. Antes de finalizar qualquer entrega

Revisar a interface como um designer de produto sênior revisaria: nada deve parecer brusco, travado, genérico ou amador. Se parecer, corrigir antes de abrir o PR — não depois.
