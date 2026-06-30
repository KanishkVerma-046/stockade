# Stockade

**Practice the market. Master the game.**

Stockade is a free, browser-based trading simulator with no signup, no backend, and no real money. Start with $100,000 in virtual capital and trade 29 simulated assets across stocks, crypto, forex, and futures — all from your browser.

**Live site:** [stockademarketsim.com](https://stockademarketsim.com)

---

## Features

- **Trading Simulator** — Paper trade with market, limit, stop-loss, take-profit, and OCO bracket orders. Keyboard shortcuts: `B` buy, `S` sell, `F` flatten.
- **Live Simulator** — 6 assets streaming at 800ms ticks for day-trading practice.
- **Chart Simulator** — 24 candlestick patterns with interactive detection and SVG diagrams.
- **Markets** — 29 assets across 4 classes, filterable and sortable.
- **Analytics Dashboard** — Equity curve, trade journal, win rate, profit factor, drawdown, and time-of-day heatmap.
- **Candlestick charts** — CandlestickSeries + volume histogram + EMA 9/20/50, VWAP, RSI, MACD via lightweight-charts v5.
- **Zero persistence required** — All state lives in `localStorage` and React state. No account, no server.

## Asset coverage

| Class | Count | Notes |
|---|---|---|
| Stocks | 14 | Fictional tickers (APXL, NVOX, MXFT, …) |
| Crypto | 8 | Fictional tokens (BLTC, ETHX, SLAX, …) |
| Forex | 3 | EUR/USD, GBP/USD, USD/JPY |
| Futures | 4 | /ES, /NQ, /CL, /GC |

All tickers are simulated and do not represent real tradable instruments.

## Tech stack

| Layer | Library |
|---|---|
| Framework | [Astro 7](https://astro.build) (static output) + `@astrojs/react` islands |
| UI components | React 19 (`client:load` islands) |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` (configured in `astro.config.mjs`) |
| Charts | [lightweight-charts 5.2](https://github.com/tradingview/lightweight-charts) |
| Cross-island state | [nanostores](https://github.com/nanostores/nanostores) + `@nanostores/react` |
| Deployment | Cloudflare Pages via Wrangler |

## Project structure

```
src/
├── components/
│   ├── analytics/      AnalyticsDashboard.tsx
│   ├── chartsimulator/ ChartSimulator.tsx
│   ├── landing/        TickerTape.tsx, LiveStats.tsx
│   ├── layout/         Navbar.astro, Footer.astro
│   ├── markets/        MarketsView.tsx
│   └── trading/        TradingSimulator.tsx, LiveSimulator.tsx, TradingChart.tsx
├── layouts/
│   ├── Layout.astro    (marketing pages)
│   └── AppLayout.astro (app pages — compact nav, bottom ticker tape)
├── pages/
│   ├── index.astro
│   ├── simulator.astro
│   ├── live.astro
│   ├── chart-simulator.astro
│   ├── markets.astro
│   ├── analytics.astro
│   ├── about.astro
│   ├── contact.astro
│   ├── privacy.astro
│   ├── terms.astro
│   └── disclaimer.astro
├── stores/
│   └── priceStore.ts   (nanostores atom for cross-island price sync)
└── styles/
    └── global.css      (design tokens, Tailwind base)
```

## Getting started

**Requirements:** Node.js >= 22.12

```bash
npm install
npm run dev      # dev server at http://localhost:4321
npm run build    # production build → ./dist/
npm run preview  # preview the production build locally
```

### Windows note

`astro dev` may fail to bind correctly in some Windows terminal environments. If you hit issues, use the build + preview workflow instead:

```powershell
npm run build
Start-Job -ScriptBlock { Set-Location "<path-to-repo>"; npm run preview }
# Stop with: Get-Job | Stop-Job
```

## Deployment

The site deploys to [Cloudflare Pages](https://pages.cloudflare.com). A `wrangler.toml` is included.

**Live URL:** https://stockade.pages.dev

```bash
npm run deploy   # builds and deploys to Cloudflare Pages
```

## Design tokens

Defined in `src/styles/global.css`:

| Token | Value | Usage |
|---|---|---|
| `--c-bg` | `#0a0a0a` | Page background |
| `--c-surface` | `#1e1e1e` | Cards, panels |
| `--c-border` | `#2a2a2a` | Borders |
| `--c-text` | `#f5f5f5` | Primary text |
| `--c-text-muted` | `#a1a1a1` | Secondary text |
| `#f59e0b` | amber | Primary accent |
| `#22c55e` | green | Gains / long |
| `#ef4444` | red | Losses / short |

Fonts: **Inter** (UI) · **JetBrains Mono** (prices, tickers, numbers)

## License

MIT
