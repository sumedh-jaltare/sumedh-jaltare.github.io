import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/sumedh-jaltare.github.io/',
  plugins: [react()],
})
