import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
plugins: [react(), tailwindcss()],
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
      onwarn(warning, warn) {
        if (warning.code === 'EVAL' && 
            warning.loc && 
            warning.loc.file && 
            warning.loc.file.includes('node_modules/three-stdlib/libs/lottie.js')) {
          return;
        }
        warn(warning);
      }
    },
    chunkSizeWarningLimit: 5000,
  },
});