// FILE: vite.config.js

import { fileURLToPath, URL } from 'node:url';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),

    quasar({
      sassVariables: 'src/app/assets/css/quasar-variables.sass',
    }),

    splitVendorChunkPlugin(),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      https: 'agent-base',
    },
  },

  server: {
    proxy: {
      '/api/v1': {
        target: 'https://192.168.1.9',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
