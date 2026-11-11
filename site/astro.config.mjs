import { defineConfig } from 'astro/config';

// A project site on GitHub Pages: https://gtantoine.github.io/triolet/
export default defineConfig({
  site: 'https://gtantoine.github.io',
  base: '/triolet',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'auto' },
});
