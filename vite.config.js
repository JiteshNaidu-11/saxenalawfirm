import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Use IPv4 localhost instead of IPv6 (::1) to avoid "EACCES: permission denied" issues
    // when binding to the dev server socket.
    host: '127.0.0.1',
    // Default Vite dev port; avoids permission issues with the previous 3000 config.
    port: 5173,
    open: true
  }
})
