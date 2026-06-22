import { useState, useEffect, useCallback, useRef } from 'react';
import TradingChart from './TradingChart';

// ── Types ──────────────────────────────────────────────────────────────────────

type Side = 'long' | 'short' | null;
type OrderType = 'market' | 'limit';

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
}

interface Trade {
  id: string;
  side: 'buy' | 'sell';
  qty: number;
  price: number;
  time: number;
  pnl: number | null;
}

interface OrderForm {
  type: OrderType;
  qty: string;
  limitPrice: string;
  stopLoss: string;
  takeProfit: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

const SYMBOLS = ['AAPL', 'TSLA', 'NVDA', 'MSFT', 'AMZN', 'GOOG', 'META', 'BTC', 'ETH', 'SOL'];

function generateCandles(basePrice: number, count = 200): Candle[] {
  const candles: Candle[] = [];
  let price = basePrice;
  const now = Date.now();
  for (let i = count; i >= 0; i--) {
    const volatility = basePrice * 0.008;
    const open = price;
    const move = (Math.random() - 0.48) * volatility;
    const close = Math.max(open + move, 1);
    const high = Math.max(open, close) + Math.random() * volatility * 0.5;
    const low  = Math.min(open, close) - Math.random() * volatility * 0.5;
    const volume = Math.floor(Math.random() * 500000 + 100000);
    candles.push({ time: now - i * 60000, open, high: Math.max(high, 1), low: Math.max(low, 0.01), close, volume });
    price = close;
  }
  return candles;
}

function fmt2(n: number) { return n.toFixed(2); }
function fmtPct(n: number) { return (n >= 0 ? '+' : '') + n.toFixed(2) + '%'; }
function fmtMoney(n: number) {
  return '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const SYMBOL_PRICES: Record<string, number> = {
  AAPL: 187, TSLA: 248, NVDA: 876, MSFT: 415, AMZN: 193,
  GOOG: 177, META: 508, BTC: 67843, ETH: 3412, SOL: 168,
};

// ── Disclaimer ─────────────────────────────────────────────────────────────────

function DisclaimerBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1c1308] border-t border-[#f59e0b33] px-4 py-3 flex items-center gap-4">
      <svg className="shrink-0 text-[#f59e0b]" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1L15 14H1L8 1Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M8 6v3M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      <p className="text-[12px] text-[#f59e0b] flex-1">
        <strong>Simulation only.</strong> All trading uses virtual money. This is not financial advice and does not represent real market conditions.
      </p>
      <button
        onClick={onDismiss}
        className="text-[#f59e0b] text-[12px] underline shrink-0 hover:no-underline"
      >
        Got it
      </button>
    </div>
  );
}

// ── Main Simulator ─────────────────────────────────────────────────────────────

export default function TradingSimulator() {
  const [symbol, setSymbol]     = useState('AAPL');
  const [candles, setCandles]   = useState<Candle[]>(() => generateCandles(187));
  const [balance, setBalance]   = useState(100_000);
  const [position, setPosition] = useState<Position>({ side: null, qty: 0, avgPrice: 0, unrealizedPnl: 0 });
  const [trades, setTrades]     = useState<Trade[]>([]);
  const [disclaimer, setDisclaimer] = useState(true);
  const [order, setOrder] = useState<OrderForm>({ type: 'market', qty: '100', limitPrice: '', stopLoss: '', takeProfit: '' });
  const [tab, setTab] = useState<'positions' | 'trades' | 'chart'>('chart');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentPrice = candles[candles.length - 1]?.close ?? 100;
  const prevPrice    = candles[candles.length - 2]?.close ?? currentPrice;
  const priceChange  = currentPrice - prevPrice;
  const pricePct     = (priceChange / prevPrice) * 100;

  // Live price feed
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCandles(prev => {
        const last = prev[prev.length - 1];
        const vol  = last.close * 0.006;
        const move = (Math.random() - 0.48) * vol;
        const close = Math.max(last.close + move, 0.01);
        const high  = Math.max(last.high, close);
        const low   = Math.min(last.low, close);
        const updated = [...prev.slice(0, -1), { ...last, close, high, low }];
        // New candle every ~60 seconds (simulate with random chance)
        if (Math.random() < 0.05) {
          const newCandle: Candle = {
            time: Date.now(),
            open: close, high: close, low: close, close,
            volume: Math.floor(Math.random() * 500000),
          };
          return [...updated.slice(-199), newCandle];
        }
        return updated;
      });
    }, 800);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [symbol]);

  // Update unrealized P&L
  useEffect(() => {
    if (!position.side) return;
    const mult = position.side === 'long' ? 1 : -1;
    const pnl  = mult * (currentPrice - position.avgPrice) * position.qty;
    setPosition(p => ({ ...p, unrealizedPnl: pnl }));
  }, [currentPrice, position.side, position.avgPrice, position.qty]);

  // Symbol change
  function changeSymbol(sym: string) {
    setSymbol(sym);
    const base = SYMBOL_PRICES[sym] ?? 100;
    setCandles(generateCandles(base));
    setPosition({ side: null, qty: 0, avgPrice: 0, unrealizedPnl: 0 });
  }

  const execOrder = useCallback((action: 'buy' | 'sell' | 'flatten') => {
    const qty = parseInt(order.qty, 10) || 100;
    const price = order.type === 'limit' && order.limitPrice
      ? parseFloat(order.limitPrice)
      : currentPrice;

    if (action === 'flatten') {
      if (!position.side) return;
      const mult = position.side === 'long' ? 1 : -1;
      const pnl  = mult * (price - position.avgPrice) * position.qty;
      setBalance(b => b + pnl);
      setTrades(t => [{
        id: crypto.randomUUID(),
        side: position.side === 'long' ? 'sell' : 'buy',
        qty: position.qty, price, time: Date.now(), pnl,
      }, ...t.slice(0, 99)]);
      setPosition({ side: null, qty: 0, avgPrice: 0, unrealizedPnl: 0 });
      return;
    }

    const cost = price * qty;
    if (action === 'buy' && cost > balance) return;

    if (!position.side) {
      setPosition({ side: action === 'buy' ? 'long' : 'short', qty, avgPrice: price, unrealizedPnl: 0 });
      setBalance(b => action === 'buy' ? b - cost : b + cost);
    } else {
      // Add to or reduce position
      const sameDir = (action === 'buy' && position.side === 'long') ||
                      (action === 'sell' && position.side === 'short');
      if (sameDir) {
        const newQty   = position.qty + qty;
        const newAvg   = (position.avgPrice * position.qty + price * qty) / newQty;
        setPosition(p => ({ ...p, qty: newQty, avgPrice: newAvg }));
        setBalance(b => action === 'buy' ? b - cost : b + cost);
      } else {
        const mult = position.side === 'long' ? 1 : -1;
        const pnl  = mult * (price - position.avgPrice) * Math.min(qty, position.qty);
        setBalance(b => b + pnl + (action === 'buy' ? -cost : cost));
        if (qty >= position.qty) {
          setTrades(t => [{ id: crypto.randomUUID(), side: action, qty: position.qty, price, time: Date.now(), pnl }, ...t.slice(0, 99)]);
          if (qty > position.qty) {
            const rem = qty - position.qty;
            setPosition({ side: action === 'buy' ? 'long' : 'short', qty: rem, avgPrice: price, unrealizedPnl: 0 });
          } else {
            setPosition({ side: null, qty: 0, avgPrice: 0, unrealizedPnl: 0 });
          }
        } else {
          setPosition(p => ({ ...p, qty: p.qty - qty }));
          setTrades(t => [{ id: crypto.randomUUID(), side: action, qty, price, time: Date.now(), pnl }, ...t.slice(0, 99)]);
        }
      }
    }
  }, [order, currentPrice, balance, position]);

  // Keyboard shortcuts
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

  const totalPnl = trades.reduce((s, t) => s + (t.pnl ?? 0), 0);
  const equity   = balance + (position.side ? position.unrealizedPnl : 0);
  const winTrades = trades.filter(t => (t.pnl ?? 0) > 0);
  const winRate  = trades.length ? (winTrades.length / trades.length) * 100 : 0;

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] text-[#f5f5f5]">
      {disclaimer && <DisclaimerBanner onDismiss={() => setDisclaimer(false)} />}

      {/* ── Top toolbar ── */}
      <div className="flex items-center gap-3 px-3 py-2 border-b border-[#2a2a2a] bg-[#111111] overflow-x-auto">
        {/* Symbol picker */}
        <div className="flex gap-1">
          {SYMBOLS.map(sym => (
            <button
              key={sym}
              onClick={() => changeSymbol(sym)}
              className={`px-2.5 py-1 rounded text-[12px] font-mono whitespace-nowrap transition-colors ${
                sym === symbol
                  ? 'bg-[#f59e0b] text-[#0a0a0a] font-semibold'
                  : 'text-[#a1a1a1] hover:text-[#f5f5f5] hover:bg-[#1a1a1a]'
              }`}
            >
              {sym}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-4 shrink-0">
          <div>
            <span className="text-lg font-mono font-semibold">${fmt2(currentPrice)}</span>
            <span className={`ml-2 text-[13px] font-mono ${priceChange >= 0 ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
              {priceChange >= 0 ? '+' : ''}{fmt2(priceChange)} ({fmtPct(pricePct)})
            </span>
          </div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Left: Account stats ── */}
        <div className="hidden lg:flex w-[180px] shrink-0 flex-col border-r border-[#2a2a2a] bg-[#0d0d0d] p-3 gap-3 overflow-y-auto">
          {[
            { label: 'Equity',   value: fmtMoney(equity),  color: equity >= 100000 ? '#22c55e' : '#ef4444' },
            { label: 'Cash',     value: fmtMoney(balance),  color: '#f5f5f5' },
            { label: 'Total P&L',value: (totalPnl >= 0 ? '+' : '') + fmtMoney(totalPnl), color: totalPnl >= 0 ? '#22c55e' : '#ef4444' },
            { label: 'Win Rate', value: winRate.toFixed(0) + '%', color: '#f59e0b' },
            { label: 'Trades',   value: trades.length.toString(), color: '#a1a1a1' },
          ].map(s => (
            <div key={s.label} className="bg-[#1a1a1a] rounded p-2.5 border border-[#2a2a2a]">
              <div className="text-[10px] font-mono text-[#666666] uppercase tracking-wider mb-1">{s.label}</div>
              <div className="text-[15px] font-mono font-semibold" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}

          {/* Position */}
          {position.side && (
            <div className={`rounded p-2.5 border ${
              position.side === 'long'
                ? 'bg-[#0a1f0f] border-[#14532d]'
                : 'bg-[#1f0a0a] border-[#7f1d1d]'
            }`}>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#666666] mb-1">Position</div>
              <div className={`text-[13px] font-mono font-semibold ${position.side === 'long' ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                {position.side.toUpperCase()} {position.qty}
              </div>
              <div className="text-[11px] font-mono text-[#a1a1a1]">@ ${fmt2(position.avgPrice)}</div>
              <div className={`text-[13px] font-mono mt-1 ${position.unrealizedPnl >= 0 ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                {position.unrealizedPnl >= 0 ? '+' : ''}{fmtMoney(position.unrealizedPnl)}
              </div>
            </div>
          )}
        </div>

        {/* ── Center: Chart ── */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tab bar on mobile */}
          <div className="lg:hidden flex border-b border-[#2a2a2a]">
            {(['chart', 'positions', 'trades'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-2 text-[12px] font-mono capitalize border-b-2 transition-colors ${
                  tab === t ? 'border-[#f59e0b] text-[#f5f5f5]' : 'border-transparent text-[#666666]'
                }`}>
                {t}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-hidden bg-[#0d0d0d] relative">
            <div className={`w-full h-full ${tab !== 'chart' ? 'hidden lg:block' : ''}`}>
              <TradingChart
                candles={candles}
                symbol={symbol}
                entryPrice={position.side ? position.avgPrice : null}
                positionSide={position.side}
              />
            </div>

            {/* Price overlay */}
            <div className="absolute top-3 left-3 bg-[#0d0d0dcc] rounded px-3 py-2 backdrop-blur-sm border border-[#2a2a2a] pointer-events-none">
              <div className="text-[11px] font-mono text-[#666666] uppercase tracking-wider">{symbol} · 1M</div>
              <div className="text-[20px] font-mono font-semibold text-[#f5f5f5]">${fmt2(currentPrice)}</div>
              <div className={`text-[12px] font-mono ${priceChange >= 0 ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                {fmtPct(pricePct)}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Order Panel ── */}
        <div className="w-[220px] shrink-0 border-l border-[#2a2a2a] bg-[#0d0d0d] flex flex-col overflow-y-auto">
          <div className="p-3 border-b border-[#2a2a2a]">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#666666] mb-3">Order</div>

            {/* Order type */}
            <div className="flex gap-1 mb-3">
              {(['market', 'limit'] as OrderType[]).map(t => (
                <button key={t} onClick={() => setOrder(o => ({ ...o, type: t }))}
                  className={`flex-1 py-1 text-[11px] font-mono rounded capitalize transition-colors ${
                    order.type === t ? 'bg-[#252525] text-[#f5f5f5]' : 'text-[#666666] hover:text-[#a1a1a1]'
                  }`}>
                  {t}
                </button>
              ))}
            </div>

            {/* Qty */}
            <div className="mb-2">
              <label className="text-[10px] font-mono text-[#666666] uppercase tracking-wider block mb-1">Qty (shares)</label>
              <input
                type="number"
                value={order.qty}
                onChange={e => setOrder(o => ({ ...o, qty: e.target.value }))}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-1.5 text-[13px] font-mono text-[#f5f5f5] focus:border-[#f59e0b] outline-none"
              />
            </div>

            {order.type === 'limit' && (
              <div className="mb-2">
                <label className="text-[10px] font-mono text-[#666666] uppercase tracking-wider block mb-1">Limit Price</label>
                <input
                  type="number"
                  value={order.limitPrice}
                  placeholder={fmt2(currentPrice)}
                  onChange={e => setOrder(o => ({ ...o, limitPrice: e.target.value }))}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-1.5 text-[13px] font-mono text-[#f5f5f5] focus:border-[#f59e0b] outline-none"
                />
              </div>
            )}

            <div className="mb-2">
              <label className="text-[10px] font-mono text-[#666666] uppercase tracking-wider block mb-1">Stop Loss</label>
              <input
                type="number"
                value={order.stopLoss}
                placeholder="Optional"
                onChange={e => setOrder(o => ({ ...o, stopLoss: e.target.value }))}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-1.5 text-[13px] font-mono text-[#f5f5f5] focus:border-[#ef4444] outline-none"
              />
            </div>

            <div className="mb-3">
              <label className="text-[10px] font-mono text-[#666666] uppercase tracking-wider block mb-1">Take Profit</label>
              <input
                type="number"
                value={order.takeProfit}
                placeholder="Optional"
                onChange={e => setOrder(o => ({ ...o, takeProfit: e.target.value }))}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-1.5 text-[13px] font-mono text-[#f5f5f5] focus:border-[#22c55e] outline-none"
              />
            </div>

            {/* Action buttons */}
            <div className="flex gap-1 mb-1">
              <button
                onClick={() => execOrder('buy')}
                className="flex-1 py-2 bg-[#0a1f0f] border border-[#14532d] text-[#22c55e] text-[13px] font-mono font-semibold rounded hover:bg-[#0d2e14] transition-colors"
              >
                BUY <span className="text-[10px] opacity-60">[B]</span>
              </button>
              <button
                onClick={() => execOrder('sell')}
                className="flex-1 py-2 bg-[#1f0a0a] border border-[#7f1d1d] text-[#ef4444] text-[13px] font-mono font-semibold rounded hover:bg-[#2e0d0d] transition-colors"
              >
                SELL <span className="text-[10px] opacity-60">[S]</span>
              </button>
            </div>
            <button
              onClick={() => execOrder('flatten')}
              disabled={!position.side}
              className="w-full py-1.5 bg-[#1a1a1a] border border-[#2a2a2a] text-[#a1a1a1] text-[12px] font-mono rounded hover:bg-[#252525] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              FLATTEN <span className="text-[10px] opacity-60">[F]</span>
            </button>
          </div>

          {/* Position summary (mobile-visible) */}
          <div className="p-3 border-b border-[#2a2a2a]">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#666666] mb-2">Account</div>
            {[
              { label: 'Equity',   value: fmtMoney(equity),   color: equity >= 100000 ? '#22c55e' : '#ef4444' },
              { label: 'P&L',      value: (totalPnl >= 0 ? '+' : '') + fmtMoney(totalPnl), color: totalPnl >= 0 ? '#22c55e' : '#ef4444' },
            ].map(s => (
              <div key={s.label} className="flex justify-between items-center py-1">
                <span className="text-[11px] font-mono text-[#666666]">{s.label}</span>
                <span className="text-[12px] font-mono" style={{ color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>

          {/* Recent trades */}
          <div className="p-3 flex-1 overflow-y-auto">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#666666] mb-2">Trades</div>
            {trades.length === 0 ? (
              <p className="text-[11px] text-[#444444] font-mono">No trades yet.</p>
            ) : (
              <div className="space-y-1">
                {trades.slice(0, 20).map(t => (
                  <div key={t.id} className="bg-[#1a1a1a] rounded p-2 text-[11px] font-mono border border-[#2a2a2a]">
                    <div className="flex justify-between">
                      <span className={t.side === 'buy' ? 'text-[#22c55e]' : 'text-[#ef4444]'}>
                        {t.side.toUpperCase()} {t.qty}
                      </span>
                      <span className="text-[#a1a1a1]">${fmt2(t.price)}</span>
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
        </div>
      </div>
    </div>
  );
}
