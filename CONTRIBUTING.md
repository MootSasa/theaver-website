# Contributing to Theaver Website & Docs

This repository powers [`theaver.app`](https://theaver.app), built with Astro 5, Tailwind CSS v4, MDX documentation, and Pagefind search.

## Project Structure

- `src/content/docs/en/` and `src/content/docs/ru/` — bilingual MDX documentation (`guide`, `bots`, `client` tracks)
- `src/components/pages/` — landing, downloads, changelog, legal, account deletion, and link preview pages
- `src/lib/i18n.ts` and `src/lib/releases.ts` — UI localization and backend release-notes parser
- `src/styles/tokens.css` & `DESIGN.md` — light/dark visual tokens and component rules

## Local Development

```bash
npm ci
npm run dev
```

## Verification Before Opening a PR

1. Work on a descriptive topic branch (`feat/*`, `fix/*`, `chore/*`).
2. Keep English (`src/content/docs/en/`) and Russian (`src/content/docs/ru/`) documentation balanced when adding or updating docs.
3. Follow Conventional Commits in English (`feat:`, `fix:`, `docs:`, `chore:`).
4. Run Astro type checking and production build:

```bash
npm run check
npm run build
```

## License

Licensed under the MIT License — see [`LICENSE`](./LICENSE).
