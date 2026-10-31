import { z } from 'zod';

export type RoleCode = 'SYSTEM_ADMIN' | 'SOCIAL_OPERATOR' | 'EDUCATION_OPERATOR';

export const ROLE_LABELS_PT: Readonly<Record<RoleCode, string>> = {
  SYSTEM_ADMIN: 'Administrador do Sistema',
  SOCIAL_OPERATOR: 'Operador(a) — Assistência Social',
  EDUCATION_OPERATOR: 'Operador(a) — Cursos',
};

export interface AuthenticatedUser {
  readonly id: string;
  readonly email: string;
  readonly fullName: string;
  readonly isActive: boolean;
  readonly roles: readonly RoleCode[];
  readonly permissions: readonly string[];
}

export const loginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Informe seu e-mail institucional.')
    .email('Informe um endereço de e-mail válido.')
    .transform((val) => val.toLowerCase()),
  password: z.string().min(1, 'Informe sua senha de acesso.'),
});

export type LoginFormInput = z.infer<typeof loginFormSchema>;
