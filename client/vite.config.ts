import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { configDefaults } from 'vitest/config';

// Determine if we're in the development environment
const isDev = process.env.VITE_NODE_ENV === 'development';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    ...(isDev && {
      https: {
        key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
        cert: fs.readFileSync(path.resolve(__dirname, 'server.cert')),
      },
    }),
  },
  test: {
    globals: true,
    environment: 'jsdom', // You’ll need jsdom for testing React components
    setupFiles: './setupTests.ts', // Path to setup file (optional)
  },
});
