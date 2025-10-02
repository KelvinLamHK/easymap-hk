import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // When deploying to GitHub Pages under a repository subpath, set base to '/<repo>/'
  // Replace 'easymap-hk' with your repository name if different
  base: '/easymap-hk/',
})
