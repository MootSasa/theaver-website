export type Locale = 'en' | 'ru';

export const SUPPORTED_LOCALES: Locale[] = ['en', 'ru'];

export function getLocaleFromPath(pathname: string): Locale {
  if (pathname === '/ru' || pathname.startsWith('/ru/')) {
    return 'ru';
  }
  return 'en';
}

export function localizePath(path: string, targetLocale: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const withoutRu =
    clean === '/ru' ? '/' : clean.startsWith('/ru/') ? clean.slice(3) || '/' : clean;

  if (targetLocale === 'en') {
    return withoutRu;
  }
  return withoutRu === '/' ? '/ru/' : `/ru${withoutRu}`;
}

export interface SiteStrings {
  nav: {
    features: string;
    downloads: string;
    docs: string;
    changelog: string;
    github: string;
    openWeb: string;
    download: string;
    searchPlaceholder: string;
    searchButton: string;
    langBannerText: string;
    langBannerAction: string;
    langBannerDismiss: string;
  };
  theme: {
    system: string;
    dark: string;
    light: string;
    toggleLabel: string;
  };
  footer: {
    tagline: string;
    product: string;
    developers: string;
    resources: string;
    legal: string;
    features: string;
    downloads: string;
    webClient: string;
    changelog: string;
    botPlatform: string;
    miniApps: string;
    restApi: string;
    wsRpc: string;
    userGuide: string;
    verifyBuilds: string;
    sourceCode: string;
    privacy: string;
    terms: string;
    security: string;
    deleteAccount: string;
    copyright: string;
  };
  tracks: {
    guide: string;
    bots: string;
    client: string;
  };
  docsUi: {
    onThisPage: string;
    editOnGithub: string;
    previous: string;
    next: string;
    searchTitle: string;
    searchEmpty: string;
    searchHint: string;
    close: string;
  };
}

export const UI_STRINGS: Record<Locale, SiteStrings> = {
  en: {
    nav: {
      features: 'Features',
      downloads: 'Downloads',
      docs: 'Docs',
      changelog: 'Changelog',
      github: 'GitHub',
      openWeb: 'Open Web',
      download: 'Download',
      searchPlaceholder: 'Search documentation...',
      searchButton: 'Search',
      langBannerText: 'Russian version of the site and documentation is available.',
      langBannerAction: 'Switch to Russian',
      langBannerDismiss: 'Dismiss',
    },
    theme: {
      system: 'System',
      dark: 'Dark',
      light: 'Light',
      toggleLabel: 'Theme',
    },
    footer: {
      tagline: 'Cross-platform messenger with an open client, desktop multi-pane layout, calls, and Bot API.',
      product: 'Product',
      developers: 'Developers',
      resources: 'Resources',
      legal: 'Legal',
      features: 'Features',
      downloads: 'Downloads',
      webClient: 'Web Client',
      changelog: 'Changelog',
      botPlatform: 'Bots & @BotMother',
      miniApps: 'Mini Apps v8',
      restApi: 'Client REST API',
      wsRpc: 'WebSocket RPC',
      userGuide: 'User Guide',
      verifyBuilds: 'Verify Signatures',
      sourceCode: 'Client Source Code',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      security: 'Security',
      deleteAccount: 'Delete Account',
      copyright: 'Theaver',
    },
    tracks: {
      guide: 'User Guide',
      bots: 'Bots & Mini Apps',
      client: 'Open Client & API',
    },
    docsUi: {
      onThisPage: 'On this page',
      editOnGithub: 'Edit on GitHub',
      previous: 'Previous',
      next: 'Next',
      searchTitle: 'Search documentation',
      searchEmpty: 'Type to search guides, Bot API methods, and client specs.',
      searchHint: 'No matching documentation pages found.',
      close: 'Close',
    },
  },
  ru: {
    nav: {
      features: 'Возможности',
      downloads: 'Скачать',
      docs: 'Документация',
      changelog: 'Обновления',
      github: 'GitHub',
      openWeb: 'Веб-клиент',
      download: 'Скачать',
      searchPlaceholder: 'Поиск по документации...',
      searchButton: 'Поиск',
      langBannerText: 'English version of the website and docs is available.',
      langBannerAction: 'Open in English',
      langBannerDismiss: 'Скрыть',
    },
    theme: {
      system: 'Система',
      dark: 'Тёмная',
      light: 'Светлая',
      toggleLabel: 'Тема',
    },
    footer: {
      tagline: 'Кроссплатформенный мессенджер с открытым клиентом, несколькими панелями на ПК, звонками и Bot API.',
      product: 'Продукт',
      developers: 'Разработчикам',
      resources: 'Ресурсы',
      legal: 'Правовая информация',
      features: 'Возможности',
      downloads: 'Загрузки',
      webClient: 'Веб-клиент',
      changelog: 'История обновлений',
      botPlatform: 'Боты и @BotMother',
      miniApps: 'Mini Apps v8',
      restApi: 'Клиентский REST API',
      wsRpc: 'WebSocket RPC',
      userGuide: 'Гид пользователя',
      verifyBuilds: 'Проверка подписей',
      sourceCode: 'Исходный код клиента',
      privacy: 'Политика конфиденциальности',
      terms: 'Условия использования',
      security: 'Безопасность',
      deleteAccount: 'Удаление аккаунта',
      copyright: 'Theaver',
    },
    tracks: {
      guide: 'Гид пользователя',
      bots: 'Боты и Mini Apps',
      client: 'Открытый клиент и API',
    },
    docsUi: {
      onThisPage: 'На этой странице',
      editOnGithub: 'Редактировать на GitHub',
      previous: 'Назад',
      next: 'Далее',
      searchTitle: 'Поиск по документации',
      searchEmpty: 'Введите запрос для поиска по руководствам, Bot API и спецификациям.',
      searchHint: 'По вашему запросу ничего не найдено.',
      close: 'Закрыть',
    },
  },
};
