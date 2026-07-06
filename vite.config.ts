import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),    
    visualizer({
      open: true,
      gzipSize: true,
    }),],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
  rollupOptions: {
    output: {
      manualChunks(id) {
        if (id.includes('node_modules')) {
          if (id.includes('react')) return 'react'
          if (id.includes('@mui')) return 'mui'
          if (id.includes('recharts')) return 'charts'
          if (id.includes('@reduxjs') || id.includes('react-redux')) return 'redux'
          if (id.includes('i18next')) return 'i18n'
        }
      },
    },
  },
}
})