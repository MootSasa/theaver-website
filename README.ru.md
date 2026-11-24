[English](./README.md) | **Русский**

# Сайт и документация Theaver

Официальный сайт, центр загрузок, OpenGraph-превью для коротких ссылок и двуязычная документация (`RU` / `EN`) на [theaver.app/ru/](https://theaver.app/ru/).

## Стек

Сайт работает на Astro 5 (`output: 'static'` вместе со standalone-адаптером `@astrojs/node` для динамических превью `/u/*`, `/c/*` и `/join/*`), Tailwind CSS v4 с цветовыми токенами из [tokens.css](./src/styles/tokens.css), MDX-документацией с подсветкой кода Shiki и статическим поиском Pagefind (`Cmd+K` / `Ctrl+K`).

## Локальный запуск

```bash
npm ci
npm run dev
```

## Проверка типов и сборка

```bash
npm run check
npm run build
npm run preview
```

## Связанные ссылки

- Открытый Flutter-клиент: [MootSasa/theaver-frontend](https://github.com/MootSasa/theaver-frontend)
- Веб-клиент: [app.theaver.app](https://app.theaver.app)
- Политика безопасности: [SECURITY.md](./SECURITY.md)
- Руководство контрибьютора: [CONTRIBUTING.md](./CONTRIBUTING.md)

## Лицензия

Лицензия MIT, текст в [LICENSE](./LICENSE).
