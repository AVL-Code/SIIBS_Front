# Frontend Design & UI Skills (`frontend/.agents/skills/`)

Place frontend-specific design, UX, and UI development skills here (e.g., React + Vite + TypeScript patterns, Tailwind CSS + shadcn/ui design system, accessibility, React Hook Form + Zod validation, webcam/photo capture UX). Each skill must live in `<skill-name>/SKILL.md` with YAML frontmatter (`name`, `description`).

## How Agents Discover These Skills
- Discovered natively when operating inside `frontend/` and globally mapped at the root via [`SIIBS/.agents/skills.json`](../../.agents/skills.json).
- Mandatory inspection target for the **Frontend React Agent** (and **QA & Security Agent** when writing Playwright E2E UI tests).
