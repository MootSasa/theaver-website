**English** | [Русский](./README.ru.md)

# Theaver Website and Documentation

Public product site, downloads hub, OpenGraph deep-link previews, and bilingual (`EN` / `RU`) documentation portal at [theaver.app](https://theaver.app).

## Stack

Built with Astro 5 (`output: 'static'` plus the `@astrojs/node` standalone adapter for `/u/*`, `/c/*`, and `/join/*` preview cards), Tailwind CSS v4 with custom light/dark tokens in [tokens.css](./src/styles/tokens.css), MDX docs with Shiki highlighting, and Pagefind static search (`Cmd+K` / `Ctrl+K`).

## Local Development

```bash
npm ci
npm run dev
```

## Type Check and Production Build

```bash
npm run check
npm run build
npm run preview
```

## Related Links

- Open-source Flutter client: [MootSasa/theaver-frontend](https://github.com/MootSasa/theaver-frontend)
- Web client: [app.theaver.app](https://app.theaver.app)
- Security policy: [SECURITY.md](./SECURITY.md)
- Contributing guide: [CONTRIBUTING.md](./CONTRIBUTING.md)

## License

MIT License. See [LICENSE](./LICENSE).
