import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: 'https://alannicolasflores.github.io/gestionrecetascliente/', // Base URL para GitHub Pages
  build: {
    sourcemap: true, // Habilitar source maps para depuración
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://20.102.104.104:8080', // Dirección del backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Reescribe la URL si es necesario
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias para la carpeta src
    },
  },
});