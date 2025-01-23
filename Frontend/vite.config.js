import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost', // or '0.0.0.0' to allow access from other devices on the network
    port: 5173, // Ensure this matches the port in your browser
    strictPort: true, // Fail if the port is already in use
    hmr: {
      protocol: 'ws', // Use 'wss' if you're serving over HTTPS
      host: 'localhost', // Host for HMR
      port: 5173, // Ensure HMR uses the correct port
    },
  },
})
