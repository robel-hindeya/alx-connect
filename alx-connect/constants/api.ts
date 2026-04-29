import Constants from 'expo-constants';
import { Platform } from 'react-native';

function hostFromHostUri(hostUri: string | null | undefined): string | null {
  if (!hostUri) return null;
  const withoutScheme = hostUri.includes('://') ? hostUri.split('://')[1] : hostUri;
  const host = withoutScheme.split('/')[0]?.split(':')[0]?.trim();
  return host ? host : null;
}

function hostFromUrl(url: string): string | null {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

function normalizeApiBaseUrl(url: string): string {
  const normalized = url.replace(/\/$/, '');
  if (Platform.OS !== 'android') return normalized;

  const host = hostFromUrl(normalized);
  if (host === 'localhost' || host === '127.0.0.1') {
    return normalized.replace(host, '10.0.2.2');
  }
  return normalized;
}

function guessLocalApiBaseUrl(): string {
  const anyConstants = Constants as unknown as Record<string, any>;

  const host =
    hostFromHostUri(anyConstants.expoConfig?.hostUri) ??
    hostFromHostUri(anyConstants.manifest?.debuggerHost) ??
    hostFromHostUri(anyConstants.manifest2?.extra?.expoClient?.hostUri) ??
    hostFromHostUri(anyConstants.manifest2?.extra?.expoClient?.debuggerHost);

  if (host && host !== 'localhost' && host !== '127.0.0.1') return `http://${host}:8000`;

  if (Platform.OS === 'android') return 'http://10.0.2.2:8000';
  return 'http://localhost:8000';
}

export const API_BASE_URL = normalizeApiBaseUrl(process.env.EXPO_PUBLIC_API_BASE_URL ?? guessLocalApiBaseUrl());
