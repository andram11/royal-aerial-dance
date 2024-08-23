import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { configDefaults } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'server.cert')),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom', // You’ll need jsdom for testing React components
    setupFiles: './setupTests.ts', // Path to setup file (optional)
  },
})
