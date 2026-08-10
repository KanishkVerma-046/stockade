import { describe, expect, it } from 'vitest';
import { pickRelated, type RelatedCandidate } from './related-posts';

function post(id: string, tags: string[], date: string): RelatedCandidate {
  return { id, data: { tags, date: new Date(date) } };
}

describe('pickRelated', () => {
  const rsi = post('rsi', ['Indicators'], '2026-04-20');
  const macd = post('macd', ['Indicators'], '2026-04-27');
  const vwap = post('vwap', ['Indicators', 'Strategy'], '2026-05-04');
  const risk = post('risk', ['Risk Management'], '2026-06-29');
  const plan = post('plan', ['Strategy', 'Risk Management'], '2026-06-15');
  const all = [rsi, macd, vwap, risk, plan];

  it('never includes the current post', () => {
    const result = pickRelated(rsi, all);
    expect(result.map(p => p.id)).not.toContain('rsi');
  });

  it('ranks posts sharing more tags first', () => {
    const result = pickRelated(plan, all, 3);
    // vwap shares "Strategy", risk shares "Risk Management" — both score 1.
    // rsi and macd share nothing.
    expect(result.slice(0, 2).map(p => p.id).sort()).toEqual(['risk', 'vwap']);
  });

  it('breaks ties by recency, newest first', () => {
    // vwap is ["Indicators", "Strategy"], so rsi and macd each share
    // "Indicators" and plan shares "Strategy" — three posts all scoring 1.
    // Only recency separates them.
    const result = pickRelated(vwap, all, 3);
    expect(result.map(p => p.id)).toEqual(['plan', 'macd', 'rsi']);
  });

  it('falls back to most recent posts when nothing shares a tag', () => {
    const orphan = post('orphan', ['Forex'], '2026-07-01');
    const result = pickRelated(orphan, [...all, orphan], 2);
    expect(result.map(p => p.id)).toEqual(['risk', 'plan']);
  });

  it('respects the limit', () => {
    expect(pickRelated(rsi, all, 2)).toHaveLength(2);
  });

  it('returns fewer than the limit when the collection is small', () => {
    expect(pickRelated(rsi, [rsi, macd], 3)).toHaveLength(1);
  });
});
