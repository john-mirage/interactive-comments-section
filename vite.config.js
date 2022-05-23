import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/interactive-comments-section/",
  resolve: {
    alias: {
      '@assets': resolve(__dirname, 'src/assets'),
      '@components': resolve(__dirname, 'src/components'),
      '@data': resolve(__dirname, 'src/data'),
      '@interfaces': resolve(__dirname, 'src/interfaces'),
    },
  },
});