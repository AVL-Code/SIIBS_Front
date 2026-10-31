import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LoginScreen, type AuthenticatedUser } from './index';

describe('LoginScreen UI Component (RF-14, RNF-01, 11-tech-spec.md §1.4, task-06)', () => {
  const sampleUser: AuthenticatedUser = {
    id: '018f0000-0000-7000-8000-000000000001',
    email: 'operador@siibs.local',
    fullName: 'Maria Assistente Social',
    isActive: true,
    roles: ['SOCIAL_OPERATOR'],
    permissions: ['registry:person:read', 'assistance:household:read'],
  };

  it('renders pt-BR login form controls and institutional security guidance', () => {
    render(<LoginScreen />);

    expect(screen.getByLabelText(/E-mail institucional/i)).toBeDefined();
    expect(screen.getByLabelText(/Senha de acesso/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /Entrar no SIIBS/i })).toBeDefined();
    expect(screen.getByText(/Núcleo de Identidade e Acesso/i)).toBeDefined();
  });

  it('validates empty fields with pt-BR messages before calling submitLogin', async () => {
    const submitLogin = vi.fn();
    render(<LoginScreen submitLogin={submitLogin} />);

    fireEvent.click(screen.getByRole('button', { name: /Entrar no SIIBS/i }));

    await waitFor(() => {
      expect(screen.getByText(/Informe seu e-mail institucional/i)).toBeDefined();
      expect(screen.getByText(/Informe sua senha de acesso/i)).toBeDefined();
    });

    expect(submitLogin).not.toHaveBeenCalled();
  });

  it('submits normalized credentials and calls onLoginSuccess on valid authentication', async () => {
    const submitLogin = vi.fn().mockResolvedValue({ user: sampleUser });
    const onLoginSuccess = vi.fn();

    render(<LoginScreen submitLogin={submitLogin} onLoginSuccess={onLoginSuccess} />);

    fireEvent.change(screen.getByLabelText(/E-mail institucional/i), {
      target: { value: '  OPERADOR@SIIBS.LOCAL ' },
    });
    fireEvent.change(screen.getByLabelText(/Senha de acesso/i), {
      target: { value: 'StrongPassword123!' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Entrar no SIIBS/i }));

    await waitFor(() => {
      expect(submitLogin).toHaveBeenCalledWith({
        email: 'operador@siibs.local',
        password: 'StrongPassword123!',
      });
      expect(onLoginSuccess).toHaveBeenCalledWith(sampleUser);
    });
  });

  it('displays an accessible alert when authentication fails (e.g. inactive account or invalid password)', async () => {
    const submitLogin = vi
      .fn()
      .mockRejectedValue(new Error('Conta de usuário inativa ou credenciais inválidas.'));

    render(<LoginScreen submitLogin={submitLogin} />);

    fireEvent.change(screen.getByLabelText(/E-mail institucional/i), {
      target: { value: 'inativo@siibs.local' },
    });
    fireEvent.change(screen.getByLabelText(/Senha de acesso/i), {
      target: { value: 'Password123!' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Entrar no SIIBS/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert').textContent).toContain(
        'Conta de usuário inativa ou credenciais inválidas.',
      );
    });
  });
});
