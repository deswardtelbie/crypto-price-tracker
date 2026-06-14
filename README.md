# Crypto Price Tracker

A live cryptocurrency price tracker built with React + TypeScript. Browse the top
coins by market cap, drill into any coin for detailed stats and historical price
charts, and switch the display currency on the fly. Prices default to **ZAR**.

Market data is provided by the free [CoinGecko public API](https://www.coingecko.com/en/api)
(no API key required).

## Features

- **Dashboard** — top cryptocurrencies ranked by market cap, with current price and
  24h change. New rows load automatically as you scroll (infinite scroll).
- **Coin details** — price, market cap, 24h volume, 24h high/low, all-time high/low,
  circulating / total / max supply and market-cap rank.
- **Historical price chart** — selectable range (24H / 7D / 30D / 1Y).
- **Currency selector** — ZAR (default), USD, EUR, GBP, BTC and ETH. All prices and
  charts re-denominate instantly.
- **Cached & fast** — RTK Query caches API responses, so navigating between pages and
  switching currencies avoids redundant network calls.
- **Installable PWA** — works offline (app shell) and can be added to a home screen.
- **Responsive** — adapts from mobile to desktop.

## Tech stack

- **React 19** + **TypeScript**
- **Vite 8** (build tooling / dev server)
- **Redux Toolkit** + **RTK Query** (state + data fetching/caching)
- **MUI 9** (component library, dark theme)
- **React Router 7** (routing)
- **Recharts** (price charts)
- **vite-plugin-pwa** (service worker + web app manifest)

## Prerequisites

- **Node.js 22+** is required. The build runs on Vite 8, which needs Node 20.19+ /
  22.12+ — **Node 18 will fail the build**. If you use [nvm](https://github.com/nvm-sh/nvm):

  ```bash
  nvm use 22
  ```

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev
```

That's it — no environment variables or API keys are needed.

## Available scripts

| Script            | Description                                              |
| ----------------- | -------------------------------------------------------- |
| `npm run dev`     | Start the Vite dev server with hot-module reload.        |
| `npm run build`   | Type-check (`tsc -b`) and build for production to `dist/`. |
| `npm run preview` | Serve the production build locally (verifies the PWA).   |
| `npm run lint`    | Run ESLint over the project.                             |

## Project structure

```
src/
  app/                 # Redux store + typed hooks
  components/          # Shared UI (app layout, currency selector)
  features/
    coins/             # CoinGecko RTK Query API, table, chart, types
    currency/          # Selected-currency slice
  lib/                 # Price formatting + supported-currency definitions
  pages/               # Dashboard and Coin details routes
  theme/               # MUI dark theme
```

## Notes

- **Rate limits** — the CoinGecko free tier is rate-limited. If a request is throttled
  the UI shows a retry prompt; wait a moment and try again.
- **Currency persistence** — the selected currency is saved to `localStorage`, so it
  survives reloads.
</content>
</invoke>
