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

function calcVWAP(candles: Candle[]): LineData[] {
  let tpv = 0, vol = 0;
  return candles.map(c => {
    const tp = (c.high + c.low + c.close) / 3;
    tpv += tp * c.volume;
    vol += c.volume;
    return { time: toSecs(c.time), value: vol > 0 ? tpv / vol : tp };
  });
}

function calcRSI(candles: Candle[], period = 14): LineData[] {
  if (candles.length < period + 1) return [];
  const changes = candles.slice(1).map((c, i) => c.close - candles[i].close);
  let avgGain = changes.slice(0, period).reduce((s, v) => s + Math.max(v, 0), 0) / period;
  let avgLoss = changes.slice(0, period).reduce((s, v) => s + Math.max(-v, 0), 0) / period;
  const out: LineData[] = [];
  for (let i = period; i < changes.length; i++) {
    avgGain = (avgGain * (period - 1) + Math.max(changes[i], 0)) / period;
    avgLoss = (avgLoss * (period - 1) + Math.max(-changes[i], 0)) / period;
    const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
    out.push({ time: toSecs(candles[i + 1].time), value: 100 - 100 / (1 + rs) });
  }
  return out;
}

function emaArr(values: number[], period: number): number[] {
  if (values.length < period) return [];
  const k = 2 / (period + 1);
  let ema = values.slice(0, period).reduce((a, b) => a + b, 0) / period;
  const out = [ema];
  for (let i = period; i < values.length; i++) { ema = values[i] * k + ema * (1 - k); out.push(ema); }
  return out;
}

function calcMACD(candles: Candle[]): { macd: LineData[]; signal: LineData[]; hist: HistogramData[] } {
  if (candles.length < 35) return { macd: [], signal: [], hist: [] };
  const closes  = candles.map(c => c.close);
  const ema12   = emaArr(closes, 12);
  const ema26   = emaArr(closes, 26);
  const offset  = ema12.length - ema26.length; // 14
  const macdNums = ema26.map((e26, i) => ema12[offset + i] - e26);
  const sigNums  = emaArr(macdNums, 9);
  const ms = 25, ss = ms + 8;
  const macd   = macdNums.map((v, i) => ({ time: toSecs(candles[ms + i].time), value: v })) as LineData[];
  const signal = sigNums.map((v, i)  => ({ time: toSecs(candles[ss + i].time), value: v })) as LineData[];
  const hist   = sigNums.map((sig, i) => {
    const diff = macdNums[8 + i] - sig;
    return { time: toSecs(candles[ss + i].time), value: diff, color: diff >= 0 ? '#22c55e60' : '#ef444460' } as HistogramData;
  });
  return { macd, signal, hist };
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

  const [emaVisible,       setEmaVisible]       = useState<Record<EmaPeriod, boolean>>({ 9: true, 20: true, 50: false });
  const [showVWAP,         setShowVWAP]         = useState(false);
  const [bottomIndicator,  setBottomIndicator]  = useState<'vol' | 'rsi' | 'macd'>('vol');

  const vwapRef     = useRef<ISeriesApi<'Line'> | null>(null);
  const rsiRef      = useRef<ISeriesApi<'Line'> | null>(null);
  const macdLineRef = useRef<ISeriesApi<'Line'> | null>(null);
  const macdSigRef  = useRef<ISeriesApi<'Line'> | null>(null);
  const macdHistRef = useRef<ISeriesApi<'Histogram'> | null>(null);

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
        attributionLogo: false,
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

    const vwapSeries = chart.addSeries(LineSeries, {
      color: '#e879f9', lineWidth: 1, lineStyle: 2,
      priceLineVisible: false, lastValueVisible: false, crosshairMarkerVisible: false, visible: false,
    });
    const rsiSeries = chart.addSeries(LineSeries, {
      color: '#f59e0b', lineWidth: 1, priceScaleId: 'vol',
      priceLineVisible: false, lastValueVisible: true, crosshairMarkerVisible: false, visible: false,
    });
    const macdLineSeries = chart.addSeries(LineSeries, {
      color: '#3b82f6', lineWidth: 1, priceScaleId: 'vol',
      priceLineVisible: false, lastValueVisible: false, crosshairMarkerVisible: false, visible: false,
    });
    const macdSigSeries = chart.addSeries(LineSeries, {
      color: '#f59e0b', lineWidth: 1, priceScaleId: 'vol',
      priceLineVisible: false, lastValueVisible: false, crosshairMarkerVisible: false, visible: false,
    });
    const macdHistSeries = chart.addSeries(HistogramSeries, { priceScaleId: 'vol', visible: false });

    chartRef.current  = chart;
    candleRef.current = candleSeries;
    volumeRef.current = volumeSeries;
    emaRefs.current   = emaMap;
    vwapRef.current     = vwapSeries;
    rsiRef.current      = rsiSeries;
    macdLineRef.current = macdLineSeries;
    macdSigRef.current  = macdSigSeries;
    macdHistRef.current = macdHistSeries;

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
    vwapSeries.setData(calcVWAP(norm));
    rsiSeries.setData(calcRSI(norm));
    rsiSeries.createPriceLine({ price: 70, color: '#ef444450', lineWidth: 1, lineStyle: 2, axisLabelVisible: false, title: '' });
    rsiSeries.createPriceLine({ price: 30, color: '#22c55e50', lineWidth: 1, lineStyle: 2, axisLabelVisible: false, title: '' });
    const { macd: macd0, signal: signal0, hist: hist0 } = calcMACD(norm);
    macdLineSeries.setData(macd0);
    macdSigSeries.setData(signal0);
    macdHistSeries.setData(hist0);
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
      vwapRef.current     = null;
      rsiRef.current      = null;
      macdLineRef.current = null;
      macdSigRef.current  = null;
      macdHistRef.current = null;
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
    // VWAP / RSI / MACD — recompute from full normalised set
    vwapRef.current?.setData(calcVWAP(norm));
    rsiRef.current?.setData(calcRSI(norm));
    const { macd, signal, hist } = calcMACD(norm);
    macdLineRef.current?.setData(macd);
    macdSigRef.current?.setData(signal);
    macdHistRef.current?.setData(hist);
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

  // VWAP visibility
  useEffect(() => {
    vwapRef.current?.applyOptions({ visible: showVWAP });
  }, [showVWAP]);

  // Bottom indicator visibility
  useEffect(() => {
    volumeRef.current?.applyOptions({ visible: bottomIndicator === 'vol' });
    rsiRef.current?.applyOptions({ visible: bottomIndicator === 'rsi' });
    const macdOn = bottomIndicator === 'macd';
    macdLineRef.current?.applyOptions({ visible: macdOn });
    macdSigRef.current?.applyOptions({ visible: macdOn });
    macdHistRef.current?.applyOptions({ visible: macdOn });
  }, [bottomIndicator]);

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

      {/* Indicator toggles */}
      <div className="absolute top-2 right-[68px] flex flex-col items-end gap-1 z-10 pointer-events-auto">
        <div className="flex items-center gap-1">
          {EMA_CONFIGS.map(cfg => {
            const on = emaVisible[cfg.period];
            return (
              <button key={cfg.period} onClick={() => toggleEma(cfg.period)}
                title={on ? `Hide ${cfg.label}` : `Show ${cfg.label}`}
                className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono border transition-all"
                style={{ borderColor: cfg.color, color: on ? cfg.color : 'var(--c-text-faint)', backgroundColor: on ? `${cfg.color}14` : 'transparent' }}>
                <span className="inline-block w-3 h-0.5 rounded-full" style={{ backgroundColor: on ? cfg.color : 'var(--c-text-faint)' }} />
                {cfg.label}
              </button>
            );
          })}
          <button onClick={() => setShowVWAP(v => !v)}
            className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono border transition-all"
            style={{ borderColor: '#e879f9', color: showVWAP ? '#e879f9' : 'var(--c-text-faint)', backgroundColor: showVWAP ? '#e879f914' : 'transparent' }}>
            <span className="inline-block w-3 h-0.5 rounded-full" style={{ backgroundColor: showVWAP ? '#e879f9' : 'var(--c-text-faint)' }} />
            VWAP
          </button>
        </div>
        <div className="flex items-center gap-1">
          {(['vol', 'rsi', 'macd'] as const).map(ind => (
            <button key={ind} onClick={() => setBottomIndicator(ind)}
              className={`px-1.5 py-0.5 rounded text-[10px] font-mono uppercase transition-all border ${
                bottomIndicator === ind
                  ? 'border-[var(--c-border-strong)] text-[var(--c-text)] bg-[var(--c-surface-2)]'
                  : 'border-transparent text-[var(--c-text-faint)] hover:text-[var(--c-text-muted)]'
              }`}>
              {ind}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
