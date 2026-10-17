import { t } from './ui';
import type { Locale } from './locales';

// The AnalyticsDashboard `labels` prop for a translated /xx/analytics/ page,
// built from ui.ts. English pages pass nothing and get the island's defaults.
export function analyticsLabels(locale: Locale) {
  return {
    totalPnl: t(locale, 'analytics.totalPnl'),
    equity: t(locale, 'analytics.equity'),
    winRate: t(locale, 'analytics.winRate'),
    profitFactor: t(locale, 'analytics.profitFactor'),
    avgWin: t(locale, 'analytics.avgWin'),
    maxDrawdown: t(locale, 'analytics.maxDrawdown'),
    equityCurve: t(locale, 'analytics.equityCurve'),
    tradeJournal: t(locale, 'analytics.tradeJournal'),
    timeHeatmap: t(locale, 'analytics.timeHeatmap'),
    closedTrades: {
      one: t(locale, 'analytics.closedTrades.one'),
      other: t(locale, 'analytics.closedTrades.other'),
    },
    emptyEquityCurve: t(locale, 'analytics.empty.equityCurve'),
    emptyJournal: t(locale, 'analytics.empty.journal'),
    openSimulator: t(locale, 'analytics.openSimulator'),
    totalTrades: t(locale, 'analytics.totalTrades'),
    winning: t(locale, 'analytics.winning'),
    losing: t(locale, 'analytics.losing'),
    avgDuration: t(locale, 'analytics.avgDuration'),
    colSymbol: t(locale, 'analytics.col.symbol'),
    colSide: t(locale, 'analytics.col.side'),
    colEntry: t(locale, 'analytics.col.entry'),
    colExit: t(locale, 'analytics.col.exit'),
    colQty: t(locale, 'analytics.col.qty'),
    colPnl: t(locale, 'analytics.col.pnl'),
    colDuration: t(locale, 'analytics.col.duration'),
    colDate: t(locale, 'analytics.col.date'),
    heatmapTitle: t(locale, 'analytics.heatmap.title'),
    heatmapLegend: t(locale, 'analytics.heatmap.legend'),
    heatmapEmpty: t(locale, 'analytics.heatmap.empty'),
    heatmapCell: {
      one: t(locale, 'analytics.heatmap.cell.one'),
      other: t(locale, 'analytics.heatmap.cell.other'),
    },
    heatmapCellEmpty: t(locale, 'analytics.heatmap.cellEmpty'),
    days: [
      t(locale, 'analytics.day.mon'),
      t(locale, 'analytics.day.tue'),
      t(locale, 'analytics.day.wed'),
      t(locale, 'analytics.day.thu'),
      t(locale, 'analytics.day.fri'),
      t(locale, 'analytics.day.sat'),
      t(locale, 'analytics.day.sun'),
    ],
    durationMinutes: t(locale, 'analytics.duration.minutes'),
    durationHours: t(locale, 'analytics.duration.hours'),
    durationHoursMinutes: t(locale, 'analytics.duration.hoursMinutes'),
  };
}
