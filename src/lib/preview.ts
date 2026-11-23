export type PreviewKind = 'user' | 'channel' | 'invite';

export interface PublicPreviewData {
  ok: boolean;
  kind: PreviewKind;
  entity_type: string;
  title: string;
  username: string;
  description: string;
  avatar_url: string;
  member_count?: number;
  is_verified?: boolean;
  requires_approval?: boolean;
  deep_link: string;
  web_url: string;
}

export type PreviewFetchResult =
  | { status: 'ok'; data: PublicPreviewData }
  | { status: 'gone' | 'not_found' | 'error'; message: string };

export async function fetchPublicPreview(
  kind: PreviewKind,
  target: string,
): Promise<PreviewFetchResult> {
  const cleanTarget = target.trim();
  if (!cleanTarget) {
    return { status: 'not_found', message: 'Empty target' };
  }

  const internalBase = (
    process.env.INTERNAL_API_URL ||
    process.env.PUBLIC_API_URL ||
    'http://backend:8080'
  ).replace(/\/+$/, '');

  const endpoint = `${internalBase}/api/public/preview/${kind}/${encodeURIComponent(cleanTarget)}`;

  try {
    const resp = await fetch(endpoint, {
      signal: AbortSignal.timeout(2500),
      headers: { Accept: 'application/json' },
    });

    if (resp.status === 410) {
      return { status: 'gone', message: 'Invite link has expired or been revoked' };
    }
    if (resp.status === 404 || resp.status === 400) {
      return { status: 'not_found', message: 'Preview target not found' };
    }
    if (!resp.ok) {
      return { status: 'error', message: `Backend returned HTTP ${resp.status}` };
    }

    const data = (await resp.json()) as PublicPreviewData;
    if (!data || !data.ok) {
      return { status: 'not_found', message: 'Not found' };
    }
    return { status: 'ok', data };
  } catch {
    return { status: 'error', message: 'Backend unreachable' };
  }
}

export function detectRequestLocale(request: Request): 'en' | 'ru' {
  const url = new URL(request.url);
  const queryLang = url.searchParams.get('lang')?.toLowerCase();
  if (queryLang === 'ru') return 'ru';
  if (queryLang === 'en') return 'en';
  const accept = request.headers.get('accept-language')?.toLowerCase() || '';
  if (accept.includes('ru')) return 'ru';
  return 'en';
}
