import { useState, useEffect } from 'react';

interface FeedItem {
  id: string;
  trader: string;
  action: 'BUY' | 'SELL' | 'FLATTEN';
  symbol: string;
  qty: number;
  price: number;
  pnl?: number;
  time: number;
}

const TRADERS = ['trader_x99', 'apex_whale', 'algo_ghost', 'scalp_hunter', 'momo_rider', 'vol_king', 'tape_reader', 'night_owl', 'gap_trader', 'breakout_bob'];
const SYMBOLS  = ['APXL', 'TRXL', 'NVOX', 'MXFT', 'VXON', 'BLTC', 'ETHX', 'SLAX', 'MXTA', 'AXMD'];

function generateTrade(): FeedItem {
  const actions = ['BUY', 'SELL', 'FLATTEN'] as const;
  const action  = actions[Math.floor(Math.random() * actions.length)];
  const symbol  = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
  const price   = 50 + Math.random() * 800;
  const pnl     = action === 'FLATTEN' ? (Math.random() - 0.4) * 1500 : undefined;
  return {
    id: crypto.randomUUID(),
    trader: TRADERS[Math.floor(Math.random() * TRADERS.length)],
    action,
    symbol,
    qty: Math.floor(Math.random() * 300 + 50),
    price,
    pnl,
    time: Date.now(),
  };
}

function timeAgo(ts: number) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 5)  return 'just now';
  if (s < 60) return `${s}s ago`;
  return `${Math.floor(s / 60)}m ago`;
}

export default function TradeFeed() {
  const [items, setItems] = useState<FeedItem[]>(() =>
    Array.from({ length: 12 }, generateTrade).map((t, i) => ({ ...t, time: Date.now() - i * 8000 }))
  );
  const [ticker, setTicker] = useState(0);

  useEffect(() => {
    const feed = setInterval(() => {
      setItems(prev => [generateTrade(), ...prev.slice(0, 49)]);
    }, 3000);
    const tick = setInterval(() => setTicker(t => t + 1), 5000);
    return () => { clearInterval(feed); clearInterval(tick); };
  }, []);

  return (
    <div className="space-y-2">
      {/* Live badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--c-green-bg)] border border-[var(--c-green-dim)] text-[#22c55e] text-[11px] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse"></span>
          Live updates
        </span>
        <span className="text-[12px] text-[var(--c-text-faint)] font-mono">New trades appear automatically</span>
      </div>

      {items.map((item, i) => (
        <div
          key={item.id}
          className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
            i === 0
              ? 'border-[var(--c-border-strong)] bg-[var(--c-bg-muted)]'
              : 'border-[var(--c-border)] bg-[var(--c-bg-soft)]'
          }`}
        >
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-[var(--c-surface-2)] border border-[var(--c-border-strong)] flex items-center justify-center shrink-0">
            <span className="text-[14px] font-mono text-[#f59e0b]">{item.trader[0].toUpperCase()}</span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[13px] font-mono font-semibold text-[var(--c-text)]">{item.trader}</span>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                item.action === 'BUY'
                  ? 'bg-[var(--c-green-bg)] text-[#22c55e] border-[var(--c-green-dim)]'
                  : item.action === 'SELL'
                  ? 'bg-[var(--c-red-bg)] text-[#ef4444] border-[var(--c-red-dim)]'
                  : 'bg-[var(--c-bg-muted)] text-[var(--c-text-muted)] border-[var(--c-border)]'
              }`}>
                {item.action}
              </span>
              <span className="text-[13px] font-mono font-semibold text-[var(--c-text)]">{item.qty}</span>
              <span className="text-[13px] font-mono text-[#f59e0b]">{item.symbol}</span>
              <span className="text-[13px] font-mono text-[var(--c-text-muted)]">@ ${item.price.toFixed(2)}</span>
              {item.pnl !== undefined && (
                <span className={`text-[12px] font-mono font-semibold ml-1 ${item.pnl >= 0 ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                  {item.pnl >= 0 ? '+$' : '-$'}{Math.abs(item.pnl).toFixed(2)} P&L
                </span>
              )}
            </div>
            <div className="text-[11px] font-mono text-[var(--c-text-faint)] mt-0.5">{timeAgo(item.time)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
