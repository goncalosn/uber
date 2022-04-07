import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    return {
      plugins: [react(), legacy()],
      resolve: {
        alias: {
          '@uber/components': path.resolve(__dirname, '../components/src'),
        },
      },
    };
  } else {
    // command === 'build'
    return {
      plugins: [react(), legacy()],
      build: {
        outDir: path.resolve(__dirname, '../../dist/packages/site'),
        emptyOutDir: true,
      },
      resolve: {
        alias: {
          '@uber/components': path.resolve(__dirname, '../components/src'),
        },
      },
    };
  }
});
