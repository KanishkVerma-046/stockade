// Per-trade statistics for the analytics dashboard, kept out of the .tsx
// island so they are testable without a JSX transform.

/**
 * Mean P&L of the losing trades, negative as stored, or null when there are
 * none. Only pnl > 0 is a win, so a trade closing exactly flat counts as a
 * loss — the same split as the dashboard's win rate and Losing count.
 */
export function averageLoss(trades: readonly { pnl: number }[]): number | null {
  const losses = trades.filter(t => t.pnl <= 0);
  return losses.length ? losses.reduce((s, t) => s + t.pnl, 0) / losses.length : null;
}
