import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // your desired port for development
  },
  preview: {
    port: 80, // your desired port for production preview
  }
})
