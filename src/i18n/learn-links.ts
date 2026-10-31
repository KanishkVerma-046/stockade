import { getCollection } from 'astro:content';
import { format } from '../lib/format';
import { isLiveEntry, postPath } from '../lib/publish-schedule';
import { resolveTopics, TOOL_LEARN_TOPICS, type LearnLinks, type LivePost, type ToolPage } from '../lib/learn-links';
import { t, type UiKey } from './ui';
import type { Locale } from './locales';

// Built at build time by each tool page and passed to its island as the
// `learn` prop, so the links are in the static HTML. Only this file touches
// astro:content; src/lib/learn-links.ts holds the testable logic.

const COLLECTION = {
  en: 'blog', es: 'blogEs', pt: 'blogPt', ja: 'blogJa', fr: 'blogFr', de: 'blogDe', ko: 'blogKo', it: 'blogIt',
} as const satisfies Record<Locale, string>;

// Each link's label describes the post it resolved to, so a topic whose
// preferred post replaces its fallback also changes its label.
const POST_LABEL: Record<string, UiKey> = {
  'market-orders-vs-limit-orders': 'learn.marketVsLimit',
  'risk-management-position-sizing': 'learn.positionSizing',
  'stop-loss-orders-explained': 'learn.stopLoss',
  'oco-and-bracket-orders': 'learn.ocoBracket',
  'backtesting-vs-paper-trading': 'learn.backtestingVsPaper',
  'paper-trading-guide': 'learn.paperTrading',
  'how-to-read-candlestick-charts': 'learn.candlesticks',
  'understanding-trading-volume': 'learn.volume',
  'rsi-indicator-overbought-oversold': 'learn.rsi',
  'macd-explained': 'learn.macd',
  'crypto-trading-for-beginners': 'learn.crypto',
  'forex-trading-for-beginners': 'learn.forex',
  'futures-trading-explained': 'learn.futures',
  'analyze-trading-performance-metrics': 'learn.performanceMetrics',
  'risk-reward-ratio-expectancy': 'learn.expectancy',
  'drawdown-recovery-math': 'learn.drawdown',
  'trading-journal-guide': 'learn.journal',
};

export interface LiveGuide extends LivePost {
  title: string;
  description: string;
}

/** Every post live at build time in this locale, with its English id. */
export async function liveGuides(locale: Locale): Promise<LiveGuide[]> {
  const entries = await getCollection(COLLECTION[locale], isLiveEntry);
  return entries.map(e => ({
    englishId: 'translationOf' in e.data ? e.data.translationOf : e.id,
    href: postPath({ locale, id: e.id }),
    title: e.data.title,
    description: e.data.description,
  }));
}

/** The `learn` prop of a tool page's island. */
export async function learnLinks(locale: Locale, page: ToolPage): Promise<LearnLinks> {
  const resolved = resolveTopics(TOOL_LEARN_TOPICS[page], await liveGuides(locale));
  const links: LearnLinks = {};
  for (const [topic, post] of Object.entries(resolved) as [keyof LearnLinks, LivePost][]) {
    const key = POST_LABEL[post.englishId];
    if (!key) throw new Error(`learn-links: no label for ${post.englishId}`);
    links[topic] = { href: post.href, label: format(t(locale, 'learn.aria'), { label: t(locale, key) }) };
  }
  return links;
}
