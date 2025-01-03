import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://20.102.104.104:8080', // Dirección del backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // Elimina '/api' de la URL
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
