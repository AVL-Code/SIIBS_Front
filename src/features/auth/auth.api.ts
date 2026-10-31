import { apiRequest } from '@/lib/api-client';
import type { AuthenticatedUser, LoginFormInput } from './auth.schema';

export async function loginWithCredentials(
  input: LoginFormInput,
): Promise<{ user: AuthenticatedUser }> {
  return apiRequest<{ user: AuthenticatedUser }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function logoutSession(): Promise<{ authenticated: false }> {
  return apiRequest<{ authenticated: false }>('/auth/logout', {
    method: 'POST',
  });
}

export async function fetchCurrentSessionUser(): Promise<{ user: AuthenticatedUser }> {
  return apiRequest<{ user: AuthenticatedUser }>('/auth/me', {
    method: 'GET',
  });
}
