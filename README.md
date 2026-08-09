# Reditus Mídia — Site institucional

Site estático institucional da Reditus Mídia.

- `index.html` / `styles.css` / `script.js` — site principal.
- `midia-kit-page/` — página do mídia kit.
- Deploy: Vercel (projeto `graalhub/reditus-midia`).

## Padrão de trabalho

Antes de implementar qualquer mudança, leia **[CONTEXT.md](./CONTEXT.md)** — define o fluxo de Issues/Pull Requests, a esteira de qualidade e os princípios de arquitetura e motion/UX deste projeto.

## Rodando localmente

```bash
npx serve .
```

## Checks locais

```bash
npm install
npx biome check .
npx playwright test
```
