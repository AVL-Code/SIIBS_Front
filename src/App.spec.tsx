import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App';
import { APP_FEATURES } from './routes';

describe('SIIBS Frontend SPA Shell (11-tech-spec.md §3.1)', () => {
  it('renders the application shell in pt-BR and registers all bounded context features', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /SIIBS — Assistência Social/i })).toBeDefined();
    expect(APP_FEATURES).toEqual(['auth', 'registry', 'assistance', 'audit']);
  });
});
