import { useState, useEffect } from 'react';

const BASE = { traders: 12847, trades: 2341088, volume: 8923441200 };

export default function LiveStats() {
  const [stats, setStats] = useState(BASE);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        traders: prev.traders + Math.floor(Math.random() * 3),
        trades:  prev.trades  + Math.floor(Math.random() * 7),
        volume:  prev.volume  + Math.floor(Math.random() * 50000),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
      {[
        { label: 'Active Traders',    value: stats.traders.toLocaleString() },
        { label: 'Simulated Trades',  value: stats.trades.toLocaleString() },
        { label: 'Volume Simulated',  value: '$' + (stats.volume / 1e9).toFixed(2) + 'B' },
        { label: 'Starting Balance',  value: '$100,000' },
      ].map(s => (
        <div key={s.label} className="text-center">
          <div className="text-2xl sm:text-3xl font-mono font-semibold text-[#f5f5f5] tabular-nums">
            {s.value}
          </div>
          <div className="text-[12px] text-[#666666] mt-1 font-mono uppercase tracking-wider">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
