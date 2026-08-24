import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
    }),
    tailwindcss(),
    react()
  ],
  resolve: {
    // In this npm workspace some deps hoist to the repo-root node_modules while
    // react stays in frontend/node_modules; dedupe forces a single react copy so
    // hoisted libs (e.g. qrcode.react) resolve it and there's no duplicate-React
    // "invalid hook call" at runtime.
    dedupe: ['react', 'react-dom'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@backend': path.resolve(__dirname, '../backend'),
    },
  },
  server: {
    // backend/ lives at the repo root (sibling of frontend/), outside Vite's
    // root — allow the dev server to read it so `@backend/*` imports resolve.
    fs: {
      allow: [path.resolve(__dirname, '..')],
    },
  },
})
