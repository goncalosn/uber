import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    if (mode === 'production')
      return {
        plugins: [react()],
        base: path.resolve(__dirname, '../dist/packages/site/'),
        // root: path.resolve(__dirname, '../dist/packages/site/index.html'),
      };
    return {
      plugins: [react()],
      resolve: {
        alias: {
          '@uber/components': path.resolve(__dirname, '../components/src'),
        },
      },
    };
  } else {
    // command === 'build'
    return {
      plugins: [react()],
      // base: path.resolve(__dirname, '../../dist/packages/site/'),
      // base: '',
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
