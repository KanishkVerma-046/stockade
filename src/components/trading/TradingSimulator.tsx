import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import TradingChart from './TradingChart';
import { $activeTick } from '../../stores/priceStore';
import { isMarketable, isTriggered, type PendingOrder } from '../../lib/limit-orders';
import { format, formatMoney as fmtMoney, formatSignedMoney, plural, type PluralForms } from '../../lib/format';

type Side = 'long' | 'short' | null;
type OrderType = 'market' | 'limit';
type MobileTab = 'chart' | 'order' | 'trades';
type SimMode = 'live' | 'replay';

interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface Position {
  side: Side;
  qty: number;
  avgPrice: number;
  unrealizedPnl: number;
  openedAt: number;
}

interface Trade {
  id: string;
  side: 'buy' | 'sell';
  qty: number;
  price: number;
  time: number;
  pnl: number | null;
}

interface StoredTrade {
  id: string;
  symbol: string;
  side: 'LONG' | 'SHORT';
  entry: number;
  exit: number;
  qty: number;
  pnl: number;
  openedAt: number;
  closedAt: number;
}

interface OrderForm {
  type: OrderType;
  qty: string;
  limitPrice: string;
  stopLoss: string;
  takeProfit: string;
}


const SYMBOL_GROUPS = [
  { labelKey: 'groupStocks',  syms: ['APXL', 'TRXL', 'NVOX', 'MXFT', 'VXON', 'GLPH', 'MXTA', 'STRX', 'AXMD', 'CNBX', 'RXBT', 'PLZM', 'QVNT', 'VORX'] },
  { labelKey: 'groupCrypto',  syms: ['BLTC', 'ETHX', 'SLAX', 'XBEN', 'AVXL', 'DRLN', 'FLOX', 'NXVR'] },
  { labelKey: 'groupForex',   syms: ['EUR/USD', 'GBP/USD', 'USD/JPY'] },
  { labelKey: 'groupFutures', syms: ['/ES', '/NQ', '/CL', '/GC'] },
] as const;

// Strings with numbers are templates for format()/plural() in src/lib/format.ts.
// Placeholders: {price} a price with its $ prefix, {cost}/{balance} money,
// {n} order quantity, {cmp} ≤ or ≥, {label} an indicator name.
// BUY / SELL / FLATTEN, LIVE / REPLAY, LONG / SHORT and the B / S / F keys stay
// English in every locale (Phase A decision a), so they are not labels.
interface Labels {
  disclaimerTitle: string;
  disclaimerBody: string;
  disclaimerDismiss: string;
  groupStocks: string;
  groupCrypto: string;
  groupForex: string;
  groupFutures: string;
  order: string;
  orderMarket: string;
  orderLimit: string;
  qty: string;
  limitPrice: string;
  limitHelp: string;
  stopLoss: string;
  takeProfit: string;
  levelActive: string;
  optional: string;
  equity: string;
  pnl: string;
  winRate: string;
  cash: string;
  totalPnl: string;
  resetBalance: string;
  workingOrders: string;
  workingResting: string;
  cancel: string;
  cancelTitle: string;
  position: string;
  tradeHistory: string;
  clear: string;
  noTrades: string;
  liveTitle: string;
  replayTitle: string;
  newSession: string;
  newSessionTitle: string;
  play: string;
  pause: string;
  step: string;
  stepTitle: string;
  speed: string;
  sessionComplete: string;
  replayHint: string;
  // Mobile tab buttons, kept short so the three fit one line at 360px.
  tabChart: string;
  tabOrder: string;
  tabTrades: string;
  indicatorHide: string;
  indicatorShow: string;
  // Limit-order toasts come in a buy and a sell version instead of splicing
  // the action word into the sentence.
  toastInsufficientBalance: string;
  toastLimitPriceMissing: string;
  toastLimitBuyFilledNow: string;
  toastLimitSellFilledNow: string;
  toastLimitBuyResting: PluralForms;
  toastLimitSellResting: PluralForms;
  toastLimitBuyFilled: string;
  toastLimitSellFilled: string;
  toastLimitBuyCancelled: string;
  toastLimitSellCancelled: string;
}

const DEFAULT_LABELS: Labels = {
  disclaimerTitle: 'Simulation only.',
  disclaimerBody: 'All trading uses virtual money. Not financial advice.',
  disclaimerDismiss: 'Got it',
  groupStocks: 'Stocks',
  groupCrypto: 'Crypto',
  groupForex: 'Forex',
  groupFutures: 'Futures',
  order: 'Order',
  // Lowercase like the OrderType and MobileTab values they replace; CSS
  // capitalize stays on the English defaults only.
  orderMarket: 'market',
  orderLimit: 'limit',
  qty: 'Quantity',
  limitPrice: 'Limit Price',
  limitHelp: 'Buy below {price} or sell above it to rest the order until price reaches your level.',
  stopLoss: 'Stop Loss',
  takeProfit: 'Take Profit',
  levelActive: '· Active',
  optional: 'Optional',
  equity: 'Equity',
  pnl: 'P&L',
  winRate: 'Win Rate',
  cash: 'Cash',
  totalPnl: 'Total P&L',
  resetBalance: 'Reset Balance to $100,000',
  workingOrders: 'Working Orders',
  workingResting: 'resting · fills {cmp} {price}',
  cancel: 'Cancel',
  cancelTitle: 'Cancel this resting order',
  position: 'Position',
  tradeHistory: 'Trade History',
  clear: 'Clear',
  noTrades: 'No trades yet.',
  liveTitle: 'Live simulation — prices tick in real time',
  replayTitle: 'Replay mode — step through a session candle by candle',
  newSession: 'New',
  newSessionTitle: 'Generate a new random session',
  play: 'Play',
  pause: 'Pause',
  step: 'Step',
  stepTitle: 'Reveal next candle (Space / →)',
  speed: 'Speed',
  sessionComplete: 'Session complete',
  replayHint: 'Space / → to step · B buy · S sell · F flatten',
  tabChart: 'chart',
  tabOrder: 'order',
  tabTrades: 'trades',
  indicatorHide: 'Hide {label}',
  indicatorShow: 'Show {label}',
  toastInsufficientBalance: 'Insufficient balance — need {cost} but have {balance}',
  toastLimitPriceMissing: 'Enter a limit price, or switch to a market order.',
  toastLimitBuyFilledNow: 'Limit buy filled immediately at {price}',
  toastLimitSellFilledNow: 'Limit sell filled immediately at {price}',
  toastLimitBuyResting: {
    one: 'Limit buy for {n} resting at {price} — fills when price falls to that level.',
    other: 'Limit buy for {n} resting at {price} — fills when price falls to that level.',
  },
  toastLimitSellResting: {
    one: 'Limit sell for {n} resting at {price} — fills when price rises to that level.',
    other: 'Limit sell for {n} resting at {price} — fills when price rises to that level.',
  },
  toastLimitBuyFilled: 'Limit buy filled at {price}',
  toastLimitSellFilled: 'Limit sell filled at {price}',
  toastLimitBuyCancelled: 'Limit buy cancelled at {price} — not enough balance.',
  toastLimitSellCancelled: 'Limit sell cancelled at {price} — not enough balance.',
};

interface Props {
  // Selects the plural forms in labels (Intl.PluralRules). Numbers and money
  // stay en-US in every locale (Phase A decision b).
  locale?: string;
  // Merged over the English defaults, so English pages pass nothing.
  labels?: Partial<Labels>;
}

const SYMBOL_PRICES: Record<string, number> = {
  APXL: 187.42, TRXL: 248.11, NVOX: 875.63, MXFT: 415.22, VXON: 192.77,
  GLPH: 176.88, MXTA: 508.44, STRX: 685.90, AXMD: 156.74, CNBX: 228.44,
  RXBT: 124.33, PLZM: 89.15,  QVNT: 312.88, VORX: 548.20,
  BLTC: 67843,  ETHX: 3412,   SLAX: 168.22, XBEN: 608.14, AVXL: 35.84,
  DRLN: 8.42,   FLOX: 2.17,   NXVR: 0.4812,
  'EUR/USD': 1.0872, 'GBP/USD': 1.2714, 'USD/JPY': 157.42,
  '/ES': 5248.75, '/NQ': 18421.25, '/CL': 78.34, '/GC': 2341.40,
};

function generateCandles(basePrice: number, count = 500): Candle[] {
  // Walk backwards from basePrice so the newest candle always closes at basePrice,
  // keeping the simulator in sync with the ticker tape.
  const candles: Candle[] = [];
  let price = basePrice;
  let trend = (Math.random() - 0.5) * 0.4;
  const now = Date.now();
  for (let i = 0; i <= count; i++) {
    trend = trend * 0.94 + (Math.random() - 0.5) * 0.1;
    trend = Math.max(-0.55, Math.min(0.55, trend));
    const vol = basePrice * 0.007;
    const close = price;
    const body = (trend + (Math.random() - 0.5)) * vol;
    const open = Math.max(close - body, 0.01);
    const bodyHigh = Math.max(open, close);
    const bodyLow  = Math.min(open, close);
    const bodySize = Math.abs(body) || vol * 0.15;
    const high = bodyHigh + Math.random() * bodySize * (Math.random() < 0.15 ? 2.5 : 1.0);
    const low  = Math.max(bodyLow - Math.random() * bodySize * (Math.random() < 0.15 ? 2.5 : 1.0), 0.01);
    candles.unshift({ time: now - i * 60_000, open, high, low, close, volume: Math.floor(Math.random() * 600_000 + 80_000) });
    price = open;
  }
  return candles;
}

function generateReplaySession(basePrice: number, count = 600): Candle[] {
  // Candles timestamped as a past session (count minutes ago → now)
  const sessionStart = Date.now() - (count + 1) * 60_000;
  const candles: Candle[] = [];
  let price = basePrice;
  let trend = (Math.random() - 0.5) * 0.3;
  for (let i = 0; i < count; i++) {
    trend = trend * 0.93 + (Math.random() - 0.5) * 0.1;
    trend = Math.max(-0.6, Math.min(0.6, trend));
    const vol = price * 0.008;
    const open = price;
    const body = (trend + (Math.random() - 0.5) * 0.5) * vol;
    const close = Math.max(open + body, 0.01);
    const bodyHigh = Math.max(open, close);
    const bodyLow  = Math.min(open, close);
    const bodySize = Math.abs(body) || vol * 0.15;
    const high = bodyHigh + Math.random() * bodySize * (Math.random() < 0.12 ? 2.5 : 0.8);
    const low  = Math.max(bodyLow - Math.random() * bodySize * (Math.random() < 0.12 ? 2.5 : 0.8), 0.01);
    candles.push({
      time: sessionStart + i * 60_000,
      open, high, low, close,
      volume: Math.floor(Math.random() * 600_000 + 80_000),
    });
    price = close;
  }
  return candles;
}

function getBasePrice(sym: string): number {
  try {
    const stored = localStorage.getItem('stockade_prices');
    if (stored) {
      const map: Record<string, number> = JSON.parse(stored);
      if (map[sym] !== undefined) return map[sym];
    }
  } catch {}
  return SYMBOL_PRICES[sym] ?? 100;
}

function fmt2(n: number) { return n.toFixed(2); }
function fmtPct(n: number) { return (n >= 0 ? '+' : '') + n.toFixed(2) + '%'; }
function fmtSym(price: number, sym: string): string {
  if (price < 1 || sym === 'NXVR') return price.toFixed(4);
  if (sym === 'EUR/USD' || sym === 'GBP/USD') return price.toFixed(4);
  if (price >= 1000) return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return price.toFixed(2);
}
function symPrefix(sym: string): string {
  return (sym === 'EUR/USD' || sym === 'GBP/USD' || sym === 'USD/JPY') ? '' : '$';
}

function loadStoredBalance(): number {
  try { const v = localStorage.getItem('stockade_balance'); return v ? parseFloat(v) : 100_000; } catch { return 100_000; }
}

function loadStoredTrades(): Trade[] {
  try {
    const raw = localStorage.getItem('stockade_trades');
    const arr: StoredTrade[] = raw ? JSON.parse(raw) : [];
    return arr
      .sort((a, b) => b.closedAt - a.closedAt)
      .map(t => ({ id: t.id, side: t.side === 'LONG' ? 'sell' : 'buy' as 'buy' | 'sell', qty: t.qty, price: t.exit, time: t.closedAt, pnl: t.pnl }));
  } catch { return []; }
}

function appendStoredTrade(trade: StoredTrade) {
  try {
    const raw = localStorage.getItem('stockade_trades');
    const arr: StoredTrade[] = raw ? JSON.parse(raw) : [];
    arr.push(trade);
    localStorage.setItem('stockade_trades', JSON.stringify(arr));
  } catch {}
}

function DisclaimerBanner({ onDismiss, labels }: { onDismiss: () => void; labels: Labels }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-50 bg-[var(--c-amber-bg)] border-t border-[var(--c-amber-dim)] px-4 py-3 flex items-center gap-4">
      <svg className="shrink-0 text-[#f59e0b]" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1L15 14H1L8 1Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M8 6v3M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      <p className="text-[12px] text-[#f59e0b] flex-1">
        <strong>{labels.disclaimerTitle}</strong>{' ' + labels.disclaimerBody}
      </p>
      <button onClick={onDismiss} className="text-[#f59e0b] text-[12px] underline shrink-0 hover:no-underline">{labels.disclaimerDismiss}</button>
    </div>
  );
}

function initSymbol(): string {
  if (typeof window !== 'undefined') {
    const p = new URLSearchParams(window.location.search).get('symbol');
    if (p && p in SYMBOL_PRICES) return p;
  }
  return 'APXL';
}

const REPLAY_START_IDX = 60; // initial candles revealed in replay mode

export default function TradingSimulator({ locale = 'en', labels: labelOverrides }: Props) {
  // Memoised so the callbacks that read labels keep stable identities.
  const labels: Labels = useMemo(() => ({ ...DEFAULT_LABELS, ...labelOverrides }), [labelOverrides]);
  // CSS capitalize stays on the lowercase English defaults only; translated
  // labels come cased as the locale writes them.
  const labelCase = labelOverrides ? '' : ' capitalize';
  // The first render must match the static HTML, which was rendered at build
  // time with no URL, no localStorage and its own random prices; anything else
  // is React error #418. So it renders APXL with no history, the starting
  // balance and no trades, and the mount effect below loads the real symbol,
  // history, balance and trades. Until then the symbol, price and change show
  // "—" and no picker button is selected, so a ?symbol= link never flashes APXL.
  const [symbol, setSymbol]     = useState<string>('APXL');
  const [candles, setCandles]   = useState<Candle[]>([]);
  const [balance, setBalance]   = useState(100_000);
  const [position, setPosition] = useState<Position>({ side: null, qty: 0, avgPrice: 0, unrealizedPnl: 0, openedAt: 0 });
  const [trades, setTrades]     = useState<Trade[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [disclaimer, setDisclaimer] = useState(true);
  const [order, setOrder]       = useState<OrderForm>({ type: 'market', qty: '100', limitPrice: '', stopLoss: '', takeProfit: '' });
  const [mobileTab, setMobileTab] = useState<MobileTab>('chart');
  const [orderFlash, setOrderFlash] = useState<string | null>(null);
  const orderFlashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [pending, setPending] = useState<PendingOrder[]>([]);

  // Replay state
  const [mode, setMode]               = useState<SimMode>('live');
  const [replayIdx, setReplayIdx]     = useState(0);
  const [replayTotal, setReplayTotal] = useState(0);
  const [replayPlaying, setReplayPlaying] = useState(false);
  const [replaySpeed, setReplaySpeed] = useState(1);
  const [chartResetKey, setChartResetKey] = useState(0);

  const rootRef        = useRef<HTMLDivElement>(null);
  const intervalRef    = useRef<ReturnType<typeof setInterval> | null>(null);
  const trendBiasRef   = useRef(0);
  const candleStartRef = useRef(Date.now());
  const positionRef    = useRef(position);
  const orderRef       = useRef(order);

  // Replay refs
  const replaySessionRef  = useRef<Candle[]>([]);
  const replayIdxRef      = useRef(0);
  const replayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const modeRef           = useRef<SimMode>('live');

  // Ids of resting orders the fill effect has already acted on. The effect can
  // re-run before the matching `setPending` has committed, so this guards
  // against filling the same order twice inside that window.
  const handledPendingRef = useRef<Set<string>>(new Set());

  const flash = useCallback((msg: string) => {
    if (orderFlashTimer.current) clearTimeout(orderFlashTimer.current);
    setOrderFlash(msg);
    orderFlashTimer.current = setTimeout(() => setOrderFlash(null), 3000);
  }, []);

  // Resting orders are scoped to one symbol and one price series, so anything
  // that swaps either out (symbol change, live/replay switch, replay restart)
  // has to clear them rather than let them fire against unrelated prices.
  const clearPending = useCallback(() => {
    handledPendingRef.current.clear();
    setPending([]);
  }, []);

  useEffect(() => {
    const sym = initSymbol();
    setSymbol(sym);
    setCandles(generateCandles(getBasePrice(sym)));
    setChartResetKey(k => k + 1);
    setBalance(loadStoredBalance());
    setTrades(loadStoredTrades());
    setHydrated(true);
  }, []);

  useEffect(() => { positionRef.current = position; }, [position]);
  useEffect(() => { orderRef.current = order; }, [order]);
  // Not before the stored balance has been loaded, or it would be overwritten.
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem('stockade_balance', String(balance)); } catch {}
  }, [balance, hydrated]);

  const currentPrice = candles[candles.length - 1]?.close ?? SYMBOL_PRICES[symbol] ?? 100;
  const prevPrice    = candles[candles.length - 2]?.close ?? currentPrice;
  const priceChange  = currentPrice - prevPrice;
  const pricePct     = (priceChange / prevPrice) * 100;

  useEffect(() => {
    if (!hydrated) return;
    $activeTick.set({ symbol, price: currentPrice });
  }, [symbol, currentPrice, hydrated]);

  // Live tick interval — skipped in replay mode
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (modeRef.current !== 'live') return;
    trendBiasRef.current = 0;
    candleStartRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      setCandles(prev => {
        const last = prev[prev.length - 1];
        if (!last) return prev;
        trendBiasRef.current = trendBiasRef.current * 0.96 + (Math.random() - 0.5) * 0.07;
        trendBiasRef.current = Math.max(-0.55, Math.min(0.55, trendBiasRef.current));
        const vol   = last.close * 0.005;
        const move  = (trendBiasRef.current + (Math.random() - 0.5)) * vol;
        const close = Math.max(last.close + move, 0.01);
        const high  = Math.max(last.high, close);
        const low   = Math.min(last.low, close);
        const updated = { ...last, close, high, low };
        try {
          const raw = localStorage.getItem('stockade_prices');
          const map = raw ? JSON.parse(raw) : {};
          map[symbol] = close;
          localStorage.setItem('stockade_prices', JSON.stringify(map));
        } catch {}
        if (Date.now() - candleStartRef.current >= 10_000) {
          candleStartRef.current = Date.now();
          return [...prev.slice(-499), updated, { time: Date.now(), open: close, high: close, low: close, close, volume: Math.floor(Math.random() * 500_000) }];
        }
        return [...prev.slice(0, -1), updated];
      });
    }, 800);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [symbol, mode]); // mode in deps so the effect re-evaluates on mode change

  // Replay autoplay interval
  useEffect(() => {
    if (replayIntervalRef.current) clearInterval(replayIntervalRef.current);
    if (mode !== 'replay' || !replayPlaying) return;
    const delay = Math.max(50, Math.round(1000 / replaySpeed));
    replayIntervalRef.current = setInterval(() => {
      const session = replaySessionRef.current;
      const idx = replayIdxRef.current;
      if (idx >= session.length - 1) {
        setReplayPlaying(false);
        clearInterval(replayIntervalRef.current!);
        return;
      }
      const next = idx + 1;
      replayIdxRef.current = next;
      setReplayIdx(next);
      setCandles(session.slice(0, next + 1));
    }, delay);
    return () => { if (replayIntervalRef.current) clearInterval(replayIntervalRef.current); };
  }, [mode, replayPlaying, replaySpeed]);

  // Unrealized P&L update
  useEffect(() => {
    if (!position.side) return;
    const mult = position.side === 'long' ? 1 : -1;
    setPosition(p => ({ ...p, unrealizedPnl: mult * (currentPrice - p.avgPrice) * p.qty }));
  }, [currentPrice, position.side, position.avgPrice, position.qty]);

  // SL/TP auto-close
  useEffect(() => {
    const pos = positionRef.current;
    const ord = orderRef.current;
    if (!pos.side) return;
    const sl = parseFloat(ord.stopLoss);
    const tp = parseFloat(ord.takeProfit);
    const isLong = pos.side === 'long';
    const slHit = !isNaN(sl) && sl > 0 && ((isLong && currentPrice <= sl) || (!isLong && currentPrice >= sl));
    const tpHit = !isNaN(tp) && tp > 0 && ((isLong && currentPrice >= tp) || (!isLong && currentPrice <= tp));
    if (slHit || tpHit) {
      const pnl = (isLong ? 1 : -1) * (currentPrice - pos.avgPrice) * pos.qty;
      const id = crypto.randomUUID();
      const closedAt = Date.now();
      appendStoredTrade({ id, symbol, side: isLong ? 'LONG' : 'SHORT', entry: pos.avgPrice, exit: currentPrice, qty: pos.qty, pnl, openedAt: pos.openedAt, closedAt });
      setBalance(b => isLong ? b + currentPrice * pos.qty : b - currentPrice * pos.qty);
      setTrades(t => [{ id, side: isLong ? 'sell' : 'buy', qty: pos.qty, price: currentPrice, time: closedAt, pnl }, ...t.slice(0, 99)]);
      setPosition({ side: null, qty: 0, avgPrice: 0, unrealizedPnl: 0, openedAt: 0 });
      setOrder(o => ({ ...o, stopLoss: '', takeProfit: '' }));
    }
  }, [currentPrice]);

  // ── Replay management ─────────────────────────────────────────────────────────

  function enterReplay() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (replayIntervalRef.current) clearInterval(replayIntervalRef.current);
    setReplayPlaying(false);
    const session = generateReplaySession(getBasePrice(symbol));
    replaySessionRef.current = session;
    setReplayTotal(session.length);
    const startIdx = Math.min(REPLAY_START_IDX, session.length - 1);
    replayIdxRef.current = startIdx;
    setReplayIdx(startIdx);
    setCandles(session.slice(0, startIdx + 1));
    modeRef.current = 'replay';
    setMode('replay');
    setChartResetKey(k => k + 1);
    setPosition({ side: null, qty: 0, avgPrice: 0, unrealizedPnl: 0, openedAt: 0 });
    clearPending();
  }

  function enterLive() {
    if (replayIntervalRef.current) clearInterval(replayIntervalRef.current);
    setReplayPlaying(false);
    modeRef.current = 'live';
    setMode('live');
    setCandles(generateCandles(getBasePrice(symbol)));
    setChartResetKey(k => k + 1);
    setPosition({ side: null, qty: 0, avgPrice: 0, unrealizedPnl: 0, openedAt: 0 });
    clearPending();
  }

  function stepReplay() {
    const session = replaySessionRef.current;
    const idx = replayIdxRef.current;
    if (idx >= session.length - 1) return;
    const next = idx + 1;
    replayIdxRef.current = next;
    setReplayIdx(next);
    setCandles(session.slice(0, next + 1));
  }

  function resetReplay() {
    if (replayIntervalRef.current) clearInterval(replayIntervalRef.current);
    setReplayPlaying(false);
    const session = generateReplaySession(getBasePrice(symbol));
    replaySessionRef.current = session;
    setReplayTotal(session.length);
    const startIdx = Math.min(REPLAY_START_IDX, session.length - 1);
    replayIdxRef.current = startIdx;
    setReplayIdx(startIdx);
    setCandles(session.slice(0, startIdx + 1));
    setChartResetKey(k => k + 1);
    setPosition({ side: null, qty: 0, avgPrice: 0, unrealizedPnl: 0, openedAt: 0 });
    clearPending();
  }

  function changeSymbol(sym: string) {
    setSymbol(sym);
    setPosition({ side: null, qty: 0, avgPrice: 0, unrealizedPnl: 0, openedAt: 0 });
    clearPending();
    trendBiasRef.current = 0;
    if (modeRef.current === 'live') {
      setCandles(generateCandles(getBasePrice(sym)));
    } else {
      if (replayIntervalRef.current) clearInterval(replayIntervalRef.current);
      setReplayPlaying(false);
      const session = generateReplaySession(getBasePrice(sym));
      replaySessionRef.current = session;
      setReplayTotal(session.length);
      const startIdx = Math.min(REPLAY_START_IDX, session.length - 1);
      replayIdxRef.current = startIdx;
      setReplayIdx(startIdx);
      setCandles(session.slice(0, startIdx + 1));
    }
    setChartResetKey(k => k + 1);
  }

  function clearHistory() {
    try { localStorage.removeItem('stockade_trades'); } catch {}
    setTrades([]);
  }

  function resetBalance() {
    setBalance(100_000);
    setPosition({ side: null, qty: 0, avgPrice: 0, unrealizedPnl: 0, openedAt: 0 });
  }

  // Applies a fill at an explicit price and quantity. Both the immediate path
  // (market orders and marketable limits) and the resting path go through here
  // so the two cannot drift apart. Returns false when the fill was rejected.
  const fillOrder = useCallback((
    action: 'buy' | 'sell' | 'flatten',
    price: number,
    qty: number,
  ): boolean => {

    if (action === 'flatten') {
      if (!position.side) return false;
      const pnl = (position.side === 'long' ? 1 : -1) * (price - position.avgPrice) * position.qty;
      const id = crypto.randomUUID();
      const closedAt = Date.now();
      appendStoredTrade({ id, symbol, side: position.side === 'long' ? 'LONG' : 'SHORT', entry: position.avgPrice, exit: price, qty: position.qty, pnl, openedAt: position.openedAt, closedAt });
      setBalance(b => position.side === 'long' ? b + price * position.qty : b - price * position.qty);
      setTrades(t => [{ id, side: position.side === 'long' ? 'sell' : 'buy', qty: position.qty, price, time: closedAt, pnl }, ...t.slice(0, 99)]);
      setPosition({ side: null, qty: 0, avgPrice: 0, unrealizedPnl: 0, openedAt: 0 });
      return true;
    }

    const cost = price * qty;
    if (action === 'buy' && cost > balance) {
      flash(format(labels.toastInsufficientBalance, { cost: fmtMoney(cost), balance: fmtMoney(balance) }));
      return false;
    }

    if (!position.side) {
      setPosition({ side: action === 'buy' ? 'long' : 'short', qty, avgPrice: price, unrealizedPnl: 0, openedAt: Date.now() });
      setBalance(b => action === 'buy' ? b - cost : b + cost);
    } else {
      const sameDir = (action === 'buy' && position.side === 'long') || (action === 'sell' && position.side === 'short');
      if (sameDir) {
        const newQty = position.qty + qty;
        setPosition(p => ({ ...p, qty: newQty, avgPrice: (p.avgPrice * p.qty + price * qty) / newQty }));
        setBalance(b => action === 'buy' ? b - cost : b + cost);
      } else {
        const pnl = (position.side === 'long' ? 1 : -1) * (price - position.avgPrice) * Math.min(qty, position.qty);
        setBalance(b => b + (action === 'buy' ? -cost : cost));
        if (qty >= position.qty) {
          const id = crypto.randomUUID();
          const closedAt = Date.now();
          appendStoredTrade({ id, symbol, side: position.side === 'long' ? 'LONG' : 'SHORT', entry: position.avgPrice, exit: price, qty: position.qty, pnl, openedAt: position.openedAt, closedAt });
          setTrades(t => [{ id, side: action, qty: position.qty, price, time: closedAt, pnl }, ...t.slice(0, 99)]);
          setPosition(qty > position.qty
            ? { side: action === 'buy' ? 'long' : 'short', qty: qty - position.qty, avgPrice: price, unrealizedPnl: 0, openedAt: closedAt }
            : { side: null, qty: 0, avgPrice: 0, unrealizedPnl: 0, openedAt: 0 });
        } else {
          const id = crypto.randomUUID();
          const closedAt = Date.now();
          appendStoredTrade({ id, symbol, side: position.side === 'long' ? 'LONG' : 'SHORT', entry: position.avgPrice, exit: price, qty, pnl, openedAt: position.openedAt, closedAt });
          setPosition(p => ({ ...p, qty: p.qty - qty }));
          setTrades(t => [{ id, side: action, qty, price, time: closedAt, pnl }, ...t.slice(0, 99)]);
        }
      }
    }
    return true;
  }, [balance, position, symbol, flash, labels]);

  // Placement. A market order fills at the last traded price. A limit order
  // fills immediately only if it is already marketable — otherwise it rests
  // until the market trades through its price (see the fill effect below).
  const execOrder = useCallback((action: 'buy' | 'sell' | 'flatten') => {
    const qty = parseInt(order.qty, 10) || 100;

    if (action === 'flatten' || order.type !== 'limit') {
      fillOrder(action, currentPrice, qty);
      return;
    }

    const limitPrice = parseFloat(order.limitPrice);
    if (isNaN(limitPrice) || limitPrice <= 0) {
      flash(labels.toastLimitPriceMissing);
      return;
    }

    if (isMarketable(action, limitPrice, currentPrice)) {
      // Marketable on arrival: fills at the prevailing price, which is at
      // least as good for the trader as the limit they asked for.
      if (fillOrder(action, currentPrice, qty)) {
        flash(format(action === 'buy' ? labels.toastLimitBuyFilledNow : labels.toastLimitSellFilledNow,
          { price: symPrefix(symbol) + fmtSym(currentPrice, symbol) }));
      }
      return;
    }

    setPending(p => [
      ...p,
      { id: crypto.randomUUID(), action, qty, limitPrice, placedAt: Date.now() },
    ]);
    flash(plural(locale, qty, action === 'buy' ? labels.toastLimitBuyResting : labels.toastLimitSellResting,
      { price: symPrefix(symbol) + fmtSym(limitPrice, symbol) }));
  }, [order, currentPrice, symbol, fillOrder, flash, labels, locale]);

  function cancelPending(id: string) {
    handledPendingRef.current.delete(id);
    setPending(p => p.filter(o => o.id !== id));
  }

  // Resting-order fill. Runs on every price change and triggers any order the
  // market has reached. Fills at the order's limit price rather than the tick
  // price, so a synthetic gap through the level cannot hand out a better fill
  // than the trader actually asked for.
  useEffect(() => {
    if (pending.length === 0) return;
    const hit = pending.find(o => !handledPendingRef.current.has(o.id) && isTriggered(o, currentPrice));
    if (!hit) return;

    // Marked before the fill and left marked: the id stays in the set for the
    // rest of the session so a second invocation carrying the same (not yet
    // committed) `pending` array cannot fill the order twice. Clearing it here
    // would reopen exactly the window the guard exists to close, and React
    // double-invokes effects under StrictMode in development.
    handledPendingRef.current.add(hit.id);
    const filled = fillOrder(hit.action, hit.limitPrice, hit.qty);
    setPending(p => p.filter(o => o.id !== hit.id));
    const buy = hit.action === 'buy';
    flash(format(
      filled
        ? (buy ? labels.toastLimitBuyFilled : labels.toastLimitSellFilled)
        : (buy ? labels.toastLimitBuyCancelled : labels.toastLimitSellCancelled),
      { price: symPrefix(symbol) + fmtSym(hit.limitPrice, symbol) },
    ));
  }, [currentPrice, pending, fillOrder, flash, symbol, labels]);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
      if (e.key === 'b' || e.key === 'B') execOrder('buy');
      if (e.key === 's' || e.key === 'S') execOrder('sell');
      if (e.key === 'f' || e.key === 'F') execOrder('flatten');
      // Space = step one candle in replay mode
      if ((e.key === ' ' || e.key === 'ArrowRight') && modeRef.current === 'replay') {
        e.preventDefault();
        stepReplay();
      }
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [execOrder]);

  const totalPnl  = trades.reduce((s, t) => s + (t.pnl ?? 0), 0);
  const equity    = balance
    + (position.side === 'long'  ?  currentPrice * position.qty
       : position.side === 'short' ? -currentPrice * position.qty
       : 0);
  const winTrades = trades.filter(t => (t.pnl ?? 0) > 0);
  const winRate   = trades.length ? (winTrades.length / trades.length) * 100 : 0;
  const slVal     = parseFloat(order.stopLoss);
  const tpVal     = parseFloat(order.takeProfit);
  // Replay candles are one minute apart. A live chart has no single interval:
  // one-minute history, then a new candle every 10 s, so it shows none.
  const intervalSuffix = mode === 'replay' ? ' · 1M' : '';
  // Neutral placeholders until the mount effect has loaded the real symbol.
  const symbolText = hydrated ? symbol + intervalSuffix : '—';
  const priceText  = hydrated ? symPrefix(symbol) + fmtSym(currentPrice, symbol) : '—';
  const changeColor = !hydrated ? 'text-[var(--c-text-subtle)]' : priceChange >= 0 ? 'text-[#22c55e]' : 'text-[#ef4444]';

  // ── Shared sub-renders ─────────────────────────────────────────────────────

  const pricePanelJSX = (
    <div className="px-4 pt-4 pb-3 border-b border-[var(--c-border)] shrink-0">
      <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--c-text-subtle)] mb-2">{symbolText}</div>
      <div className="text-[26px] font-mono font-bold text-[var(--c-text)] leading-none">
        {priceText}
      </div>
      <div className={`mt-1.5 text-[13px] font-mono ${changeColor}`}>
        {hydrated ? <>
          {priceChange >= 0 ? '+' : ''}{fmtSym(Math.abs(priceChange), symbol)}
          <span className="ml-1 text-[12px]">({fmtPct(pricePct)})</span>
        </> : '—'}
      </div>
    </div>
  );

  const orderFormJSX = (
    <div className="p-3 space-y-2">
      <div className="text-[11px] font-mono uppercase tracking-widest text-[var(--c-text-subtle)] mb-3">{labels.order}</div>

      <div className="flex gap-1 mb-3">
        {(['market', 'limit'] as OrderType[]).map(t => (
          <button key={t} onClick={() => setOrder(o => ({ ...o, type: t }))}
            className={`flex-1 py-1 text-[11px] font-mono rounded${labelCase} transition-colors ${
              order.type === t ? 'bg-[var(--c-surface-2)] text-[var(--c-text)]' : 'text-[var(--c-text-subtle)] hover:text-[var(--c-text-muted)]'
            }`}>{t === 'market' ? labels.orderMarket : labels.orderLimit}</button>
        ))}
      </div>

      <div>
        <label className="text-[10px] font-mono text-[var(--c-text-subtle)] uppercase tracking-wider block mb-1">{labels.qty}</label>
        <input type="number" value={order.qty}
          onChange={e => setOrder(o => ({ ...o, qty: e.target.value }))}
          className="w-full bg-[var(--c-bg-muted)] border border-[var(--c-border)] rounded px-2 py-1.5 text-[13px] font-mono text-[var(--c-text)] focus:border-[#f59e0b] outline-none" />
      </div>

      {order.type === 'limit' && (
        <div>
          <label className="text-[10px] font-mono text-[var(--c-text-subtle)] uppercase tracking-wider block mb-1">{labels.limitPrice}</label>
          <input type="number" value={order.limitPrice} placeholder={fmtSym(currentPrice, symbol)}
            onChange={e => setOrder(o => ({ ...o, limitPrice: e.target.value }))}
            className="w-full bg-[var(--c-bg-muted)] border border-[var(--c-border)] rounded px-2 py-1.5 text-[13px] font-mono text-[var(--c-text)] focus:border-[#f59e0b] outline-none" />
          <p className="mt-1 text-[10px] font-mono text-[var(--c-text-faint)] leading-snug">
            {format(labels.limitHelp, { price: symPrefix(symbol) + fmtSym(currentPrice, symbol) })}
          </p>
        </div>
      )}

      <div>
        <label className="text-[10px] font-mono text-[var(--c-text-subtle)] uppercase tracking-wider block mb-1">
          {labels.stopLoss}{order.stopLoss && <span className="ml-1 text-[#ef4444]">{labels.levelActive}</span>}
        </label>
        <input type="number" value={order.stopLoss} placeholder={labels.optional}
          onChange={e => setOrder(o => ({ ...o, stopLoss: e.target.value }))}
          className="w-full bg-[var(--c-bg-muted)] border border-[var(--c-border)] rounded px-2 py-1.5 text-[13px] font-mono text-[var(--c-text)] focus:border-[#ef4444] outline-none" />
      </div>

      <div className="mb-1">
        <label className="text-[10px] font-mono text-[var(--c-text-subtle)] uppercase tracking-wider block mb-1">
          {labels.takeProfit}{order.takeProfit && <span className="ml-1 text-[#22c55e]">{labels.levelActive}</span>}
        </label>
        <input type="number" value={order.takeProfit} placeholder={labels.optional}
          onChange={e => setOrder(o => ({ ...o, takeProfit: e.target.value }))}
          className="w-full bg-[var(--c-bg-muted)] border border-[var(--c-border)] rounded px-2 py-1.5 text-[13px] font-mono text-[var(--c-text)] focus:border-[#22c55e] outline-none" />
      </div>

      {orderFlash && (
        <div className="px-2 py-1.5 rounded bg-[#ef444415] border border-[#ef444430] text-[11px] font-mono text-[#ef4444] leading-snug">
          {orderFlash}
        </div>
      )}

      <div className="flex gap-1">
        <button onClick={() => execOrder('buy')}
          className="flex-1 py-2.5 bg-[var(--c-green-bg)] border border-[var(--c-green-dim)] text-[#22c55e] text-[13px] font-mono font-semibold rounded hover:brightness-110 transition-all">
          BUY <span className="text-[10px] opacity-60">[B]</span>
        </button>
        <button onClick={() => execOrder('sell')}
          className="flex-1 py-2.5 bg-[var(--c-red-bg)] border border-[var(--c-red-dim)] text-[#ef4444] text-[13px] font-mono font-semibold rounded hover:brightness-110 transition-all">
          SELL <span className="text-[10px] opacity-60">[S]</span>
        </button>
      </div>
      <button onClick={() => execOrder('flatten')} disabled={!position.side}
        className="w-full py-1.5 bg-[var(--c-bg-muted)] border border-[var(--c-border)] text-[var(--c-text-muted)] text-[12px] font-mono rounded hover:bg-[var(--c-surface-2)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
        FLATTEN <span className="text-[10px] opacity-60">[F]</span>
      </button>

      {/* Account summary */}
      <div className="border-t border-[var(--c-border)] pt-3 mt-3 space-y-1">
        {[
          { label: labels.equity, value: fmtMoney(equity),  color: equity >= 100000 ? '#22c55e' : '#ef4444' },
          { label: labels.pnl,    value: formatSignedMoney(totalPnl), color: totalPnl >= 0 ? '#22c55e' : '#ef4444' },
          { label: labels.winRate, value: winRate.toFixed(0) + '%', color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} className="flex justify-between items-center py-0.5">
            <span className="text-[11px] font-mono text-[var(--c-text-subtle)]">{s.label}</span>
            <span className="text-[12px] font-mono" style={{ color: s.color }}>{s.value}</span>
          </div>
        ))}
        <button onClick={resetBalance}
          className="w-full mt-1 py-1 text-[11px] font-mono text-[var(--c-text-subtle)] border border-[var(--c-border)] rounded hover:border-[#f59e0b] hover:text-[#f59e0b] transition-colors">
          {labels.resetBalance}
        </button>
      </div>

      {pending.length > 0 && (
        <div className="rounded p-2.5 border border-[var(--c-border)] bg-[var(--c-bg-muted)]">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--c-text-subtle)] mb-1.5">
            {labels.workingOrders}
          </div>
          <div className="space-y-1.5">
            {pending.map(o => (
              <div key={o.id} className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className={`text-[12px] font-mono font-semibold ${o.action === 'buy' ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                    {o.action.toUpperCase()} {o.qty} @ {symPrefix(symbol)}{fmtSym(o.limitPrice, symbol)}
                  </div>
                  <div className="text-[10px] font-mono text-[var(--c-text-faint)]">
                    {format(labels.workingResting, { cmp: o.action === 'buy' ? '≤' : '≥', price: symPrefix(symbol) + fmtSym(o.limitPrice, symbol) })}
                  </div>
                </div>
                <button
                  onClick={() => cancelPending(o.id)}
                  title={labels.cancelTitle}
                  className="shrink-0 text-[10px] font-mono text-[var(--c-text-subtle)] hover:text-[#ef4444] transition-colors"
                >
                  {labels.cancel}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {position.side && (
        <div className={`rounded p-2.5 border ${position.side === 'long' ? 'bg-[var(--c-green-bg)] border-[var(--c-green-dim)]' : 'bg-[var(--c-red-bg)] border-[var(--c-red-dim)]'}`}>
          <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--c-text-subtle)] mb-1">{labels.position}</div>
          <div className={`text-[13px] font-mono font-semibold ${position.side === 'long' ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
            {position.side.toUpperCase()} {position.qty}
          </div>
          <div className="text-[11px] font-mono text-[var(--c-text-muted)]">@ {symPrefix(symbol)}{fmtSym(position.avgPrice, symbol)}</div>
          <div className={`text-[13px] font-mono mt-1 ${position.unrealizedPnl >= 0 ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
            {formatSignedMoney(position.unrealizedPnl)}
          </div>
        </div>
      )}
    </div>
  );

  const tradesListJSX = (
    <div className="p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="text-[11px] font-mono uppercase tracking-widest text-[var(--c-text-subtle)]">{labels.tradeHistory}</div>
        {trades.length > 0 && (
          <button onClick={clearHistory}
            className="text-[10px] font-mono text-[var(--c-text-subtle)] hover:text-[#ef4444] transition-colors">
            {labels.clear}
          </button>
        )}
      </div>
      {trades.length === 0 ? (
        <p className="text-[11px] text-[var(--c-text-faint)] font-mono">{labels.noTrades}</p>
      ) : (
        <div className="space-y-1">
          {trades.slice(0, 30).map(t => (
            <div key={t.id} className="bg-[var(--c-bg-muted)] rounded p-2 text-[11px] font-mono border border-[var(--c-border)]">
              <div className="flex justify-between">
                <span className={t.side === 'buy' ? 'text-[#22c55e]' : 'text-[#ef4444]'}>{t.side.toUpperCase()} {t.qty}</span>
                <span className="text-[var(--c-text-muted)]">${fmt2(t.price)}</span>
              </div>
              {t.pnl !== null && (
                <div className={`mt-0.5 ${t.pnl >= 0 ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                  {formatSignedMoney(t.pnl)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const replayAtEnd = replayIdx >= replayTotal - 1;

  return (
    <div ref={rootRef} className="relative flex flex-col h-full bg-[var(--c-bg)] text-[var(--c-text)]">
      {disclaimer && <DisclaimerBanner onDismiss={() => setDisclaimer(false)} labels={labels} />}

      {/* ── Top toolbar ── */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--c-border)] bg-[var(--c-bg-soft)] overflow-x-auto shrink-0">

        {/* Mode toggle */}
        <div className="flex items-center gap-1 shrink-0 border-r border-[var(--c-border)] pr-2.5 mr-0.5">
          <button
            onClick={enterLive}
            title={labels.liveTitle}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-mono transition-colors ${
              mode === 'live'
                ? 'bg-[var(--c-green-bg)] text-[#22c55e] border border-[var(--c-green-dim)] font-semibold'
                : 'text-[var(--c-text-muted)] hover:text-[var(--c-text)] hover:bg-[var(--c-bg-muted)] border border-transparent'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full bg-[#22c55e] ${mode === 'live' ? 'animate-pulse' : 'opacity-40'}`} />
            LIVE
          </button>
          <button
            onClick={enterReplay}
            title={labels.replayTitle}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-mono transition-colors ${
              mode === 'replay'
                ? 'bg-[#3b82f620] text-[#3b82f6] border border-[#3b82f640] font-semibold'
                : 'text-[var(--c-text-muted)] hover:text-[var(--c-text)] hover:bg-[var(--c-bg-muted)] border border-transparent'
            }`}
          >
            ⏪ REPLAY
          </button>
        </div>

        {/* Symbol groups */}
        <div className="flex items-center gap-3">
          {SYMBOL_GROUPS.map(group => (
            <div key={group.labelKey} className="flex items-center gap-1 shrink-0">
              <span className="hidden sm:block text-[9px] font-mono text-[var(--c-text-faint)] uppercase tracking-wider pr-1.5 mr-0.5 border-r border-[var(--c-border)]">{labels[group.labelKey]}</span>
              {group.syms.map(sym => (
                <button key={sym} onClick={() => changeSymbol(sym)}
                  className={`px-2 py-1 rounded text-[11px] font-mono whitespace-nowrap transition-colors ${
                    hydrated && sym === symbol
                      ? 'bg-[#f59e0b] text-[#0a0a0a] font-semibold'
                      : 'text-[var(--c-text-muted)] hover:text-[var(--c-text)] hover:bg-[var(--c-bg-muted)]'
                  }`}>{sym}</button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Replay controls bar ── */}
      {mode === 'replay' && (
        <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--c-border)] bg-[var(--c-bg-subtle)] shrink-0 overflow-x-auto">

          {/* New session */}
          <button
            onClick={resetReplay}
            title={labels.newSessionTitle}
            className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-mono text-[var(--c-text-muted)] hover:text-[var(--c-text)] hover:bg-[var(--c-bg-muted)] border border-[var(--c-border)] transition-colors shrink-0"
          >
            {'↺ ' + labels.newSession}
          </button>

          <div className="w-px h-4 bg-[var(--c-border)] shrink-0" />

          {/* Play / Pause */}
          <button
            onClick={() => setReplayPlaying(p => !p)}
            disabled={replayAtEnd}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-[11px] font-mono font-semibold transition-colors shrink-0 disabled:opacity-40 disabled:cursor-not-allowed ${
              replayPlaying
                ? 'bg-[var(--c-amber-bg)] text-[#f59e0b] border border-[var(--c-amber-dim)]'
                : 'bg-[#3b82f620] text-[#3b82f6] border border-[#3b82f640] hover:bg-[#3b82f630]'
            }`}
          >
            {replayPlaying ? '⏸ ' + labels.pause : '▶ ' + labels.play}
          </button>

          {/* Step */}
          <button
            onClick={stepReplay}
            disabled={replayAtEnd}
            title={labels.stepTitle}
            className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-mono text-[var(--c-text-muted)] hover:text-[var(--c-text)] hover:bg-[var(--c-bg-muted)] border border-[var(--c-border)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            {'▶| ' + labels.step}
          </button>

          <div className="w-px h-4 bg-[var(--c-border)] shrink-0" />

          {/* Speed */}
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[10px] font-mono text-[var(--c-text-subtle)] uppercase mr-0.5">{labels.speed}</span>
            {([1, 2, 5, 10] as const).map(s => (
              <button
                key={s}
                onClick={() => setReplaySpeed(s)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                  replaySpeed === s
                    ? 'text-[#f59e0b] bg-[var(--c-amber-bg)] border border-[var(--c-amber-dim)]'
                    : 'text-[var(--c-text-subtle)] hover:text-[var(--c-text-muted)] border border-transparent'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2 ml-auto shrink-0">
            {replayAtEnd && (
              <span className="text-[10px] font-mono text-[#f59e0b]">{labels.sessionComplete}</span>
            )}
            <span className="text-[10px] font-mono text-[var(--c-text-subtle)]">
              {replayIdx + 1} / {replayTotal}
            </span>
            <div className="w-24 h-1 bg-[var(--c-bg-muted)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#3b82f6] rounded-full transition-all duration-75"
                style={{ width: `${replayTotal > 1 ? (replayIdx / (replayTotal - 1)) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Main grid ── */}
      <div className="flex flex-1 overflow-hidden min-h-0">

        {/* Left stats — desktop only */}
        <div className="hidden lg:flex w-[180px] shrink-0 flex-col border-r border-[var(--c-border)] bg-[var(--c-bg-subtle)] overflow-y-auto">
          <div className="p-3 flex flex-col gap-3 shrink-0">
            {[
              { label: labels.equity,   value: fmtMoney(equity),   color: equity >= 100000 ? '#22c55e' : '#ef4444' },
              { label: labels.cash,     value: fmtMoney(balance),  color: 'var(--c-text)' },
              { label: labels.totalPnl, value: formatSignedMoney(totalPnl), color: totalPnl >= 0 ? '#22c55e' : '#ef4444' },
            ].map(s => (
              <div key={s.label} className="bg-[var(--c-bg-muted)] rounded p-2.5 border border-[var(--c-border)]">
                <div className="text-[10px] font-mono text-[var(--c-text-subtle)] uppercase tracking-wider mb-1">{s.label}</div>
                <div className="text-[15px] font-mono font-semibold" style={{ color: s.color }}>{s.value}</div>
              </div>
            ))}
            {position.side && (
              <div className={`rounded p-2.5 border ${position.side === 'long' ? 'bg-[var(--c-green-bg)] border-[var(--c-green-dim)]' : 'bg-[var(--c-red-bg)] border-[var(--c-red-dim)]'}`}>
                <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--c-text-subtle)] mb-1">{labels.position}</div>
                <div className={`text-[13px] font-mono font-semibold ${position.side === 'long' ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                  {position.side.toUpperCase()} {position.qty}
                </div>
                <div className="text-[11px] font-mono text-[var(--c-text-muted)]">@ {symPrefix(symbol)}{fmtSym(position.avgPrice, symbol)}</div>
                <div className={`text-[13px] font-mono mt-1 ${position.unrealizedPnl >= 0 ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                  {formatSignedMoney(position.unrealizedPnl)}
                </div>
              </div>
            )}
          </div>
          <div className="border-t border-[var(--c-border)] flex-1 overflow-y-auto">
            {tradesListJSX}
          </div>
        </div>

        {/* Center: chart + mobile content */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">

          {/* Mobile tab bar */}
          <div className="lg:hidden flex shrink-0 border-b border-[var(--c-border)] bg-[var(--c-bg-soft)]">
            {(['chart', 'order', 'trades'] as MobileTab[]).map(t => (
              <button key={t} onClick={() => setMobileTab(t)}
                className={`flex-1 py-2.5 text-[12px] font-mono${labelCase} border-b-2 transition-colors ${
                  mobileTab === t ? 'border-[#f59e0b] text-[var(--c-text)]' : 'border-transparent text-[var(--c-text-subtle)]'
                }`}>
                {t === 'chart' ? labels.tabChart : t === 'order' ? labels.tabOrder : labels.tabTrades}
              </button>
            ))}
          </div>

          {/* Chart area */}
          <div className={`flex-1 overflow-hidden bg-[var(--c-bg-subtle)] relative min-h-0 ${mobileTab !== 'chart' ? 'hidden lg:flex lg:flex-col' : 'flex flex-col'}`}>
            <div className="w-full h-full">
              <TradingChart
                candles={candles}
                symbol={symbol}
                entryPrice={position.side ? position.avgPrice : null}
                positionSide={position.side}
                stopLoss={!isNaN(slVal) && slVal > 0 ? slVal : null}
                takeProfit={!isNaN(tpVal) && tpVal > 0 ? tpVal : null}
                resetKey={chartResetKey}
                indicatorTitles={{ hide: labels.indicatorHide, show: labels.indicatorShow }}
              />
            </div>
            <div className="absolute top-3 left-3 rounded px-3 py-2 backdrop-blur-sm border border-[var(--c-border)] pointer-events-none"
              style={{ backgroundColor: 'var(--c-overlay)' }}>
              <div className="text-[11px] font-mono text-[var(--c-text-subtle)] uppercase tracking-wider">{symbolText}</div>
              <div className="text-[20px] font-mono font-semibold text-[var(--c-text)]">{priceText}</div>
              <div className={`text-[12px] font-mono ${changeColor}`}>{hydrated ? fmtPct(pricePct) : '—'}</div>
            </div>
            {/* Replay hint */}
            {mode === 'replay' && (
              <div className="absolute bottom-3 left-3 text-[10px] font-mono text-[var(--c-text-faint)] pointer-events-none">
                {labels.replayHint}
              </div>
            )}
          </div>

          {/* Mobile: Order tab */}
          <div className={`lg:hidden flex-1 overflow-y-auto bg-[var(--c-bg-subtle)] min-h-0 ${mobileTab !== 'order' ? 'hidden' : ''}`}>
            {pricePanelJSX}
            {orderFormJSX}
          </div>

          {/* Mobile: Trades tab */}
          <div className={`lg:hidden flex-1 overflow-y-auto bg-[var(--c-bg-subtle)] min-h-0 ${mobileTab !== 'trades' ? 'hidden' : ''}`}>
            {tradesListJSX}
          </div>
        </div>

        {/* Right panel — desktop only */}
        <div className="hidden lg:flex w-[220px] shrink-0 border-l border-[var(--c-border)] bg-[var(--c-bg-subtle)] flex-col overflow-y-auto">
          {pricePanelJSX}
          {orderFormJSX}
        </div>
      </div>
    </div>
  );
}
