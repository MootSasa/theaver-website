[English](#english) | [Русский](#русский)

# Contributing to Theaver Website and Docs / Участие в развитии сайта Theaver

## English

This repository builds [theaver.app](https://theaver.app) using Astro 5, Tailwind CSS v4, MDX docs, and Pagefind search.

### Project Structure

- `src/content/docs/en/` and `src/content/docs/ru/`: bilingual MDX docs across the `guide`, `bots`, and `client` tracks
- `src/components/pages/`: landing page, downloads matrix, changelog feed, legal pages, account deletion form, and deep-link preview cards
- `src/lib/i18n.ts` and `src/lib/releases.ts`: interface translations and the backend release-notes parser
- `src/styles/tokens.css` and [DESIGN.md](./DESIGN.md): light/dark palette tokens and component styling rules

### Local Setup and Checks

```bash
npm ci
npm run dev
```

Before opening a pull request:

1. Branch from `main` or `feat/theaver-website` using `feat/*`, `fix/*`, `docs/*`, or `chore/*`.
2. Keep English (`src/content/docs/en/`) and Russian (`src/content/docs/ru/`) documentation in sync when editing guides.
3. Follow Conventional Commits in English (`feat:`, `fix:`, `docs:`, `chore:`).
4. Run Astro type checking and a production build:

```bash
npm run check
npm run build
```

Licensed under the MIT License ([LICENSE](./LICENSE)).

---

## Русский

Этот репозиторий отвечает за сайт [theaver.app/ru/](https://theaver.app/ru/), центр загрузок и документацию на Astro 5, Tailwind CSS v4, MDX и Pagefind.

### Структура проекта

- `src/content/docs/en/` и `src/content/docs/ru/`: двуязычная документация в разделах `guide`, `bots` и `client`
- `src/components/pages/`: главная страница, раздел загрузок, история обновлений, правовые документы, форма удаления аккаунта и карточки превью
- `src/lib/i18n.ts` и `src/lib/releases.ts`: переводы интерфейса и парсер заметок релиза из API
- `src/styles/tokens.css` и [DESIGN.md](./DESIGN.md): токены светлой/тёмной темы и правила оформления

### Локальная работа и проверка перед PR

```bash
npm ci
npm run dev
```

Перед отправкой Pull Request:

1. Создавайте тематическую ветку `feat/*`, `fix/*`, `docs/*` или `chore/*`.
2. При обновлении документации поддерживайте синхронность английской и русской версий.
3. Пишите заголовки коммитов на английском по формату Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`).
4. Проверьте типы Astro и полную сборку:

```bash
npm run check
npm run build
```

Код сайта распространяется под лицензией MIT ([LICENSE](./LICENSE)).
