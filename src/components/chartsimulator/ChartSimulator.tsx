import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  createChart, CandlestickSeries, HistogramSeries, LineSeries, createSeriesMarkers,
  type IChartApi, type ISeriesApi, type UTCTimestamp, type LineData, type HistogramData,
} from 'lightweight-charts';

// ── Types ─────────────────────────────────────────────────────────────────────

interface Candle {
  time: number; open: number; high: number; low: number; close: number; volume: number;
}
type PatternType  = 'bullish' | 'bearish' | 'neutral';
type PatternGroup = 'bullish-reversal' | 'bearish-reversal' | 'neutral' | 'continuation';
interface PatternDef {
  id: string; name: string; shortName: string;
  category: 'single' | 'double' | 'triple';
  type: PatternType; group: PatternGroup;
  description: string; signal: string;
  formation: string[]; psychology: string; characteristics: string[];
}
interface Detected { patternId: string; startIdx: number; endIdx: number; }
interface MarkerSpec {
  time: UTCTimestamp; position: 'aboveBar' | 'belowBar' | 'inBar';
  color: string; shape: 'arrowUp' | 'arrowDown' | 'circle' | 'square';
  text?: string; size?: number; patternId?: string;
}
interface OhlcvData { open: number; high: number; low: number; close: number; volume: number; }

// ── Symbols & Timeframes ──────────────────────────────────────────────────────

const SYMBOLS = [
  { id: 'AAPL',  label: 'AAPL',    basePrice: 187.42,  group: 'Stocks' },
  { id: 'TSLA',  label: 'TSLA',    basePrice: 248.11,  group: 'Stocks' },
  { id: 'MSFT',  label: 'MSFT',    basePrice: 415.22,  group: 'Stocks' },
  { id: 'NVDA',  label: 'NVDA',    basePrice: 875.63,  group: 'Stocks' },
  { id: 'AMZN',  label: 'AMZN',    basePrice: 192.77,  group: 'Stocks' },
  { id: 'GOOGL', label: 'GOOGL',   basePrice: 175.98,  group: 'Stocks' },
  { id: 'BTC',   label: 'BTC/USD', basePrice: 67843,   group: 'Crypto' },
  { id: 'ETH',   label: 'ETH/USD', basePrice: 3412,    group: 'Crypto' },
  { id: 'EUR',   label: 'EUR/USD', basePrice: 1.0872,  group: 'Forex'  },
  { id: 'GBP',   label: 'GBP/USD', basePrice: 1.2714,  group: 'Forex'  },
  { id: 'SPX',   label: 'SPX',     basePrice: 5248.75, group: 'Index'  },
] as const;

const TIMEFRAMES = [
  { id: '15m', label: '15m', candles: 300, initial: 60,  deltaMs: 15 * 60_000 },
  { id: '1H',  label: '1H',  candles: 200, initial: 50,  deltaMs: 60 * 60_000 },
  { id: '4H',  label: '4H',  candles: 150, initial: 40,  deltaMs: 4  * 60 * 60_000 },
  { id: '1D',  label: '1D',  candles: 100, initial: 30,  deltaMs: 24 * 60 * 60_000 },
  { id: '1W',  label: '1W',  candles: 80,  initial: 25,  deltaMs: 7  * 24 * 60 * 60_000 },
] as const;

const SPEED_MAP: Record<number, number> = { 1: 1200, 2: 600, 5: 240, 10: 120 };

// ── Patterns ──────────────────────────────────────────────────────────────────

const TYPE_COLOR: Record<PatternType, string>  = { bullish: '#22c55e', bearish: '#ef4444', neutral: '#f59e0b' };
const GROUP_ORDER: PatternGroup[] = ['bullish-reversal', 'bearish-reversal', 'neutral', 'continuation'];
const GROUP_LABEL: Record<PatternGroup, string> = {
  'bullish-reversal': 'Bullish Reversal',
  'bearish-reversal': 'Bearish Reversal',
  'neutral':          'Neutral / Indecision',
  'continuation':     'Continuation',
};

const PATTERNS: PatternDef[] = [
  {
    id: 'doji', name: 'Doji', shortName: 'Doji', category: 'single', type: 'neutral', group: 'neutral',
    description: 'Open and close are nearly equal, creating a cross-like shape with a tiny or nonexistent body.',
    signal: 'Market indecision — neither buyers nor sellers gained control. Watch for a directional break.',
    formation: ['Open and close prices are nearly identical', 'Can have upper and/or lower shadows of varying length'],
    psychology: 'Neither buyers nor sellers could establish dominance during the session. The market is at equilibrium, often preceding a significant move.',
    characteristics: ['Body < 10% of total high-low range', 'Can appear at trend reversals or continuations', 'Most powerful at trend extremes with confirmation'],
  },
  {
    id: 'spinning_top', name: 'Spinning Top', shortName: 'Spin Top', category: 'single', type: 'neutral', group: 'neutral',
    description: 'Small real body with roughly equal and significant upper and lower shadows.',
    signal: 'Market indecision — neither side dominated. Often signals a pause before the next move.',
    formation: ['Small body — less than 25% of the total range', 'Roughly equal upper and lower shadows', 'Body is centered in the range'],
    psychology: 'Both bulls and bears pushed hard but neither could sustain control. The tug of war is unresolved.',
    characteristics: ['Body < 25% of total range', 'Upper and lower shadows roughly equal', 'Signals pause, not necessarily reversal'],
  },
  {
    id: 'hammer', name: 'Hammer', shortName: 'Hammer', category: 'single', type: 'bullish', group: 'bullish-reversal',
    description: 'Small body at the top of the range with a long lower shadow at least 2× the body. Little or no upper shadow.',
    signal: 'Bullish reversal after a downtrend. Sellers pushed price down, but buyers overwhelmed them.',
    formation: ['Small body forms near the top of the session', 'Lower shadow is at least 2× the body length', 'Little to no upper shadow'],
    psychology: 'Sellers drove price down sharply, but buyers swept in and rallied it back close to the open. Bearish pressure is exhausting at these lows.',
    characteristics: ['Appears after a downtrend', 'Lower shadow ≥ 2× body length', 'Upper shadow minimal or absent', 'Bullish color preferred but not required'],
  },
  {
    id: 'inverted_hammer', name: 'Inverted Hammer', shortName: 'Inv. Hammer', category: 'single', type: 'bullish', group: 'bullish-reversal',
    description: 'Small body at the bottom of the range with a long upper shadow. Found after a downtrend.',
    signal: 'Potential bullish reversal. Buyers tested higher prices — a shift in momentum may be forming.',
    formation: ['Small body near the lower end of the session range', 'Long upper shadow — at least 2× the body', 'Little to no lower shadow'],
    psychology: 'Buyers pushed price sharply higher but were rejected. However, the attempt signals growing buying interest and willingness to push prices up.',
    characteristics: ['Appears after a downtrend', 'Upper shadow ≥ 2× body', 'Requires bullish confirmation next session', 'Less reliable than Hammer alone'],
  },
  {
    id: 'marubozu_bull', name: 'Bullish Marubozu', shortName: 'Bull Maru', category: 'single', type: 'bullish', group: 'continuation',
    description: 'Long bullish candle with no upper or lower shadows. Opens at the low, closes at the high.',
    signal: 'Strong bullish momentum — bulls controlled the entire session without hesitation.',
    formation: ['Candle opens at the session low', 'Candle closes at the session high', 'No upper or lower shadows present'],
    psychology: 'Complete bull dominance. Sellers found no entry point — buyers pushed price from open to close without any pullback.',
    characteristics: ['Open = Low, Close = High', 'No shadows', 'Can signal continuation or start of a new trend', 'Strong conviction move'],
  },
  {
    id: 'bullish_engulfing', name: 'Bullish Engulfing', shortName: 'B. Engulf', category: 'double', type: 'bullish', group: 'bullish-reversal',
    description: 'A bearish candle followed by a larger bullish candle whose body completely engulfs the prior body.',
    signal: 'Strong bullish reversal. Buyers overwhelmed sellers decisively — most powerful at downtrend lows.',
    formation: ['Day 1: Bearish candle of any size', 'Day 2 opens at or below Day 1 close', 'Day 2 closes above Day 1 open', 'Day 2 body fully contains Day 1 body'],
    psychology: 'After a bearish session, buyers erupted — opening lower but closing above the entire prior range. A decisive and complete shift in power from sellers to buyers.',
    characteristics: ['Day 2 body must fully engulf Day 1 body', 'Most powerful after a downtrend', 'Higher volume on Day 2 strengthens signal', 'One of the most reliable two-candle patterns'],
  },
  {
    id: 'piercing_line', name: 'Piercing Line', shortName: 'Piercing', category: 'double', type: 'bullish', group: 'bullish-reversal',
    description: 'A bearish candle, then a bullish candle that opens below the prior low and closes above the midpoint.',
    signal: 'Bullish reversal after a downtrend. Buyers reclaimed more than half the prior session\'s loss.',
    formation: ['Day 1: Bearish candle', 'Day 2 gaps open below Day 1 low', 'Day 2 closes above the midpoint of Day 1 body', 'Day 2 does not fully engulf Day 1'],
    psychology: 'The gap-down open shows continued bearish sentiment, but buyers pushed back strongly enough to recover more than half the prior day\'s decline — a significant effort.',
    characteristics: ['Day 2 must close above Day 1 midpoint but below Day 1 open', 'Gap down open required', 'Weaker than Bullish Engulfing', 'Needs confirmation'],
  },
  {
    id: 'harami_bull', name: 'Bullish Harami', shortName: 'B. Harami', category: 'double', type: 'bullish', group: 'bullish-reversal',
    description: 'A large bearish candle followed by a small bullish candle contained within the first body. "Harami" means pregnant.',
    signal: 'Potential bullish reversal. Bearish momentum is slowing significantly.',
    formation: ['Day 1: Large bearish candle', 'Day 2: Small bullish candle', 'Day 2 body fits entirely within Day 1 body'],
    psychology: 'The narrow range of Day 2 shows sellers are losing confidence. The shrinking activity after a large bearish move signals that selling pressure is exhausting.',
    characteristics: ['Day 2 body inside Day 1 body', 'Day 2 is significantly smaller than Day 1', 'Requires confirmation — not a strong standalone signal', 'Watch for Day 3 bullish close'],
  },
  {
    id: 'morning_star', name: 'Morning Star', shortName: 'Morning ★', category: 'triple', type: 'bullish', group: 'bullish-reversal',
    description: 'Large bearish candle, small-bodied star candle, then a large bullish candle closing above the first day\'s midpoint.',
    signal: 'Strong bullish reversal — one of the most reliable three-candle reversal patterns.',
    formation: ['Day 1: Large bearish candle — strong selling', 'Day 2: Small body star (gap lower) — sellers exhaust', 'Day 3: Large bullish candle closing above Day 1 midpoint'],
    psychology: 'The downtrend reaches exhaustion on Day 2\'s small indecisive candle, then Day 3\'s powerful rally shows bulls have fully taken control. A complete three-day sentiment reversal.',
    characteristics: ['Day 2 body < 50% of Day 1', 'Day 3 closes above Day 1 midpoint', 'Most reliable at significant lows', 'Higher volume on Day 3 strengthens signal'],
  },
  {
    id: 'three_white_soldiers', name: 'Three White Soldiers', shortName: '3 Soldiers', category: 'triple', type: 'bullish', group: 'bullish-reversal',
    description: 'Three consecutive long bullish candles, each opening within the prior body and closing progressively higher.',
    signal: 'Strong bullish reversal or continuation — three sessions of sustained, confident buying pressure.',
    formation: ['Three consecutive bullish candles', 'Each opens within the prior candle\'s body', 'Each closes at a new high', 'Small upper shadows on each candle'],
    psychology: 'Three days of disciplined, persistent buying with no significant pullbacks. Sellers are completely overwhelmed. High-conviction entry by bulls at every session.',
    characteristics: ['Each close higher than previous', 'Each open within prior body', 'Small or no upper shadows', 'Most powerful after a downtrend or consolidation'],
  },
  {
    id: 'three_inside_up', name: 'Three Inside Up', shortName: '3 Inside ↑', category: 'triple', type: 'bullish', group: 'bullish-reversal',
    description: 'Bullish Harami (days 1-2) confirmed by a bullish Day 3 that closes above Day 1\'s open.',
    signal: 'Confirmed bullish reversal — more reliable than the Harami alone.',
    formation: ['Day 1: Large bearish candle', 'Day 2: Small bullish inside Day 1 (Bullish Harami)', 'Day 3: Bullish candle closing above Day 1 open'],
    psychology: 'The Harami warns of slowing bearish momentum; Day 3\'s close above Day 1\'s open confirms the bulls have fully reclaimed lost territory. A validated reversal.',
    characteristics: ['First two days form a Bullish Harami', 'Day 3 closes above Day 1 open — critical', 'Confirmation removes Harami ambiguity', 'More reliable than Harami or Engulfing alone'],
  },
  {
    id: 'shooting_star', name: 'Shooting Star', shortName: 'Shoot ★', category: 'single', type: 'bearish', group: 'bearish-reversal',
    description: 'Small body near the bottom of the range with a long upper shadow. Sellers drove price back down from session highs.',
    signal: 'Bearish reversal at uptrend highs. Buyers tried to push higher but were firmly rejected.',
    formation: ['Small body at the lower end of the session range', 'Upper shadow is at least 2× the body', 'Little to no lower shadow'],
    psychology: 'Buyers pushed price to significant highs during the session, but sellers took over and drove it back down near the open. Strong rejection of higher prices.',
    characteristics: ['Appears at the top of an uptrend', 'Upper shadow ≥ 2× body', 'Gap-up open strengthens signal', 'Requires bearish confirmation next session'],
  },
  {
    id: 'hanging_man', name: 'Hanging Man', shortName: 'Hang Man', category: 'single', type: 'bearish', group: 'bearish-reversal',
    description: 'Identical shape to the Hammer but appears at the top of an uptrend — a warning of potential reversal.',
    signal: 'Bearish reversal warning at uptrend highs. Sellers tested lower prices during the session.',
    formation: ['Small body near the top of the range (same as Hammer)', 'Long lower shadow — at least 2× body', 'Appears at the peak of an uptrend'],
    psychology: 'Despite a recovery to near the open, the intra-session selloff shows growing bearish interest. Sellers are beginning to challenge the bulls at these highs.',
    characteristics: ['Same shape as Hammer but context is opposite', 'Appears after uptrend', 'Lower shadow ≥ 2× body', 'Must be confirmed by next bearish session'],
  },
  {
    id: 'marubozu_bear', name: 'Bearish Marubozu', shortName: 'Bear Maru', category: 'single', type: 'bearish', group: 'continuation',
    description: 'Long bearish candle with no shadows. Opens at the high, closes at the low.',
    signal: 'Strong bearish momentum — bears controlled the entire session without any recovery.',
    formation: ['Candle opens at the session high', 'Candle closes at the session low', 'No upper or lower shadows'],
    psychology: 'Complete bear dominance. Buyers found no footing — sellers drove price relentlessly from open to close.',
    characteristics: ['Open = High, Close = Low', 'No shadows at all', 'Can signal start of downtrend or continuation', 'Very strong conviction move'],
  },
  {
    id: 'bearish_engulfing', name: 'Bearish Engulfing', shortName: 'Br. Engulf', category: 'double', type: 'bearish', group: 'bearish-reversal',
    description: 'A bullish candle followed by a larger bearish candle whose body completely engulfs the prior body.',
    signal: 'Strong bearish reversal. Sellers overwhelmed buyers decisively — most powerful at uptrend highs.',
    formation: ['Day 1: Bullish candle of any size', 'Day 2 opens at or above Day 1 close', 'Day 2 closes below Day 1 open', 'Day 2 body fully contains Day 1 body'],
    psychology: 'After a bullish session, sellers erupted — opening higher but closing below the entire prior range. A decisive and complete reversal from bullish to bearish control.',
    characteristics: ['Day 2 body must fully engulf Day 1 body', 'Most powerful after an uptrend', 'Higher volume on Day 2 strengthens the signal', 'One of the most reliable bearish reversal patterns'],
  },
  {
    id: 'dark_cloud', name: 'Dark Cloud Cover', shortName: 'Dark Cloud', category: 'double', type: 'bearish', group: 'bearish-reversal',
    description: 'A bullish candle, then a bearish candle that opens above the prior high and closes below the midpoint.',
    signal: 'Bearish reversal after an uptrend. Sellers reclaimed more than half the prior session\'s gain.',
    formation: ['Day 1: Bullish candle', 'Day 2 gaps open above Day 1 high', 'Day 2 closes below the midpoint of Day 1 body', 'Day 2 does not fully engulf Day 1'],
    psychology: 'Despite an optimistic gap higher, sellers drove price below the prior midpoint — erasing more than half the prior day\'s gains. Significant bearish effort.',
    characteristics: ['Day 2 closes below Day 1 midpoint but above Day 1 open', 'Gap up open required', 'Weaker than Bearish Engulfing', 'Needs bearish confirmation'],
  },
  {
    id: 'harami_bear', name: 'Bearish Harami', shortName: 'Br. Harami', category: 'double', type: 'bearish', group: 'bearish-reversal',
    description: 'A large bullish candle followed by a small bearish candle contained within the first body.',
    signal: 'Potential bearish reversal. Bullish momentum is slowing.',
    formation: ['Day 1: Large bullish candle', 'Day 2: Small bearish candle', 'Day 2 body fits entirely within Day 1 body'],
    psychology: 'The shrinking range after a large bullish candle shows buyers losing conviction. The reduced activity hints that the uptrend may be losing steam.',
    characteristics: ['Day 2 body inside Day 1 body', 'Day 2 significantly smaller', 'Not a confirmed reversal — needs bearish Day 3', 'Less powerful than Bearish Engulfing'],
  },
  {
    id: 'evening_star', name: 'Evening Star', shortName: 'Evening ★', category: 'triple', type: 'bearish', group: 'bearish-reversal',
    description: 'Large bullish candle, small-bodied star candle, then a large bearish candle closing below the first day\'s midpoint.',
    signal: 'Strong bearish reversal — the bearish mirror of the Morning Star.',
    formation: ['Day 1: Large bullish candle — strong buying', 'Day 2: Small body star (gap higher) — buyers pause', 'Day 3: Large bearish candle closing below Day 1 midpoint'],
    psychology: 'After a strong advance, buying energy dissipates into a small indecisive star, then sellers take complete control. A three-day transition from bullish to bearish sentiment.',
    characteristics: ['Day 2 body < 50% of Day 1', 'Day 3 closes below Day 1 midpoint', 'Most reliable at significant highs', 'Higher volume on Day 3 strengthens signal'],
  },
  {
    id: 'three_black_crows', name: 'Three Black Crows', shortName: '3 Crows', category: 'triple', type: 'bearish', group: 'bearish-reversal',
    description: 'Three consecutive long bearish candles, each opening within the prior body and closing progressively lower.',
    signal: 'Strong bearish reversal or continuation — three sessions of sustained, persistent selling.',
    formation: ['Three consecutive bearish candles', 'Each opens within the prior candle\'s body', 'Each closes at a new low', 'Small lower shadows on each'],
    psychology: 'Three days of relentless selling with buyers unable to recover any ground. Each session opens with brief hope that is immediately crushed. High-conviction bearish move.',
    characteristics: ['Each close lower than previous', 'Each open within prior body', 'Small or no lower shadows', 'Most powerful after an uptrend or at resistance'],
  },
  {
    id: 'three_inside_down', name: 'Three Inside Down', shortName: '3 Inside ↓', category: 'triple', type: 'bearish', group: 'bearish-reversal',
    description: 'Bearish Harami (days 1-2) confirmed by a bearish Day 3 that closes below Day 1\'s close.',
    signal: 'Confirmed bearish reversal — more reliable than the Bearish Harami alone.',
    formation: ['Day 1: Large bullish candle', 'Day 2: Small bearish inside Day 1 (Bearish Harami)', 'Day 3: Bearish candle closing below Day 1 open'],
    psychology: 'The Harami weakens bullish momentum; Day 3\'s close confirms bears have fully reversed the Day 1 gains. A validated three-step transition of control.',
    characteristics: ['First two days form Bearish Harami', 'Day 3 closes below Day 1 open — critical', 'Removes ambiguity of the Harami signal', 'Strong confirmation of trend reversal'],
  },
  {
    id: 'dragonfly_doji', name: 'Dragonfly Doji', shortName: 'Dragon Doji', category: 'single', type: 'bullish', group: 'bullish-reversal',
    description: 'A doji where open and close are at the top of the range with a long lower shadow and no upper shadow — shaped like the letter T.',
    signal: 'Bullish reversal at lows. Price was rejected hard from below and recovered fully — sellers exhausted.',
    formation: ['Open and close are at or near the session high', 'Long lower shadow probes lower prices', 'No or minimal upper shadow', 'Body is essentially zero (open ≈ close)'],
    psychology: 'Sellers pushed price down sharply during the session, but buyers swept back in and closed at the high. The dramatic recovery signals selling pressure is exhausted and buyers are firmly in control by the close.',
    characteristics: ['Body ≈ 0 (open ≈ close)', 'Lower shadow ≥ 60% of the full high-low range', 'Minimal upper shadow', 'Most powerful after a downtrend at support', 'Requires next-session bullish confirmation'],
  },
  {
    id: 'gravestone_doji', name: 'Gravestone Doji', shortName: 'Grave Doji', category: 'single', type: 'bearish', group: 'bearish-reversal',
    description: 'A doji where open and close are at the bottom of the range with a long upper shadow and no lower shadow — shaped like an upside-down T.',
    signal: 'Bearish reversal at highs. Buyers tried to push higher but were fully rejected — buying pressure exhausted.',
    formation: ['Open and close are at or near the session low', 'Long upper shadow — price probed higher but was rejected', 'No or minimal lower shadow', 'Body is essentially zero (open ≈ close)'],
    psychology: 'Buyers pushed price significantly higher during the session, but sellers overwhelmed them and drove it back to the low. The full reversal of gains signals buyer exhaustion and seller dominance by the close.',
    characteristics: ['Body ≈ 0 (open ≈ close)', 'Upper shadow ≥ 60% of the full high-low range', 'Minimal lower shadow', 'Most powerful after an uptrend at resistance', 'Requires next-session bearish confirmation'],
  },
  {
    id: 'tweezer_bottom', name: 'Tweezer Bottom', shortName: 'Twzr Bot', category: 'double', type: 'bullish', group: 'bullish-reversal',
    description: 'Two consecutive candles with nearly identical lows after a downtrend — the market tested a level twice and bounced both times.',
    signal: 'Bullish reversal. The equal lows define a strong support level that sellers failed to break on the second attempt.',
    formation: ['Day 1: Bearish candle in a downtrend', 'Day 2: Bullish candle', 'Both sessions share nearly the same low price', 'The repeated low signals a tested support zone'],
    psychology: 'Bears drove price to a new low, but on the second test buyers absorbed all selling pressure. The inability to push lower shows seller exhaustion — the level is acting as strong support.',
    characteristics: ['Both candles have nearly equal low prices (within ~3% of average range)', 'Most reliable after a downtrend', 'The shared low becomes a defined support level', 'Stronger when the low coincides with a prior key level or round number'],
  },
  {
    id: 'tweezer_top', name: 'Tweezer Top', shortName: 'Twzr Top', category: 'double', type: 'bearish', group: 'bearish-reversal',
    description: 'Two consecutive candles with nearly identical highs after an uptrend — the market tested a level twice and was rejected both times.',
    signal: 'Bearish reversal. The equal highs define a strong resistance level that buyers failed to break on the second attempt.',
    formation: ['Day 1: Bullish candle in an uptrend', 'Day 2: Bearish candle', 'Both sessions share nearly the same high price', 'The repeated high signals a tested resistance zone'],
    psychology: 'Bulls pushed price to a new high, but on the second test sellers absorbed all buying pressure. The failure to break higher shows buyer exhaustion — the level is acting as strong resistance.',
    characteristics: ['Both candles have nearly equal high prices (within ~3% of average range)', 'Most reliable after an uptrend', 'The shared high becomes a defined resistance level', 'Stronger when the high coincides with a prior key level or round number'],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function toSecs(ms: number): UTCTimestamp { return Math.floor(ms / 1000) as UTCTimestamp; }

function normalize(candles: Candle[]): Candle[] {
  const map = new Map<number, Candle>();
  for (const c of candles) map.set(toSecs(c.time), c);
  return Array.from(map.values()).sort((a, b) => a.time - b.time);
}

function generateCandles(count: number, basePrice: number, deltaMs: number): Candle[] {
  const candles: Candle[] = [];
  let price = basePrice;
  let trend = 0;
  const now = Date.now();
  const vf = basePrice < 5 ? 0.0008 : basePrice < 100 ? 0.007 : 0.009;
  for (let i = count; i >= 0; i--) {
    trend = trend * 0.94 + (Math.random() - 0.5) * 0.12;
    trend = Math.max(-0.65, Math.min(0.65, trend));
    const vol   = price * vf;
    const open  = price;
    const body  = (trend + (Math.random() - 0.5)) * vol;
    const close = Math.max(open + body, 0.0001);
    const bh = Math.max(open, close), bl = Math.min(open, close);
    const bs = Math.abs(body) || vol * 0.1;
    const high = bh + Math.random() * bs * (Math.random() < 0.12 ? 2.2 : 0.8);
    const low  = Math.max(bl - Math.random() * bs * (Math.random() < 0.12 ? 2.2 : 0.8), 0.0001);
    candles.push({ time: now - i * deltaMs, open, high, low, close, volume: Math.floor(Math.random() * 500_000 + 50_000) });
    price = close;
  }
  return candles;
}

function trendBefore(candles: Candle[], idx: number, lookback = 4): 'up' | 'down' {
  if (idx < lookback) return 'down';
  const start = candles[idx - lookback].close;
  const end   = candles[idx - 1].close;
  return end >= start ? 'up' : 'down';
}

function detectPatterns(candles: Candle[]): Detected[] {
  const res: Detected[] = [];
  for (let i = 0; i < candles.length; i++) {
    const c = candles[i];
    const range = c.high - c.low;
    if (range < 0.0001) continue;
    const body = Math.abs(c.close - c.open);
    const br   = body / range;
    const up   = c.high - Math.max(c.open, c.close);
    const dn   = Math.min(c.open, c.close) - c.low;
    const bull = c.close > c.open;
    const trend = trendBefore(candles, i);

    // Dragonfly Doji: body≈0, long lower shadow, no upper shadow
    if (br <= 0.1 && up <= range * 0.1 && dn >= range * 0.6)
      res.push({ patternId: 'dragonfly_doji', startIdx: i, endIdx: i });
    // Gravestone Doji: body≈0, long upper shadow, no lower shadow
    else if (br <= 0.1 && dn <= range * 0.1 && up >= range * 0.6)
      res.push({ patternId: 'gravestone_doji', startIdx: i, endIdx: i });
    // Standard Doji
    else if (br <= 0.1)
      res.push({ patternId: 'doji', startIdx: i, endIdx: i });
    // Hammer (downtrend) / Hanging Man (uptrend): same shape, context differs
    else if (br < 0.35 && dn >= 2 * body && up <= body * 0.3)
      res.push({ patternId: trend === 'up' ? 'hanging_man' : 'hammer', startIdx: i, endIdx: i });
    // Inverted Hammer (downtrend) / Shooting Star (uptrend): same shape, context differs
    else if (br < 0.35 && up >= 2 * body && dn <= body * 0.3)
      res.push({ patternId: trend === 'up' ? 'shooting_star' : 'inverted_hammer', startIdx: i, endIdx: i });
    else if (br > 0.9 && up < body * 0.05 && dn < body * 0.05)
      res.push({ patternId: bull ? 'marubozu_bull' : 'marubozu_bear', startIdx: i, endIdx: i });
    else if (br < 0.25 && up > body * 0.6 && dn > body * 0.6)
      res.push({ patternId: 'spinning_top', startIdx: i, endIdx: i });

    if (i > 0) {
      const p = candles[i - 1];
      const pMid = (p.open + p.close) / 2;
      const pBH  = Math.max(p.open, p.close), pBL = Math.min(p.open, p.close);
      const cBH  = Math.max(c.open, c.close), cBL = Math.min(c.open, c.close);
      const pBull = p.close > p.open;

      if (!pBull && bull  && c.open <= p.close && c.close >= p.open)
        res.push({ patternId: 'bullish_engulfing', startIdx: i - 1, endIdx: i });
      if (pBull  && !bull && c.open >= p.close && c.close <= p.open)
        res.push({ patternId: 'bearish_engulfing', startIdx: i - 1, endIdx: i });
      if (!pBull && bull  && c.open < p.low  && c.close > pMid && c.close < p.open)
        res.push({ patternId: 'piercing_line', startIdx: i - 1, endIdx: i });
      if (pBull  && !bull && c.open > p.high && c.close < pMid && c.close > p.open)
        res.push({ patternId: 'dark_cloud', startIdx: i - 1, endIdx: i });
      if (!pBull && bull  && cBH < pBH && cBL > pBL)
        res.push({ patternId: 'harami_bull', startIdx: i - 1, endIdx: i });
      if (pBull  && !bull && cBH < pBH && cBL > pBL)
        res.push({ patternId: 'harami_bear', startIdx: i - 1, endIdx: i });
      // Tweezer Bottom: bear then bull, nearly equal lows
      const avgRange2 = ((p.high - p.low) + (c.high - c.low)) / 2;
      if (avgRange2 > 0) {
        if (!pBull && bull  && Math.abs(c.low  - p.low)  <= avgRange2 * 0.03)
          res.push({ patternId: 'tweezer_bottom', startIdx: i - 1, endIdx: i });
        if (pBull  && !bull && Math.abs(c.high - p.high) <= avgRange2 * 0.03)
          res.push({ patternId: 'tweezer_top', startIdx: i - 1, endIdx: i });
      }
    }

    if (i > 1) {
      const [c1, c2, c3] = [candles[i - 2], candles[i - 1], candles[i]];
      const c1Bull = c1.close > c1.open, c3Bull = c3.close > c3.open;
      const c2Bull = c2.close > c2.open;
      const c1b = Math.abs(c1.close - c1.open), c2b = Math.abs(c2.close - c2.open);
      const c1Mid = (c1.open + c1.close) / 2;
      const c1BH = Math.max(c1.open, c1.close), c1BL = Math.min(c1.open, c1.close);
      const c2BH = Math.max(c2.open, c2.close), c2BL = Math.min(c2.open, c2.close);
      const c2InC1 = c2BH < c1BH && c2BL > c1BL;

      if (!c1Bull && c2b < c1b * 0.5 && c3Bull && c3.close > c1Mid)
        res.push({ patternId: 'morning_star', startIdx: i - 2, endIdx: i });
      if (c1Bull && c2b < c1b * 0.5 && !c3Bull && c3.close < c1Mid)
        res.push({ patternId: 'evening_star', startIdx: i - 2, endIdx: i });
      // Three White Soldiers: each opens within prior body, closes progressively higher
      if (c1Bull && c2Bull && c3Bull
        && c2.open >= c1.open && c2.open <= c1.close
        && c3.open >= c2.open && c3.open <= c2.close
        && c2.close > c1.close && c3.close > c2.close)
        res.push({ patternId: 'three_white_soldiers', startIdx: i - 2, endIdx: i });
      // Three Black Crows: each opens within prior body, closes progressively lower
      if (!c1Bull && !c2Bull && !c3Bull
        && c2.open <= c1.open && c2.open >= c1.close
        && c3.open <= c2.open && c3.open >= c2.close
        && c2.close < c1.close && c3.close < c2.close)
        res.push({ patternId: 'three_black_crows', startIdx: i - 2, endIdx: i });
      if (!c1Bull && c2Bull && c2InC1 && c3Bull && c3.close > c1.open)
        res.push({ patternId: 'three_inside_up', startIdx: i - 2, endIdx: i });
      if (c1Bull && !c2Bull && c2InC1 && !c3Bull && c3.close < c1.open)
        res.push({ patternId: 'three_inside_down', startIdx: i - 2, endIdx: i });
    }
  }
  return res;
}

const catScore = (id: string) => {
  const d = PATTERNS.find(p => p.id === id);
  return d?.category === 'triple' ? 3 : d?.category === 'double' ? 2 : 1;
};

function buildMarkers(patterns: Detected[], candles: Candle[], activeId: string | null): MarkerSpec[] {
  const best = new Map<number, Detected>();
  for (const p of patterns) {
    const prev = best.get(p.endIdx);
    if (!prev || catScore(p.patternId) > catScore(prev.patternId)) best.set(p.endIdx, p);
  }
  return Array.from(best.values()).map(p => {
    const def = PATTERNS.find(d => d.id === p.patternId)!;
    const c   = candles[p.endIdx];
    const isActive = !activeId || activeId === p.patternId;
    const alpha = isActive ? 'ff' : '55';
    return {
      time:      toSecs(c.time),
      position:  def.type === 'bullish' ? 'belowBar' : def.type === 'bearish' ? 'aboveBar' : 'inBar',
      color:     `${TYPE_COLOR[def.type]}${alpha}`,
      shape:     def.type === 'bullish' ? 'arrowUp' : def.type === 'bearish' ? 'arrowDown' : 'circle',
      text:      isActive ? def.shortName : '',
      size:      isActive ? 1 : 0,
      patternId: p.patternId,
    };
  });
}

function calcEMA(candles: Candle[], period: number): LineData[] {
  if (candles.length < period) return [];
  const k = 2 / (period + 1);
  let ema = candles.slice(0, period).reduce((s, c) => s + c.close, 0) / period;
  const out: LineData[] = [{ time: toSecs(candles[period - 1].time), value: ema }];
  for (let i = period; i < candles.length; i++) {
    ema = candles[i].close * k + ema * (1 - k);
    out.push({ time: toSecs(candles[i].time), value: ema });
  }
  return out;
}

function calcVWAP(candles: Candle[]): LineData[] {
  let tpv = 0, vol = 0;
  return candles.map(c => {
    const tp = (c.high + c.low + c.close) / 3;
    tpv += tp * c.volume; vol += c.volume;
    return { time: toSecs(c.time), value: vol > 0 ? tpv / vol : tp };
  });
}

function calcRSI(candles: Candle[], period = 14): LineData[] {
  if (candles.length < period + 1) return [];
  const ch = candles.slice(1).map((c, i) => c.close - candles[i].close);
  let ag = ch.slice(0, period).reduce((s, v) => s + Math.max(v, 0), 0) / period;
  let al = ch.slice(0, period).reduce((s, v) => s + Math.max(-v, 0), 0) / period;
  const out: LineData[] = [];
  for (let i = period; i < ch.length; i++) {
    ag = (ag * (period - 1) + Math.max(ch[i], 0)) / period;
    al = (al * (period - 1) + Math.max(-ch[i], 0)) / period;
    if (al === 0) { out.push({ time: toSecs(candles[i + 1].time), value: 100 }); continue; }
    out.push({ time: toSecs(candles[i + 1].time), value: 100 - 100 / (1 + ag / al) });
  }
  return out;
}

function emaArr(vals: number[], p: number): number[] {
  if (vals.length < p) return [];
  const k = 2 / (p + 1);
  let e = vals.slice(0, p).reduce((a, b) => a + b, 0) / p;
  const out = [e];
  for (let i = p; i < vals.length; i++) { e = vals[i] * k + e * (1 - k); out.push(e); }
  return out;
}

function calcMACD(candles: Candle[]): { macd: LineData[]; signal: LineData[]; hist: HistogramData[] } {
  if (candles.length < 35) return { macd: [], signal: [], hist: [] };
  const closes = candles.map(c => c.close);
  const e12 = emaArr(closes, 12), e26 = emaArr(closes, 26);
  const off = e12.length - e26.length;
  const mn  = e26.map((e, i) => e12[off + i] - e);
  const sn  = emaArr(mn, 9);
  const ms = 25, ss = ms + 8;
  return {
    macd:   mn.map((v, i) => ({ time: toSecs(candles[ms + i].time), value: v })) as LineData[],
    signal: sn.map((v, i) => ({ time: toSecs(candles[ss + i].time), value: v })) as LineData[],
    hist:   sn.map((sig, i) => {
      const d = mn[8 + i] - sig;
      return { time: toSecs(candles[ss + i].time), value: d, color: d >= 0 ? '#22c55e60' : '#ef444460' } as HistogramData;
    }),
  };
}

function fmtPrice(v: number): string {
  if (v >= 1000) return v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (v >= 10)   return v.toFixed(2);
  return v.toFixed(4);
}

function fmtVol(v: number): string {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(2)}M`;
  if (v >= 1_000)     return `${(v / 1_000).toFixed(0)}K`;
  return `${v}`;
}

function useIsDark() {
  const [isDark, setIsDark] = useState(() =>
    typeof document !== 'undefined' ? !document.documentElement.classList.contains('light') : true
  );
  useEffect(() => {
    const obs = new MutationObserver(() => setIsDark(!document.documentElement.classList.contains('light')));
    obs.observe(document.documentElement, { attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);
  return isDark;
}

// ── SimChart ──────────────────────────────────────────────────────────────────

const EMA_CFGS = [
  { period: 9,  color: '#f59e0b' },
  { period: 20, color: '#3b82f6' },
  { period: 50, color: '#8b5cf6' },
] as const;
type EmaPeriod = 9 | 20 | 50;

interface SimChartProps {
  candles: Candle[];
  markers: MarkerSpec[];
  showEma: Record<EmaPeriod, boolean>;
  showVwap: boolean;
  bottomIndicator: 'vol' | 'rsi' | 'macd';
  resetKey?: number;
  onHover?: (d: OhlcvData | null) => void;
  onMarkerClick?: (patternId: string) => void;
}

function SimChart({ candles, markers, showEma, showVwap, bottomIndicator, resetKey, onHover, onMarkerClick }: SimChartProps) {
  const containerRef  = useRef<HTMLDivElement>(null);
  const chartRef      = useRef<IChartApi | null>(null);
  const candleRef     = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const volRef        = useRef<ISeriesApi<'Histogram'> | null>(null);
  const emaRefs       = useRef<Partial<Record<EmaPeriod, ISeriesApi<'Line'>>>>({});
  const vwapRef       = useRef<ISeriesApi<'Line'> | null>(null);
  const rsiRef        = useRef<ISeriesApi<'Line'> | null>(null);
  const macdLineRef   = useRef<ISeriesApi<'Line'> | null>(null);
  const macdSigRef    = useRef<ISeriesApi<'Line'> | null>(null);
  const macdHistRef   = useRef<ISeriesApi<'Histogram'> | null>(null);
  const markersRef    = useRef<ReturnType<typeof createSeriesMarkers> | null>(null);
  const prevKeyRef    = useRef(resetKey);
  const allMarkersRef = useRef<MarkerSpec[]>([]);
  const onHoverRef    = useRef(onHover);
  const onClickRef    = useRef(onMarkerClick);
  const isDark        = useIsDark();

  onHoverRef.current  = onHover;
  onClickRef.current  = onMarkerClick;
  allMarkersRef.current = markers;

  const themeCol = (dark: boolean) => ({
    bg: dark ? '#0d0d0d' : '#f4f5f7', text: dark ? '#666' : '#888',
    grid: dark ? '#1a1a1a' : '#e4e6eb', cross: dark ? '#3a3a3a' : '#b0b4bb',
    border: dark ? '#2a2a2a' : '#d0d3d8',
  });

  // Mount
  useEffect(() => {
    if (!containerRef.current) return;
    const col = themeCol(isDark);
    const chart = createChart(containerRef.current, {
      layout: { background: { color: col.bg }, textColor: col.text, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, attributionLogo: false },
      grid: { vertLines: { color: col.grid }, horzLines: { color: col.grid } },
      crosshair: { vertLine: { color: col.cross, width: 1, style: 1 }, horzLine: { color: col.cross, width: 1, style: 1 } },
      rightPriceScale: { borderColor: col.border, textColor: col.text, scaleMargins: { top: 0.08, bottom: 0.22 } },
      timeScale: { borderColor: col.border, timeVisible: true, secondsVisible: false, rightOffset: 6 },
      handleScroll: true, handleScale: true,
    });
    const cs = chart.addSeries(CandlestickSeries, { upColor: '#22c55e', downColor: '#ef4444', borderVisible: false, wickUpColor: '#22c55e', wickDownColor: '#ef4444' });
    const vs = chart.addSeries(HistogramSeries, { priceFormat: { type: 'volume' }, priceScaleId: 'vol' });
    chart.priceScale('vol').applyOptions({ scaleMargins: { top: 0.82, bottom: 0 } });

    const emaMap: Partial<Record<EmaPeriod, ISeriesApi<'Line'>>> = {};
    for (const cfg of EMA_CFGS) {
      emaMap[cfg.period] = chart.addSeries(LineSeries, {
        color: cfg.color, lineWidth: 1, priceLineVisible: false,
        lastValueVisible: false, crosshairMarkerVisible: false, visible: showEma[cfg.period],
      });
    }
    const vwapS = chart.addSeries(LineSeries, { color: '#e879f9', lineWidth: 1, lineStyle: 2, priceLineVisible: false, lastValueVisible: false, crosshairMarkerVisible: false, visible: false });
    const rsiS  = chart.addSeries(LineSeries, { color: '#f59e0b', lineWidth: 1, priceScaleId: 'vol', priceLineVisible: false, lastValueVisible: true, crosshairMarkerVisible: false, visible: false });
    const macdL = chart.addSeries(LineSeries, { color: '#3b82f6', lineWidth: 1, priceScaleId: 'vol', priceLineVisible: false, lastValueVisible: false, crosshairMarkerVisible: false, visible: false });
    const macdS = chart.addSeries(LineSeries, { color: '#f59e0b', lineWidth: 1, priceScaleId: 'vol', priceLineVisible: false, lastValueVisible: false, crosshairMarkerVisible: false, visible: false });
    const macdH = chart.addSeries(HistogramSeries, { priceScaleId: 'vol', visible: false });

    const norm = normalize(candles);
    cs.setData(norm.map(c => ({ time: toSecs(c.time), open: c.open, high: c.high, low: c.low, close: c.close })));
    vs.setData(norm.map(c => ({ time: toSecs(c.time), value: c.volume, color: c.close >= c.open ? '#22c55e28' : '#ef444428' })));
    for (const cfg of EMA_CFGS) emaMap[cfg.period]?.setData(calcEMA(norm, cfg.period));
    vwapS.setData(calcVWAP(norm));
    rsiS.setData(calcRSI(norm));
    rsiS.createPriceLine({ price: 70, color: '#ef444450', lineWidth: 1, lineStyle: 2, axisLabelVisible: false, title: '' });
    rsiS.createPriceLine({ price: 30, color: '#22c55e50', lineWidth: 1, lineStyle: 2, axisLabelVisible: false, title: '' });
    const { macd: m0, signal: s0, hist: h0 } = calcMACD(norm);
    macdL.setData(m0); macdS.setData(s0); macdH.setData(h0);

    const chartMarkers = markers.map(({ patternId: _, ...m }) => m);
    const sm = createSeriesMarkers(cs as any, chartMarkers);
    chart.timeScale().fitContent();

    chartRef.current = chart; candleRef.current = cs; volRef.current = vs;
    emaRefs.current = emaMap; vwapRef.current = vwapS; rsiRef.current = rsiS;
    macdLineRef.current = macdL; macdSigRef.current = macdS; macdHistRef.current = macdH;
    markersRef.current = sm;

    // Crosshair hover
    chart.subscribeCrosshairMove(param => {
      if (!param.time) { onHoverRef.current?.(null); return; }
      const cd = param.seriesData?.get(cs as any) as any;
      const vd = param.seriesData?.get(vs as any) as any;
      if (cd?.open !== undefined) {
        onHoverRef.current?.({ open: cd.open, high: cd.high, low: cd.low, close: cd.close, volume: vd?.value ?? 0 });
      } else {
        onHoverRef.current?.(null);
      }
    });

    // Click → find nearest marker
    chart.subscribeClick(param => {
      if (!param.time) return;
      const t = param.time as number;
      const mks = allMarkersRef.current;
      if (!mks.length) return;
      let best = mks[0], bestD = Math.abs(mks[0].time - t);
      for (const m of mks) { const d = Math.abs(m.time - t); if (d < bestD) { bestD = d; best = m; } }
      if (best.patternId) onClickRef.current?.(best.patternId);
    });

    const ro = new ResizeObserver(() => {
      if (containerRef.current) chart.applyOptions({ width: containerRef.current.clientWidth, height: containerRef.current.clientHeight });
    });
    ro.observe(containerRef.current);
    return () => {
      ro.disconnect(); chart.remove();
      chartRef.current = null; candleRef.current = null; volRef.current = null;
      emaRefs.current = {}; markersRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Theme
  useEffect(() => {
    if (!chartRef.current) return;
    const col = themeCol(isDark);
    chartRef.current.applyOptions({
      layout: { background: { color: col.bg }, textColor: col.text },
      grid:   { vertLines: { color: col.grid }, horzLines: { color: col.grid } },
      rightPriceScale: { borderColor: col.border, textColor: col.text },
      timeScale: { borderColor: col.border },
    });
  }, [isDark]);

  // Data
  useEffect(() => {
    if (!candleRef.current || !volRef.current || candles.length === 0) return;
    const norm = normalize(candles);
    const forceReset = resetKey !== undefined && resetKey !== prevKeyRef.current;
    if (forceReset) {
      prevKeyRef.current = resetKey;
      candleRef.current.setData(norm.map(c => ({ time: toSecs(c.time), open: c.open, high: c.high, low: c.low, close: c.close })));
      volRef.current.setData(norm.map(c => ({ time: toSecs(c.time), value: c.volume, color: c.close >= c.open ? '#22c55e28' : '#ef444428' })));
      for (const cfg of EMA_CFGS) emaRefs.current[cfg.period]?.setData(calcEMA(norm, cfg.period));
      vwapRef.current?.setData(calcVWAP(norm));
      rsiRef.current?.setData(calcRSI(norm));
      const { macd, signal, hist } = calcMACD(norm);
      macdLineRef.current?.setData(macd); macdSigRef.current?.setData(signal); macdHistRef.current?.setData(hist);
      chartRef.current?.timeScale().fitContent();
    } else {
      const last = norm[norm.length - 1];
      candleRef.current.update({ time: toSecs(last.time), open: last.open, high: last.high, low: last.low, close: last.close });
      volRef.current.update({ time: toSecs(last.time), value: last.volume, color: last.close >= last.open ? '#22c55e28' : '#ef444428' });
      vwapRef.current?.setData(calcVWAP(norm));
      rsiRef.current?.setData(calcRSI(norm));
      const { macd, signal, hist } = calcMACD(norm);
      macdLineRef.current?.setData(macd); macdSigRef.current?.setData(signal); macdHistRef.current?.setData(hist);
    }
    const chartMarkers = markers.map(({ patternId: _, ...m }) => m);
    markersRef.current?.setMarkers(chartMarkers);
  }, [candles, markers, resetKey]);

  // EMA visibility
  useEffect(() => {
    for (const cfg of EMA_CFGS) emaRefs.current[cfg.period]?.applyOptions({ visible: showEma[cfg.period] });
  }, [showEma]);

  // VWAP visibility
  useEffect(() => { vwapRef.current?.applyOptions({ visible: showVwap }); }, [showVwap]);

  // Bottom indicator
  useEffect(() => {
    volRef.current?.applyOptions({ visible: bottomIndicator === 'vol' });
    rsiRef.current?.applyOptions({ visible: bottomIndicator === 'rsi' });
    const macdOn = bottomIndicator === 'macd';
    macdLineRef.current?.applyOptions({ visible: macdOn });
    macdSigRef.current?.applyOptions({ visible: macdOn });
    macdHistRef.current?.applyOptions({ visible: macdOn });
  }, [bottomIndicator]);

  return <div ref={containerRef} className="w-full h-full" />;
}

// ── ChartSimulator ────────────────────────────────────────────────────────────

export default function ChartSimulator() {
  const [symbolId,   setSymbolId]   = useState('AAPL');
  const [tfId,       setTfId]       = useState('1D');
  const [session,    setSession]    = useState<Candle[]>([]);
  const [revealed,   setRevealed]   = useState(0);
  const [resetKey,   setResetKey]   = useState(0);
  const [playing,    setPlaying]    = useState(false);
  const [speed,      setSpeed]      = useState(1);
  const [activeId,   setActiveId]   = useState<string | null>(null);
  const [showLib,    setShowLib]    = useState(true);
  const [mobileTab,  setMobileTab]  = useState<'chart' | 'patterns' | 'info'>('chart');
  const [hoverOhlcv, setHoverOhlcv] = useState<OhlcvData | null>(null);
  const [notif,      setNotif]      = useState<{ name: string; type: PatternType } | null>(null);
  const [showEma,    setShowEma]    = useState<Record<EmaPeriod, boolean>>({ 9: true, 20: true, 50: false });
  const [showVwap,   setShowVwap]   = useState(false);
  const [bottomInd,  setBottomInd]  = useState<'vol' | 'rsi' | 'macd'>('vol');
  const [symOpen,    setSymOpen]    = useState(false);

  const playRef       = useRef(false);
  const prevRevRef    = useRef(0);
  const notifTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const symRef        = useRef<HTMLDivElement>(null);

  const tf  = TIMEFRAMES.find(t => t.id === tfId)!;
  const sym = SYMBOLS.find(s => s.id === symbolId)!;

  // Init / regenerate on symbol or timeframe change
  useEffect(() => {
    const newSession = generateCandles(tf.candles, sym.basePrice, tf.deltaMs);
    setSession(newSession);
    setRevealed(tf.initial);
    prevRevRef.current = tf.initial;
    setActiveId(null);
    setNotif(null);
    setResetKey(k => k + 1);
    setPlaying(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbolId, tfId]);

  // Derived
  const visibleCandles = useMemo(() => session.slice(0, revealed + 1), [session, revealed]);
  const allPatterns    = useMemo(() => detectPatterns(visibleCandles), [visibleCandles]);
  const markers        = useMemo(() => buildMarkers(allPatterns, visibleCandles, activeId), [allPatterns, visibleCandles, activeId]);

  const patternCounts  = useMemo(() => {
    const out: Record<string, number> = {};
    for (const p of allPatterns) out[p.patternId] = (out[p.patternId] ?? 0) + 1;
    return out;
  }, [allPatterns]);

  const activeDef = activeId ? PATTERNS.find(d => d.id === activeId) ?? null : null;
  const maxRevealed = session.length - 1;

  // Detect pattern on new candle reveal
  useEffect(() => {
    if (revealed <= prevRevRef.current) { prevRevRef.current = revealed; return; }
    prevRevRef.current = revealed;
    const fresh = allPatterns.filter(p => p.endIdx === revealed);
    if (!fresh.length) return;
    const best = fresh.reduce((a, b) => catScore(b.patternId) > catScore(a.patternId) ? b : a, fresh[0]);
    const def  = PATTERNS.find(d => d.id === best.patternId)!;
    setActiveId(best.patternId);
    if (notifTimerRef.current) clearTimeout(notifTimerRef.current);
    setNotif({ name: def.name, type: def.type });
    notifTimerRef.current = setTimeout(() => setNotif(null), 2800);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed]);

  // Auto-play
  useEffect(() => {
    playRef.current = playing;
    if (!playing) { if (intervalRef.current) clearInterval(intervalRef.current); return; }
    intervalRef.current = setInterval(() => {
      if (!playRef.current) return;
      setRevealed(prev => {
        if (prev >= maxRevealed) { setPlaying(false); return prev; }
        return prev + 1;
      });
    }, SPEED_MAP[speed]);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [playing, speed, maxRevealed]);

  // Keyboard
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName ?? '')) return;
      if (e.key === ' ')           { e.preventDefault(); togglePlay(); }
      if (e.key === 'ArrowRight')  { e.preventDefault(); stepForward(); }
      if (e.key === 'ArrowLeft')   { e.preventDefault(); stepBack(); }
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxRevealed]);

  // Close symbol dropdown on outside click
  useEffect(() => {
    if (!symOpen) return;
    function handler(e: MouseEvent) { if (!symRef.current?.contains(e.target as Node)) setSymOpen(false); }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [symOpen]);

  const togglePlay  = useCallback(() => { if (revealed >= maxRevealed) return; setPlaying(p => !p); }, [revealed, maxRevealed]);
  const stepForward = useCallback(() => { setPlaying(false); setRevealed(p => Math.min(p + 1, maxRevealed)); }, [maxRevealed]);
  const stepBack    = useCallback(() => { setPlaying(false); setRevealed(p => Math.max(p - 1, tf.initial)); }, [tf.initial]);
  const goToStart   = useCallback(() => { setPlaying(false); setRevealed(tf.initial); }, [tf.initial]);
  const goToEnd     = useCallback(() => { setPlaying(false); setRevealed(maxRevealed); }, [maxRevealed]);
  const newChart    = useCallback(() => {
    const ns = generateCandles(tf.candles, sym.basePrice, tf.deltaMs);
    setSession(ns); setRevealed(tf.initial); prevRevRef.current = tf.initial;
    setActiveId(null); setNotif(null); setResetKey(k => k + 1); setPlaying(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tfId, symbolId]);

  function toggleEma(p: EmaPeriod) { setShowEma(prev => ({ ...prev, [p]: !prev[p] })); }

  const progress = session.length > 1 ? (revealed / (session.length - 1)) * 100 : 0;
  const last = visibleCandles[visibleCandles.length - 1];
  const displayOhlcv = hoverOhlcv ?? (last ? { open: last.open, high: last.high, low: last.low, close: last.close, volume: last.volume } : null);
  const pctChange = last && visibleCandles.length > 1
    ? ((last.close - visibleCandles[0].open) / visibleCandles[0].open) * 100 : 0;

  // ── Pattern Library JSX ───────────────────────────────────────────────────────

  const libraryJSX = (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-3 pt-3 pb-2 border-b border-[var(--c-border)] shrink-0">
        <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--c-text-subtle)] mb-0.5">Pattern Library</div>
        <div className="text-[10px] font-mono text-[var(--c-text-faint)]">{PATTERNS.length} patterns · {Object.keys(patternCounts).length} detected</div>
      </div>
      <div className="flex-1 overflow-y-auto py-1">
        {GROUP_ORDER.map(grp => (
          <div key={grp} className="mb-1">
            <div className="px-3 py-1.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: grp === 'bullish-reversal' ? '#22c55e' : grp === 'bearish-reversal' ? '#ef4444' : grp === 'neutral' ? '#f59e0b' : '#3b82f6' }} />
              <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--c-text-faint)]">{GROUP_LABEL[grp]}</span>
            </div>
            {PATTERNS.filter(p => p.group === grp).map(p => {
              const count  = patternCounts[p.id] ?? 0;
              const isSel  = activeId === p.id;
              return (
                <button key={p.id}
                  onClick={() => { setActiveId(activeId === p.id ? null : p.id); setMobileTab(activeId === p.id ? 'chart' : 'info'); }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 text-left transition-colors ${
                    isSel ? 'bg-[var(--c-surface)] text-[var(--c-text)]' : 'text-[var(--c-text-muted)] hover:text-[var(--c-text)] hover:bg-[var(--c-bg-muted)]'
                  }`}>
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-[9px]" style={{ color: TYPE_COLOR[p.type] }}>
                      {p.type === 'bullish' ? '▲' : p.type === 'bearish' ? '▼' : '●'}
                    </span>
                    <span className="text-[11px] font-mono truncate">{p.name}</span>
                  </div>
                  {count > 0 && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full shrink-0 ml-1"
                      style={{ color: TYPE_COLOR[p.type], backgroundColor: `${TYPE_COLOR[p.type]}22` }}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );

  // ── Pattern Info JSX ──────────────────────────────────────────────────────────

  const infoJSX = activeDef ? (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-4 pt-3 pb-2.5 border-b border-[var(--c-border)] shrink-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: TYPE_COLOR[activeDef.type] }} />
            <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--c-text-subtle)]">
              {GROUP_LABEL[activeDef.group]}
            </span>
          </div>
          <button onClick={() => setActiveId(null)} className="text-[var(--c-text-faint)] hover:text-[var(--c-text)] text-[14px] leading-none transition-colors">×</button>
        </div>
        <div className="text-[14px] font-mono font-semibold text-[var(--c-text)] leading-tight">{activeDef.name}</div>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border"
            style={{ color: TYPE_COLOR[activeDef.type], borderColor: `${TYPE_COLOR[activeDef.type]}44`, backgroundColor: `${TYPE_COLOR[activeDef.type]}11` }}>
            {activeDef.category === 'single' ? '1 Candle' : activeDef.category === 'double' ? '2 Candles' : '3 Candles'}
          </span>
          {patternCounts[activeDef.id] > 0 && (
            <span className="text-[9px] font-mono text-[var(--c-text-faint)]">
              Found {patternCounts[activeDef.id]}× on chart
            </span>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">

          {/* Signal */}
          <div className="px-3 py-2.5 rounded border text-[11px] font-mono leading-relaxed"
            style={{ borderColor: `${TYPE_COLOR[activeDef.type]}44`, backgroundColor: `${TYPE_COLOR[activeDef.type]}11`, color: TYPE_COLOR[activeDef.type] }}>
            {activeDef.signal}
          </div>

          {/* Formation */}
          <div>
            <div className="text-[9px] font-mono uppercase tracking-widest text-[var(--c-text-subtle)] mb-2">Formation</div>
            <ol className="space-y-1.5">
              {activeDef.formation.map((step, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[9px] font-mono text-[var(--c-text-faint)] shrink-0 mt-0.5 w-4 text-right">{i + 1}.</span>
                  <span className="text-[11px] font-mono text-[var(--c-text-muted)] leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Psychology */}
          <div>
            <div className="text-[9px] font-mono uppercase tracking-widest text-[var(--c-text-subtle)] mb-2">Market Psychology</div>
            <p className="text-[11px] font-mono text-[var(--c-text-muted)] leading-relaxed">{activeDef.psychology}</p>
          </div>

          {/* Characteristics */}
          <div>
            <div className="text-[9px] font-mono uppercase tracking-widest text-[var(--c-text-subtle)] mb-2">Key Rules</div>
            <ul className="space-y-1.5">
              {activeDef.characteristics.map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[var(--c-text-faint)] shrink-0 mt-0.5 text-[11px]">·</span>
                  <span className="text-[11px] font-mono text-[var(--c-text-muted)] leading-relaxed">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <div className="w-10 h-10 rounded-full border border-[var(--c-border)] flex items-center justify-center mb-3 text-[var(--c-text-faint)] text-lg">?</div>
      <div className="text-[11px] font-mono text-[var(--c-text-subtle)] mb-1">No pattern selected</div>
      <div className="text-[10px] font-mono text-[var(--c-text-faint)] leading-relaxed">
        Click a pattern in the library or step through the chart — patterns are auto-highlighted as they appear.
      </div>
    </div>
  );

  // ── Render ────────────────────────────────────────────────────────────────────

  const btnBase = 'px-2 py-1 rounded text-[11px] font-mono transition-colors';
  const btnActive = `${btnBase} bg-[var(--c-surface)] text-[var(--c-text)] border border-[var(--c-border)]`;
  const btnInactive = `${btnBase} text-[var(--c-text-muted)] hover:text-[var(--c-text)] hover:bg-[var(--c-bg-muted)]`;

  return (
    <div className="flex flex-col h-full bg-[var(--c-bg)] text-[var(--c-text)] overflow-hidden">

      {/* ── Top Bar ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-1.5 px-3 h-12 border-b border-[var(--c-border)] bg-[var(--c-bg-soft)] shrink-0 overflow-x-auto">

        {/* Library toggle */}
        <button
          onClick={() => setShowLib(v => !v)}
          title="Toggle Pattern Library"
          className={`${showLib ? btnActive : btnInactive} hidden lg:flex items-center gap-1.5 shrink-0`}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="1" y="1" width="4" height="10" rx="1"/><rect x="7" y="1" width="4" height="10" rx="1"/>
          </svg>
          <span className="hidden xl:inline">Library</span>
        </button>

        <div className="hidden lg:block w-px h-5 bg-[var(--c-border)] shrink-0" />

        {/* Symbol dropdown */}
        <div className="relative shrink-0" ref={symRef}>
          <button onClick={() => setSymOpen(v => !v)}
            className={`${btnActive} flex items-center gap-1.5 font-semibold`}>
            <span>{sym.label}</span>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M1 3l3 3 3-3"/>
            </svg>
          </button>
          {symOpen && (
            <div className="absolute top-full left-0 mt-1 z-50 w-44 rounded border border-[var(--c-border)] bg-[var(--c-bg-soft)] shadow-xl overflow-hidden">
              {['Stocks', 'Crypto', 'Forex', 'Index'].map(grp => {
                const items = SYMBOLS.filter(s => s.group === grp);
                if (!items.length) return null;
                return (
                  <div key={grp}>
                    <div className="px-3 py-1 text-[9px] font-mono uppercase tracking-widest text-[var(--c-text-faint)] bg-[var(--c-bg-muted)]">{grp}</div>
                    {items.map(s => (
                      <button key={s.id} onClick={() => { setSymbolId(s.id); setSymOpen(false); }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-[11px] font-mono transition-colors ${
                          symbolId === s.id ? 'text-[#f59e0b] bg-[var(--c-surface)]' : 'text-[var(--c-text-muted)] hover:text-[var(--c-text)] hover:bg-[var(--c-bg-muted)]'
                        }`}>
                        <span>{s.label}</span>
                        <span className="text-[10px] text-[var(--c-text-faint)]">{fmtPrice(s.basePrice)}</span>
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Timeframe */}
        <div className="flex items-center gap-0.5 shrink-0 bg-[var(--c-bg-muted)] rounded p-0.5">
          {TIMEFRAMES.map(t => (
            <button key={t.id} onClick={() => setTfId(t.id)}
              className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                tfId === t.id ? 'bg-[var(--c-surface)] text-[var(--c-text)]' : 'text-[var(--c-text-muted)] hover:text-[var(--c-text)]'
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="w-px h-5 bg-[var(--c-border)] shrink-0" />

        {/* Playback controls */}
        <div className="flex items-center gap-0.5 shrink-0">
          <button onClick={goToStart}   title="Go to start"   className={`${btnInactive} px-1.5`}>⏮</button>
          <button onClick={stepBack}    title="Step back [←]" className={`${btnInactive} px-1.5`}>◀</button>
          <button onClick={togglePlay}  title="Play/Pause [Space]"
            className={`${playing ? 'bg-[#f59e0b] text-[#0a0a0a]' : btnInactive} px-2.5 py-1 rounded text-[11px] font-mono transition-colors font-semibold`}>
            {playing ? '⏸' : '▶'}
          </button>
          <button onClick={stepForward} title="Step forward [→]" className={`${btnInactive} px-1.5`}>▷</button>
          <button onClick={goToEnd}     title="Go to end"     className={`${btnInactive} px-1.5`}>⏭</button>
        </div>

        {/* Speed */}
        <div className="flex items-center gap-0.5 shrink-0">
          {[1, 2, 5, 10].map(s => (
            <button key={s} onClick={() => setSpeed(s)}
              className={`px-1.5 py-1 rounded text-[10px] font-mono transition-colors ${
                speed === s ? 'text-[#f59e0b] bg-[#f59e0b18]' : 'text-[var(--c-text-faint)] hover:text-[var(--c-text-muted)]'
              }`}>
              {s}×
            </button>
          ))}
        </div>

        <button onClick={newChart} title="Generate new chart"
          className={`${btnInactive} shrink-0 hidden sm:block`}>
          ↺
        </button>

        <div className="w-px h-5 bg-[var(--c-border)] shrink-0" />

        {/* EMA toggles */}
        <div className="flex items-center gap-0.5 shrink-0">
          {EMA_CFGS.map(cfg => (
            <button key={cfg.period} onClick={() => toggleEma(cfg.period)}
              className="flex items-center gap-1 px-1.5 py-1 rounded text-[10px] font-mono border transition-all"
              style={{
                borderColor: showEma[cfg.period] ? cfg.color : 'var(--c-border)',
                color: showEma[cfg.period] ? cfg.color : 'var(--c-text-faint)',
                backgroundColor: showEma[cfg.period] ? `${cfg.color}14` : 'transparent',
              }}>
              <span className="w-2.5 h-px rounded-full inline-block" style={{ backgroundColor: showEma[cfg.period] ? cfg.color : 'var(--c-border)' }} />
              {cfg.period}
            </button>
          ))}
          <button onClick={() => setShowVwap(v => !v)}
            className="flex items-center gap-1 px-1.5 py-1 rounded text-[10px] font-mono border transition-all"
            style={{
              borderColor: showVwap ? '#e879f9' : 'var(--c-border)',
              color: showVwap ? '#e879f9' : 'var(--c-text-faint)',
              backgroundColor: showVwap ? '#e879f914' : 'transparent',
            }}>
            <span className="w-2.5 h-px rounded-full inline-block" style={{ backgroundColor: showVwap ? '#e879f9' : 'var(--c-border)' }} />
            VWAP
          </button>
        </div>

        <div className="w-px h-5 bg-[var(--c-border)] shrink-0" />

        {/* Bottom indicator */}
        <div className="flex items-center gap-0.5 shrink-0">
          {(['vol', 'rsi', 'macd'] as const).map(ind => (
            <button key={ind} onClick={() => setBottomInd(ind)}
              className={`px-2 py-1 rounded text-[10px] font-mono uppercase transition-colors ${
                bottomInd === ind ? 'text-[var(--c-text)] bg-[var(--c-surface)] border border-[var(--c-border)]' : 'text-[var(--c-text-faint)] hover:text-[var(--c-text-muted)]'
              }`}>
              {ind}
            </button>
          ))}
        </div>
      </div>

      {/* ── Progress Bar ──────────────────────────────────────────────────────── */}
      <div className="h-0.5 bg-[var(--c-bg-muted)] shrink-0">
        <div className="h-full bg-[#f59e0b] transition-all duration-100" style={{ width: `${progress}%` }} />
      </div>

      {/* ── Mobile tab bar ────────────────────────────────────────────────────── */}
      <div className="lg:hidden flex shrink-0 border-b border-[var(--c-border)] bg-[var(--c-bg-soft)]">
        {(['patterns', 'chart', 'info'] as const).map(t => (
          <button key={t} onClick={() => setMobileTab(t)}
            className={`flex-1 py-2.5 text-[11px] font-mono capitalize border-b-2 transition-colors ${
              mobileTab === t ? 'border-[#f59e0b] text-[var(--c-text)]' : 'border-transparent text-[var(--c-text-subtle)]'
            }`}>
            {t === 'patterns' ? 'Patterns' : t === 'chart' ? 'Chart' : 'Info'}
          </button>
        ))}
      </div>

      {/* ── Main Area ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden min-h-0">

        {/* Left: Pattern Library */}
        <div className={`
          ${mobileTab === 'patterns' ? 'flex' : 'hidden'} lg:flex
          ${showLib ? 'lg:w-[230px]' : 'lg:w-0'}
          shrink-0 flex-col border-r border-[var(--c-border)] bg-[var(--c-bg-soft)] overflow-hidden
          transition-all duration-200
        `}>
          {libraryJSX}
        </div>

        {/* Center: Chart */}
        <div className={`${mobileTab === 'chart' ? 'flex' : 'hidden'} lg:flex flex-1 flex-col relative overflow-hidden min-h-0 min-w-0`}>
          <div className="flex-1 overflow-hidden min-h-0">
            <SimChart
              candles={visibleCandles}
              markers={markers}
              showEma={showEma}
              showVwap={showVwap}
              bottomIndicator={bottomInd}
              resetKey={resetKey}
              onHover={setHoverOhlcv}
              onMarkerClick={id => { setActiveId(prev => prev === id ? null : id); setMobileTab('info'); }}
            />
          </div>

          {/* Chart overlay: symbol + candle info */}
          <div className="absolute top-3 left-3 pointer-events-none flex items-center gap-2">
            <div className="px-2.5 py-1.5 rounded text-[11px] font-mono border border-[var(--c-border)] flex items-center gap-2"
              style={{ backgroundColor: 'var(--c-overlay, rgba(13,13,13,0.85))' }}>
              <span className="text-[var(--c-text)] font-semibold">{sym.label}</span>
              <span className="text-[var(--c-text-subtle)]">·</span>
              <span className="text-[var(--c-text-subtle)]">{tf.label}</span>
              {last && (
                <>
                  <span className="text-[var(--c-text-subtle)]">·</span>
                  <span style={{ color: pctChange >= 0 ? '#22c55e' : '#ef4444' }}>
                    {pctChange >= 0 ? '+' : ''}{pctChange.toFixed(2)}%
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Pattern detection notification */}
          {notif && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none z-10">
              <div className="flex items-center gap-2 px-3 py-2 rounded border text-[11px] font-mono animate-pulse"
                style={{
                  borderColor: `${TYPE_COLOR[notif.type]}66`,
                  backgroundColor: `${TYPE_COLOR[notif.type]}18`,
                  color: TYPE_COLOR[notif.type],
                }}>
                <span>{notif.type === 'bullish' ? '▲' : notif.type === 'bearish' ? '▼' : '●'}</span>
                <span className="font-semibold">{notif.name}</span>
                <span className="text-[9px] opacity-70 uppercase tracking-wider">detected</span>
              </div>
            </div>
          )}

          {/* Keyboard hint */}
          <div className="absolute bottom-3 right-3 pointer-events-none text-[10px] font-mono text-[var(--c-text-faint)]">
            Space · ← →
          </div>
        </div>

        {/* Right: Pattern Info */}
        <div className={`
          ${mobileTab === 'info' ? 'flex' : 'hidden'} lg:flex
          w-full lg:w-[260px]
          shrink-0 flex-col border-l border-[var(--c-border)] bg-[var(--c-bg-soft)] overflow-hidden
        `}>
          {infoJSX}
        </div>
      </div>

      {/* ── Bottom Status Bar ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 px-3 h-8 border-t border-[var(--c-border)] bg-[var(--c-bg-soft)] shrink-0 overflow-x-auto">
        {displayOhlcv ? (
          <div className="flex items-center gap-3 text-[10px] font-mono shrink-0">
            {(['open', 'high', 'low', 'close'] as const).map(k => (
              <span key={k} className="flex items-center gap-1">
                <span className="text-[var(--c-text-faint)] uppercase text-[9px]">{k[0]}</span>
                <span className={k === 'close' ? (displayOhlcv.close >= displayOhlcv.open ? 'text-[#22c55e]' : 'text-[#ef4444]') : 'text-[var(--c-text-muted)]'}>
                  {fmtPrice(displayOhlcv[k])}
                </span>
              </span>
            ))}
            <span className="flex items-center gap-1">
              <span className="text-[var(--c-text-faint)] uppercase text-[9px]">V</span>
              <span className="text-[var(--c-text-muted)]">{fmtVol(displayOhlcv.volume)}</span>
            </span>
          </div>
        ) : (
          <span className="text-[10px] font-mono text-[var(--c-text-faint)]">Hover to see OHLCV</span>
        )}
        <div className="flex items-center gap-3 ml-auto shrink-0 text-[10px] font-mono text-[var(--c-text-subtle)]">
          <span>{revealed + 1} <span className="text-[var(--c-text-faint)]">/ {session.length}</span></span>
          <span className="text-[var(--c-text-faint)]">·</span>
          <span>{Object.keys(patternCounts).length} <span className="text-[var(--c-text-faint)]">patterns</span></span>
          <span className="text-[var(--c-text-faint)]">·</span>
          <span className="hidden sm:inline text-[var(--c-text-faint)]">{sym.label} · {tf.label}</span>
        </div>
      </div>
    </div>
  );
}
