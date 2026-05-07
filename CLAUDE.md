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

React + Vite single-page app — a finance tracker built as a starter project for a Claude Code course (intentionally imperfect, with known bugs).

All application logic lives in `src/App.jsx` using React hooks (`useState`). There is no routing, no external state management, and no backend — all data is in-memory with hardcoded sample transactions.

**State managed in App.jsx:**
- `transactions` — array of `{ id, date, description, amount, type, category }`
- Form inputs: `description`, `amount`, `type`, `category`
- Filters: `filterType`, `filterCategory`

**Categories:** food, housing, utilities, transport, entertainment, salary, other

The summary dashboard computes balance, total income, and total expenses from the filtered transaction list. Amounts are color-coded: green for income, red for expenses.
