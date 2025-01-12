import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: 'https://alannicolasflores.github.io/gestionrecetascliente/', // Base URL para GitHub Pages
  server: {
    proxy: {
      '/api': {
        target: 'http://20.102.104.104:8080', // Dirección del backend
        changeOrigin: true,
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
