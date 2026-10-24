import type { ReactElement } from 'react';
import { ASSISTANCE_FEATURE_KEY } from '@/features/assistance';
import { AUDIT_FEATURE_KEY } from '@/features/audit';
import { AUTH_FEATURE_KEY } from '@/features/auth';
import { REGISTRY_FEATURE_KEY } from '@/features/registry';

export const APP_FEATURES = [
  AUTH_FEATURE_KEY,
  REGISTRY_FEATURE_KEY,
  ASSISTANCE_FEATURE_KEY,
  AUDIT_FEATURE_KEY,
] as const;

export function AppRoutes(): ReactElement {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
        SIIBS — Assistência Social
      </h1>
      <p className="mt-2 text-sm text-slate-600">Sistema Integrado Instituto Bom Samaritano</p>
    </main>
  );
}
