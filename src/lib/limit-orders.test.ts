import { describe, it, expect } from 'vitest';
import { isMarketable, isTriggered } from './limit-orders';

// These two predicates decide whether a limit order fills on arrival or rests
// on the book. Getting either backwards silently turns limit orders back into
// market orders, which is exactly the bug these tests exist to prevent.

describe('isMarketable', () => {
  it('rests a buy limit placed below the market', () => {
    expect(isMarketable('buy', 95, 100)).toBe(false);
  });

  it('fills a buy limit placed above the market immediately', () => {
    expect(isMarketable('buy', 105, 100)).toBe(true);
  });

  it('rests a sell limit placed above the market', () => {
    expect(isMarketable('sell', 105, 100)).toBe(false);
  });

  it('fills a sell limit placed below the market immediately', () => {
    expect(isMarketable('sell', 95, 100)).toBe(true);
  });

  it('treats a limit exactly at the market as marketable on both sides', () => {
    expect(isMarketable('buy', 100, 100)).toBe(true);
    expect(isMarketable('sell', 100, 100)).toBe(true);
  });
});

describe('isTriggered', () => {
  const buy = { action: 'buy' as const, limitPrice: 95 };
  const sell = { action: 'sell' as const, limitPrice: 105 };

  it('holds a resting buy while price stays above the limit', () => {
    expect(isTriggered(buy, 99)).toBe(false);
    expect(isTriggered(buy, 95.01)).toBe(false);
  });

  it('fires a resting buy once price falls to or through the limit', () => {
    expect(isTriggered(buy, 95)).toBe(true);
    expect(isTriggered(buy, 94.2)).toBe(true);
  });

  it('holds a resting sell while price stays below the limit', () => {
    expect(isTriggered(sell, 101)).toBe(false);
    expect(isTriggered(sell, 104.99)).toBe(false);
  });

  it('fires a resting sell once price rises to or through the limit', () => {
    expect(isTriggered(sell, 105)).toBe(true);
    expect(isTriggered(sell, 106.8)).toBe(true);
  });
});

describe('placement and trigger agree', () => {
  // An order that rests must not be instantly triggered by the very price it
  // was placed at — that would reproduce the old fill-immediately behaviour
  // through a different route.
  it('never triggers a freshly rested order at the placement price', () => {
    const market = 100;
    for (const limitPrice of [80, 90, 95, 99.99]) {
      expect(isMarketable('buy', limitPrice, market)).toBe(false);
      expect(isTriggered({ action: 'buy', limitPrice }, market)).toBe(false);
    }
    for (const limitPrice of [100.01, 105, 110, 130]) {
      expect(isMarketable('sell', limitPrice, market)).toBe(false);
      expect(isTriggered({ action: 'sell', limitPrice }, market)).toBe(false);
    }
  });
});
