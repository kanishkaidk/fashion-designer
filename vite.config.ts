import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // this is what Express will serve
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  base: './', // important for relative paths when deployed
});


