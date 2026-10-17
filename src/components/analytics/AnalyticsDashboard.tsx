import { useState, useEffect } from 'react';
import { format, plural, type PluralForms } from '../../lib/format';

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

function fmtDuration(ms: number, labels: Labels): string {
  const mins = Math.round(ms / 60_000);
  if (mins < 60) return format(labels.durationMinutes, { m: Math.max(1, mins) });
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? format(labels.durationHoursMinutes, { h, m }) : format(labels.durationHours, { h });
}

// Cells are coloured by net P&L, not win rate. A high win rate with small
// winners and large losers is a losing hour, and colouring it green would
// point traders at exactly the sessions costing them money.
function heatBg(net: number, hasData: boolean) {
  if (!hasData) return 'var(--c-bg-muted)';
  if (net > 0) return 'var(--c-green-bg)';
  if (net < 0) return 'var(--c-red-bg)';
  return 'var(--c-bg-muted)';
}

function heatText(net: number, hasData: boolean) {
  if (!hasData) return 'var(--c-text-faint)';
  if (net > 0) return '#22c55e';
  if (net < 0) return '#ef4444';
  return 'var(--c-text-muted)';
}

const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
// Rows run Monday to Sunday; values are getUTCDay() numbers.
const DAY_INDICES = [1, 2, 3, 4, 5, 6, 0];

// Strings with numbers are templates for format()/plural() in src/lib/format.ts.
// Placeholders: {n} count, {wr} win rate, {net} money, {h}/{m} hours/minutes.
interface Labels {
  totalPnl: string;
  equity: string;
  winRate: string;
  profitFactor: string;
  avgWin: string;
  maxDrawdown: string;
  equityCurve: string;
  // Tab buttons, kept short so the three fit one line at 375px. The
  // overview tab's section heading is equityCurve.
  tabEquity: string;
  tabJournal: string;
  tabHeatmap: string;
  closedTrades: PluralForms;
  emptyEquityCurve: string;
  emptyJournal: string;
  openSimulator: string;
  totalTrades: string;
  winning: string;
  losing: string;
  avgDuration: string;
  colSymbol: string;
  colSide: string;
  colEntry: string;
  colExit: string;
  colQty: string;
  colPnl: string;
  colDuration: string;
  colDate: string;
  heatmapTitle: string;
  heatmapLegend: string;
  heatmapEmpty: string;
  heatmapCell: PluralForms;
  heatmapCellEmpty: string;
  // Monday to Sunday, matching DAY_INDICES.
  days: readonly string[];
  durationMinutes: string;
  durationHours: string;
  durationHoursMinutes: string;
}

const DEFAULT_LABELS: Labels = {
  totalPnl: 'Total P&L',
  equity: 'Equity',
  winRate: 'Win Rate',
  profitFactor: 'Profit Factor',
  avgWin: 'Avg Win',
  maxDrawdown: 'Max Drawdown',
  equityCurve: 'Equity Curve',
  tabEquity: 'Equity Curve',
  tabJournal: 'Trade Journal',
  tabHeatmap: 'Time Heatmap',
  closedTrades: { one: '{n} closed trade', other: '{n} closed trades' },
  emptyEquityCurve: 'No trades yet — start trading to see your equity curve',
  emptyJournal: 'No trades yet',
  openSimulator: 'Open simulator →',
  totalTrades: 'Total Trades',
  winning: 'Winning',
  losing: 'Losing',
  avgDuration: 'Avg Duration',
  colSymbol: 'Symbol',
  colSide: 'Side',
  colEntry: 'Entry',
  colExit: 'Exit',
  colQty: 'Qty',
  colPnl: 'P&L',
  colDuration: 'Duration',
  colDate: 'Date',
  heatmapTitle: 'Performance by Time of Day',
  heatmapLegend: 'Colour = net P&L · Number = win rate · Hover a cell for net P&L · Hours are UTC · — = no trades in that slot',
  heatmapEmpty: 'No trades to display',
  heatmapCell: { one: '{n} trade · {wr}% win · net {net}', other: '{n} trades · {wr}% win · net {net}' },
  heatmapCellEmpty: 'No trades',
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  durationMinutes: '{m}m',
  durationHours: '{h}h',
  durationHoursMinutes: '{h}h {m}m',
};

interface Props {
  // Target of the "Open simulator" links. Passed in by the page via
  // localizedHref('/simulator/', locale) for the same reason as MarketsView's
  // prop: a pre-rendered island has no locale-aware URL of its own.
  simulatorHref?: string;
  // Selects the plural forms in labels (Intl.PluralRules). Numbers and money
  // stay en-US in every locale (Phase A decision b).
  locale?: string;
  // Merged over the English defaults, so English pages pass nothing.
  labels?: Partial<Labels>;
}

export default function AnalyticsDashboard({ simulatorHref = '/simulator/', locale = 'en', labels: labelOverrides }: Props) {
  const labels: Labels = { ...DEFAULT_LABELS, ...labelOverrides };
  // The English tab labels are already title-cased; CSS capitalize stays on
  // them only so English markup is unchanged. It would mangle translations
  // ("Curva De Capital"), which come cased as the locale writes them.
  const tabCase = labelOverrides ? '' : ' capitalize';
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
  const heatmap = DAY_INDICES.flatMap((dayIdx, di) =>
    HOURS.map(hour => {
      const cell = trades.filter(t => {
        const d = new Date(t.closedAt);
        // UTC so a slot means the same thing regardless of the viewer's
        // timezone, and so cells don't shift if they travel.
        return d.getUTCDay() === dayIdx && d.getUTCHours() === hour;
      });
      // Only pnl > 0 is a win, so a trade closing exactly flat counts as a loss.
      const wr = cell.length ? (cell.filter(t => t.pnl > 0).length / cell.length) * 100 : 0;
      const net = cell.reduce((s, t) => s + t.pnl, 0);
      return { di, hour, wr, net, hasData: cell.length > 0, count: cell.length };
    })
  );

  const isEmpty = trades.length === 0;

  return (
    <div className="space-y-5">
      {/* KPI cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { id: 'totalPnl',     label: labels.totalPnl,     value: isEmpty ? '—' : fmtMoney(totalPnl),   color: totalPnl >= 0 ? '#22c55e' : '#ef4444' },
          { id: 'equity',       label: labels.equity,       value: '$' + balance.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }), color: balance >= STARTING_BALANCE ? '#22c55e' : '#ef4444' },
          { id: 'winRate',      label: labels.winRate,      value: isEmpty ? '—' : winRate.toFixed(1) + '%',  color: '#f59e0b' },
          { id: 'profitFactor', label: labels.profitFactor, value: isEmpty ? '—' : (isFinite(profitFactor) ? profitFactor.toFixed(2) + 'x' : '∞'), color: '#3b82f6' },
          { id: 'avgWin',       label: labels.avgWin,       value: isEmpty ? '—' : fmtMoney(avgWin),     color: '#22c55e' },
          { id: 'maxDrawdown',  label: labels.maxDrawdown,  value: isEmpty ? '—' : maxDD.toFixed(1) + '%', color: '#ef4444' },
        ].map(k => (
          <div key={k.id} className="bg-[var(--c-bg-soft)] border border-[var(--c-border)] rounded-xl p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--c-text-subtle)] mb-1">{k.label}</div>
            <div className="text-[18px] font-mono font-semibold"
              style={{ color: isEmpty && k.id !== 'equity' ? 'var(--c-text-subtle)' : k.color }}>
              {k.value}
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[var(--c-border)]">
        {(['overview', 'trades', 'heatmap'] as const).map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`px-4 py-2 text-[13px] font-mono${tabCase} border-b-2 transition-colors ${
              activeTab === t
                ? 'border-[#f59e0b] text-[var(--c-text)]'
                : 'border-transparent text-[var(--c-text-subtle)] hover:text-[var(--c-text-muted)]'
            }`}>
            {t === 'overview' ? labels.tabEquity : t === 'trades' ? labels.tabJournal : labels.tabHeatmap}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === 'overview' && (
        <div className="bg-[var(--c-bg-soft)] border border-[var(--c-border)] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[14px] font-semibold text-[var(--c-text)]">{labels.equityCurve}</h2>
            <span className="text-[12px] font-mono text-[var(--c-text-subtle)]">{plural(locale, trades.length, labels.closedTrades)}</span>
          </div>

          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-[140px] text-center">
              <p className="text-[13px] text-[var(--c-text-subtle)] font-mono">{labels.emptyEquityCurve}</p>
              <a href={simulatorHref} className="mt-2 text-[12px] text-[#f59e0b] font-mono hover:underline">{labels.openSimulator}</a>
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
              { id: 'totalTrades', label: labels.totalTrades, value: trades.length,  color: 'var(--c-text-muted)' },
              { id: 'winning',     label: labels.winning,     value: wins.length,    color: '#22c55e' },
              { id: 'losing',      label: labels.losing,      value: losses.length,  color: '#ef4444' },
              { id: 'avgDuration', label: labels.avgDuration, value: trades.length ? fmtDuration(avgDurationMs, labels) : '—', color: '#f59e0b' },
            ].map(s => (
              <div key={s.id}className="bg-[var(--c-bg-muted)] rounded-lg p-3">
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
              <p className="text-[13px] text-[var(--c-text-subtle)] font-mono">{labels.emptyJournal}</p>
              <a href={simulatorHref} className="mt-2 text-[12px] text-[#f59e0b] font-mono hover:underline">{labels.openSimulator}</a>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-[var(--c-border)]">
                    {[labels.colSymbol, labels.colSide, labels.colEntry, labels.colExit, labels.colQty, labels.colPnl, labels.colDuration, labels.colDate].map(h => (
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
                      <td className="py-2.5 px-4 text-[13px] font-mono text-[var(--c-text-subtle)]">{fmtDuration(t.closedAt - t.openedAt, labels)}</td>
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
          <h2 className="text-[14px] font-semibold text-[var(--c-text)] mb-1">{labels.heatmapTitle}</h2>
          <p className="text-[12px] text-[var(--c-text-subtle)] mb-5">{labels.heatmapLegend}</p>
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-[100px] text-center">
              <p className="text-[13px] text-[var(--c-text-subtle)] font-mono">{labels.heatmapEmpty}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="grid gap-1" style={{ gridTemplateColumns: `48px repeat(${HOURS.length}, 1fr)`, minWidth: 480 }}>
                <div></div>
                {HOURS.map(h => (
                  <div key={h} className="text-center text-[11px] font-mono text-[var(--c-text-subtle)] pb-1">{h}:00</div>
                ))}
                {labels.days.map((day, di) => (
                  <>
                    <div key={day} className="text-[11px] font-mono text-[var(--c-text-subtle)] flex items-center">{day}</div>
                    {HOURS.map(hour => {
                      const cell = heatmap.find(c => c.di === di && c.hour === hour);
                      const wr = cell?.wr ?? 0;
                      const net = cell?.net ?? 0;
                      const hasData = cell?.hasData ?? false;
                      return (
                        <div key={hour} className="rounded p-2 text-center" style={{ backgroundColor: heatBg(net, hasData) }}
                          title={hasData ? plural(locale, cell?.count ?? 0, labels.heatmapCell, { wr: wr.toFixed(0), net: fmtMoney(net) }) : labels.heatmapCellEmpty}>
                          <span className="text-[11px] font-mono" style={{ color: heatText(net, hasData) }}>
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
