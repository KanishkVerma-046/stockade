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
}

// ── EMA config ────────────────────────────────────────────────────────────────

const EMA_CONFIGS = [
  { period: 9,  color: '#f59e0b', label: 'EMA 9'  },
  { period: 20, color: '#3b82f6', label: 'EMA 20' },
  { period: 50, color: '#8b5cf6', label: 'EMA 50' },
] as const;

type EmaPeriod = typeof EMA_CONFIGS[number]['period'];

// ── Pure helpers ──────────────────────────────────────────────────────────────

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

/**
 * Compute EMA for a normalized candle array.
 * Seeds with a simple average over the first `period` closes, then applies
 * the standard EMA multiplier k = 2 / (period + 1).
 * Returns an empty array when there aren't enough candles.
 */
function calcEMA(candles: Candle[], period: number): LineData[] {
  if (candles.length < period) return [];
  const k = 2 / (period + 1);
  // Seed: SMA of first `period` closes
  let ema = candles.slice(0, period).reduce((s, c) => s + c.close, 0) / period;
  const out: LineData[] = [{ time: toSecs(candles[period - 1].time), value: ema }];
  for (let i = period; i < candles.length; i++) {
    ema = candles[i].close * k + ema * (1 - k);
    out.push({ time: toSecs(candles[i].time), value: ema });
  }
  return out;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function TradingChart({ candles, symbol, entryPrice, positionSide }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef     = useRef<IChartApi | null>(null);
  const candleRef    = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const volumeRef    = useRef<ISeriesApi<'Histogram'> | null>(null);
  const emaRefs      = useRef<Partial<Record<EmaPeriod, ISeriesApi<'Line'>>>>({});
  const symbolRef    = useRef(symbol);
  const entryLineRef = useRef<ReturnType<ISeriesApi<'Candlestick'>['createPriceLine']> | null>(null);
  // Track the last-known stable EMA values (second-to-last candle) so we can
  // do cheap `series.update` calls on ticks without full setData every 800 ms.
  const prevEmaRef   = useRef<Partial<Record<EmaPeriod, number>>>({});

  const [emaVisible, setEmaVisible] = useState<Record<EmaPeriod, boolean>>({ 9: true, 20: true, 50: false });

  // ── Mount: create chart + series ──────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      layout: {
        background: { color: '#0d0d0d' },
        textColor: '#666666',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
      },
      grid: {
        vertLines: { color: '#1a1a1a' },
        horzLines: { color: '#1a1a1a' },
      },
      crosshair: {
        vertLine: { color: '#3a3a3a', width: 1, style: 1 },
        horzLine: { color: '#3a3a3a', width: 1, style: 1 },
      },
      rightPriceScale: {
        borderColor: '#2a2a2a',
        textColor: '#666666',
        // Bottom margin reserves space for the volume histogram pane
        scaleMargins: { top: 0.08, bottom: 0.22 },
      },
      timeScale: {
        borderColor: '#2a2a2a',
        timeVisible: true,
        secondsVisible: false,
        rightOffset: 8,
      },
      handleScroll: true,
      handleScale: true,
    });

    // ── Candlestick series ──
    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor:      '#22c55e',
      downColor:    '#ef4444',
      borderVisible: false,
      wickUpColor:   '#22c55e',
      wickDownColor: '#ef4444',
    });

    // ── Volume histogram (bottom 20%) ──
    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceFormat:  { type: 'volume' },
      priceScaleId: 'vol',
    });
    chart.priceScale('vol').applyOptions({
      scaleMargins: { top: 0.82, bottom: 0 },
    });

    // ── EMA line series ──
    const emaMap: Partial<Record<EmaPeriod, ISeriesApi<'Line'>>> = {};
    for (const cfg of EMA_CONFIGS) {
      const s = chart.addSeries(LineSeries, {
        color:       cfg.color,
        lineWidth:   1,
        priceLineVisible: false,
        lastValueVisible: false,
        crosshairMarkerVisible: false,
        visible: emaVisible[cfg.period],
      });
      emaMap[cfg.period] = s;
    }

    // Store refs
    chartRef.current  = chart;
    candleRef.current = candleSeries;
    volumeRef.current = volumeSeries;
    emaRefs.current   = emaMap;

    // Initial data load
    const norm = normalize(candles);
    candleSeries.setData(norm.map(toCandleBar));
    volumeSeries.setData(norm.map(toVolBar));
    for (const cfg of EMA_CONFIGS) {
      const emaData = calcEMA(norm, cfg.period);
      emaMap[cfg.period]?.setData(emaData);
      // Seed prevEmaRef with second-to-last computed EMA value
      if (emaData.length >= 2) {
        prevEmaRef.current[cfg.period] = (emaData[emaData.length - 2] as LineData & { value: number }).value;
      }
    }
    chart.timeScale().fitContent();

    // ResizeObserver — keeps chart filling its container
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

  // ── Data updates (ticks + symbol changes) ─────────────────────────────────────
  useEffect(() => {
    if (!candleRef.current || !volumeRef.current || candles.length === 0) return;

    const norm = normalize(candles);
    const last = norm[norm.length - 1];

    if (symbol !== symbolRef.current) {
      // ── Full reload on symbol switch ──
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
      // ── Tick update — cheap path ──
      candleRef.current.update(toCandleBar(last));
      volumeRef.current.update(toVolBar(last));

      // Update EMA last point only.
      // When norm.length grew (new candle opened), promote the previous last EMA
      // to prevEmaRef so subsequent ticks compute against the stable base.
      const isNewCandle = norm.length > (emaRefs.current[9] ? 1 : 0); // rough heuristic
      for (const cfg of EMA_CONFIGS) {
        const series = emaRefs.current[cfg.period];
        if (!series) continue;
        const k       = 2 / (cfg.period + 1);
        const prevEma = prevEmaRef.current[cfg.period];
        if (prevEma === undefined) continue;
        const newEma  = last.close * k + prevEma * (1 - k);
        series.update({ time: toSecs(last.time), value: newEma });
      }
    }
  }, [candles, symbol]);

  // Track prevEmaRef whenever a new (completed) candle appears.
  // We compare the second-to-last candle's EMA against what we stored.
  useEffect(() => {
    if (candles.length < 2) return;
    const norm = normalize(candles);
    if (norm.length < 2) return;
    const secondLast = norm[norm.length - 2];
    for (const cfg of EMA_CONFIGS) {
      // Recalculate the EMA at the second-to-last position
      if (norm.length - 1 < cfg.period) continue;
      const k   = 2 / (cfg.period + 1);
      const prev = prevEmaRef.current[cfg.period];
      if (prev === undefined) continue;
      prevEmaRef.current[cfg.period] = secondLast.close * k + prev * (1 - k);
    }
  // This effect intentionally only fires when the candle array length changes
  // (new candle opened), not on every tick. We approximate that with candles.length.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candles.length]);

  // ── EMA visibility toggles ────────────────────────────────────────────────────
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

  // ── Toggle handler ────────────────────────────────────────────────────────────
  function toggleEma(period: EmaPeriod) {
    setEmaVisible(prev => ({ ...prev, [period]: !prev[period] }));
  }

  return (
    <div className="relative w-full h-full">
      {/* Chart canvas */}
      <div ref={containerRef} className="w-full h-full" />

      {/* EMA legend / toggles — top-right overlay */}
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
                borderColor: cfg.color,
                color:       on ? cfg.color : '#444444',
                backgroundColor: on ? `${cfg.color}14` : 'transparent',
              }}
            >
              <span
                className="inline-block w-3 h-0.5 rounded-full"
                style={{ backgroundColor: on ? cfg.color : '#444444' }}
              />
              {cfg.label}
            </button>
          );
        })}
        <span className="text-[9px] font-mono text-[#333333] ml-1 select-none">VOL ✓</span>
      </div>
    </div>
  );
}
