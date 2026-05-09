---
name: Finance Tracker Project Conventions
description: Key architectural facts, duplication hotspots, and design system rules for the finance-tracker React+Vite SPA
type: project
---

React + Vite SPA, no routing, no external state management, all data in-memory via App.jsx useState.

**Duplication to watch:**
- `categories` array duplicated verbatim in `TransactionForm.jsx:3` and `TransactionList.jsx:3`
- `CAT_COLORS` / `COLORS` object duplicated in `SpendingChart.jsx:3-11` (named `COLORS`) and `TransactionList.jsx:5-13` (named `CAT_COLORS`) — same values, different names
- Category color values also exist as CSS custom properties (`--cat-food`, `--cat-housing`, etc.) on `:root` in `index.css:33-40` — three-way sync risk

**Seed data bug (App.jsx:13):**
- "Freelance Work" entry has `description: "Freelance Work"` (sounds like income) but is `type: "expense"` with `category: "salary"`. Misleading to any reader.

**Summary hero labelled "30D" but filters no dates:**
- totalIncome/totalExpenses in Summary.jsx include ALL transactions regardless of date; the "· 30D" label is inaccurate for real data.

**`id` collision risk:** `handleAdd` uses `Date.now()` for IDs. Rapid consecutive adds could collide. Acceptable for a course project.

**formatDate UTC shift (TransactionList.jsx:19-23):** `new Date("YYYY-MM-DD")` parses as UTC midnight; `toLocaleDateString` in UTC-ahead timezones renders the previous day. V8 currently handles ISO strings consistently but it's a latent issue.

**Modal accessibility gap (TransactionList.jsx:41-53):**
- No `role="dialog"` or `aria-modal="true"` on the modal div
- No `aria-labelledby` connecting modal title
- No focus trap — keyboard users can Tab behind the backdrop
- No `aria-label` on the delete row button ("Del" is too terse for screen readers)

**Design system note:** `SpendingChart.jsx` hardcodes color hex values in JS instead of reading from the CSS custom properties (`--cat-food` etc.). The three-way sync (JS COLORS, JS CAT_COLORS, CSS vars) is the biggest long-term maintenance risk in the codebase.

**Amount input validation gap (TransactionForm.jsx:13):** Only checks truthiness of `amount`; a negative number or zero passes through silently.

**Why:** This is a course starter project — architectural simplicity is intentional. No Redux, no routing, no TypeScript. Keep suggestions proportional.
