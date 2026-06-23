import { useState, useEffect, useRef } from 'react';
import TradingChart, { type Candle } from './TradingChart';

const LIVE_ASSETS = [
  { symbol: 'APXL', name: 'Apexlar Technologies', price: 187.42 },
  { symbol: 'TRXL', name: 'Traxel Motors',        price: 248.11 },
  { symbol: 'NVOX', name: 'Novex Semiconductor',  price: 875.63 },
  { symbol: 'BLTC', name: 'Bullethon',            price: 67843  },
  { symbol: 'ETHX', name: 'Etherax',              price: 3412   },
  { symbol: 'SLAX', name: 'Solaxis',              price: 168.22 },
];

function fmtPrice(p: number) {
  if (p >= 1000) return p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return p.toFixed(2);
}

function seedCandles(basePrice: number, count = 100): Candle[] {
  const out: Candle[] = [];
  let price = basePrice;
  let trend = (Math.random() - 0.5) * 0.3;
  const now = Date.now();

  for (let i = count; i >= 0; i--) {
    trend = trend * 0.93 + (Math.random() - 0.5) * 0.1;
    trend = Math.max(-0.5, Math.min(0.5, trend));

    const vol   = basePrice * 0.006;
    const open  = price;
    const body  = (trend + (Math.random() - 0.5)) * vol;
    const close = Math.max(open + body, 0.01);

    const bodyHigh = Math.max(open, close);
    const bodyLow  = Math.min(open, close);
    const bodySize = Math.abs(body) || vol * 0.1;
    const high = bodyHigh + Math.random() * bodySize * 1.2;
    const low  = Math.max(bodyLow - Math.random() * bodySize * 1.2, 0.01);

    out.push({ time: now - i * 60_000, open, high, low, close, volume: Math.floor(Math.random() * 400_000 + 50_000) });
    price = close;
  }
  return out;
}

type MobileTab = 'chart' | 'order';

export default function LiveSimulator() {
  const [selected, setSelected] = useState(LIVE_ASSETS[0]);
  const [candles, setCandles]   = useState<Record<string, Candle[]>>(() =>
    Object.fromEntries(LIVE_ASSETS.map(a => [a.symbol, seedCandles(a.price)]))
  );
  const [qty, setQty]           = useState('100');
  const [balance, setBalance]   = useState(100_000);
  const [position, setPosition] = useState<{ side: 'long' | 'short'; qty: number; avg: number; openedAt: number } | null>(null);
  const [trades, setTrades]     = useState<{ side: string; qty: number; price: number; pnl: number | null }[]>([]);
  const [mobileTab, setMobileTab] = useState<MobileTab>('chart');

  // Per-asset trend bias refs
  const trendRefs     = useRef<Record<string, number>>(Object.fromEntries(LIVE_ASSETS.map(a => [a.symbol, 0])));
  const candleStartRef = useRef<Record<string, number>>(Object.fromEntries(LIVE_ASSETS.map(a => [a.symbol, Date.now()])));

  const sym      = selected.symbol;
  const symCandles = candles[sym] ?? [];
  const last     = symCandles[symCandles.length - 1];
  const prev     = symCandles[symCandles.length - 2];
  const current  = last?.close ?? selected.price;
  const change   = prev ? current - prev.close : 0;
  const changePct = prev ? (change / prev.close) * 100 : 0;
  const upnl     = position
    ? (position.side === 'long' ? 1 : -1) * (current - position.avg) * position.qty
    : 0;

  // Live tick — time-based candle formation with momentum
  useEffect(() => {
    const id = setInterval(() => {
      setCandles(prevState => {
        const next = { ...prevState };
        for (const a of LIVE_ASSETS) {
          const arr = prevState[a.symbol];
          if (!arr.length) continue;
          const lastCandle = arr[arr.length - 1];

          // Evolve trend bias
          trendRefs.current[a.symbol] = (trendRefs.current[a.symbol] ?? 0) * 0.96 + (Math.random() - 0.5) * 0.07;
          trendRefs.current[a.symbol] = Math.max(-0.5, Math.min(0.5, trendRefs.current[a.symbol]));

          const vol   = lastCandle.close * 0.005;
          const move  = (trendRefs.current[a.symbol] + (Math.random() - 0.5)) * vol;
          const close = Math.max(lastCandle.close + move, 0.01);
          const high  = Math.max(lastCandle.high, close);
          const low   = Math.min(lastCandle.low, close);
          const updatedLast: Candle = { ...lastCandle, close, high, low, volume: lastCandle.volume + Math.floor(Math.random() * 5000) };

          // New candle every ~10 seconds
          if (Date.now() - (candleStartRef.current[a.symbol] ?? 0) >= 10_000) {
            candleStartRef.current[a.symbol] = Date.now();
            const newCandle: Candle = { time: Date.now(), open: close, high: close, low: close, close, volume: 0 };
            next[a.symbol] = [...arr.slice(-199), updatedLast, newCandle];
          } else {
            next[a.symbol] = [...arr.slice(0, -1), updatedLast];
          }
        }
        return next;
      });
    }, 800);
    return () => clearInterval(id);
  }, []);

  function execOrder(side: 'buy' | 'sell' | 'flatten') {
    const q     = parseInt(qty, 10) || 100;
    const price = current;
    if (side === 'flatten' && position) {
      const mult = position.side === 'long' ? 1 : -1;
      const pnl  = mult * (price - position.avg) * position.qty;
      const closedAt = Date.now();
      try {
        const raw = localStorage.getItem('stockade_trades');
        const arr = raw ? JSON.parse(raw) : [];
        arr.push({ id: crypto.randomUUID(), symbol: sym, side: position.side === 'long' ? 'LONG' : 'SHORT', entry: position.avg, exit: price, qty: position.qty, pnl, openedAt: position.openedAt, closedAt });
        localStorage.setItem('stockade_trades', JSON.stringify(arr));
        localStorage.setItem('stockade_balance', String(balance + pnl));
      } catch {}
      setBalance(b => b + pnl);
      setTrades(t => [{ side: 'flatten', qty: position.qty, price, pnl }, ...t.slice(0, 19)]);
      setPosition(null);
      return;
    }
    if (!position) {
      setPosition({ side: side === 'buy' ? 'long' : 'short', qty: q, avg: price, openedAt: Date.now() });
      setBalance(b => side === 'buy' ? b - price * q : b + price * q);
      setTrades(t => [{ side, qty: q, price, pnl: null }, ...t.slice(0, 19)]);
    }
  }

  function switchSymbol(asset: typeof LIVE_ASSETS[0]) {
    setSelected(asset);
    setPosition(null);
  }

  return (
    <div className="h-full flex flex-col bg-[var(--c-bg)] text-[var(--c-text)]">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-[var(--c-border)] bg-[var(--c-bg-soft)] overflow-x-auto shrink-0">
        <span className="text-[11px] font-mono text-[#f59e0b] uppercase tracking-widest shrink-0 mr-2">Live Mode</span>
        {LIVE_ASSETS.map(a => {
          const arr  = candles[a.symbol];
          const last = arr?.[arr.length - 1];
          const prevC = arr?.[arr.length - 2];
          const up = last && prevC ? last.close >= prevC.close : true;
          return (
            <button
              key={a.symbol}
              onClick={() => switchSymbol(a)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors shrink-0 ${
                sym === a.symbol
                  ? 'border-[#f59e0b] bg-[var(--c-amber-bg)]'
                  : 'border-[var(--c-border)] bg-[var(--c-bg-muted)] hover:border-[var(--c-border-strong)]'
              }`}
            >
              <span className="text-[12px] font-mono font-semibold text-[var(--c-text)]">{a.symbol}</span>
              <span className={`text-[11px] font-mono ${up ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                ${fmtPrice(last?.close ?? a.price)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile tab bar */}
      <div className="md:hidden flex shrink-0 border-b border-[var(--c-border)] bg-[var(--c-bg-soft)]">
        {(['chart', 'order'] as MobileTab[]).map(t => (
          <button key={t} onClick={() => setMobileTab(t)}
            className={`flex-1 py-2.5 text-[12px] font-mono capitalize border-b-2 transition-colors ${
              mobileTab === t ? 'border-[#f59e0b] text-[var(--c-text)]' : 'border-transparent text-[var(--c-text-subtle)]'
            }`}>
            {t}
          </button>
        ))}
      </div>

      {/* Main */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Chart area */}
        <div className={`flex-1 flex-col overflow-hidden min-w-0 ${mobileTab !== 'chart' ? 'hidden md:flex' : 'flex'}`}>
          {/* Price header */}
          <div className="flex items-center gap-4 px-4 py-3 border-b border-[var(--c-border)] shrink-0">
            <div>
              <span className="text-[11px] font-mono text-[var(--c-text-subtle)] uppercase tracking-widest mr-3">{sym} · 1M</span>
              <span className="text-2xl font-mono font-bold text-[var(--c-text)]">${fmtPrice(current)}</span>
              <span className={`ml-3 text-[13px] font-mono ${change >= 0 ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                {change >= 0 ? '+' : ''}{fmtPrice(Math.abs(change))} ({changePct >= 0 ? '+' : ''}{changePct.toFixed(2)}%)
              </span>
            </div>
            <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--c-green-bg)] border border-[var(--c-green-dim)] text-[#22c55e] text-[11px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse"></span>
              LIVE
            </div>
          </div>

          {/* Chart */}
          <div className="flex-1 overflow-hidden min-h-0">
            <TradingChart
              candles={symCandles}
              symbol={sym}
              entryPrice={position?.avg ?? null}
              positionSide={position?.side ?? null}
            />
          </div>

          {/* Account strip */}
          <div className="flex gap-3 flex-wrap px-4 py-3 border-t border-[var(--c-border)] shrink-0">
            {[
              { label: 'Balance',        value: '$' + balance.toLocaleString('en-US', { minimumFractionDigits: 0 }), color: 'var(--c-text)' },
              { label: 'Unrealized P&L', value: (upnl >= 0 ? '+$' : '-$') + Math.abs(upnl).toFixed(2), color: upnl >= 0 ? '#22c55e' : '#ef4444' },
            ].map(s => (
              <div key={s.label} className="bg-[var(--c-bg-soft)] rounded-lg border border-[var(--c-border)] px-4 py-2">
                <div className="text-[10px] font-mono text-[var(--c-text-subtle)] uppercase tracking-wider">{s.label}</div>
                <div className="text-[15px] font-mono font-semibold" style={{ color: s.color }}>{s.value}</div>
              </div>
            ))}
            {position && (
              <div className="bg-[var(--c-bg-soft)] rounded-lg border border-[var(--c-amber-dim)] px-4 py-2">
                <div className="text-[10px] font-mono text-[var(--c-text-subtle)] uppercase tracking-wider">Position</div>
                <div className={`text-[14px] font-mono font-semibold ${position.side === 'long' ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                  {position.side.toUpperCase()} {position.qty} @ ${fmtPrice(position.avg)}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order panel — desktop always visible, mobile only when order tab */}
        <div className={`shrink-0 border-l border-[var(--c-border)] bg-[var(--c-bg-subtle)] p-3 flex-col gap-3 md:w-[200px] md:flex ${mobileTab !== 'order' ? 'hidden' : 'flex w-full'}`}>
          <div className="text-[11px] font-mono uppercase tracking-widest text-[var(--c-text-subtle)]">Order</div>

          <div>
            <label className="text-[10px] font-mono text-[var(--c-text-subtle)] uppercase tracking-wider block mb-1">Qty</label>
            <input
              type="number"
              value={qty}
              onChange={e => setQty(e.target.value)}
              className="w-full bg-[var(--c-bg-muted)] border border-[var(--c-border)] rounded px-2 py-1.5 text-[13px] font-mono text-[var(--c-text)] focus:border-[#f59e0b] outline-none"
            />
          </div>

          <div className="flex gap-1">
            <button onClick={() => execOrder('buy')}
              className="flex-1 py-2 bg-[var(--c-green-bg)] border border-[var(--c-green-dim)] text-[#22c55e] text-[12px] font-mono font-bold rounded hover:brightness-110 transition-all">
              BUY
            </button>
            <button onClick={() => execOrder('sell')}
              className="flex-1 py-2 bg-[var(--c-red-bg)] border border-[var(--c-red-dim)] text-[#ef4444] text-[12px] font-mono font-bold rounded hover:brightness-110 transition-all">
              SELL
            </button>
          </div>
          <button onClick={() => execOrder('flatten')} disabled={!position}
            className="py-1.5 bg-[var(--c-bg-muted)] border border-[var(--c-border)] text-[var(--c-text-muted)] text-[11px] font-mono rounded hover:bg-[var(--c-surface-2)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            FLATTEN
          </button>

          {/* Recent trades */}
          <div className="border-t border-[var(--c-border)] pt-3 flex-1 overflow-y-auto">
            <div className="text-[10px] font-mono text-[var(--c-text-subtle)] uppercase tracking-wider mb-2">Recent</div>
            {trades.length === 0 ? (
              <p className="text-[11px] font-mono text-[var(--c-text-faint)]">No trades yet.</p>
            ) : (
              <div className="space-y-1">
                {trades.map((t, i) => (
                  <div key={i} className="bg-[var(--c-bg-muted)] rounded p-2 text-[11px] font-mono border border-[var(--c-border)]">
                    <div className="flex justify-between">
                      <span className={t.side === 'buy' ? 'text-[#22c55e]' : 'text-[#ef4444]'}>{t.side.toUpperCase()}</span>
                      <span className="text-[var(--c-text-muted)]">{t.qty}</span>
                    </div>
                    {t.pnl !== null && (
                      <div className={t.pnl >= 0 ? 'text-[#22c55e]' : 'text-[#ef4444]'}>
                        {t.pnl >= 0 ? '+$' : '-$'}{Math.abs(t.pnl).toFixed(2)}
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
