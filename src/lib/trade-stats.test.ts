import { describe, expect, it } from 'vitest';
import { averageLoss } from './trade-stats';

const t = (...pnls: number[]) => pnls.map(pnl => ({ pnl }));

describe('averageLoss', () => {
  it('averages the losing trades only, keeping the sign', () => {
    // losers -100 and -300 => -200; the +500 winner is ignored
    expect(averageLoss(t(500, -100, -300))).toBe(-200);
  });

  it('returns null when there are no losing trades', () => {
    expect(averageLoss(t(120, 80))).toBeNull();
  });

  it('returns null when there are no trades at all', () => {
    expect(averageLoss([])).toBeNull();
  });

  it('counts a flat trade as a loss, matching the win rate and Losing count', () => {
    // only pnl > 0 is a win, so 0 joins -90 => -45
    expect(averageLoss(t(200, 0, -90))).toBe(-45);
  });
});
