import { useState } from 'react';

const EQUITY_CURVE = (() => {
  const pts = [];
  let val = 100000;
  for (let i = 0; i < 60; i++) {
    val += (Math.random() - 0.42) * 2000;
    val = Math.max(val, 80000);
    pts.push({ day: i, value: val });
  }
  return pts;
})();

const TRADES = Array.from({ length: 24 }, (_, i) => {
  const pnl = (Math.random() - 0.38) * 800;
  const symbols = ['APXL', 'TRXL', 'NVOX', 'MXFT', 'BLTC', 'ETHX', 'SLAX'];
  return {
    id: String(i),
    symbol: symbols[Math.floor(Math.random() * symbols.length)],
    side: Math.random() > 0.5 ? 'LONG' : 'SHORT',
    entry: 150 + Math.random() * 200,
    exit: 150 + Math.random() * 200,
    qty: Math.floor(Math.random() * 200 + 50),
    pnl,
    duration: Math.floor(Math.random() * 120 + 5) + 'm',
    date: new Date(Date.now() - i * 86400000 * Math.random() * 3).toLocaleDateString(),
  };
});

const totalPnl  = TRADES.reduce((s, t) => s + t.pnl, 0);
const wins      = TRADES.filter(t => t.pnl > 0);
const losses    = TRADES.filter(t => t.pnl <= 0);
const winRate   = (wins.length / TRADES.length) * 100;
const avgWin    = wins.length  ? wins.reduce((s, t) => s + t.pnl, 0)   / wins.length   : 0;
const avgLoss   = losses.length ? losses.reduce((s, t) => s + t.pnl, 0) / losses.length : 0;
const profitFactor = Math.abs(avgWin * wins.length / (avgLoss * losses.length || 1));
const maxEquity = Math.max(...EQUITY_CURVE.map(p => p.value));
const minAfterMax = Math.min(...EQUITY_CURVE.slice(EQUITY_CURVE.findIndex(p => p.value === maxEquity)).map(p => p.value));
const maxDrawdown = ((maxEquity - minAfterMax) / maxEquity) * 100;

function fmtMoney(n: number) {
  return (n >= 0 ? '+$' : '-$') + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const HOURS = [9, 10, 11, 12, 13, 14, 15];
const DAYS  = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const HEATMAP = DAYS.flatMap(d => HOURS.map(h => ({
  day: d, hour: h, wr: Math.random() * 80 + 10,
})));

function heatBg(wr: number) {
  if (wr >= 65) return 'var(--c-green-bg)';
  if (wr >= 50) return 'var(--c-bg-muted)';
  if (wr >= 40) return 'var(--c-bg-muted)';
  return 'var(--c-red-bg)';
}
function heatText(wr: number) {
  if (wr >= 65) return '#22c55e';
  if (wr >= 50) return '#4ade80';
  if (wr >= 40) return 'var(--c-text-muted)';
  return '#ef4444';
}

const W = 600, H = 120;
const vals = EQUITY_CURVE.map(p => p.value);
const minV = Math.min(...vals), maxV = Math.max(...vals);
const range = maxV - minV || 1;
const pts = vals.map((v, i) => {
  const x = (i / (vals.length - 1)) * W;
  const y = H - ((v - minV) / range) * H;
  return `${x},${y}`;
}).join(' ');

export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'trades' | 'heatmap'>('overview');
  const currentEquity = EQUITY_CURVE[EQUITY_CURVE.length - 1].value;

  return (
    <div className="space-y-5">
      {/* KPI cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Total P&L',     value: fmtMoney(totalPnl),          color: totalPnl >= 0 ? '#22c55e' : '#ef4444' },
          { label: 'Equity',        value: '$' + currentEquity.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }), color: 'var(--c-text)' },
          { label: 'Win Rate',      value: winRate.toFixed(1) + '%',     color: '#f59e0b' },
          { label: 'Profit Factor', value: profitFactor.toFixed(2) + 'x',color: '#3b82f6' },
          { label: 'Avg Win',       value: fmtMoney(avgWin),            color: '#22c55e' },
          { label: 'Max Drawdown',  value: maxDrawdown.toFixed(1) + '%', color: '#ef4444' },
        ].map(k => (
          <div key={k.label} className="bg-[var(--c-bg-soft)] border border-[var(--c-border)] rounded-xl p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--c-text-subtle)] mb-1">{k.label}</div>
            <div className="text-[18px] font-mono font-semibold" style={{ color: k.color }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[var(--c-border)]">
        {(['overview', 'trades', 'heatmap'] as const).map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`px-4 py-2 text-[13px] font-mono capitalize border-b-2 transition-colors ${
              activeTab === t
                ? 'border-[#f59e0b] text-[var(--c-text)]'
                : 'border-transparent text-[var(--c-text-subtle)] hover:text-[var(--c-text-muted)]'
            }`}>
            {t === 'overview' ? 'Equity Curve' : t === 'trades' ? 'Trade Journal' : 'Time Heatmap'}
          </button>
        ))}
      </div>

      {/* Overview: Equity curve */}
      {activeTab === 'overview' && (
        <div className="bg-[var(--c-bg-soft)] border border-[var(--c-border)] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[14px] font-semibold text-[var(--c-text)]">Equity Curve</h2>
            <span className="text-[12px] font-mono text-[var(--c-text-subtle)]">Last 60 sessions</span>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 140 }} preserveAspectRatio="none">
            <defs>
              <linearGradient id="eq" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.25"/>
                <stop offset="100%" stopColor="#22c55e" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <polyline points={pts} stroke="#22c55e" strokeWidth="2" fill="none"/>
            <polygon points={`0,${H} ${pts} ${W},${H}`} fill="url(#eq)"/>
          </svg>
          <div className="flex justify-between mt-2 text-[11px] font-mono text-[var(--c-text-faint)]">
            <span>${(minV / 1000).toFixed(1)}K</span>
            <span>${(maxV / 1000).toFixed(1)}K</span>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Total Trades', value: TRADES.length, color: 'var(--c-text-muted)' },
              { label: 'Winning',      value: wins.length,   color: '#22c55e' },
              { label: 'Losing',       value: losses.length, color: '#ef4444' },
              { label: 'Avg Duration', value: '28m',         color: '#f59e0b' },
            ].map(s => (
              <div key={s.label} className="bg-[var(--c-bg-muted)] rounded-lg p-3">
                <div className="text-[10px] font-mono text-[var(--c-text-subtle)] uppercase tracking-wider mb-1">{s.label}</div>
                <div className="text-[20px] font-mono font-semibold" style={{ color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trade journal */}
      {activeTab === 'trades' && (
        <div className="bg-[var(--c-bg-soft)] border border-[var(--c-border)] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-[var(--c-border)]">
                  {['Symbol', 'Side', 'Entry', 'Exit', 'Qty', 'P&L', 'Duration', 'Date'].map(h => (
                    <th key={h} className="py-3 px-4 text-left text-[11px] font-mono uppercase tracking-wider text-[var(--c-text-subtle)]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TRADES.map(t => (
                  <tr key={t.id} className="border-b border-[var(--c-border)] hover:bg-[var(--c-bg-muted)] transition-colors">
                    <td className="py-2.5 px-4 text-[13px] font-mono font-semibold text-[var(--c-text)]">{t.symbol}</td>
                    <td className="py-2.5 px-4">
                      <span className={`text-[12px] font-mono px-2 py-0.5 rounded ${
                        t.side === 'LONG' ? 'bg-[var(--c-green-bg)] text-[#22c55e]' : 'bg-[var(--c-red-bg)] text-[#ef4444]'
                      }`}>{t.side}</span>
                    </td>
                    <td className="py-2.5 px-4 text-[13px] font-mono text-[var(--c-text-muted)]">${t.entry.toFixed(2)}</td>
                    <td className="py-2.5 px-4 text-[13px] font-mono text-[var(--c-text-muted)]">${t.exit.toFixed(2)}</td>
                    <td className="py-2.5 px-4 text-[13px] font-mono text-[var(--c-text-muted)]">{t.qty}</td>
                    <td className="py-2.5 px-4 text-[13px] font-mono font-semibold" style={{ color: t.pnl >= 0 ? '#22c55e' : '#ef4444' }}>
                      {fmtMoney(t.pnl)}
                    </td>
                    <td className="py-2.5 px-4 text-[13px] font-mono text-[var(--c-text-subtle)]">{t.duration}</td>
                    <td className="py-2.5 px-4 text-[12px] font-mono text-[var(--c-text-subtle)]">{t.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Heatmap */}
      {activeTab === 'heatmap' && (
        <div className="bg-[var(--c-bg-soft)] border border-[var(--c-border)] rounded-xl p-5">
          <h2 className="text-[14px] font-semibold text-[var(--c-text)] mb-1">Win Rate by Time of Day</h2>
          <p className="text-[12px] text-[var(--c-text-subtle)] mb-5">Green = high win rate · Red = low win rate</p>
          <div className="overflow-x-auto">
            <div className="grid gap-1" style={{ gridTemplateColumns: `48px repeat(${HOURS.length}, 1fr)`, minWidth: 360 }}>
              <div></div>
              {HOURS.map(h => (
                <div key={h} className="text-center text-[11px] font-mono text-[var(--c-text-subtle)] pb-1">
                  {h}:00
                </div>
              ))}
              {DAYS.map(day => (
                <>
                  <div key={day} className="text-[11px] font-mono text-[var(--c-text-subtle)] flex items-center">{day}</div>
                  {HOURS.map(hour => {
                    const cell = HEATMAP.find(c => c.day === day && c.hour === hour);
                    const wr = cell?.wr ?? 50;
                    return (
                      <div key={hour} className="rounded p-2 text-center" style={{ backgroundColor: heatBg(wr) }}>
                        <span className="text-[11px] font-mono" style={{ color: heatText(wr) }}>
                          {wr.toFixed(0)}%
                        </span>
                      </div>
                    );
                  })}
                </>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
