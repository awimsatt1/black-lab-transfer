// @ts-check
import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [
    sanity({
      projectId: 'tc4dza0v',
      dataset: 'production',
      useCdn: false,
      studioBasePath: '/studio',
    }),
    react(),
  ],
});