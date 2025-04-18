import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'soen357.onrender.com', // Allow this host
    allowedHosts: ['soen357.onrender.com'], // Explicitly allow this host
  },
})
