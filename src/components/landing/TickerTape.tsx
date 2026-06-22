import { useState, useEffect } from 'react';

const TICKERS = [
  { symbol: 'AAPL',  price: 187.42, change: 1.23,  pct: 0.66 },
  { symbol: 'TSLA',  price: 248.11, change: -3.87, pct: -1.54 },
  { symbol: 'NVDA',  price: 875.63, change: 12.45, pct: 1.44 },
  { symbol: 'MSFT',  price: 415.22, change: 2.18,  pct: 0.53 },
  { symbol: 'AMZN',  price: 192.77, change: -1.02, pct: -0.53 },
  { symbol: 'GOOG',  price: 176.88, change: 0.94,  pct: 0.53 },
  { symbol: 'META',  price: 508.44, change: 7.31,  pct: 1.46 },
  { symbol: 'BTC',   price: 67843,  change: 892,   pct: 1.33 },
  { symbol: 'ETH',   price: 3412,   change: -45,   pct: -1.30 },
  { symbol: 'SOL',   price: 168.22, change: 3.44,  pct: 2.09 },
  { symbol: 'SPY',   price: 524.88, change: 1.77,  pct: 0.34 },
  { symbol: 'QQQ',   price: 441.33, change: 2.11,  pct: 0.48 },
  { symbol: 'AMD',   price: 156.74, change: -2.33, pct: -1.46 },
  { symbol: 'NFLX',  price: 685.90, change: 8.22,  pct: 1.21 },
  { symbol: 'COIN',  price: 228.44, change: -5.11, pct: -2.19 },
];

export default function TickerTape() {
  const [prices, setPrices] = useState(TICKERS);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev =>
        prev.map(t => {
          const delta = (Math.random() - 0.5) * t.price * 0.003;
          const newPrice = Math.max(t.price + delta, 0.01);
          const newChange = t.change + delta;
          const newPct = (newChange / (newPrice - newChange)) * 100;
          return { ...t, price: newPrice, change: newChange, pct: newPct };
        })
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const items = [...prices, ...prices];

  function fmt(val: number, decimals = 2) {
    if (Math.abs(val) >= 1000) return val.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    return val.toFixed(decimals);
  }

  return (
    <div className="overflow-hidden border-b border-[#2a2a2a] bg-[#111111] select-none">
      <div className="ticker-inner flex gap-0">
        {items.map((t, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-5 py-2 border-r border-[#2a2a2a] shrink-0"
          >
            <span className="text-[12px] font-mono font-medium text-[#f5f5f5] tracking-wider">
              {t.symbol}
            </span>
            <span className="text-[12px] font-mono text-[#a1a1a1]">
              {fmt(t.price)}
            </span>
            <span
              className={`text-[11px] font-mono ${
                t.change >= 0 ? 'text-[#22c55e]' : 'text-[#ef4444]'
              }`}
            >
              {t.change >= 0 ? '+' : ''}{t.pct.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
