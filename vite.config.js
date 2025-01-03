import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/todo-react',
  plugins: [react()],
  build: {
    outDir: 'dist',  // Ensure the build output is directed to 'dist'
  },
})