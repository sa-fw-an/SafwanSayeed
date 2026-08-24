import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Build-only CSP header via meta tag. Dev server stays CSP-free so HMR works.
// 'unsafe-inline' is required by the inline theme-guard script and Vite's
// injected module scripts; 'wasm-unsafe-eval' lets the self-hosted Draco
// decoder instantiate. Defense-in-depth, not strict isolation.
const cspPlugin = (): Plugin => ({
  name: 'html-csp',
  apply: 'build',
  transformIndexHtml: () => ({
    html: '',
    tags: [
      {
        tag: 'meta',
        attrs: {
          'http-equiv': 'Content-Security-Policy',
          content: [
            "default-src 'self'",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            'font-src https://fonts.gstatic.com',
            "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'",
            "img-src 'self' data: https://hits.sh",
            "connect-src 'self' https://api.emailjs.com",
          ].join('; '),
        },
        injectTo: 'head',
      },
    ],
  }),
})

export default defineConfig({
  plugins: [react(), cspPlugin()],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, 'src'),
    },
  },
  build: {
    // The 3D diorama chunk (three.js + drei controls/environment) is
    // intentionally large and lazy-loaded only on the Studio page.
    chunkSizeWarningLimit: 1400,
  },
})
