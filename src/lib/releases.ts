export interface PublicReleaseArtifact {
  platform: string;
  architecture: string;
  latest_version: string;
  latest_build: number;
  min_supported_build: number;
  force_update: boolean;
  download_url: string;
  size_bytes: number;
  sha256: string;
  updated_at: string;
}

export interface PublicReleaseChannel {
  channel: string;
  latest_version: string;
  latest_build: number;
  release_notes: string;
  updated_at: string;
  artifacts: PublicReleaseArtifact[];
}

export interface PublicReleasesPayload {
  ok: boolean;
  channels: Record<string, PublicReleaseChannel>;
}

export const GITHUB_RELEASES_URL = 'https://github.com/MootSasa/theaver-frontend/releases';
export const GITHUB_REPO_URL = 'https://github.com/MootSasa/theaver-frontend';
export const WEB_APP_URL = import.meta.env.PUBLIC_WEB_APP_URL || 'https://app.theaver.app';
export const PUBLIC_API_URL = import.meta.env.PUBLIC_API_URL || 'https://api.theaver.app';

export const FALLBACK_RELEASES: PublicReleasesPayload = {
  ok: true,
  channels: {
    beta: {
      channel: 'beta',
      latest_version: '1.20.3-beta.429',
      latest_build: 429,
      release_notes:
        'Desktop tiling workspace, animated stickers and custom emojis, GIF search, LiveKit voice & video streams, and Bot API v7.x / Mini Apps v8.',
      updated_at: '2026-11-09T20:17:28Z',
      artifacts: [],
    },
  },
};

export async function fetchPublicReleases(baseUrl?: string): Promise<PublicReleasesPayload> {
  const apiBase = (
    baseUrl ||
    process.env.INTERNAL_API_URL ||
    process.env.PUBLIC_API_URL ||
    PUBLIC_API_URL
  ).replace(/\/+$/, '');

  try {
    const resp = await fetch(`${apiBase}/api/public/releases`, {
      signal: AbortSignal.timeout(2500),
      headers: { Accept: 'application/json' },
    });
    if (!resp.ok) {
      return FALLBACK_RELEASES;
    }
    const data = (await resp.json()) as PublicReleasesPayload;
    if (data && data.ok && data.channels && Object.keys(data.channels).length > 0) {
      return data;
    }
  } catch {
    // Graceful fallback when building in offline CI without live backend
  }
  return FALLBACK_RELEASES;
}

export function formatBytes(bytes: number): string {
  if (!bytes || bytes <= 0) return '—';
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) {
    return `${mb.toFixed(1)} MB`;
  }
  const kb = bytes / 1024;
  return `${Math.round(kb)} KB`;
}

export interface PlatformLabel {
  title: string;
  archLabel: Record<string, string>;
}

export const PLATFORM_LABELS: Record<'en' | 'ru', Record<string, PlatformLabel>> = {
  en: {
    windows: {
      title: 'Windows',
      archLabel: {
        'x64-installer': 'Windows x64 Installer (.exe)',
        x64: 'Windows x64 Portable (.zip)',
        arm64: 'Windows ARM64 (.zip)',
      },
    },
    macos: {
      title: 'macOS',
      archLabel: {
        arm64: 'Apple Silicon (M1–M4)',
        x64: 'Intel x64',
        universal: 'Universal (Apple Silicon + Intel)',
      },
    },
    linux: {
      title: 'Linux',
      archLabel: {
        x64: 'Linux x64 Archive (.tar.gz)',
        arm64: 'Linux ARM64 (.tar.gz)',
      },
    },
    android: {
      title: 'Android',
      archLabel: {
        'arm64-v8a': 'ARM64 (arm64-v8a APK)',
        'armeabi-v7a': 'ARMv7 (armeabi-v7a APK)',
        x86_64: 'x86_64 APK',
        universal: 'Universal APK',
      },
    },
    ios: {
      title: 'iOS',
      archLabel: {
        arm64: 'iOS Sideload IPA',
        universal: 'iOS IPA',
      },
    },
    web: {
      title: 'Web',
      archLabel: {
        universal: 'Progressive Web App',
      },
    },
  },
  ru: {
    windows: {
      title: 'Windows',
      archLabel: {
        'x64-installer': 'Установщик Windows x64 (.exe)',
        x64: 'Портативная версия x64 (.zip)',
        arm64: 'Windows ARM64 (.zip)',
      },
    },
    macos: {
      title: 'macOS',
      archLabel: {
        arm64: 'Apple Silicon (M1–M4)',
        x64: 'Intel x64',
        universal: 'Универсальная сборка',
      },
    },
    linux: {
      title: 'Linux',
      archLabel: {
        x64: 'Архив Linux x64 (.tar.gz)',
        arm64: 'Linux ARM64 (.tar.gz)',
      },
    },
    android: {
      title: 'Android',
      archLabel: {
        'arm64-v8a': 'ARM64 (arm64-v8a APK)',
        'armeabi-v7a': 'ARMv7 (armeabi-v7a APK)',
        x86_64: 'x86_64 APK',
        universal: 'Универсальный APK',
      },
    },
    ios: {
      title: 'iOS',
      archLabel: {
        arm64: 'Пакет iOS IPA',
        universal: 'Пакет iOS IPA',
      },
    },
    web: {
      title: 'Веб-клиент',
      archLabel: {
        universal: 'Браузерная версия',
      },
    },
  },
};
