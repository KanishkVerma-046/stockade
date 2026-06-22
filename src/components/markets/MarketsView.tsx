import { useState, useEffect } from 'react';

interface Asset {
  symbol: string;
  name: string;
  price: number;
  change: number;
  pct: number;
  volume: string;
  mktCap: string;
  category: 'stock' | 'crypto' | 'forex' | 'futures';
}

const INITIAL: Asset[] = [
  // Stocks (fictional)
  { symbol: 'APXL',  name: 'Apexlar Technologies',  price: 187.42,  change: 1.23,   pct: 0.66,  volume: '52.3M',  mktCap: '$2.9T',  category: 'stock' },
  { symbol: 'TRXL',  name: 'Traxel Motors',          price: 248.11,  change: -3.87,  pct: -1.54, volume: '88.1M',  mktCap: '$791B',  category: 'stock' },
  { symbol: 'NVOX',  name: 'Novex Semiconductor',    price: 875.63,  change: 12.45,  pct: 1.44,  volume: '41.7M',  mktCap: '$2.1T',  category: 'stock' },
  { symbol: 'MXFT',  name: 'Maxosoft Corp',          price: 415.22,  change: 2.18,   pct: 0.53,  volume: '19.4M',  mktCap: '$3.1T',  category: 'stock' },
  { symbol: 'VXON',  name: 'Vexon Commerce',         price: 192.77,  change: -1.02,  pct: -0.53, volume: '35.8M',  mktCap: '$2.0T',  category: 'stock' },
  { symbol: 'GLPH',  name: 'Glyphe AI',              price: 176.88,  change: 0.94,   pct: 0.53,  volume: '21.3M',  mktCap: '$2.2T',  category: 'stock' },
  { symbol: 'MXTA',  name: 'Maxeta Platforms',       price: 508.44,  change: 7.31,   pct: 1.46,  volume: '13.9M',  mktCap: '$1.3T',  category: 'stock' },
  { symbol: 'STRX',  name: 'Streamax Inc.',          price: 685.90,  change: 8.22,   pct: 1.21,  volume: '4.2M',   mktCap: '$297B',  category: 'stock' },
  { symbol: 'AXMD',  name: 'Axiomed Devices',        price: 156.74,  change: -2.33,  pct: -1.46, volume: '38.1M',  mktCap: '$253B',  category: 'stock' },
  { symbol: 'CNBX',  name: 'Cenbex Exchange',        price: 228.44,  change: -5.11,  pct: -2.19, volume: '8.7M',   mktCap: '$58B',   category: 'stock' },
  { symbol: 'RXBT',  name: 'Rexobit Corp',           price: 124.33,  change: 3.17,   pct: 2.62,  volume: '11.2M',  mktCap: '$89B',   category: 'stock' },
  { symbol: 'PLZM',  name: 'Plazma Energy',          price: 89.15,   change: -0.77,  pct: -0.86, volume: '6.4M',   mktCap: '$44B',   category: 'stock' },
  { symbol: 'QVNT',  name: 'Quantiv Labs',           price: 312.88,  change: 4.55,   pct: 1.48,  volume: '9.1M',   mktCap: '$112B',  category: 'stock' },
  { symbol: 'VORX',  name: 'Vortex Dynamics',        price: 548.20,  change: -8.44,  pct: -1.52, volume: '7.8M',   mktCap: '$188B',  category: 'stock' },
  // Crypto (fictional)
  { symbol: 'BLTC',  name: 'Bullethon',              price: 67843,   change: 892,    pct: 1.33,  volume: '$28.4B', mktCap: '$1.33T', category: 'crypto' },
  { symbol: 'ETHX',  name: 'Etherax',                price: 3412,    change: -45,    pct: -1.30, volume: '$14.2B', mktCap: '$410B',  category: 'crypto' },
  { symbol: 'SLAX',  name: 'Solaxis',                price: 168.22,  change: 3.44,   pct: 2.09,  volume: '$3.1B',  mktCap: '$77B',   category: 'crypto' },
  { symbol: 'XBEN',  name: 'Xeben Protocol',         price: 608.14,  change: -4.21,  pct: -0.69, volume: '$1.8B',  mktCap: '$89B',   category: 'crypto' },
  { symbol: 'AVXL',  name: 'Avalex Network',         price: 35.84,   change: 1.12,   pct: 3.23,  volume: '$612M',  mktCap: '$14.7B', category: 'crypto' },
  { symbol: 'DRLN',  name: 'Drelin Chain',           price: 8.42,    change: 0.31,   pct: 3.82,  volume: '$244M',  mktCap: '$3.2B',  category: 'crypto' },
  { symbol: 'FLOX',  name: 'Floxen Protocol',        price: 2.17,    change: -0.09,  pct: -3.98, volume: '$88M',   mktCap: '$820M',  category: 'crypto' },
  { symbol: 'NXVR',  name: 'Nexavar Protocol',       price: 0.4812,  change: 0.0211, pct: 4.58,  volume: '$31M',   mktCap: '$180M',  category: 'crypto' },
  // Forex (currency pairs — not stocks/crypto)
  { symbol: 'EUR/USD', name: 'Euro / US Dollar',     price: 1.0872,  change: 0.0021, pct: 0.19,  volume: '$1.2T',  mktCap: '—', category: 'forex' },
  { symbol: 'GBP/USD', name: 'British Pound / USD',  price: 1.2714,  change: -0.0034,pct: -0.27, volume: '$680B',  mktCap: '—', category: 'forex' },
  { symbol: 'USD/JPY', name: 'US Dollar / Yen',      price: 157.42,  change: 0.23,   pct: 0.15,  volume: '$930B',  mktCap: '—', category: 'forex' },
  // Futures
  { symbol: '/ES',   name: 'S&P 500 Futures',        price: 5248.75, change: 12.50,  pct: 0.24,  volume: '892K',   mktCap: '—', category: 'futures' },
  { symbol: '/NQ',   name: 'Nasdaq 100 Futures',     price: 18421.25,change: 88.75,  pct: 0.48,  volume: '432K',   mktCap: '—', category: 'futures' },
  { symbol: '/CL',   name: 'Crude Oil Futures',      price: 78.34,   change: -0.88,  pct: -1.11, volume: '312K',   mktCap: '—', category: 'futures' },
  { symbol: '/GC',   name: 'Gold Futures',           price: 2341.40, change: 11.30,  pct: 0.48,  volume: '154K',   mktCap: '—', category: 'futures' },
];

const CATEGORIES = ['all', 'stock', 'crypto', 'forex', 'futures'] as const;
type Category = typeof CATEGORIES[number];

function fmt(price: number) {
  if (price >= 1000) return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (price >= 1)    return price.toFixed(2);
  return price.toFixed(4);
}

export default function MarketsView() {
  const [assets, setAssets]     = useState<Asset[]>(INITIAL);
  const [category, setCategory] = useState<Category>('all');
  const [search, setSearch]     = useState('');
  const [sortKey, setSortKey]   = useState<'symbol' | 'price' | 'pct'>('pct');
  const [sortDir, setSortDir]   = useState<1 | -1>(-1);

  useEffect(() => {
    const id = setInterval(() => {
      setAssets(prev =>
        prev.map(a => {
          const delta    = (Math.random() - 0.5) * a.price * 0.002;
          const newPrice = Math.max(a.price + delta, 0.0001);
          const newChange = a.change + delta;
          const newPct   = (newChange / (newPrice - newChange)) * 100;
          return { ...a, price: newPrice, change: newChange, pct: newPct };
        })
      );
    }, 2000);
    return () => clearInterval(id);
  }, []);

  function toggleSort(key: typeof sortKey) {
    if (sortKey === key) setSortDir(d => (d === 1 ? -1 : 1));
    else { setSortKey(key); setSortDir(-1); }
  }

  const filtered = assets
    .filter(a => category === 'all' || a.category === category)
    .filter(a =>
      a.symbol.toLowerCase().includes(search.toLowerCase()) ||
      a.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortKey === 'symbol') return sortDir * a.symbol.localeCompare(b.symbol);
      if (sortKey === 'price')  return sortDir * (a.price - b.price);
      return sortDir * (a.pct - b.pct);
    });

  const catColors: Record<Category, string> = {
    all: '#f59e0b', stock: '#3b82f6', crypto: '#f59e0b', forex: '#22c55e', futures: '#8b5cf6',
  };

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-5">
        <input
          type="text"
          placeholder="Search symbol or name…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-[var(--c-bg-muted)] border border-[var(--c-border)] rounded-lg px-3 py-2 text-[13px] font-mono text-[var(--c-text)] placeholder-[var(--c-text-faint)] outline-none focus:border-[#f59e0b] w-64"
        />
        <div className="flex gap-1">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-md text-[12px] font-mono capitalize transition-colors ${
                category === c
                  ? 'text-[#0a0a0a] font-semibold'
                  : 'bg-[var(--c-bg-muted)] text-[var(--c-text-subtle)] hover:text-[var(--c-text-muted)]'
              }`}
              style={category === c ? { backgroundColor: catColors[c] } : {}}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-[var(--c-border)]">
        <table className="w-full border-collapse min-w-[640px]">
          <thead>
            <tr className="bg-[var(--c-bg-soft)] border-b border-[var(--c-border)]">
              {[
                { key: 'symbol', label: 'Symbol' },
                { key: null,     label: 'Name' },
                { key: 'price',  label: 'Price' },
                { key: 'pct',    label: 'Change' },
                { key: null,     label: 'Volume' },
                { key: null,     label: 'Mkt Cap' },
                { key: null,     label: 'Action' },
              ].map(col => (
                <th
                  key={col.label}
                  onClick={col.key ? () => toggleSort(col.key as typeof sortKey) : undefined}
                  className={`py-3 px-4 text-left text-[11px] font-mono uppercase tracking-wider text-[var(--c-text-subtle)] ${col.key ? 'cursor-pointer hover:text-[var(--c-text-muted)]' : ''}`}
                >
                  {col.label}
                  {col.key === sortKey && (sortDir === -1 ? ' ↓' : ' ↑')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.symbol} className="border-b border-[var(--c-border)] hover:bg-[var(--c-bg-soft)] transition-colors">
                <td className="py-3 px-4">
                  <span className="text-[14px] font-mono font-semibold text-[var(--c-text)]">{a.symbol}</span>
                </td>
                <td className="py-3 px-4 text-[13px] text-[var(--c-text-subtle)]">{a.name}</td>
                <td className="py-3 px-4 text-[14px] font-mono text-[var(--c-text)] tabular-nums">
                  {a.symbol.includes('/') && !a.symbol.startsWith('/') ? '' : '$'}{fmt(a.price)}
                </td>
                <td className="py-3 px-4">
                  <span className={`text-[13px] font-mono tabular-nums ${a.pct >= 0 ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                    {a.pct >= 0 ? '+' : ''}{a.pct.toFixed(2)}%
                  </span>
                </td>
                <td className="py-3 px-4 text-[13px] font-mono text-[var(--c-text-subtle)]">{a.volume}</td>
                <td className="py-3 px-4 text-[13px] font-mono text-[var(--c-text-subtle)]">{a.mktCap}</td>
                <td className="py-3 px-4">
                  <a
                    href={`/simulator?symbol=${encodeURIComponent(a.symbol)}`}
                    className="px-2.5 py-1 rounded bg-[var(--c-amber-bg)] border border-[var(--c-amber-dim)] text-[#f59e0b] text-[11px] font-mono hover:bg-[#f59e0b] hover:text-[#0a0a0a] transition-colors"
                  >
                    Trade
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
