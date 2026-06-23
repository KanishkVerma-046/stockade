import { useState, useEffect } from 'react';
import { $activeTick } from '../../stores/priceStore';

const TICKERS = [
  { symbol: 'APXL',  price: 187.42,  change: 1.23,   pct: 0.66  },
  { symbol: 'TRXL',  price: 248.11,  change: -3.87,  pct: -1.54 },
  { symbol: 'NVOX',  price: 875.63,  change: 12.45,  pct: 1.44  },
  { symbol: 'MXFT',  price: 415.22,  change: 2.18,   pct: 0.53  },
  { symbol: 'VXON',  price: 192.77,  change: -1.02,  pct: -0.53 },
  { symbol: 'GLPH',  price: 176.88,  change: 0.94,   pct: 0.53  },
  { symbol: 'MXTA',  price: 508.44,  change: 7.31,   pct: 1.46  },
  { symbol: 'BLTC',  price: 67843,   change: 892,    pct: 1.33  },
  { symbol: 'ETHX',  price: 3412,    change: -45,    pct: -1.30 },
  { symbol: 'SLAX',  price: 168.22,  change: 3.44,   pct: 2.09  },
  { symbol: 'RXBT',  price: 124.33,  change: 3.17,   pct: 2.62  },
  { symbol: 'STRX',  price: 685.90,  change: 8.22,   pct: 1.21  },
  { symbol: 'AXMD',  price: 156.74,  change: -2.33,  pct: -1.46 },
  { symbol: 'CNBX',  price: 228.44,  change: -5.11,  pct: -2.19 },
  { symbol: 'AVXL',  price: 35.84,   change: 1.12,   pct: 3.23  },
];

const INITIAL_PRICES = Object.fromEntries(TICKERS.map(t => [t.symbol, t.price]));

function readStoredPrices(): Record<string, number> {
  try {
    const raw = localStorage.getItem('stockade_prices');
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

export default function TickerTape() {
  const [prices, setPrices] = useState(TICKERS);

  useEffect(() => {
    const stored = readStoredPrices();
    if (Object.keys(stored).length > 0) {
      setPrices(prev => prev.map(t => {
        if (stored[t.symbol] === undefined) return t;
        const newPrice     = stored[t.symbol];
        const initialPrice = INITIAL_PRICES[t.symbol] ?? newPrice;
        return { ...t, price: newPrice, change: newPrice - initialPrice, pct: ((newPrice - initialPrice) / initialPrice) * 100 };
      }));
    }
  }, []);

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== 'stockade_prices' || !e.newValue) return;
      try {
        const map: Record<string, number> = JSON.parse(e.newValue);
        setPrices(prev => prev.map(t => {
          if (map[t.symbol] === undefined) return t;
          const newPrice     = map[t.symbol];
          const initialPrice = INITIAL_PRICES[t.symbol] ?? newPrice;
          return { ...t, price: newPrice, change: newPrice - initialPrice, pct: ((newPrice - initialPrice) / initialPrice) * 100 };
        }));
      } catch {}
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Instant same-page sync: subscribe to the simulator's nanostores atom
  useEffect(() => {
    return $activeTick.subscribe(tick => {
      if (!tick) return;
      setPrices(prev => prev.map(t => {
        if (t.symbol !== tick.symbol) return t;
        const ip = INITIAL_PRICES[t.symbol] ?? tick.price;
        return { ...t, price: tick.price, change: tick.price - ip, pct: ((tick.price - ip) / ip) * 100 };
      }));
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => {
        const latestMap = readStoredPrices();
        const activeSym = $activeTick.get()?.symbol;
        const next = prev.map(t => {
          if (t.symbol === activeSym) return t; // driven by simulator via nanostores
          const currentPrice  = latestMap[t.symbol] ?? t.price;
          const delta         = (Math.random() - 0.5) * currentPrice * 0.003;
          const newPrice      = Math.max(currentPrice + delta, 0.01);
          const initialPrice  = INITIAL_PRICES[t.symbol] ?? currentPrice;
          const change        = newPrice - initialPrice;
          const pct           = (change / initialPrice) * 100;
          return { ...t, price: newPrice, change, pct };
        });
        try {
          const map: Record<string, number> = {};
          next.forEach(t => { map[t.symbol] = t.price; });
          localStorage.setItem('stockade_prices', JSON.stringify(map));
        } catch {}
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const items = [...prices, ...prices];

  function fmt(val: number) {
    if (Math.abs(val) >= 1000) return val.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    return val.toFixed(2);
  }

  return (
    <div className="overflow-hidden border-b border-[var(--c-border)] bg-[var(--c-bg-soft)] select-none">
      <div className="ticker-inner flex gap-0">
        {items.map((t, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-5 py-2 border-r border-[var(--c-border)] shrink-0"
          >
            <span className="text-[12px] font-mono font-medium text-[var(--c-text)] tracking-wider">
              {t.symbol}
            </span>
            <span className="text-[12px] font-mono text-[var(--c-text-muted)]">
              {fmt(t.price)}
            </span>
            <span className={`text-[11px] font-mono ${t.change >= 0 ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
              {t.change >= 0 ? '+' : ''}{t.pct.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
