# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## Architecture

React + Vite single-page app — a finance tracker built as a starter project for a Claude Code course. No routing, no external state management, no backend — all data is in-memory.

**Component tree:**
- `App` — holds the `transactions` array (`{ id, date, description, amount, type, category }`) and the `toasts` queue; renders the topbar, hero, sections, `Toaster`, and footer. `handleAdd`/`handleDelete` fire `notify(tone, message)` so every mutation surfaces a toast.
  - `Summary` — three-cell hero: Net Balance · 30D (with `▲/▼ %` retention pill), Income · 30D, Expenses · 30D. Single-pass aggregation with a 30-day cutoff.
  - `SpendingChart` — recharts `BarChart` of expenses summed and sorted by category
  - `TransactionForm` — owns its own form state plus an `errors` map; rejects empty descriptions and non-positive amounts, surfacing a contextual `// …` error strip. `noValidate` on the form so our messaging wins over the browser's.
  - `TransactionList` — owns its own filter state (`filterType`, `filterCategory`); renders the filtered table with a confirm-delete modal. Modal is a real `role="dialog"` with `aria-modal`, autofocuses Cancel, and closes on `Escape`.
  - `Toaster` / `Toast` — fixed-position `aria-live="polite"` stack. Each toast auto-dismisses after 3s; tone (`pos`/`neg`) drives lime vs. coral tinting.

Shared constants live in `src/constants.js`:
- `categories` — food, housing, utilities, transport, entertainment, salary, other
- `CAT_COLORS` — per-category swatch / bar fill, consumed by `SpendingChart`, `TransactionList`, and anywhere else a category needs a color

## Design system

Dark "trading terminal" theme. All tokens are CSS custom properties on `:root` in `src/index.css`:
- Surfaces: `--bg`, `--bg-elev`, `--surface`, `--surface-2`, `--surface-hover`
- Text: `--fg`, `--fg-soft`, `--fg-faint`, `--fg-mute`
- Signals: `--pos` (lime `#c5f04a`, income), `--neg` (coral `#ff8a78`, expenses), `--neg-deep` (`#c83a2c`, destructive hover), `--accent` (lime, single sharp note)

Fonts loaded from Google Fonts in `index.html`:
- `IBM Plex Mono` for figures, labels, chips, and form numerics
- `Manrope` for body copy and section titles

Tabular numerals (`font-feature-settings: "tnum"`) are used wherever money or counts appear. Section heads share a common pattern: lime numbered tag (`02 / chart`), sans-serif title, fade-out rule, right-aligned mono meta.

Amounts are color-coded: lime (`--pos`) for income, coral (`--neg`) for expenses.

Form fields use `<span class="select-wrapper">` to host a CSS-mask chevron via `::after`; the chevron rotates 180° and tints to `--accent` on `:focus-within`. Invalid inputs get an `.error` class (coral inset shadow + tinted bg); the contextual error message renders below the form as `<p class="form-error" role="alert">`.

## Skills

- `.claude/skills/deploy/` — project-local deploy skill (runs `npm test` → `npm run build` → `npm run deploy:staging`). Note: `test` and `deploy:staging` scripts are not yet defined in `package.json`; the skill prompts before skipping tests.
- `.claude/skills/frontend-design/` — project-local copy of the frontend-design skill.
- `.agents/skills/frontend-design/` — vendored copy of the frontend-design skill, hash-pinned via `skills-lock.json`.
