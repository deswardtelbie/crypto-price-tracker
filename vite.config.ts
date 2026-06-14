import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // Served from a sub-path on GitHub Pages in production, root in dev.
  // Keyed off mode (not command) so `vite preview` also uses the base path.
  base: mode === 'production' ? '/crypto-price-tracker/' : '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Crypto Price Tracker',
        short_name: 'Crypto Tracker',
        description: 'Live cryptocurrency prices, charts and market data.',
        theme_color: '#0e1117',
        background_color: '#0e1117',
        display: 'standalone',
        icons: [
          { src: 'favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
        ],
      },
    }),
  ],
}))
