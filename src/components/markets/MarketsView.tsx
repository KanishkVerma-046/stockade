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
  // Stocks
  { symbol: 'AAPL',  name: 'Apple Inc.',          price: 187.42,  change: 1.23,   pct: 0.66,  volume: '52.3M', mktCap: '$2.9T', category: 'stock' },
  { symbol: 'TSLA',  name: 'Tesla Inc.',           price: 248.11,  change: -3.87,  pct: -1.54, volume: '88.1M', mktCap: '$791B', category: 'stock' },
  { symbol: 'NVDA',  name: 'NVIDIA Corp.',         price: 875.63,  change: 12.45,  pct: 1.44,  volume: '41.7M', mktCap: '$2.1T', category: 'stock' },
  { symbol: 'MSFT',  name: 'Microsoft Corp.',      price: 415.22,  change: 2.18,   pct: 0.53,  volume: '19.4M', mktCap: '$3.1T', category: 'stock' },
  { symbol: 'AMZN',  name: 'Amazon.com Inc.',      price: 192.77,  change: -1.02,  pct: -0.53, volume: '35.8M', mktCap: '$2.0T', category: 'stock' },
  { symbol: 'GOOG',  name: 'Alphabet Inc.',        price: 176.88,  change: 0.94,   pct: 0.53,  volume: '21.3M', mktCap: '$2.2T', category: 'stock' },
  { symbol: 'META',  name: 'Meta Platforms',       price: 508.44,  change: 7.31,   pct: 1.46,  volume: '13.9M', mktCap: '$1.3T', category: 'stock' },
  { symbol: 'NFLX',  name: 'Netflix Inc.',         price: 685.90,  change: 8.22,   pct: 1.21,  volume: '4.2M',  mktCap: '$297B', category: 'stock' },
  { symbol: 'AMD',   name: 'Advanced Micro Dev.',  price: 156.74,  change: -2.33,  pct: -1.46, volume: '38.1M', mktCap: '$253B', category: 'stock' },
  { symbol: 'COIN',  name: 'Coinbase Global',      price: 228.44,  change: -5.11,  pct: -2.19, volume: '8.7M',  mktCap: '$58B',  category: 'stock' },
  // Crypto
  { symbol: 'BTC',   name: 'Bitcoin',              price: 67843,   change: 892,    pct: 1.33,  volume: '$28.4B', mktCap: '$1.33T', category: 'crypto' },
  { symbol: 'ETH',   name: 'Ethereum',             price: 3412,    change: -45,    pct: -1.30, volume: '$14.2B', mktCap: '$410B',  category: 'crypto' },
  { symbol: 'SOL',   name: 'Solana',               price: 168.22,  change: 3.44,   pct: 2.09,  volume: '$3.1B',  mktCap: '$77B',   category: 'crypto' },
  { symbol: 'BNB',   name: 'BNB',                  price: 608.14,  change: -4.21,  pct: -0.69, volume: '$1.8B',  mktCap: '$89B',   category: 'crypto' },
  { symbol: 'AVAX',  name: 'Avalanche',            price: 35.84,   change: 1.12,   pct: 3.23,  volume: '$612M',  mktCap: '$14.7B', category: 'crypto' },
  // Forex
  { symbol: 'EUR/USD', name: 'Euro / US Dollar',   price: 1.0872,  change: 0.0021, pct: 0.19,  volume: '$1.2T',  mktCap: '—', category: 'forex' },
  { symbol: 'GBP/USD', name: 'British Pound / USD',price: 1.2714,  change: -0.0034,pct: -0.27, volume: '$680B',  mktCap: '—', category: 'forex' },
  { symbol: 'USD/JPY', name: 'US Dollar / Yen',    price: 157.42,  change: 0.23,   pct: 0.15,  volume: '$930B',  mktCap: '—', category: 'forex' },
  // Futures
  { symbol: '/ES',   name: 'S&P 500 Futures',      price: 5248.75, change: 12.50,  pct: 0.24,  volume: '892K',  mktCap: '—', category: 'futures' },
  { symbol: '/NQ',   name: 'Nasdaq 100 Futures',   price: 18421.25,change: 88.75,  pct: 0.48,  volume: '432K',  mktCap: '—', category: 'futures' },
  { symbol: '/CL',   name: 'Crude Oil Futures',    price: 78.34,   change: -0.88,  pct: -1.11, volume: '312K',  mktCap: '—', category: 'futures' },
  { symbol: '/GC',   name: 'Gold Futures',         price: 2341.40, change: 11.30,  pct: 0.48,  volume: '154K',  mktCap: '—', category: 'futures' },
];

const CATEGORIES = ['all', 'stock', 'crypto', 'forex', 'futures'] as const;
type Category = typeof CATEGORIES[number];

function fmt(price: number) {
  if (price >= 1000) return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (price >= 1)    return price.toFixed(2);
  return price.toFixed(4);
}

export default function MarketsView() {
  const [assets, setAssets]   = useState<Asset[]>(INITIAL);
  const [category, setCategory] = useState<Category>('all');
  const [search, setSearch]   = useState('');
  const [sortKey, setSortKey] = useState<'symbol' | 'price' | 'pct'>('pct');
  const [sortDir, setSortDir] = useState<1 | -1>(-1);

  useEffect(() => {
    const id = setInterval(() => {
      setAssets(prev =>
        prev.map(a => {
          const delta = (Math.random() - 0.5) * a.price * 0.002;
          const newPrice  = Math.max(a.price + delta, 0.0001);
          const newChange = a.change + delta;
          const newPct    = (newChange / (newPrice - newChange)) * 100;
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
          className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2 text-[13px] font-mono text-[#f5f5f5] placeholder-[#444444] outline-none focus:border-[#f59e0b] w-64"
        />
        <div className="flex gap-1">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-md text-[12px] font-mono capitalize transition-colors ${
                category === c
                  ? 'text-[#0a0a0a] font-semibold'
                  : 'bg-[#1a1a1a] text-[#666666] hover:text-[#a1a1a1]'
              }`}
              style={category === c ? { backgroundColor: catColors[c] } : {}}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
        <table className="w-full border-collapse min-w-[640px]">
          <thead>
            <tr className="bg-[#111111] border-b border-[#2a2a2a]">
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
                  className={`py-3 px-4 text-left text-[11px] font-mono uppercase tracking-wider text-[#666666] ${col.key ? 'cursor-pointer hover:text-[#a1a1a1]' : ''}`}
                >
                  {col.label}
                  {col.key === sortKey && (sortDir === -1 ? ' ↓' : ' ↑')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.symbol} className="border-b border-[#1a1a1a] hover:bg-[#111111] transition-colors">
                <td className="py-3 px-4">
                  <span className="text-[14px] font-mono font-semibold text-[#f5f5f5]">{a.symbol}</span>
                </td>
                <td className="py-3 px-4 text-[13px] text-[#666666]">{a.name}</td>
                <td className="py-3 px-4 text-[14px] font-mono text-[#f5f5f5] tabular-nums">
                  {a.symbol.includes('/') && !a.symbol.startsWith('/') ? '' : '$'}{fmt(a.price)}
                </td>
                <td className="py-3 px-4">
                  <span className={`text-[13px] font-mono tabular-nums ${a.pct >= 0 ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                    {a.pct >= 0 ? '+' : ''}{a.pct.toFixed(2)}%
                  </span>
                </td>
                <td className="py-3 px-4 text-[13px] font-mono text-[#666666]">{a.volume}</td>
                <td className="py-3 px-4 text-[13px] font-mono text-[#666666]">{a.mktCap}</td>
                <td className="py-3 px-4">
                  <a
                    href="/simulator"
                    className="px-2.5 py-1 rounded bg-[#1c1308] border border-[#f59e0b33] text-[#f59e0b] text-[11px] font-mono hover:bg-[#f59e0b] hover:text-[#0a0a0a] transition-colors"
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
