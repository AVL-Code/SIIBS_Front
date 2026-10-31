import { useState, type ReactElement } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, ShieldCheck } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { loginWithCredentials } from './auth.api';
import { loginFormSchema, type AuthenticatedUser, type LoginFormInput } from './auth.schema';

export interface LoginScreenProps {
  readonly onLoginSuccess?: (user: AuthenticatedUser) => void;
  readonly submitLogin?: (input: LoginFormInput) => Promise<{ user: AuthenticatedUser }>;
}

export function LoginScreen({
  onLoginSuccess,
  submitLogin = loginWithCredentials,
}: LoginScreenProps): ReactElement {
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormInput): Promise<void> => {
    setAuthError(null);
    try {
      const response = await submitLogin(values);
      onLoginSuccess?.(response.user);
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : 'Credenciais inválidas ou conta inativa. Verifique seus dados de acesso.';
      setAuthError(message);
    }
  };

  return (
    <section
      aria-label="Autenticação de Usuário SIIBS"
      className="grid overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm lg:grid-cols-12"
    >
      <div className="flex flex-col justify-between border-b border-stone-200 bg-stone-100/80 p-8 lg:col-span-5 lg:border-r lg:border-b-0">
        <div>
          <div className="inline-flex items-center gap-2 rounded-md border border-stone-300 bg-white px-3 py-1 text-xs font-medium tracking-wide text-stone-700 uppercase">
            <ShieldCheck className="h-3.5 w-3.5 text-teal-800" aria-hidden="true" />
            Acesso Individual Auditado
          </div>
          <h2 className="mt-5 text-xl font-semibold tracking-tight text-slate-900">
            Núcleo de Identidade e Acesso
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Utilize sua conta individual do Instituto Brantz Social. Todas as consultas e alterações
            cadastrais respeitam o perfil atribuído e são registradas na trilha de auditoria.
          </p>
        </div>

        <dl className="mt-8 space-y-3 border-t border-stone-200/90 pt-5 text-xs text-slate-600">
          <div>
            <dt className="font-semibold text-slate-800">Segregação por Domínio (DA-007)</dt>
            <dd className="mt-0.5">
              Dados socioeconômicos, benefícios e prontuários de atendimento são restritos à equipe
              da Assistência Social.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-800">Sessão Protegida (RNF-01)</dt>
            <dd className="mt-0.5">
              Autenticação via sessão criptografada HttpOnly e validação de permissões no servidor.
            </dd>
          </div>
        </dl>
      </div>

      <div className="p-8 lg:col-span-7 lg:p-10">
        <div className="max-w-md">
          <div className="flex items-center gap-2 text-xs font-medium text-teal-800">
            <Lock className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Ambiente Local Seguro</span>
          </div>
          <h3 className="mt-2 text-lg font-semibold text-slate-900">
            Identifique-se para continuar
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Informe suas credenciais institucionais para acessar os módulos autorizados.
          </p>

          {authError ? (
            <div
              role="alert"
              className="mt-5 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-900"
            >
              {authError}
            </div>
          ) : null}

          <form
            onSubmit={(e) => {
              void handleSubmit(onSubmit)(e);
            }}
            noValidate
            className="mt-6 space-y-5"
          >
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-slate-800">
                E-mail institucional
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="operador@siibs.local"
                aria-invalid={errors.email ? 'true' : 'false'}
                className="mt-1.5 block w-full rounded-md border border-stone-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-stone-400 focus:border-teal-800 focus:ring-2 focus:ring-teal-800/20 focus:outline-none"
                {...register('email')}
              />
              {errors.email ? (
                <p role="alert" className="mt-1.5 text-xs font-medium text-red-700">
                  {errors.email.message}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-slate-800">
                Senha de acesso
              </label>
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••••••"
                aria-invalid={errors.password ? 'true' : 'false'}
                className="mt-1.5 block w-full rounded-md border border-stone-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-stone-400 focus:border-teal-800 focus:ring-2 focus:ring-teal-800/20 focus:outline-none"
                {...register('password')}
              />
              {errors.password ? (
                <p role="alert" className="mt-1.5 text-xs font-medium text-red-700">
                  {errors.password.message}
                </p>
              ) : null}
            </div>

            <div className="pt-1">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-teal-900 text-white hover:bg-teal-800"
              >
                {isSubmitting ? 'Autenticando...' : 'Entrar no SIIBS'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
