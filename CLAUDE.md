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
- `App` — holds the `transactions` array (`{ id, date, description, amount, type, category }`) and passes it down
  - `Summary` — computes and displays total income, total expenses, and balance from `transactions`
  - `TransactionForm` — owns its own form state; calls `onAdd(transaction)` prop when submitted
  - `TransactionList` — owns its own filter state (`filterType`, `filterCategory`); renders the filtered table

`categories` is a static constant defined locally in both `TransactionForm` and `TransactionList`: food, housing, utilities, transport, entertainment, salary, other.

Amounts are color-coded: green for income, red for expenses.
