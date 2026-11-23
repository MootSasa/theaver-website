# Theaver Website & Documentation (`theaver.app`)

Official product website, download center, deep-link preview cards, and bilingual (`EN` / `RU`) documentation portal for **Theaver Messenger**.

## Stack

- **Astro 5** (`output: 'static'` + `@astrojs/node` standalone SSR for `/u/*`, `/c/*`, `/join/*` OpenGraph previews)
- **Tailwind CSS v4** with `Ink` dark/light design tokens
- **MDX** documentation with Shiki dual-theme highlighting
- **Pagefind** static full-text documentation search (`Cmd+K` / `Ctrl+K`)

## Development

```bash
npm install
npm run dev
```

## Type Check & Production Build

```bash
npm run check
npm run build
npm run preview
```

## Related Repositories

- Open-source Flutter client: [`MootSasa/theaver-frontend`](https://github.com/MootSasa/theaver-frontend)
- Live Web client: [`app.theaver.app`](https://app.theaver.app)

## License

MIT — see [LICENSE](./LICENSE).
