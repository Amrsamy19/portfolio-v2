import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import localCmsPlugin from './vite-plugin-local-cms.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), localCmsPlugin()],
})
