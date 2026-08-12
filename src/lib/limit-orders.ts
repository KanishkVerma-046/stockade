// Resting-limit-order rules for the trading simulator.
//
// Kept out of the component so the fill decision is testable on its own: if
// either predicate is wrong, limit orders quietly degrade back into market
// orders, which is a correctness bug the UI does not make obvious.

/**
 * A limit order that was not marketable when placed, so it rests until the
 * market trades through its price.
 *
 * Deliberately not persisted across reloads — the synthetic price series is
 * regenerated on mount, so a restored order would fire against a series it was
 * never placed on.
 */
export interface PendingOrder {
  id: string;
  action: 'buy' | 'sell';
  qty: number;
  limitPrice: number;
  placedAt: number;
}

/**
 * A buy limit only rests below the market and a sell limit only rests above it.
 * Placed on the other side it is immediately marketable, and a real venue would
 * fill it at once at the better prevailing price rather than parking it.
 */
export function isMarketable(
  action: 'buy' | 'sell',
  limitPrice: number,
  marketPrice: number,
): boolean {
  return action === 'buy' ? limitPrice >= marketPrice : limitPrice <= marketPrice;
}

/**
 * A resting order triggers once the market reaches its price: a buy limit when
 * price falls to or below it, a sell limit when price rises to or above it.
 */
export function isTriggered(
  order: Pick<PendingOrder, 'action' | 'limitPrice'>,
  marketPrice: number,
): boolean {
  return order.action === 'buy'
    ? marketPrice <= order.limitPrice
    : marketPrice >= order.limitPrice;
}
