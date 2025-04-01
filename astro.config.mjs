// @ts-check
import { defineConfig, envField } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import icon from 'astro-icon';

import markdoc from "@astrojs/markdoc";

import keystatic from '@keystatic/astro';

// https://astro.build/config
export default defineConfig({
  output: "server",

  vite: {
    plugins: [
      tailwindcss()
    ],
    resolve: {
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      alias: import.meta.env.PROD ? {
        "react-dom/server": "react-dom/server.edge",
      } : undefined,
    },
  },

  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),

  integrations: [react(), icon(), markdoc(), keystatic()]
});