import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'node:path';

const getBasePath = (command: 'build' | 'serve') => {
  if (command === 'serve') return '/';

  const envBasePath = process.env.VITE_BASE_PATH;
  if (envBasePath) {
    const withLeadingSlash = envBasePath.startsWith('/') ? envBasePath : `/${envBasePath}`;
    return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`;
  }

  return '/';
};

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: getBasePath(command),
  plugins: [
    react(),
    svgrPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifestFilename: 'site.webmanifest',
      includeAssets: ['favicon.ico', 'favicon.svg', 'favicon-96x96.png', 'apple-touch-icon.png'],
      manifest: {
        name: 'AkraSupply',
        short_name: 'AkraSupply',
        description: 'AkraSupply manufacturer sourcing platform',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '.',
        scope: '.',
        icons: [
          {
            src: 'web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        navigateFallbackDenylist: [/^\/api\//],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}));
