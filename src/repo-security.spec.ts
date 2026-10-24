import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const FRONTEND_ROOT = path.resolve(__dirname, '..');

describe('Frontend Repository Security & Governance Policy (RNF-01, RNF-07)', () => {
  it('defines .github/CODEOWNERS covering frontend feature modules', () => {
    const codeownersPath = path.join(FRONTEND_ROOT, '.github', 'CODEOWNERS');
    expect(fs.existsSync(codeownersPath)).toBe(true);

    const content = fs.readFileSync(codeownersPath, 'utf-8');
    expect(content).toContain('/src/features/auth/');
    expect(content).toContain('/src/features/registry/');
    expect(content).toContain('/src/features/assistance/');
    expect(content).toContain('/src/features/audit/');
  });

  it('configures .github/dependabot.yml for npm and github-actions', () => {
    const dependabotPath = path.join(FRONTEND_ROOT, '.github', 'dependabot.yml');
    expect(fs.existsSync(dependabotPath)).toBe(true);

    const content = fs.readFileSync(dependabotPath, 'utf-8');
    expect(content).toContain('package-ecosystem: "npm"');
    expect(content).toContain('package-ecosystem: "github-actions"');
    expect(content).toContain('target-branch: "dev"');
  });

  it('prevents committing .env, local databases, backups, and storage/documents in .gitignore', () => {
    const gitignorePath = path.join(FRONTEND_ROOT, '.gitignore');
    const content = fs.readFileSync(gitignorePath, 'utf-8');

    expect(content).toContain('.env');
    expect(content).toContain('!.env.example');
    expect(content).toContain('storage/');
    expect(content).toContain('storage/documents/');
    expect(content).toContain('backups/');
    expect(content).toContain('*.sqlite');
    expect(content).toContain('pgdata/');
  });
});
