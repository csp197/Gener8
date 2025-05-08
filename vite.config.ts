import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Set the base to the repository name for GitHub Pages
  // If deploying to a custom domain or as a user/organization page, use '/'
  base: '/gener-8/',
  
  server: {
    port: 3000
  }
})
