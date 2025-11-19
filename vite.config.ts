import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: '/', // Untuk deployment
  server: {
    host: '0.0.0.0', // Allow external connections
    port: 5173, // Default Vite port
    proxy: {
      '/api': {
        target: 'https://62f8bbc66050.ngrok-free.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api/1.0/json'),
      },
    },
  },
})
