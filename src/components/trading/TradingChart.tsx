import { useEffect, useRef, useState } from 'react';
import {
  createChart,
  CandlestickSeries,
  HistogramSeries,
  LineSeries,
  type IChartApi,
  type ISeriesApi,
  type CandlestickData,
  type HistogramData,
  type LineData,
  type UTCTimestamp,
} from 'lightweight-charts';

export interface Candle {
  time: number; // ms
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface Props {
  candles: Candle[];
  symbol: string;
  entryPrice?: number | null;
  positionSide?: 'long' | 'short' | null;
  stopLoss?: number | null;
  takeProfit?: number | null;
}

const EMA_CONFIGS = [
  { period: 9,  color: '#f59e0b', label: 'EMA 9'  },
  { period: 20, color: '#3b82f6', label: 'EMA 20' },
  { period: 50, color: '#8b5cf6', label: 'EMA 50' },
] as const;

type EmaPeriod = typeof EMA_CONFIGS[number]['period'];

function toSecs(ms: number): UTCTimestamp {
  return Math.floor(ms / 1000) as UTCTimestamp;
}

function normalize(candles: Candle[]): Candle[] {
  const map = new Map<number, Candle>();
  for (const c of candles) map.set(toSecs(c.time), c);
  return Array.from(map.values()).sort((a, b) => a.time - b.time);
}

function toCandleBar(c: Candle): CandlestickData {
  return { time: toSecs(c.time), open: c.open, high: c.high, low: c.low, close: c.close };
}

function toVolBar(c: Candle): HistogramData {
  return {
    time: toSecs(c.time),
    value: c.volume,
    color: c.close >= c.open ? '#22c55e28' : '#ef444428',
  };
}

function calcEMA(candles: Candle[], period: number): LineData[] {
  if (candles.length < period) return [];
  const k = 2 / (period + 1);
  let ema = candles.slice(0, period).reduce((s, c) => s + c.close, 0) / period;
  const out: LineData[] = [{ time: toSecs(candles[period - 1].time), value: ema }];
  for (let i = period; i < candles.length; i++) {
    ema = candles[i].close * k + ema * (1 - k);
    out.push({ time: toSecs(candles[i].time), value: ema });
  }
  return out;
}

function useIsDark() {
  const [isDark, setIsDark] = useState(() =>
    typeof document !== 'undefined'
      ? !document.documentElement.classList.contains('light')
      : true
  );
  useEffect(() => {
    const obs = new MutationObserver(() => {
      setIsDark(!document.documentElement.classList.contains('light'));
    });
    obs.observe(document.documentElement, { attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);
  return isDark;
}

function chartColors(isDark: boolean) {
  return {
    bg:        isDark ? '#0d0d0d' : '#f4f5f7',
    text:      isDark ? '#666666' : '#888888',
    grid:      isDark ? '#1a1a1a' : '#e4e6eb',
    crosshair: isDark ? '#3a3a3a' : '#b0b4bb',
    border:    isDark ? '#2a2a2a' : '#d0d3d8',
  };
}

export default function TradingChart({ candles, symbol, entryPrice, positionSide, stopLoss, takeProfit }: Props) {
  const containerRef  = useRef<HTMLDivElement>(null);
  const chartRef      = useRef<IChartApi | null>(null);
  const candleRef     = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const volumeRef     = useRef<ISeriesApi<'Histogram'> | null>(null);
  const emaRefs       = useRef<Partial<Record<EmaPeriod, ISeriesApi<'Line'>>>>({});
  const symbolRef     = useRef(symbol);
  const entryLineRef  = useRef<ReturnType<ISeriesApi<'Candlestick'>['createPriceLine']> | null>(null);
  const slLineRef     = useRef<ReturnType<ISeriesApi<'Candlestick'>['createPriceLine']> | null>(null);
  const tpLineRef     = useRef<ReturnType<ISeriesApi<'Candlestick'>['createPriceLine']> | null>(null);
  const prevEmaRef    = useRef<Partial<Record<EmaPeriod, number>>>({});

  const [emaVisible, setEmaVisible] = useState<Record<EmaPeriod, boolean>>({ 9: true, 20: true, 50: false });

  const isDark = useIsDark();

  // ── Mount: create chart ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current) return;
    const col = chartColors(isDark);

    const chart = createChart(containerRef.current, {
      layout: {
        background:  { color: col.bg },
        textColor:   col.text,
        fontFamily:  "'JetBrains Mono', monospace",
        fontSize:    11,
      },
      grid: {
        vertLines: { color: col.grid },
        horzLines: { color: col.grid },
      },
      crosshair: {
        vertLine: { color: col.crosshair, width: 1, style: 1 },
        horzLine: { color: col.crosshair, width: 1, style: 1 },
      },
      rightPriceScale: {
        borderColor: col.border,
        textColor:   col.text,
        scaleMargins: { top: 0.08, bottom: 0.22 },
      },
      timeScale: {
        borderColor:     col.border,
        timeVisible:     true,
        secondsVisible:  false,
        rightOffset:     8,
      },
      handleScroll: true,
      handleScale:  true,
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor:      '#22c55e',
      downColor:    '#ef4444',
      borderVisible: false,
      wickUpColor:   '#22c55e',
      wickDownColor: '#ef4444',
    });

    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceFormat:  { type: 'volume' },
      priceScaleId: 'vol',
    });
    chart.priceScale('vol').applyOptions({
      scaleMargins: { top: 0.82, bottom: 0 },
    });

    const emaMap: Partial<Record<EmaPeriod, ISeriesApi<'Line'>>> = {};
    for (const cfg of EMA_CONFIGS) {
      const s = chart.addSeries(LineSeries, {
        color:                  cfg.color,
        lineWidth:              1,
        priceLineVisible:       false,
        lastValueVisible:       false,
        crosshairMarkerVisible: false,
        visible:                emaVisible[cfg.period],
      });
      emaMap[cfg.period] = s;
    }

    chartRef.current  = chart;
    candleRef.current = candleSeries;
    volumeRef.current = volumeSeries;
    emaRefs.current   = emaMap;

    const norm = normalize(candles);
    candleSeries.setData(norm.map(toCandleBar));
    volumeSeries.setData(norm.map(toVolBar));
    for (const cfg of EMA_CONFIGS) {
      const emaData = calcEMA(norm, cfg.period);
      emaMap[cfg.period]?.setData(emaData);
      if (emaData.length >= 2) {
        prevEmaRef.current[cfg.period] = (emaData[emaData.length - 2] as LineData & { value: number }).value;
      }
    }
    chart.timeScale().fitContent();

    const ro = new ResizeObserver(() => {
      if (containerRef.current) {
        chart.applyOptions({
          width:  containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    });
    ro.observe(containerRef.current);

    return () => {
      ro.disconnect();
      chart.remove();
      chartRef.current  = null;
      candleRef.current = null;
      volumeRef.current = null;
      emaRefs.current   = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Theme changes: update chart colors ────────────────────────────────────────
  useEffect(() => {
    if (!chartRef.current) return;
    const col = chartColors(isDark);
    chartRef.current.applyOptions({
      layout:  { background: { color: col.bg }, textColor: col.text },
      grid:    { vertLines: { color: col.grid }, horzLines: { color: col.grid } },
      crosshair: { vertLine: { color: col.crosshair }, horzLine: { color: col.crosshair } },
      rightPriceScale: { borderColor: col.border, textColor: col.text },
      timeScale: { borderColor: col.border },
    });
  }, [isDark]);

  // ── Data updates (ticks + symbol changes) ─────────────────────────────────────
  useEffect(() => {
    if (!candleRef.current || !volumeRef.current || candles.length === 0) return;

    const norm = normalize(candles);
    const last = norm[norm.length - 1];

    if (symbol !== symbolRef.current) {
      symbolRef.current = symbol;
      candleRef.current.setData(norm.map(toCandleBar));
      volumeRef.current.setData(norm.map(toVolBar));
      for (const cfg of EMA_CONFIGS) {
        const emaData = calcEMA(norm, cfg.period);
        emaRefs.current[cfg.period]?.setData(emaData);
        if (emaData.length >= 2) {
          prevEmaRef.current[cfg.period] = (emaData[emaData.length - 2] as LineData & { value: number }).value;
        }
      }
      chartRef.current?.timeScale().fitContent();
      if (entryLineRef.current) {
        try { candleRef.current.removePriceLine(entryLineRef.current); } catch {}
        entryLineRef.current = null;
      }
    } else {
      candleRef.current.update(toCandleBar(last));
      volumeRef.current.update(toVolBar(last));
      for (const cfg of EMA_CONFIGS) {
        const series = emaRefs.current[cfg.period];
        if (!series) continue;
        const k       = 2 / (cfg.period + 1);
        const prevEma = prevEmaRef.current[cfg.period];
        if (prevEma === undefined) continue;
        const newEma = last.close * k + prevEma * (1 - k);
        series.update({ time: toSecs(last.time), value: newEma });
      }
    }
  }, [candles, symbol]);

  // Track prevEmaRef on new candle
  useEffect(() => {
    if (candles.length < 2) return;
    const norm = normalize(candles);
    if (norm.length < 2) return;
    const secondLast = norm[norm.length - 2];
    for (const cfg of EMA_CONFIGS) {
      if (norm.length - 1 < cfg.period) continue;
      const k   = 2 / (cfg.period + 1);
      const prev = prevEmaRef.current[cfg.period];
      if (prev === undefined) continue;
      prevEmaRef.current[cfg.period] = secondLast.close * k + prev * (1 - k);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candles.length]);

  // EMA visibility
  useEffect(() => {
    for (const cfg of EMA_CONFIGS) {
      emaRefs.current[cfg.period]?.applyOptions({ visible: emaVisible[cfg.period] });
    }
  }, [emaVisible]);

  // ── Entry price line ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!candleRef.current) return;
    if (entryLineRef.current) {
      try { candleRef.current.removePriceLine(entryLineRef.current); } catch {}
      entryLineRef.current = null;
    }
    if (entryPrice && positionSide) {
      entryLineRef.current = candleRef.current.createPriceLine({
        price: entryPrice,
        color: positionSide === 'long' ? '#22c55e' : '#ef4444',
        lineWidth: 1,
        lineStyle: 2,
        axisLabelVisible: true,
        title: positionSide === 'long' ? '▲ LONG' : '▼ SHORT',
      });
    }
  }, [entryPrice, positionSide]);

  // ── Stop-loss line ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!candleRef.current) return;
    if (slLineRef.current) {
      try { candleRef.current.removePriceLine(slLineRef.current); } catch {}
      slLineRef.current = null;
    }
    if (stopLoss && stopLoss > 0) {
      slLineRef.current = candleRef.current.createPriceLine({
        price: stopLoss,
        color: '#ef4444',
        lineWidth: 1,
        lineStyle: 3,
        axisLabelVisible: true,
        title: '✕ SL',
      });
    }
  }, [stopLoss]);

  // ── Take-profit line ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!candleRef.current) return;
    if (tpLineRef.current) {
      try { candleRef.current.removePriceLine(tpLineRef.current); } catch {}
      tpLineRef.current = null;
    }
    if (takeProfit && takeProfit > 0) {
      tpLineRef.current = candleRef.current.createPriceLine({
        price: takeProfit,
        color: '#22c55e',
        lineWidth: 1,
        lineStyle: 3,
        axisLabelVisible: true,
        title: '✓ TP',
      });
    }
  }, [takeProfit]);

  function toggleEma(period: EmaPeriod) {
    setEmaVisible(prev => ({ ...prev, [period]: !prev[period] }));
  }

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />

      {/* EMA legend / toggles */}
      <div className="absolute top-2 right-2 flex items-center gap-1 z-10 pointer-events-auto">
        {EMA_CONFIGS.map(cfg => {
          const on = emaVisible[cfg.period];
          return (
            <button
              key={cfg.period}
              onClick={() => toggleEma(cfg.period)}
              title={on ? `Hide ${cfg.label}` : `Show ${cfg.label}`}
              className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono border transition-all"
              style={{
                borderColor:     cfg.color,
                color:           on ? cfg.color : 'var(--c-text-faint)',
                backgroundColor: on ? `${cfg.color}14` : 'transparent',
              }}
            >
              <span
                className="inline-block w-3 h-0.5 rounded-full"
                style={{ backgroundColor: on ? cfg.color : 'var(--c-text-faint)' }}
              />
              {cfg.label}
            </button>
          );
        })}
        <span className="text-[9px] font-mono text-[var(--c-text-fainter)] ml-1 select-none">VOL ✓</span>
      </div>
    </div>
  );
}
