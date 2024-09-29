import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const isDev = env.VITE_MODE === 'development';

  return {
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
      environment: 'jsdom',
      setupFiles: './setupTests.ts',
    },
  };
});
