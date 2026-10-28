import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Los íconos SVG se sirven como archivos aparte (con caché) en lugar de incrustarse en el JS.
    assetsInlineLimit: (file) => (file.endsWith('.svg') ? false : undefined),
  },
})
