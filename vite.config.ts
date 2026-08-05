import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { existsSync } from 'node:fs'

const hasResume = existsSync(path.resolve(__dirname, 'public/curriculo-gabriel-brasil.pdf'))

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  define: {
    __PORTFOLIO_HAS_RESUME__: JSON.stringify(hasResume),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: ['react', 'react-dom'],
  },
  build: {
    sourcemap: false,
  },
  server: {
    host: '0.0.0.0',
    port: Number(process.env.PORT || 8443),
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port: Number(process.env.PORT || 8443),
  },
})
