import { API_BASE_URL } from '@/constants/api';

export type TokenPair = {
  access: string;
  refresh: string;
};

export type BackendMe = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  profile?: {
    home?: string;
    bio?: string;
  };
};

function asErrorMessage(data: unknown): string | null {
  if (!data || typeof data !== 'object') return null;
  const anyData = data as Record<string, unknown>;
  if (typeof anyData.detail === 'string') return anyData.detail;
  if (typeof anyData.message === 'string') return anyData.message;
  return null;
}

export async function apiJson<T>(
  path: string,
  options?: { method?: string; token?: string | null; body?: unknown },
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  let res: Response;
  try {
    res = await fetch(url, {
      method: options?.method ?? 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(options?.token ? { Authorization: `Bearer ${options.token}` } : null),
      },
      body: options?.body !== undefined ? JSON.stringify(options.body) : undefined,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg.toLowerCase().includes('network request failed')) {
      throw new Error(
        `Network request failed. Backend not reachable at ${API_BASE_URL}. ` +
          `If you're using a phone, run Django with \`python manage.py runserver 0.0.0.0:8000\` and ensure your phone is on the same Wi‑Fi.`,
      );
    }
    throw new Error(`Request error: ${msg}`);
  }

  const text = await res.text();
  let data: unknown = null;
  if (text) {
    try {
      data = JSON.parse(text) as unknown;
    } catch {
      data = null;
    }
  }

  if (!res.ok) {
    const fallbackText = text && text.trim() ? text.trim().slice(0, 160) : null;
    const msg = asErrorMessage(data) ?? fallbackText ?? `Request failed (${res.status})`;
    throw new Error(msg);
  }
  if (text && data === null) {
    throw new Error(`Invalid JSON response from backend (${url})`);
  }
  return data as T;
}

export function tokenPairFrom(data: unknown): TokenPair {
  if (!data || typeof data !== 'object') throw new Error('Invalid token response');
  const anyData = data as Record<string, unknown>;
  if (typeof anyData.access !== 'string' || typeof anyData.refresh !== 'string') {
    throw new Error('Invalid token response');
  }
  return { access: anyData.access, refresh: anyData.refresh };
}
