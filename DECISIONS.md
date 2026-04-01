# Candidate Decisions & Notes

Please use this file to briefly outline your technical choices and the rationale behind them.

## 1. State Management & Architecture
*Why did you structure your state the way you did? Which patterns did you choose for handling the flaky API requests, loading states, and error handling?*

All UI state lives in a single `useProducts` hook — no external library needed, the data flow is simple enough that prop-passing keeps `App.tsx` clean.

For the flaky API, I leaned into React 19's `use()` + Suspense pattern. The fetch promise is created with `useMemo` and passed directly to `ProductGrid`, which suspends while pending — loading states are handled declaratively with no manual `isLoading` flags.

Errors are caught by a class-based `ErrorBoundary` that auto-retries up to 2 times with increasing delays (1.5s, 3s). A `retryToken` counter busts the `useMemo` cache on each retry, and `resetKey` resets the error state on every navigation — so stale errors never carry over.

## 2. Trade-offs and Omissions
*What did you intentionally leave out given the constraints of a take-home assignment? If you had more time, what would you prioritize next?*

- **URL sync** — state lives in React, not the URL, so a refresh resets everything. This would be my first fix — it also makes the app shareable and browser-back-friendly.
- **Tests** — skipped for time. `useDebounce`, the `ErrorBoundary` retry logic, and `buildPageWindows` are the obvious starting points.
- **Accessibility** — pagination buttons need `aria-label` attributes; the `'…'` ellipsis should be a `<span>`, not a `<button>` (see edge cases).

Next priority: URL sync → ellipsis bug → tests → real API.

## 3. AI Usage
*How did you utilize AI tools (ChatGPT, Copilot, Cursor, etc.) during this assignment? Provide a brief summary of how they assisted you.*

Used GitHub Copilot for boilerplate acceleration (`useDebounce`, skeleton component) and to check my `use()` + Suspense approach on the newer React 19 API. The architecture — single state hook, promise-as-prop, `ErrorBoundary` for retries — was planned before writing any code.

## 4. Edge Cases Identified
*Did you notice any edge cases or bugs that you didn't have time to fix? Please list them here.*

- **Ellipsis in pagination is a clickable button** — `'…'` items render as `<button>` and call `onPageChange('…' as number)`, setting page to `NaN`. Should be a non-interactive `<span>`.
- **Mock data re-randomises on every refresh** — `Math.random()` runs at module load time, so each hard refresh produces a different dataset, which can mask pagination/filter bugs.
- **Search silently no-ops under 3 characters** — no indicator that a minimum length is required; the input just doesn't do anything until 3+ chars are typed.
