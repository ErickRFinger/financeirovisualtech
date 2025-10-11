import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Financeiro Visual Tech',
        short_name: 'Financeiro VT',
        description: 'Aplicativo de controle financeiro da Visual Tech.',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'LOGOS/VISUAL TECH.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'LOGOS/VISUAL TECH.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
