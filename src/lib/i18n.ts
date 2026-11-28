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
    developers: string;
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
    features: string;
    downloads: string;
    webClient: string;
    changelog: string;
    docsHub: string;
    developerApps: string;
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
    overview: string;
    editOnGithub: string;
    previous: string;
    next: string;
    searchTitle: string;
    searchEmpty: string;
    searchHint: string;
    close: string;
    copied: string;
    copyFailed: string;
  };
}

export const UI_STRINGS: Record<Locale, SiteStrings> = {
  en: {
    nav: {
      features: 'Features',
      downloads: 'Downloads',
      docs: 'Docs',
      developers: 'Apps (api_id)',
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
      tagline: 'Fast chats, drop-in voice rooms, split-screen desktop panes, and an open platform for custom apps and bots.',
      product: 'Product',
      developers: 'Developers',
      resources: 'Resources',
      features: 'Features',
      downloads: 'Downloads',
      webClient: 'Web Client',
      changelog: 'Changelog',
      docsHub: 'Documentation Portal',
      developerApps: 'Client Apps (api_id)',
      botPlatform: 'Bots & @BotMother',
      miniApps: 'Mini Apps v8',
      restApi: 'Client REST API',
      wsRpc: 'Realtime RPC',
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
      client: 'Build Your Own Client',
    },
    docsUi: {
      onThisPage: 'On this page',
      overview: 'All Documentation',
      editOnGithub: 'Edit on GitHub',
      previous: 'Previous',
      next: 'Next',
      searchTitle: 'Search documentation',
      searchEmpty: 'Type to search client APIs, Bot API methods, and guides.',
      searchHint: 'No matching documentation pages found.',
      close: 'Close',
      copied: 'Copied',
      copyFailed: 'Copy failed',
    },
  },
  ru: {
    nav: {
      features: 'Фишки',
      downloads: 'Скачать',
      docs: 'Доки',
      developers: 'Свои клиенты',
      changelog: 'Обновления',
      github: 'GitHub',
      openWeb: 'Браузер',
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
      tagline: 'Быстрые чаты, войсы без лишних ссылок, несколько панелей на компьютере и открытая платформа для ботов и своих клиентов.',
      product: 'Продукт',
      developers: 'Разработчикам',
      resources: 'Ресурсы',
      features: 'Возможности',
      downloads: 'Загрузки',
      webClient: 'Веб-клиент',
      changelog: 'История обновлений',
      docsHub: 'Портал документации',
      developerApps: 'Консоль клиентов (api_id)',
      botPlatform: 'Боты и @BotMother',
      miniApps: 'Mini Apps v8',
      restApi: 'Клиентский REST API',
      wsRpc: 'Поток событий',
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
      client: 'Создание своего клиента',
    },
    docsUi: {
      onThisPage: 'На этой странице',
      overview: 'Обзор документации',
      editOnGithub: 'Редактировать на GitHub',
      previous: 'Назад',
      next: 'Далее',
      searchTitle: 'Поиск по документации',
      searchEmpty: 'Введи запрос: методы клиентского API, WebSocket, Bot API или гайды.',
      searchHint: 'По этому запросу пока ничего не нашлось.',
      close: 'Закрыть',
      copied: 'Скопировано',
      copyFailed: 'Не скопировалось',
    },
  },
};
