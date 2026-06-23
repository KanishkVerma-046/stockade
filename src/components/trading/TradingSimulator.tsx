import { useState, useEffect, useCallback, useRef } from 'react';
import TradingChart from './TradingChart';
import { $activeTick } from '../../stores/priceStore';

type Side = 'long' | 'short' | null;
type OrderType = 'market' | 'limit';
type MobileTab = 'chart' | 'order' | 'trades';

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
  { label: 'Stocks',  syms: ['APXL', 'TRXL', 'NVOX', 'MXFT', 'VXON', 'GLPH', 'MXTA', 'STRX', 'AXMD', 'CNBX', 'RXBT', 'PLZM', 'QVNT', 'VORX'] },
  { label: 'Crypto',  syms: ['BLTC', 'ETHX', 'SLAX', 'XBEN', 'AVXL', 'DRLN', 'FLOX', 'NXVR'] },
  { label: 'Forex',   syms: ['EUR/USD', 'GBP/USD', 'USD/JPY'] },
  { label: 'Futures', syms: ['/ES', '/NQ', '/CL', '/GC'] },
];

const SYMBOL_PRICES: Record<string, number> = {
  APXL: 187.42, TRXL: 248.11, NVOX: 875.63, MXFT: 415.22, VXON: 192.77,
  GLPH: 176.88, MXTA: 508.44, STRX: 685.90, AXMD: 156.74, CNBX: 228.44,
  RXBT: 124.33, PLZM: 89.15,  QVNT: 312.88, VORX: 548.20,
  BLTC: 67843,  ETHX: 3412,   SLAX: 168.22, XBEN: 608.14, AVXL: 35.84,
  DRLN: 8.42,   FLOX: 2.17,   NXVR: 0.4812,
  'EUR/USD': 1.0872, 'GBP/USD': 1.2714, 'USD/JPY': 157.42,
  '/ES': 5248.75, '/NQ': 18421.25, '/CL': 78.34, '/GC': 2341.40,
};

function generateCandles(basePrice: number, count = 200): Candle[] {
  const candles: Candle[] = [];
  let price = basePrice;
  let trend = (Math.random() - 0.5) * 0.4;
  const now = Date.now();
  for (let i = count; i >= 0; i--) {
    trend = trend * 0.94 + (Math.random() - 0.5) * 0.1;
    trend = Math.max(-0.55, Math.min(0.55, trend));
    const vol = basePrice * 0.007;
    const open = price;
    const body = (trend + (Math.random() - 0.5)) * vol;
    const close = Math.max(open + body, 0.01);
    const bodyHigh = Math.max(open, close);
    const bodyLow  = Math.min(open, close);
    const bodySize = Math.abs(body) || vol * 0.15;
    const high = bodyHigh + Math.random() * bodySize * (Math.random() < 0.15 ? 2.5 : 1.0);
    const low  = Math.max(bodyLow - Math.random() * bodySize * (Math.random() < 0.15 ? 2.5 : 1.0), 0.01);
    candles.push({ time: now - i * 60_000, open, high, low, close, volume: Math.floor(Math.random() * 600_000 + 80_000) });
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
function fmtMoney(n: number) {
  return '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
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

function DisclaimerBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-50 bg-[var(--c-amber-bg)] border-t border-[var(--c-amber-dim)] px-4 py-3 flex items-center gap-4">
      <svg className="shrink-0 text-[#f59e0b]" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1L15 14H1L8 1Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M8 6v3M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      <p className="text-[12px] text-[#f59e0b] flex-1">
        <strong>Simulation only.</strong> All trading uses virtual money. Not financial advice.
      </p>
      <button onClick={onDismiss} className="text-[#f59e0b] text-[12px] underline shrink-0 hover:no-underline">Got it</button>
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

export default function TradingSimulator() {
  const [symbol, setSymbol]     = useState<string>(initSymbol);
  const [candles, setCandles]   = useState<Candle[]>(() => generateCandles(getBasePrice(initSymbol())));
  const [balance, setBalance]   = useState(() => typeof window !== 'undefined' ? loadStoredBalance() : 100_000);
  const [position, setPosition] = useState<Position>({ side: null, qty: 0, avgPrice: 0, unrealizedPnl: 0, openedAt: 0 });
  const [trades, setTrades]     = useState<Trade[]>(() => typeof window !== 'undefined' ? loadStoredTrades() : []);
  const [disclaimer, setDisclaimer] = useState(true);
  const [order, setOrder]       = useState<OrderForm>({ type: 'market', qty: '100', limitPrice: '', stopLoss: '', takeProfit: '' });
  const [mobileTab, setMobileTab] = useState<MobileTab>('chart');

  const rootRef        = useRef<HTMLDivElement>(null);
  const intervalRef    = useRef<ReturnType<typeof setInterval> | null>(null);
  const trendBiasRef   = useRef(0);
  const candleStartRef = useRef(Date.now());
  const positionRef    = useRef(position);
  const orderRef       = useRef(order);
  useEffect(() => { positionRef.current = position; }, [position]);
  useEffect(() => { orderRef.current = order; }, [order]);
  useEffect(() => { try { localStorage.setItem('stockade_balance', String(balance)); } catch {} }, [balance]);

  const currentPrice = candles[candles.length - 1]?.close ?? 100;
  const prevPrice    = candles[candles.length - 2]?.close ?? currentPrice;
  const priceChange  = currentPrice - prevPrice;
  const pricePct     = (priceChange / prevPrice) * 100;

  useEffect(() => {
    $activeTick.set({ symbol, price: currentPrice });
  }, [symbol, currentPrice]);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    trendBiasRef.current = 0;
    candleStartRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      setCandles(prev => {
        const last = prev[prev.length - 1];
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
          return [...prev.slice(-199), updated, { time: Date.now(), open: close, high: close, low: close, close, volume: Math.floor(Math.random() * 500_000) }];
        }
        return [...prev.slice(0, -1), updated];
      });
    }, 800);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [symbol]);

  useEffect(() => {
    if (!position.side) return;
    const mult = position.side === 'long' ? 1 : -1;
    setPosition(p => ({ ...p, unrealizedPnl: mult * (currentPrice - p.avgPrice) * p.qty }));
  }, [currentPrice, position.side, position.avgPrice, position.qty]);

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

  function changeSymbol(sym: string) {
    setSymbol(sym);
    setCandles(generateCandles(getBasePrice(sym)));
    setPosition({ side: null, qty: 0, avgPrice: 0, unrealizedPnl: 0, openedAt: 0 });
    trendBiasRef.current = 0;
  }

  const execOrder = useCallback((action: 'buy' | 'sell' | 'flatten') => {
    const qty = parseInt(order.qty, 10) || 100;
    const price = order.type === 'limit' && order.limitPrice ? parseFloat(order.limitPrice) : currentPrice;

    if (action === 'flatten') {
      if (!position.side) return;
      const pnl = (position.side === 'long' ? 1 : -1) * (price - position.avgPrice) * position.qty;
      const id = crypto.randomUUID();
      const closedAt = Date.now();
      appendStoredTrade({ id, symbol, side: position.side === 'long' ? 'LONG' : 'SHORT', entry: position.avgPrice, exit: price, qty: position.qty, pnl, openedAt: position.openedAt, closedAt });
      setBalance(b => position.side === 'long' ? b + price * position.qty : b - price * position.qty);
      setTrades(t => [{ id, side: position.side === 'long' ? 'sell' : 'buy', qty: position.qty, price, time: closedAt, pnl }, ...t.slice(0, 99)]);
      setPosition({ side: null, qty: 0, avgPrice: 0, unrealizedPnl: 0, openedAt: 0 });
      return;
    }

    const cost = price * qty;
    if (action === 'buy' && cost > balance) return;

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
  }, [order, currentPrice, balance, position, symbol]);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
      if (e.key === 'b' || e.key === 'B') execOrder('buy');
      if (e.key === 's' || e.key === 'S') execOrder('sell');
      if (e.key === 'f' || e.key === 'F') execOrder('flatten');
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

  // ── Shared sub-renders ─────────────────────────────────────────────────────

  const pricePanelJSX = (
    <div className="px-4 pt-4 pb-3 border-b border-[var(--c-border)] shrink-0">
      <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--c-text-subtle)] mb-2">{symbol} · 1M</div>
      <div className="text-[26px] font-mono font-bold text-[var(--c-text)] leading-none">
        {symPrefix(symbol)}{fmtSym(currentPrice, symbol)}
      </div>
      <div className={`mt-1.5 text-[13px] font-mono ${priceChange >= 0 ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
        {priceChange >= 0 ? '+' : ''}{fmtSym(Math.abs(priceChange), symbol)}
        <span className="ml-1 text-[12px]">({fmtPct(pricePct)})</span>
      </div>
    </div>
  );

  const orderFormJSX = (
    <div className="p-3 space-y-2">
      <div className="text-[11px] font-mono uppercase tracking-widest text-[var(--c-text-subtle)] mb-3">Order</div>

      <div className="flex gap-1 mb-3">
        {(['market', 'limit'] as OrderType[]).map(t => (
          <button key={t} onClick={() => setOrder(o => ({ ...o, type: t }))}
            className={`flex-1 py-1 text-[11px] font-mono rounded capitalize transition-colors ${
              order.type === t ? 'bg-[var(--c-surface-2)] text-[var(--c-text)]' : 'text-[var(--c-text-subtle)] hover:text-[var(--c-text-muted)]'
            }`}>{t}</button>
        ))}
      </div>

      <div>
        <label className="text-[10px] font-mono text-[var(--c-text-subtle)] uppercase tracking-wider block mb-1">Qty (shares)</label>
        <input type="number" value={order.qty}
          onChange={e => setOrder(o => ({ ...o, qty: e.target.value }))}
          className="w-full bg-[var(--c-bg-muted)] border border-[var(--c-border)] rounded px-2 py-1.5 text-[13px] font-mono text-[var(--c-text)] focus:border-[#f59e0b] outline-none" />
      </div>

      {order.type === 'limit' && (
        <div>
          <label className="text-[10px] font-mono text-[var(--c-text-subtle)] uppercase tracking-wider block mb-1">Limit Price</label>
          <input type="number" value={order.limitPrice} placeholder={fmtSym(currentPrice, symbol)}
            onChange={e => setOrder(o => ({ ...o, limitPrice: e.target.value }))}

            className="w-full bg-[var(--c-bg-muted)] border border-[var(--c-border)] rounded px-2 py-1.5 text-[13px] font-mono text-[var(--c-text)] focus:border-[#f59e0b] outline-none" />
        </div>
      )}

      <div>
        <label className="text-[10px] font-mono text-[var(--c-text-subtle)] uppercase tracking-wider block mb-1">
          Stop Loss{order.stopLoss && <span className="ml-1 text-[#ef4444]">· Active</span>}
        </label>
        <input type="number" value={order.stopLoss} placeholder="Optional"
          onChange={e => setOrder(o => ({ ...o, stopLoss: e.target.value }))}
          className="w-full bg-[var(--c-bg-muted)] border border-[var(--c-border)] rounded px-2 py-1.5 text-[13px] font-mono text-[var(--c-text)] focus:border-[#ef4444] outline-none" />
      </div>

      <div className="mb-1">
        <label className="text-[10px] font-mono text-[var(--c-text-subtle)] uppercase tracking-wider block mb-1">
          Take Profit{order.takeProfit && <span className="ml-1 text-[#22c55e]">· Active</span>}
        </label>
        <input type="number" value={order.takeProfit} placeholder="Optional"
          onChange={e => setOrder(o => ({ ...o, takeProfit: e.target.value }))}
          className="w-full bg-[var(--c-bg-muted)] border border-[var(--c-border)] rounded px-2 py-1.5 text-[13px] font-mono text-[var(--c-text)] focus:border-[#22c55e] outline-none" />
      </div>

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
          { label: 'Equity', value: fmtMoney(equity),  color: equity >= 100000 ? '#22c55e' : '#ef4444' },
          { label: 'P&L',    value: (totalPnl >= 0 ? '+' : '') + fmtMoney(totalPnl), color: totalPnl >= 0 ? '#22c55e' : '#ef4444' },
          { label: 'Win Rate', value: winRate.toFixed(0) + '%', color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} className="flex justify-between items-center py-0.5">
            <span className="text-[11px] font-mono text-[var(--c-text-subtle)]">{s.label}</span>
            <span className="text-[12px] font-mono" style={{ color: s.color }}>{s.value}</span>
          </div>
        ))}
      </div>

      {position.side && (
        <div className={`rounded p-2.5 border ${position.side === 'long' ? 'bg-[var(--c-green-bg)] border-[var(--c-green-dim)]' : 'bg-[var(--c-red-bg)] border-[var(--c-red-dim)]'}`}>
          <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--c-text-subtle)] mb-1">Position</div>
          <div className={`text-[13px] font-mono font-semibold ${position.side === 'long' ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
            {position.side.toUpperCase()} {position.qty}
          </div>
          <div className="text-[11px] font-mono text-[var(--c-text-muted)]">@ {symPrefix(symbol)}{fmtSym(position.avgPrice, symbol)}</div>
          <div className={`text-[13px] font-mono mt-1 ${position.unrealizedPnl >= 0 ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
            {position.unrealizedPnl >= 0 ? '+' : ''}{fmtMoney(position.unrealizedPnl)}
          </div>
        </div>
      )}
    </div>
  );

  const tradesListJSX = (
    <div className="p-3">
      <div className="text-[11px] font-mono uppercase tracking-widest text-[var(--c-text-subtle)] mb-2">Trade History</div>
      {trades.length === 0 ? (
        <p className="text-[11px] text-[var(--c-text-faint)] font-mono">No trades yet.</p>
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
                  {t.pnl >= 0 ? '+' : ''}{fmtMoney(t.pnl)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div ref={rootRef} className="relative flex flex-col h-full bg-[var(--c-bg)] text-[var(--c-text)]">
      {disclaimer && <DisclaimerBanner onDismiss={() => setDisclaimer(false)} />}

      {/* ── Top toolbar ── */}
      <div className="flex items-center gap-3 px-3 py-2 border-b border-[var(--c-border)] bg-[var(--c-bg-soft)] overflow-x-auto shrink-0">
        <div className="flex items-center gap-3">
          {SYMBOL_GROUPS.map(group => (
            <div key={group.label} className="flex items-center gap-1 shrink-0">
              <span className="hidden sm:block text-[9px] font-mono text-[var(--c-text-faint)] uppercase tracking-wider pr-1.5 mr-0.5 border-r border-[var(--c-border)]">{group.label}</span>
              {group.syms.map(sym => (
                <button key={sym} onClick={() => changeSymbol(sym)}
                  className={`px-2 py-1 rounded text-[11px] font-mono whitespace-nowrap transition-colors ${
                    sym === symbol
                      ? 'bg-[#f59e0b] text-[#0a0a0a] font-semibold'
                      : 'text-[var(--c-text-muted)] hover:text-[var(--c-text)] hover:bg-[var(--c-bg-muted)]'
                  }`}>{sym}</button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="flex flex-1 overflow-hidden min-h-0">

        {/* Left stats — desktop only */}
        <div className="hidden lg:flex w-[180px] shrink-0 flex-col border-r border-[var(--c-border)] bg-[var(--c-bg-subtle)] overflow-y-auto">
          <div className="p-3 flex flex-col gap-3 shrink-0">
            {[
              { label: 'Equity',    value: fmtMoney(equity),   color: equity >= 100000 ? '#22c55e' : '#ef4444' },
              { label: 'Cash',      value: fmtMoney(balance),  color: 'var(--c-text)' },
              { label: 'Total P&L', value: (totalPnl >= 0 ? '+' : '') + fmtMoney(totalPnl), color: totalPnl >= 0 ? '#22c55e' : '#ef4444' },
            ].map(s => (
              <div key={s.label} className="bg-[var(--c-bg-muted)] rounded p-2.5 border border-[var(--c-border)]">
                <div className="text-[10px] font-mono text-[var(--c-text-subtle)] uppercase tracking-wider mb-1">{s.label}</div>
                <div className="text-[15px] font-mono font-semibold" style={{ color: s.color }}>{s.value}</div>
              </div>
            ))}
            {position.side && (
              <div className={`rounded p-2.5 border ${position.side === 'long' ? 'bg-[var(--c-green-bg)] border-[var(--c-green-dim)]' : 'bg-[var(--c-red-bg)] border-[var(--c-red-dim)]'}`}>
                <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--c-text-subtle)] mb-1">Position</div>
                <div className={`text-[13px] font-mono font-semibold ${position.side === 'long' ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                  {position.side.toUpperCase()} {position.qty}
                </div>
                <div className="text-[11px] font-mono text-[var(--c-text-muted)]">@ {symPrefix(symbol)}{fmtSym(position.avgPrice, symbol)}</div>
                <div className={`text-[13px] font-mono mt-1 ${position.unrealizedPnl >= 0 ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                  {position.unrealizedPnl >= 0 ? '+' : ''}{fmtMoney(position.unrealizedPnl)}
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
                className={`flex-1 py-2.5 text-[12px] font-mono capitalize border-b-2 transition-colors ${
                  mobileTab === t ? 'border-[#f59e0b] text-[var(--c-text)]' : 'border-transparent text-[var(--c-text-subtle)]'
                }`}>
                {t}
              </button>
            ))}
          </div>

          {/* Chart area — full on desktop, conditional on mobile */}
          <div className={`flex-1 overflow-hidden bg-[var(--c-bg-subtle)] relative min-h-0 ${mobileTab !== 'chart' ? 'hidden lg:flex lg:flex-col' : 'flex flex-col'}`}>
            <div className="w-full h-full">
              <TradingChart
                candles={candles} symbol={symbol}
                entryPrice={position.side ? position.avgPrice : null}
                positionSide={position.side}
                stopLoss={!isNaN(slVal) && slVal > 0 ? slVal : null}
                takeProfit={!isNaN(tpVal) && tpVal > 0 ? tpVal : null}
              />
            </div>
            <div className="absolute top-3 left-3 rounded px-3 py-2 backdrop-blur-sm border border-[var(--c-border)] pointer-events-none"
              style={{ backgroundColor: 'var(--c-overlay)' }}>
              <div className="text-[11px] font-mono text-[var(--c-text-subtle)] uppercase tracking-wider">{symbol} · 1M</div>
              <div className="text-[20px] font-mono font-semibold text-[var(--c-text)]">{symPrefix(symbol)}{fmtSym(currentPrice, symbol)}</div>
              <div className={`text-[12px] font-mono ${priceChange >= 0 ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>{fmtPct(pricePct)}</div>
            </div>
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
