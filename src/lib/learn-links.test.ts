import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { LEARN_TOPICS, RELATED_GUIDES, TOOL_LEARN_TOPICS, pickLive, resolveTopics, type LivePost } from './learn-links';

const post = (englishId: string, href = `/blog/${englishId}/`): LivePost => ({ englishId, href });

describe('resolveTopics', () => {
  it('takes the preferred post when it is live', () => {
    const live = [post('drawdown-recovery-math'), post('risk-management-position-sizing')];
    expect(resolveTopics(['maxDrawdown'], live).maxDrawdown?.englishId).toBe('drawdown-recovery-math');
  });

  it('falls back while the preferred post is not live yet', () => {
    const live = [post('risk-management-position-sizing')];
    expect(resolveTopics(['maxDrawdown'], live).maxDrawdown?.englishId).toBe('risk-management-position-sizing');
  });

  it('omits a topic with no live post', () => {
    expect(resolveTopics(['journal', 'rsi'], [post('rsi-indicator-overbought-oversold')])).toEqual({
      rsi: post('rsi-indicator-overbought-oversold'),
    });
  });

  it('matches a translation by its English id and keeps its own href', () => {
    const es = post('stop-loss-orders-explained', '/es/blog/ordenes-stop-loss/');
    expect(resolveTopics(['stopLoss'], [es]).stopLoss?.href).toBe('/es/blog/ordenes-stop-loss/');
  });

  it('only resolves the topics asked for', () => {
    const live = [post('macd-explained'), post('rsi-indicator-overbought-oversold')];
    expect(Object.keys(resolveTopics(['macd'], live))).toEqual(['macd']);
  });
});

describe('pickLive', () => {
  const live = ['a', 'b', 'c', 'd', 'e', 'f'].map(id => post(id));

  it('keeps list order and skips posts that are not live', () => {
    expect(pickLive(['c', 'x', 'a'], live).map(p => p.englishId)).toEqual(['c', 'a']);
  });

  it('stops at the maximum, so an earlier post pushes the last one out', () => {
    expect(pickLive(['a', 'b', 'c', 'd', 'e', 'f'], live).map(p => p.englishId)).toEqual(['a', 'b', 'c', 'd', 'e']);
    expect(pickLive(['x', 'a', 'b'], live, 2).map(p => p.englishId)).toEqual(['a', 'b']);
  });
});

describe('RELATED_GUIDES', () => {
  it('lists at least three posts per page, none twice', () => {
    for (const ids of Object.values(RELATED_GUIDES)) {
      expect(ids.length).toBeGreaterThanOrEqual(3);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });
});

describe('LEARN_TOPICS', () => {
  it('names only English posts that exist', () => {
    const ids = new Set([...Object.values(LEARN_TOPICS).flat(), ...Object.values(RELATED_GUIDES).flat()]);
    for (const id of ids) expect(existsSync(`src/content/blog/${id}.md`), id).toBe(true);
  });

  it('gives every page topic a post list', () => {
    for (const topics of Object.values(TOOL_LEARN_TOPICS)) {
      for (const topic of topics) expect(LEARN_TOPICS[topic].length).toBeGreaterThan(0);
    }
  });
});
