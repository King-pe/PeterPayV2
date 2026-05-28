import { API_BASE_URL } from './config';
import { getAccessToken, clearTokens } from './auth';
import type { ApiError } from '../types/api';

export class ApiRequestError extends Error {
  status: number;
  code: string;
  details?: Record<string, unknown>;

  constructor(status: number, error: ApiError) {
    super(error.message);
    this.status = status;
    this.code = error.code;
    this.details = error.details;
    this.name = 'ApiRequestError';
  }
}

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  // Skip auth header (useful for /auth/login)
  skipAuth?: boolean;
}

export async function apiFetch<T>(
path: string,
options: RequestOptions = {})
: Promise<T> {
  const { body, skipAuth, headers: customHeaders, ...rest } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(customHeaders as Record<string, string>)
  };

  if (!skipAuth) {
    const token = getAccessToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined
  });

  // Auto-handle 401: clear tokens and bounce to login.
  if (response.status === 401 && !skipAuth) {
    clearTokens();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }

  // Parse JSON payload (may be empty for 204).
  let payload: any = null;
  const text = await response.text();
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = {
        success: false,
        error: { code: 'parse_error', message: text }
      };
    }
  }

  if (!response.ok) {
    const apiError: ApiError = payload?.error || {
      code: 'unknown_error',
      message: response.statusText || 'Request failed'
    };
    throw new ApiRequestError(response.status, apiError);
  }

  // Unwrap { success, data } envelope when present.
  if (payload && typeof payload === 'object' && 'data' in payload) {
    return payload.data as T;
  }
  return payload as T;
}

// Convenience verbs.
export const api = {
  get: <T,>(path: string, options?: RequestOptions) =>
  apiFetch<T>(path, { ...options, method: 'GET' }),
  post: <T,>(path: string, body?: unknown, options?: RequestOptions) =>
  apiFetch<T>(path, { ...options, method: 'POST', body }),
  put: <T,>(path: string, body?: unknown, options?: RequestOptions) =>
  apiFetch<T>(path, { ...options, method: 'PUT', body }),
  patch: <T,>(path: string, body?: unknown, options?: RequestOptions) =>
  apiFetch<T>(path, { ...options, method: 'PATCH', body }),
  delete: <T,>(path: string, options?: RequestOptions) =>
  apiFetch<T>(path, { ...options, method: 'DELETE' })
};