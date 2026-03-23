import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: '/SYMBIOT-2026-WEB/',
  plugins: [react()],
  server: {
    port: 5173,
  },
})

