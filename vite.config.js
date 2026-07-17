import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode === 'production' ? 'production' : 'development'),
  },
  build: {
    // IIFE 格式，自动执行，适合 script 标签直接引入
    lib: {
      entry: 'src/main.jsx',
      formats: ['iife'],
      name: 'ChatWidget',
      fileName: () => 'index.js',
    },
    rollupOptions: {
      output: {
        // CSS 输出为 index.css
        assetFileNames: 'index.[ext]',
      },
    },
  },
}));
