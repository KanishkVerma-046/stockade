## Project

**Stockade** — free live stock & crypto trading simulator. No signup, no backend, all state in localStorage/React state.

- Domain: stockademarketsim.com | Tagline: "Practice the market. Master the game."
- GitHub: https://github.com/KanishkVerma-046/stockade

## Stack

- **Astro 7** (static output) + `@astrojs/react` islands (`client:load`)
- **Tailwind CSS v4** via `@tailwindcss/vite` Vite plugin — NOT `@astrojs/tailwind`; configured in `astro.config.mjs` under `vite.plugins`
- **lightweight-charts v5.2** — uses `chart.addSeries(CandlestickSeries, opts)` API (not the old `addCandlestickSeries()`)
- **nanostores** + `@nanostores/react` for cross-island state

## Pages

| Route | Component | Notes |
|---|---|---|
| `/` | `src/pages/index.astro` | Landing: TickerTape + LiveStats React islands |
| `/simulator` | `TradingSimulator.tsx` | Paper trading, keyboard shortcuts B/S/F |
| `/live` | `LiveSimulator.tsx` | 6 assets, 800ms live ticks |
| `/markets` | `MarketsView.tsx` | 22 assets, filterable/sortable |
| `/analytics` | `AnalyticsDashboard.tsx` | Equity curve, trade journal, heatmap |
| `/leaderboard` | `Leaderboard.tsx` | 15 simulated traders, sortable |
| `/feed` | `TradeFeed.tsx` | Auto-generating feed, 3s interval |

## Design tokens (`src/styles/global.css`)

```
canvas:      #0a0a0a   canvas-soft: #111111   surface: #1e1e1e
border:      #2a2a2a   ink: #f5f5f5           ink-muted: #a1a1a1
amber:       #f59e0b   (primary accent)
green:       #22c55e   (gains / long)
red:         #ef4444   (losses / short)
font-sans:   Inter
font-mono:   JetBrains Mono  ← all prices, tickers, numbers
```

## Chart architecture (`src/components/trading/TradingChart.tsx`)

- `CandlestickSeries` on default right price scale
- `HistogramSeries` pinned to `priceScaleId: 'vol'` (bottom 20%)
- `LineSeries` × 3 for EMA 9 (amber), EMA 20 (blue), EMA 50 (violet)
- Time must be in **seconds** (`UTCTimestamp`), not ms — use `Math.floor(ms / 1000)`
- Symbol switch → `series.setData()`; live tick → `series.update(lastPoint)` only
- `normalize()` deduplicates candles by timestamp to prevent "time must be greater" errors

## Development

`astro dev --background` fails on Windows ("Failed to spawn background dev server process").

**Workaround — build + preview:**
```powershell
npm run build
Start-Job -ScriptBlock { Set-Location "C:\Users\kanis\Desktop\AI Side Hustles\Stockade"; npm run preview }
# Test with:
Invoke-WebRequest http://localhost:4321/simulator -UseBasicParsing
```

Stop preview: `Get-Job | Stop-Job`

## Documentation

Full docs: https://docs.astro.build

- [Routing / pages / middleware](https://docs.astro.build/en/guides/routing/)
- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Framework components (React)](https://docs.astro.build/en/guides/framework-components/)
- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Styling / Tailwind](https://docs.astro.build/en/guides/styling/)
- [i18n](https://docs.astro.build/en/guides/internationalization/)
