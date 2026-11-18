# SIIBS Frontend — React Agent Rules (`frontend/AGENTS.md`)

> **Scope:** Applies to all work inside `frontend/` (`AVL-Code/SIIBS_Front` — React + Vite + TypeScript 5+ strict + Tailwind CSS + shadcn/ui).
> **Full Playbook:** Always read [`../docs/agents/frontend.md`](../docs/agents/frontend.md), [`../docs/sdd/05-ux.md`](../docs/sdd/05-ux.md), and [`../docs/sdd/11-tech-spec.md`](../docs/sdd/11-tech-spec.md).

---

## 1. Mandatory Frontend Skill Activation (`frontend/.agents/skills/` & `../.agents/skills/`)
Before designing or implementing any UI component, page, or form:
1. List and check all skills inside `frontend/.agents/skills/` (focused on UI/UX design and frontend engineering) and general skills in `../.agents/skills/`.
2. Read the `SKILL.md` of every applicable skill and apply its design tokens, layout patterns, and component rules.

---

## 2. Frontend Non-Negotiable Architecture & UX Rules
1. **Language Split:**
   - **Codebase (100% English):** All folders (`src/features/{auth,registry,assistance,audit}`), files (`kebab-case`), React components (`PascalCase`), hooks/variables (`camelCase`), Zod schemas, and `data-testid` attributes MUST be in English.
   - **User-Facing UI (100% Portuguese `pt-BR`):** All labels, buttons, placeholders, validation messages, alerts, and empty states visible to the operator MUST be in clear, accessible Brazilian Portuguese (`05-ux.md`).
2. **Contract-First Handshake with Backend:**
   - Never invent API payloads or endpoints unilaterally. Align the **Integration Contract** with the **Backend NestJS Agent** prior to implementation so every button, form submission, search filter, file/photo upload, and error state matches the exact `/api/v1/...` route and Zod schema.
3. **UX & Shared Data Rules (`05-ux.md`, `DA-003`, `DA-007`, `DA-014`):**
   - **Simplicity & Few Steps:** Keep forms clean, direct, and low-friction for social workers and administrative staff.
   - **Person Photo Capture & Display (`DA-014`):** Support optional photo capture via device webcam or image file upload with preview and client/server compression (`WebP`/`JPEG` ≤ 500 KB). Display the person's photo avatar in search results, duplicate warnings, and profile headers to prevent homonym confusion.
   - **Record Reuse & Duplicate Prevention (`RF-03`, `RF-06`):** Before creating a new `Person`, guide the user through search (by name, birth date, or document). When an existing `Person` is found, show basic authorized info + photo and a clear button to reuse the person in Social without duplicating `Person`. Indicate if an active `Household` link already exists (respecting permissions).
   - **Shared Data Modification Banner (`DA-008`):** Whenever editing shared `Person` data, photo, or general documents, display an explicit notice that changes immediately reflect across all modules using that `Person` (Social and future Courses) and are audited.
   - **Privacy & Permission Isolation (`RNF-02`):** Hide or disable actions when the logged-in user lacks permission, while relying on backend `403 Forbidden` enforcement as the source of truth. Never expose `assistance` data in general `registry` views for unauthorized profiles.
4. **Testability:** Every interactive button, input, dialog, and status alert must include deterministic `data-testid` attributes agreed upon during the Contract-First Handshake so the **QA & Security Agent** can automate E2E tests reliably.

---

## 3. Doubt Escalation
- If any UX flow, field requirement, button behavior, or permission visibility rule is ambiguous, stop and ask the **Orchestrator Agent**. Never assume or invent requirements.
