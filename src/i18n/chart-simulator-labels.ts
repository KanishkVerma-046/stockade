import { t } from './ui';
import type { Locale } from './locales';

// The ChartSimulator `labels` prop for a translated /xx/chart-simulator/ page,
// built from ui.ts. English pages pass nothing and get the island's defaults.
// Island chrome only: the pattern library's names stay English and its prose
// is translated separately (Phase B). Play, pause, step, the new-session title
// and the Chart tab reuse the sim.* keys, and the symbol groups the markets.*
// keys, so each locale says them one way across both simulators.
export function chartSimulatorLabels(locale: Locale) {
  const space = t(locale, 'chart.key.space');
  return {
    libraryTitle: t(locale, 'chart.library.title'),
    libraryShort: t(locale, 'chart.library.short'),
    libraryToggleTitle: t(locale, 'chart.library.toggle'),
    libraryCount: {
      one: t(locale, 'chart.library.count.one'),
      other: t(locale, 'chart.library.count.other'),
    },
    groupBullishReversal: t(locale, 'chart.group.bullishReversal'),
    groupBearishReversal: t(locale, 'chart.group.bearishReversal'),
    groupNeutral: t(locale, 'chart.group.neutral'),
    groupContinuation: t(locale, 'chart.group.continuation'),
    symGroupStocks: t(locale, 'markets.category.stock'),
    symGroupCrypto: t(locale, 'markets.category.crypto'),
    symGroupForex: t(locale, 'markets.category.forex'),
    symGroupFutures: t(locale, 'markets.category.futures'),
    candleCount: {
      one: t(locale, 'chart.candles.one'),
      other: t(locale, 'chart.candles.other'),
    },
    foundOnChart: t(locale, 'chart.found'),
    formation: t(locale, 'chart.info.formation'),
    psychology: t(locale, 'chart.info.psychology'),
    keyRules: t(locale, 'chart.info.keyRules'),
    notGenerated: t(locale, 'chart.info.notGenerated'),
    emptyTitle: t(locale, 'chart.empty.title'),
    emptyBody: t(locale, 'chart.empty.body'),
    goToStartTitle: t(locale, 'chart.control.start'),
    stepBackTitle: `${t(locale, 'chart.control.stepBack')} [←]`,
    playPauseTitle: `${t(locale, 'sim.replay.play')}/${t(locale, 'sim.replay.pause')} [${space}]`,
    stepForwardTitle: `${t(locale, 'sim.replay.step')} [→]`,
    goToEndTitle: t(locale, 'chart.control.end'),
    newChartTitle: t(locale, 'sim.replay.newTitle'),
    tabPatterns: t(locale, 'chart.tab.patterns'),
    tabChart: t(locale, 'sim.tab.chart'),
    tabInfo: t(locale, 'chart.tab.info'),
    detected: t(locale, 'chart.detected'),
    keyHint: `${space} · ← →`,
    hoverOhlcv: t(locale, 'chart.hoverOhlcv'),
    footerPatterns: {
      one: t(locale, 'chart.footer.patterns.one'),
      other: t(locale, 'chart.footer.patterns.other'),
    },
  };
}
