import { useState, useEffect, useRef } from 'react';
import TradingChart, { type Candle } from './TradingChart';

const LIVE_ASSETS = [
  { symbol: 'AAPL', name: 'Apple Inc.',   price: 187.42 },
  { symbol: 'TSLA', name: 'Tesla Inc.',   price: 248.11 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.63 },
  { symbol: 'BTC',  name: 'Bitcoin',      price: 67843  },
  { symbol: 'ETH',  name: 'Ethereum',     price: 3412   },
  { symbol: 'SOL',  name: 'Solana',       price: 168.22 },
];

function fmtPrice(p: number) {
  if (p >= 1000) return p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return p.toFixed(2);
}

function seedCandles(basePrice: number, count = 100): Candle[] {
  const out: Candle[] = [];
  let price = basePrice;
  const now = Date.now();
  const CANDLE_INTERVAL = 60_000; // 1-minute candles
  for (let i = count; i >= 0; i--) {
    const vol  = basePrice * 0.006;
    const open = price;
    const move = (Math.random() - 0.48) * vol;
    const close = Math.max(open + move, 0.01);
    const high  = Math.max(open, close) + Math.random() * vol * 0.3;
    const low   = Math.min(open, close) - Math.random() * vol * 0.3;
    out.push({ time: now - i * CANDLE_INTERVAL, open, high, low, close, volume: Math.floor(Math.random() * 400_000 + 50_000) });
    price = close;
  }
  return out;
}

export default function LiveSimulator() {
  const [selected, setSelected]   = useState(LIVE_ASSETS[0]);
  const [candles, setCandles]     = useState<Record<string, Candle[]>>(() =>
    Object.fromEntries(LIVE_ASSETS.map(a => [a.symbol, seedCandles(a.price)]))
  );
  const [qty, setQty]             = useState('100');
  const [balance, setBalance]     = useState(100_000);
  const [position, setPosition]   = useState<{ side: 'long' | 'short'; qty: number; avg: number } | null>(null);
  const [trades, setTrades]       = useState<{ side: string; qty: number; price: number; pnl: number | null }[]>([]);
  const newCandleTimerRef = useRef<number>(0);

  const sym     = selected.symbol;
  const symCandles = candles[sym] ?? [];
  const last    = symCandles[symCandles.length - 1];
  const prev    = symCandles[symCandles.length - 2];
  const current = last?.close ?? selected.price;
  const change  = prev ? current - prev.close : 0;
  const changePct = prev ? (change / prev.close) * 100 : 0;
  const upnl    = position
    ? (position.side === 'long' ? 1 : -1) * (current - position.avg) * position.qty
    : 0;

  // Live tick simulation — updates last candle, occasionally opens a new one
  useEffect(() => {
    const id = setInterval(() => {
      setCandles(prev => {
        const next = { ...prev };
        for (const a of LIVE_ASSETS) {
          const arr = prev[a.symbol];
          if (!arr.length) continue;
          const last = arr[arr.length - 1];
          const vol  = last.close * 0.005;
          const move = (Math.random() - 0.49) * vol;
          const close = Math.max(last.close + move, 0.01);
          const high  = Math.max(last.high, close);
          const low   = Math.min(last.low,  close);
          const updatedLast: Candle = { ...last, close, high, low, volume: last.volume + Math.floor(Math.random() * 5000) };

          // New 1-minute candle when ~60s elapsed
          const elapsed = Date.now() - last.time;
          if (elapsed >= 60_000) {
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
      setBalance(b => b + pnl);
      setTrades(t => [{ side: 'flatten', qty: position.qty, price, pnl }, ...t.slice(0, 19)]);
      setPosition(null);
      return;
    }
    if (!position) {
      setPosition({ side: side === 'buy' ? 'long' : 'short', qty: q, avg: price });
      setBalance(b => side === 'buy' ? b - price * q : b + price * q);
      setTrades(t => [{ side, qty: q, price, pnl: null }, ...t.slice(0, 19)]);
    }
  }

  function switchSymbol(asset: typeof LIVE_ASSETS[0]) {
    setSelected(asset);
    setPosition(null);
  }

  return (
    <div className="h-full flex flex-col bg-[#0a0a0a] text-[#f5f5f5]">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-[#2a2a2a] bg-[#111111] overflow-x-auto shrink-0">
        <span className="text-[11px] font-mono text-[#f59e0b] uppercase tracking-widest shrink-0 mr-2">Live Mode</span>
        {LIVE_ASSETS.map(a => {
          const arr = candles[a.symbol];
          const last = arr?.[arr.length - 1];
          const prevC = arr?.[arr.length - 2];
          const up = last && prevC ? last.close >= prevC.close : true;
          return (
            <button
              key={a.symbol}
              onClick={() => switchSymbol(a)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors shrink-0 ${
                sym === a.symbol
                  ? 'border-[#f59e0b] bg-[#1c1308]'
                  : 'border-[#2a2a2a] bg-[#1a1a1a] hover:border-[#3a3a3a]'
              }`}
            >
              <span className="text-[12px] font-mono font-semibold text-[#f5f5f5]">{a.symbol}</span>
              <span className={`text-[11px] font-mono ${up ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                ${fmtPrice(last?.close ?? a.price)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chart area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Price header */}
          <div className="flex items-center gap-4 px-4 py-3 border-b border-[#2a2a2a] shrink-0">
            <div>
              <span className="text-[11px] font-mono text-[#666666] uppercase tracking-widest mr-3">{sym} · 1M</span>
              <span className="text-2xl font-mono font-bold text-[#f5f5f5]">${fmtPrice(current)}</span>
              <span className={`ml-3 text-[13px] font-mono ${change >= 0 ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                {change >= 0 ? '+' : ''}{fmtPrice(Math.abs(change))} ({changePct >= 0 ? '+' : ''}{changePct.toFixed(2)}%)
              </span>
            </div>
            <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0a1f0f] border border-[#14532d] text-[#22c55e] text-[11px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse"></span>
              LIVE
            </div>
          </div>

          {/* Lightweight-charts chart */}
          <div className="flex-1 overflow-hidden">
            <TradingChart
              candles={symCandles}
              symbol={sym}
              entryPrice={position?.avg ?? null}
              positionSide={position?.side ?? null}
            />
          </div>

          {/* Account strip */}
          <div className="flex gap-3 flex-wrap px-4 py-3 border-t border-[#2a2a2a] shrink-0">
            {[
              { label: 'Balance',        value: '$' + balance.toLocaleString('en-US', { minimumFractionDigits: 0 }), color: '#f5f5f5' },
              { label: 'Unrealized P&L', value: (upnl >= 0 ? '+$' : '-$') + Math.abs(upnl).toFixed(2),              color: upnl >= 0 ? '#22c55e' : '#ef4444' },
            ].map(s => (
              <div key={s.label} className="bg-[#111111] rounded-lg border border-[#2a2a2a] px-4 py-2">
                <div className="text-[10px] font-mono text-[#666666] uppercase tracking-wider">{s.label}</div>
                <div className="text-[15px] font-mono font-semibold" style={{ color: s.color }}>{s.value}</div>
              </div>
            ))}
            {position && (
              <div className="bg-[#111111] rounded-lg border border-[#f59e0b33] px-4 py-2">
                <div className="text-[10px] font-mono text-[#666666] uppercase tracking-wider">Position</div>
                <div className={`text-[14px] font-mono font-semibold ${position.side === 'long' ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                  {position.side.toUpperCase()} {position.qty} @ ${fmtPrice(position.avg)}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order panel */}
        <div className="w-[200px] shrink-0 border-l border-[#2a2a2a] bg-[#0d0d0d] p-3 flex flex-col gap-3">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#666666]">Order</div>

          <div>
            <label className="text-[10px] font-mono text-[#666666] uppercase tracking-wider block mb-1">Qty</label>
            <input
              type="number"
              value={qty}
              onChange={e => setQty(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-1.5 text-[13px] font-mono text-[#f5f5f5] focus:border-[#f59e0b] outline-none"
            />
          </div>

          <div className="flex gap-1">
            <button onClick={() => execOrder('buy')}
              className="flex-1 py-2 bg-[#0a1f0f] border border-[#14532d] text-[#22c55e] text-[12px] font-mono font-bold rounded hover:bg-[#0d2e14] transition-colors">
              BUY
            </button>
            <button onClick={() => execOrder('sell')}
              className="flex-1 py-2 bg-[#1f0a0a] border border-[#7f1d1d] text-[#ef4444] text-[12px] font-mono font-bold rounded hover:bg-[#2e0d0d] transition-colors">
              SELL
            </button>
          </div>
          <button onClick={() => execOrder('flatten')} disabled={!position}
            className="py-1.5 bg-[#1a1a1a] border border-[#2a2a2a] text-[#a1a1a1] text-[11px] font-mono rounded hover:bg-[#252525] disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            FLATTEN
          </button>

          {/* Recent trades */}
          <div className="border-t border-[#2a2a2a] pt-3 flex-1 overflow-y-auto">
            <div className="text-[10px] font-mono text-[#666666] uppercase tracking-wider mb-2">Recent</div>
            {trades.length === 0 ? (
              <p className="text-[11px] font-mono text-[#444444]">No trades yet.</p>
            ) : (
              <div className="space-y-1">
                {trades.map((t, i) => (
                  <div key={i} className="bg-[#1a1a1a] rounded p-2 text-[11px] font-mono border border-[#2a2a2a]">
                    <div className="flex justify-between">
                      <span className={t.side === 'buy' ? 'text-[#22c55e]' : 'text-[#ef4444]'}>{t.side.toUpperCase()}</span>
                      <span className="text-[#a1a1a1]">{t.qty}</span>
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
