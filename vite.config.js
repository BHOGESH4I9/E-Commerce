// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Check if we're on Vercel
const isVercel = process.env.VERCEL === '1'

export default defineConfig({
  plugins: [react()],
  base: isVercel ? "/" : "/E-Commerce/"
})
