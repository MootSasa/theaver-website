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
        'Multi-pane desktop workspace, animated stickers and custom emojis, GIF search, voice and video calls with screen sharing, and Bot API / Mini Apps v8.',
      updated_at: '2026-11-09T20:17:28Z',
      artifacts: [],
    },
  },
};

const SSR_RELEASES_TTL_MS = 30_000;
const ssrReleasesCache = new Map<
  string,
  { expiresAt: number; payload: PublicReleasesPayload }
>();
const ssrReleasesInflight = new Map<string, Promise<PublicReleasesPayload>>();

export async function fetchPublicReleases(baseUrl?: string): Promise<PublicReleasesPayload> {
  const apiBase = (
    baseUrl ||
    process.env.INTERNAL_API_URL ||
    process.env.PUBLIC_API_URL ||
    PUBLIC_API_URL
  ).replace(/\/+$/, '');

  const cached = ssrReleasesCache.get(apiBase);
  if (cached && Date.now() < cached.expiresAt) {
    return cached.payload;
  }

  const inflight = ssrReleasesInflight.get(apiBase);
  if (inflight) {
    return inflight;
  }

  const request = (async (): Promise<PublicReleasesPayload> => {
    try {
      const resp = await fetch(`${apiBase}/api/public/releases`, {
        signal: AbortSignal.timeout(2500),
        headers: { Accept: 'application/json' },
      });
      if (resp.ok) {
        const data = (await resp.json()) as PublicReleasesPayload;
        if (data && data.ok && data.channels && Object.keys(data.channels).length > 0) {
          ssrReleasesCache.set(apiBase, {
            expiresAt: Date.now() + SSR_RELEASES_TTL_MS,
            payload: data,
          });
          return data;
        }
      }
    } catch {
      // Graceful fallback when building in offline CI or transient backend error
    }
    return ssrReleasesCache.get(apiBase)?.payload ?? FALLBACK_RELEASES;
  })();

  ssrReleasesInflight.set(apiBase, request);
  try {
    return await request;
  } finally {
    ssrReleasesInflight.delete(apiBase);
  }
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

export interface ChangelogSection {
  kind: 'added' | 'improved' | 'fixed';
  items: string[];
}

export interface ChangelogEntryData {
  version: string;
  date: string;
  channel: 'stable' | 'beta';
  title: string;
  sections: ChangelogSection[];
}

function cleanReleaseItemText(raw: string): string {
  return raw
    .replace(/^[-*•]\s+/, '')
    .replace(/\s*\(`?[0-9a-f]{6,40}`?\)\s*$/i, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\p{Extended_Pictographic}/gu, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function extractLocalizedReleaseSlice(
  rawNotes: string,
  locale: 'en' | 'ru',
): { body: string; summary: string } {
  const trimmed = (rawNotes || '').trim();
  if (!trimmed) {
    return { body: '', summary: '' };
  }

  const findSlice = (code: 'en' | 'ru'): string | null => {
    const re = new RegExp(`<!--\\s*lang:${code}\\s*-->([\\s\\S]*?)<!--\\s*/lang:${code}\\s*-->`, 'i');
    const match = trimmed.match(re);
    return match && match[1]?.trim() ? match[1].trim() : null;
  };

  const altLocale: 'en' | 'ru' = locale === 'ru' ? 'en' : 'ru';
  const slice = findSlice(locale) ?? findSlice(altLocale) ?? trimmed;
  const summaryMatch = slice.match(/<!--\s*summary:\s*(.+?)\s*-->/i);
  const summary = summaryMatch?.[1]?.replace(/\s+/g, ' ').trim() ?? '';
  const body = slice.replace(/<!--[\s\S]*?-->/g, '').trim();

  return { body, summary };
}

export function parseChannelReleaseEntry(
  ch: PublicReleaseChannel,
  locale: 'en' | 'ru',
): ChangelogEntryData | null {
  if (ch.channel !== 'stable' && ch.channel !== 'beta') return null;
  if (!ch.latest_version) return null;

  const version = ch.latest_version.startsWith('v')
    ? ch.latest_version
    : `v${ch.latest_version}`;
  const date = (ch.updated_at || '').slice(0, 10) || new Date().toISOString().slice(0, 10);

  const buckets: Record<'added' | 'improved' | 'fixed', string[]> = {
    added: [],
    improved: [],
    fixed: [],
  };

  let currentKind: 'added' | 'improved' | 'fixed' = 'improved';
  const { body: localizedBody, summary: customSummary } = extractLocalizedReleaseSlice(
    ch.release_notes || '',
    locale,
  );
  const lines = localizedBody.split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || (line.startsWith('# ') && !line.startsWith('##'))) continue;

    if (line.startsWith('##')) {
      const lower = line.toLowerCase();
      if (
        lower.includes('feature') ||
        lower.includes('новое') ||
        lower.includes('новые') ||
        lower.includes('added') ||
        lower.includes('добав')
      ) {
        currentKind = 'added';
      } else if (lower.includes('fix') || lower.includes('исправ')) {
        currentKind = 'fixed';
      } else {
        currentKind = 'improved';
      }
      continue;
    }

    if (line.startsWith('- ') || line.startsWith('* ') || line.startsWith('• ')) {
      const cleaned = cleanReleaseItemText(line);
      if (cleaned) buckets[currentKind].push(cleaned);
    } else {
      const cleaned = cleanReleaseItemText(line);
      if (cleaned) buckets[currentKind].push(cleaned);
    }
  }

  const sections: ChangelogSection[] = (['added', 'improved', 'fixed'] as const)
    .filter((k) => buckets[k].length > 0)
    .map((k) => ({ kind: k, items: buckets[k] }));

  if (sections.length === 0) {
    sections.push({
      kind: 'improved',
      items: [
        locale === 'ru'
          ? 'Плановое обновление стабильности и производительности клиента.'
          : 'Scheduled client stability and performance update.',
      ],
    });
  }

  const chName = ch.channel === 'beta' ? 'Beta' : 'Stable';
  const title =
    customSummary ||
    (locale === 'ru'
      ? `Релиз канала ${chName} (${version})`
      : `${chName} channel release (${version})`);

  return {
    version,
    date,
    channel: ch.channel,
    title,
    sections,
  };
}
