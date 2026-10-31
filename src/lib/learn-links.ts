// "Learn" links from the tool pages' UI to Learning Center posts.
//
// Each topic names the English posts that explain one UI element, best first.
// A page resolves a topic to the first of them that is live in its own
// locale's collection (the same isLiveEntry filter the blog index uses), so a
// scheduled post replaces its fallback on its publish date with no code change,
// and a topic with no live post renders no link. Translated pages match on
// `translationOf`, so they only ever link to their own locale.

export type LearnTopic =
  | 'orderTypes'
  | 'quantity'
  | 'stopLoss'
  | 'takeProfit'
  | 'mode'
  | 'candlesticks'
  | 'volume'
  | 'rsi'
  | 'macd'
  | 'crypto'
  | 'forex'
  | 'futures'
  | 'winRate'
  | 'avgLoss'
  | 'maxDrawdown'
  | 'journal';

export const LEARN_TOPICS: Record<LearnTopic, readonly string[]> = {
  orderTypes:   ['market-orders-vs-limit-orders'],
  quantity:     ['risk-management-position-sizing'],
  stopLoss:     ['stop-loss-orders-explained'],
  takeProfit:   ['oco-and-bracket-orders'],
  mode:         ['backtesting-vs-paper-trading', 'paper-trading-guide'],
  candlesticks: ['how-to-read-candlestick-charts'],
  volume:       ['understanding-trading-volume'],
  rsi:          ['rsi-indicator-overbought-oversold'],
  macd:         ['macd-explained'],
  crypto:       ['crypto-trading-for-beginners'],
  forex:        ['forex-trading-for-beginners'],
  futures:      ['futures-trading-explained'],
  winRate:      ['analyze-trading-performance-metrics'],
  avgLoss:      ['risk-reward-ratio-expectancy'],
  maxDrawdown:  ['drawdown-recovery-math', 'risk-management-position-sizing'],
  journal:      ['trading-journal-guide', 'analyze-trading-performance-metrics'],
};

// The topics each tool page's island links. EMA and VWAP have none: neither
// chart has a legend to put them in, so the Related guides section covers them.
export const TOOL_LEARN_TOPICS = {
  simulator:      ['orderTypes', 'quantity', 'stopLoss', 'takeProfit', 'mode', 'candlesticks', 'volume', 'rsi', 'macd'],
  chartSimulator: ['candlesticks', 'volume', 'rsi', 'macd'],
  markets:        ['crypto', 'forex', 'futures', 'volume'],
  analytics:      ['winRate', 'avgLoss', 'maxDrawdown', 'journal'],
} as const satisfies Record<string, readonly LearnTopic[]>;

export type ToolPage = keyof typeof TOOL_LEARN_TOPICS;

// The "Related guides" section under each tool page: English post ids in order
// of preference. The page shows the first RELATED_GUIDES_MAX that are live, so
// a scheduled post listed early pushes the last one out on its publish date.
export const RELATED_GUIDES: Record<ToolPage, readonly string[]> = {
  simulator: [
    'paper-trading-guide', 'backtesting-vs-paper-trading', 'moving-averages-ema-vs-sma', 'vwap-trading-strategy',
    'market-orders-vs-limit-orders', 'atr-volatility-stops', 'how-to-build-a-trading-plan',
  ],
  chartSimulator: [
    'how-to-read-candlestick-charts', 'support-and-resistance-levels', 'moving-averages-ema-vs-sma',
    'vwap-trading-strategy', 'rsi-indicator-overbought-oversold',
  ],
  markets: [
    'crypto-trading-for-beginners', 'forex-trading-for-beginners', 'futures-trading-explained',
    'understanding-trading-volume', 'day-trading-vs-swing-trading',
  ],
  analytics: [
    'analyze-trading-performance-metrics', 'drawdown-recovery-math', 'trading-journal-guide',
    'risk-reward-ratio-expectancy', 'risk-management-position-sizing', 'common-day-trading-mistakes',
  ],
};

export const RELATED_GUIDES_MAX = 5;

/** The first `max` posts of `ids` that are live, in `ids` order. */
export function pickLive<T extends LivePost>(ids: readonly string[], livePosts: readonly T[], max = RELATED_GUIDES_MAX): T[] {
  const byEnglishId = new Map(livePosts.map(p => [p.englishId, p]));
  return ids.flatMap(id => byEnglishId.get(id) ?? []).slice(0, max);
}

export interface LearnLink {
  href: string;
  // Accessible name and tooltip; the visible text is a "?".
  label: string;
}

export type LearnLinks = Partial<Record<LearnTopic, LearnLink>>;

// A live post in one locale: `englishId` is the English post's id (its own id
// in English, `translationOf` in a translation).
export interface LivePost {
  englishId: string;
  href: string;
}

/** The live post each topic resolves to, keyed by topic. Topics with none are absent. */
export function resolveTopics(
  topics: readonly LearnTopic[],
  livePosts: readonly LivePost[],
): Partial<Record<LearnTopic, LivePost>> {
  const byEnglishId = new Map(livePosts.map(p => [p.englishId, p]));
  const out: Partial<Record<LearnTopic, LivePost>> = {};
  for (const topic of topics) {
    const hit = LEARN_TOPICS[topic].map(id => byEnglishId.get(id)).find(Boolean);
    if (hit) out[topic] = hit;
  }
  return out;
}
