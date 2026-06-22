import { useState } from 'react';

const TRADERS = [
  { rank: 1,  name: 'trader_x99',    pnl: 48230,  pct: 48.2,  wr: 74, pf: 3.82, trades: 142, streak: 8  },
  { rank: 2,  name: 'apex_whale',    pnl: 41100,  pct: 41.1,  wr: 71, pf: 3.44, trades: 98,  streak: 5  },
  { rank: 3,  name: 'algo_ghost',    pnl: 38870,  pct: 38.9,  wr: 68, pf: 3.21, trades: 207, streak: 12 },
  { rank: 4,  name: 'scalp_hunter',  pnl: 34550,  pct: 34.6,  wr: 65, pf: 2.88, trades: 312, streak: 3  },
  { rank: 5,  name: 'momo_rider',    pnl: 29900,  pct: 29.9,  wr: 62, pf: 2.64, trades: 88,  streak: 7  },
  { rank: 6,  name: 'vol_king',      pnl: 27440,  pct: 27.4,  wr: 60, pf: 2.41, trades: 155, streak: 2  },
  { rank: 7,  name: 'tape_reader',   pnl: 24110,  pct: 24.1,  wr: 58, pf: 2.18, trades: 231, streak: 4  },
  { rank: 8,  name: 'spread_wizard', pnl: 21880,  pct: 21.9,  wr: 57, pf: 2.01, trades: 76,  streak: 9  },
  { rank: 9,  name: 'night_owl',     pnl: 18950,  pct: 19.0,  wr: 55, pf: 1.89, trades: 190, streak: 1  },
  { rank: 10, name: 'gap_trader',    pnl: 17300,  pct: 17.3,  wr: 54, pf: 1.77, trades: 64,  streak: 6  },
  { rank: 11, name: 'breakout_bob',  pnl: 15700,  pct: 15.7,  wr: 53, pf: 1.68, trades: 103, streak: 0  },
  { rank: 12, name: 'delta_flux',    pnl: 13200,  pct: 13.2,  wr: 51, pf: 1.54, trades: 88,  streak: 3  },
  { rank: 13, name: 'tick_master',   pnl: 11400,  pct: 11.4,  wr: 50, pf: 1.44, trades: 177, streak: 2  },
  { rank: 14, name: 'ema_rider',     pnl: 9870,   pct: 9.9,   wr: 49, pf: 1.32, trades: 55,  streak: 0  },
  { rank: 15, name: 'chart_ninja',   pnl: 7540,   pct: 7.5,   wr: 47, pf: 1.18, trades: 139, streak: 1  },
];

type SortKey = 'pnl' | 'wr' | 'pf' | 'trades';

const TABS: { key: SortKey; label: string }[] = [
  { key: 'pnl',    label: 'By P&L' },
  { key: 'wr',     label: 'By Win Rate' },
  { key: 'pf',     label: 'By Profit Factor' },
  { key: 'trades', label: 'By Trades' },
];

function medal(rank: number) {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return '';
}

export default function Leaderboard() {
  const [sortKey, setSortKey] = useState<SortKey>('pnl');

  const sorted = [...TRADERS].sort((a, b) => b[sortKey] - a[sortKey]).map((t, i) => ({ ...t, rank: i + 1 }));

  return (
    <div>
      {/* Top 3 podium */}
      <div className="grid grid-cols-3 gap-3 mb-6 max-w-[600px] mx-auto">
        {[sorted[1], sorted[0], sorted[2]].map((t, i) => {
          const isFirst = i === 1;
          return (
            <div
              key={t.rank}
              className={`rounded-xl border p-4 text-center ${
                isFirst
                  ? 'bg-[#1c1308] border-[#f59e0b33] glow-amber'
                  : 'bg-[#111111] border-[#2a2a2a]'
              }`}
              style={isFirst ? { transform: 'translateY(-8px)' } : {}}
            >
              <div className="text-2xl mb-1">{medal(t.rank)}</div>
              <div className="text-[13px] font-mono font-semibold text-[#f5f5f5] truncate">{t.name}</div>
              <div className="text-[12px] font-mono text-[#f59e0b] mt-1">+${t.pnl.toLocaleString()}</div>
              <div className="text-[11px] font-mono text-[#666666]">WR {t.wr}%</div>
            </div>
          );
        })}
      </div>

      {/* Sort tabs */}
      <div className="flex gap-1 border-b border-[#2a2a2a] mb-4">
        {TABS.map(tab => (
          <button key={tab.key} onClick={() => setSortKey(tab.key)}
            className={`px-4 py-2 text-[12px] font-mono border-b-2 transition-colors ${
              sortKey === tab.key ? 'border-[#f59e0b] text-[#f5f5f5]' : 'border-transparent text-[#666666] hover:text-[#a1a1a1]'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Full table */}
      <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl overflow-hidden">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-[#2a2a2a]">
              {['#', 'Trader', 'P&L', 'Return', 'Win Rate', 'Profit Factor', 'Trades', 'Streak'].map(h => (
                <th key={h} className="py-3 px-4 text-left text-[11px] font-mono uppercase tracking-wider text-[#666666]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map(t => (
              <tr key={t.name} className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a] transition-colors">
                <td className="py-3 px-4">
                  <span className={`text-[14px] font-mono font-bold ${
                    t.rank === 1 ? 'text-[#f59e0b]' : t.rank === 2 ? 'text-[#a1a1a1]' : t.rank === 3 ? 'text-[#92400e]' : 'text-[#444444]'
                  }`}>
                    {medal(t.rank) || t.rank}
                  </span>
                </td>
                <td className="py-3 px-4 text-[13px] font-mono font-semibold text-[#f5f5f5]">{t.name}</td>
                <td className="py-3 px-4 text-[13px] font-mono font-semibold text-[#22c55e]">+${t.pnl.toLocaleString()}</td>
                <td className="py-3 px-4 text-[13px] font-mono text-[#22c55e]">+{t.pct}%</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-[#1a1a1a] max-w-[80px]">
                      <div className="h-full rounded-full bg-[#22c55e]" style={{ width: `${t.wr}%` }}></div>
                    </div>
                    <span className="text-[12px] font-mono text-[#f5f5f5]">{t.wr}%</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-[13px] font-mono text-[#f59e0b]">{t.pf}x</td>
                <td className="py-3 px-4 text-[13px] font-mono text-[#a1a1a1]">{t.trades}</td>
                <td className="py-3 px-4">
                  {t.streak > 0 ? (
                    <span className="text-[12px] font-mono text-[#22c55e]">🔥 {t.streak}</span>
                  ) : (
                    <span className="text-[12px] font-mono text-[#444444]">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-[12px] text-[#444444] font-mono">
        * Rankings based on simulated trading. Virtual money only. Updated every hour.
      </p>
    </div>
  );
}
