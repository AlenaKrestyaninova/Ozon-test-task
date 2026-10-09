import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Запросы фронта на /api/* Vite пересылает на наш Express-сервер — так нет проблем с CORS
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
