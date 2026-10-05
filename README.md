# Reditus Mídia — Site institucional

Site estático institucional da Reditus Mídia.

- `index.html` / `styles.css` / `script.js` — site principal.
- `midia-kit/` — página do mídia kit: apresentação comercial de 10 telas (React empacotado em JS estático). Código-fonte em `midia-kit/src/`; `app.js` e `app.css` são gerados.
- Deploy: Vercel (projeto `graalhub/reditus-midia`).

## Padrão de trabalho

Antes de implementar qualquer mudança, leia **[CONTEXT.md](./CONTEXT.md)** — define o fluxo de Issues/Pull Requests, a esteira de qualidade e os princípios de arquitetura e motion/UX deste projeto.

## Rodando localmente

```bash
npx serve .
```

## Mídia kit (apresentação)

Ao alterar qualquer arquivo de `midia-kit/src/`, regenerar o bundle e commitar `midia-kit/app.js` e `midia-kit/app.css`:

```bash
npm install
npm run build:midia-kit
```

Parâmetros: `?slide=N` abre a tela N; `?slide=N&capture=1` mostra só a tela, sem controles.

## Checks locais

```bash
npm install
npx biome check .
npx playwright test
```
