import { useState, useEffect } from 'react';

interface StoredTrade {
  id: string;
  symbol: string;
  side: 'LONG' | 'SHORT';
  entry: number;
  exit: number;
  qty: number;
  pnl: number;
  openedAt: number;
  closedAt: number;
}

const STARTING_BALANCE = 100_000;

function loadTrades(): StoredTrade[] {
  try { const raw = localStorage.getItem('stockade_trades'); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

function loadBalance(): number {
  try { const raw = localStorage.getItem('stockade_balance'); return raw ? parseFloat(raw) : STARTING_BALANCE; } catch { return STARTING_BALANCE; }
}

function fmtMoney(n: number) {
  return (n >= 0 ? '+$' : '-$') + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtDuration(ms: number): string {
  const mins = Math.round(ms / 60_000);
  if (mins < 60) return `${Math.max(1, mins)}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function heatBg(wr: number, hasData: boolean) {
  if (!hasData) return 'var(--c-bg-muted)';
  if (wr >= 65) return 'var(--c-green-bg)';
  if (wr >= 50) return 'var(--c-bg-muted)';
  return 'var(--c-red-bg)';
}

function heatText(wr: number, hasData: boolean) {
  if (!hasData) return 'var(--c-text-faint)';
  if (wr >= 65) return '#22c55e';
  if (wr >= 50) return 'var(--c-text-muted)';
  return '#ef4444';
}

const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAY_INDICES = [1, 2, 3, 4, 5, 6, 0];

export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'trades' | 'heatmap'>('overview');
  const [trades, setTrades] = useState<StoredTrade[]>([]);
  const [balance, setBalance] = useState(STARTING_BALANCE);

  useEffect(() => {
    setTrades(loadTrades());
    setBalance(loadBalance());
    function onStorage(e: StorageEvent) {
      if (e.key === 'stockade_trades') setTrades(loadTrades());
      if (e.key === 'stockade_balance') setBalance(loadBalance());
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const sorted = [...trades].sort((a, b) => a.closedAt - b.closedAt);
  const totalPnl = trades.reduce((s, t) => s + t.pnl, 0);
  const wins = trades.filter(t => t.pnl > 0);
  const losses = trades.filter(t => t.pnl <= 0);
  const winRate = trades.length ? (wins.length / trades.length) * 100 : 0;
  const avgWin = wins.length ? wins.reduce((s, t) => s + t.pnl, 0) / wins.length : 0;
  const avgLoss = losses.length ? losses.reduce((s, t) => s + t.pnl, 0) / losses.length : 0;
  const profitFactor = losses.length && avgLoss !== 0
    ? Math.abs((avgWin * wins.length) / (avgLoss * losses.length))
    : wins.length > 0 ? Infinity : 0;

  // Equity curve from trade history
  const equityPts: number[] = [STARTING_BALANCE];
  let running = STARTING_BALANCE;
  for (const t of sorted) { running += t.pnl; equityPts.push(running); }
  const minV = Math.min(...equityPts);
  const maxV = Math.max(...equityPts);
  const range = maxV - minV || 1;
  const W = 600, H = 120;
  const svgPts = equityPts.map((v, i) => {
    const x = equityPts.length > 1 ? (i / (equityPts.length - 1)) * W : W / 2;
    const y = H - ((v - minV) / range) * H;
    return `${x},${y}`;
  }).join(' ');
  const equityColor = totalPnl >= 0 ? '#22c55e' : '#ef4444';

  // Max drawdown
  let maxEquity = STARTING_BALANCE;
  let maxDD = 0;
  let eq = STARTING_BALANCE;
  for (const t of sorted) {
    eq += t.pnl;
    maxEquity = Math.max(maxEquity, eq);
    maxDD = Math.max(maxDD, ((maxEquity - eq) / maxEquity) * 100);
  }

  const avgDurationMs = trades.length
    ? trades.reduce((s, t) => s + (t.closedAt - t.openedAt), 0) / trades.length
    : 0;

  // Heatmap
  const heatmap = DAYS.flatMap((day, di) =>
    HOURS.map(hour => {
      const dayIdx = DAY_INDICES[di];
      const cell = trades.filter(t => {
        const d = new Date(t.closedAt);
        return d.getDay() === dayIdx && d.getHours() === hour;
      });
      const wr = cell.length ? (cell.filter(t => t.pnl > 0).length / cell.length) * 100 : 0;
      return { day, hour, wr, hasData: cell.length > 0, count: cell.length };
    })
  );

  const isEmpty = trades.length === 0;

  return (
    <div className="space-y-5">
      {/* KPI cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Total P&L',     value: isEmpty ? '—' : fmtMoney(totalPnl),   color: totalPnl >= 0 ? '#22c55e' : '#ef4444' },
          { label: 'Equity',        value: '$' + balance.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }), color: balance >= STARTING_BALANCE ? '#22c55e' : '#ef4444' },
          { label: 'Win Rate',      value: isEmpty ? '—' : winRate.toFixed(1) + '%',  color: '#f59e0b' },
          { label: 'Profit Factor', value: isEmpty ? '—' : (isFinite(profitFactor) ? profitFactor.toFixed(2) + 'x' : '∞'), color: '#3b82f6' },
          { label: 'Avg Win',       value: isEmpty ? '—' : fmtMoney(avgWin),     color: '#22c55e' },
          { label: 'Max Drawdown',  value: isEmpty ? '—' : maxDD.toFixed(1) + '%', color: '#ef4444' },
        ].map(k => (
          <div key={k.label} className="bg-[var(--c-bg-soft)] border border-[var(--c-border)] rounded-xl p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--c-text-subtle)] mb-1">{k.label}</div>
            <div className="text-[18px] font-mono font-semibold"
              style={{ color: isEmpty && k.label !== 'Equity' ? 'var(--c-text-subtle)' : k.color }}>
              {k.value}
            </div>
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

      {/* Overview */}
      {activeTab === 'overview' && (
        <div className="bg-[var(--c-bg-soft)] border border-[var(--c-border)] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[14px] font-semibold text-[var(--c-text)]">Equity Curve</h2>
            <span className="text-[12px] font-mono text-[var(--c-text-subtle)]">{trades.length} closed trade{trades.length !== 1 ? 's' : ''}</span>
          </div>

          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-[140px] text-center">
              <p className="text-[13px] text-[var(--c-text-subtle)] font-mono">No trades yet — start trading to see your equity curve</p>
              <a href="/simulator" className="mt-2 text-[12px] text-[#f59e0b] font-mono hover:underline">Open simulator →</a>
            </div>
          ) : (
            <>
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 140 }} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="eq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={equityColor} stopOpacity="0.25"/>
                    <stop offset="100%" stopColor={equityColor} stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <polyline points={svgPts} stroke={equityColor} strokeWidth="2" fill="none"/>
                <polygon points={`0,${H} ${svgPts} ${W},${H}`} fill="url(#eq)"/>
              </svg>
              <div className="flex justify-between mt-2 text-[11px] font-mono text-[var(--c-text-faint)]">
                <span>${(minV / 1000).toFixed(1)}K</span>
                <span>${(maxV / 1000).toFixed(1)}K</span>
              </div>
            </>
          )}

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Total Trades', value: trades.length,  color: 'var(--c-text-muted)' },
              { label: 'Winning',      value: wins.length,    color: '#22c55e' },
              { label: 'Losing',       value: losses.length,  color: '#ef4444' },
              { label: 'Avg Duration', value: trades.length ? fmtDuration(avgDurationMs) : '—', color: '#f59e0b' },
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
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center p-10 text-center">
              <p className="text-[13px] text-[var(--c-text-subtle)] font-mono">No trades yet</p>
              <a href="/simulator" className="mt-2 text-[12px] text-[#f59e0b] font-mono hover:underline">Open simulator →</a>
            </div>
          ) : (
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
                  {[...trades].sort((a, b) => b.closedAt - a.closedAt).map(t => (
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
                      <td className="py-2.5 px-4 text-[13px] font-mono text-[var(--c-text-subtle)]">{fmtDuration(t.closedAt - t.openedAt)}</td>
                      <td className="py-2.5 px-4 text-[12px] font-mono text-[var(--c-text-subtle)]">{new Date(t.closedAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Heatmap */}
      {activeTab === 'heatmap' && (
        <div className="bg-[var(--c-bg-soft)] border border-[var(--c-border)] rounded-xl p-5">
          <h2 className="text-[14px] font-semibold text-[var(--c-text)] mb-1">Win Rate by Time of Day</h2>
          <p className="text-[12px] text-[var(--c-text-subtle)] mb-5">Green = high win rate · Red = low win rate · — = no trades in that slot</p>
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-[100px] text-center">
              <p className="text-[13px] text-[var(--c-text-subtle)] font-mono">No trades to display</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="grid gap-1" style={{ gridTemplateColumns: `48px repeat(${HOURS.length}, 1fr)`, minWidth: 480 }}>
                <div></div>
                {HOURS.map(h => (
                  <div key={h} className="text-center text-[11px] font-mono text-[var(--c-text-subtle)] pb-1">{h}:00</div>
                ))}
                {DAYS.map(day => (
                  <>
                    <div key={day} className="text-[11px] font-mono text-[var(--c-text-subtle)] flex items-center">{day}</div>
                    {HOURS.map(hour => {
                      const cell = heatmap.find(c => c.day === day && c.hour === hour);
                      const wr = cell?.wr ?? 0;
                      const hasData = cell?.hasData ?? false;
                      return (
                        <div key={hour} className="rounded p-2 text-center" style={{ backgroundColor: heatBg(wr, hasData) }}
                          title={hasData ? `${cell?.count} trade${cell?.count !== 1 ? 's' : ''} · ${wr.toFixed(0)}% win` : 'No trades'}>
                          <span className="text-[11px] font-mono" style={{ color: heatText(wr, hasData) }}>
                            {hasData ? `${wr.toFixed(0)}%` : '—'}
                          </span>
                        </div>
                      );
                    })}
                  </>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
