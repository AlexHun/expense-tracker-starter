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
- `App` — holds the `transactions` array (`{ id, date, description, amount, type, category }`); renders the topbar, hero, sections, and footer
  - `Summary` — three-cell hero: Net Balance (with `▲/▼ %` retention pill), Income · 30D, Expenses · 30D
  - `SpendingChart` — recharts `BarChart` of expenses summed and sorted by category
  - `TransactionForm` — owns its own form state; calls `onAdd(transaction)` prop when submitted
  - `TransactionList` — owns its own filter state (`filterType`, `filterCategory`); renders the filtered table with a confirm-delete modal

`categories` is a static constant duplicated in `TransactionForm` and `TransactionList`: food, housing, utilities, transport, entertainment, salary, other.

`CAT_COLORS` (per-category swatch / bar fill) is duplicated in `SpendingChart.jsx` and `TransactionList.jsx` — keep them in sync.

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

## Skills

- `.claude/skills/deploy/` — project-local deploy skill (runs `npm test` → `npm run build` → `npm run deploy:staging`). Note: `test` and `deploy:staging` scripts are not yet defined in `package.json`; the skill prompts before skipping tests.
- `.agents/skills/frontend-design/` — vendored copy of the frontend-design skill, hash-pinned via `skills-lock.json`.
