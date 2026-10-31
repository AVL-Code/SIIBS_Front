import { useState, type ReactElement } from 'react';
import { LogOut, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ASSISTANCE_FEATURE_KEY } from '@/features/assistance';
import { AUDIT_FEATURE_KEY } from '@/features/audit';
import {
  AUTH_FEATURE_KEY,
  LoginScreen,
  ROLE_LABELS_PT,
  logoutSession,
  type AuthenticatedUser,
} from '@/features/auth';
import { REGISTRY_FEATURE_KEY } from '@/features/registry';

export const APP_FEATURES = [
  AUTH_FEATURE_KEY,
  REGISTRY_FEATURE_KEY,
  ASSISTANCE_FEATURE_KEY,
  AUDIT_FEATURE_KEY,
] as const;

export function AppRoutes(): ReactElement {
  const [currentUser, setCurrentUser] = useState<AuthenticatedUser | null>(null);

  const handleLogout = async (): Promise<void> => {
    try {
      await logoutSession();
    } finally {
      setCurrentUser(null);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              SIIBS — Assistência Social
            </h1>
            <p className="mt-1 text-sm text-slate-600">Sistema Integrado Instituto Brantz Social</p>
          </div>

          {currentUser ? (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="flex items-center justify-end gap-1.5 text-sm font-medium text-slate-900">
                  <UserCheck className="h-4 w-4 text-teal-800" aria-hidden="true" />
                  {currentUser.fullName}
                </p>
                <p className="text-xs text-slate-600">
                  {currentUser.roles.map((r) => ROLE_LABELS_PT[r] ?? r).join(' • ')}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  void handleLogout();
                }}
              >
                <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                Sair
              </Button>
            </div>
          ) : null}
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        {currentUser ? (
          <section
            aria-label="Painel da Sessão Ativa"
            className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-base font-semibold text-slate-900">
              Sessão autenticada como {currentUser.fullName}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              E-mail: <span className="font-medium text-slate-800">{currentUser.email}</span> —{' '}
              {currentUser.permissions.length} permissões ativas no contexto atual.
            </p>
          </section>
        ) : (
          <LoginScreen onLoginSuccess={setCurrentUser} />
        )}
      </main>
    </div>
  );
}
