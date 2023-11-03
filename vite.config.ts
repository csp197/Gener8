import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "",
  // "https://csp197.github.io/gener-8",
  server: {
    port: 3000
  }
})
