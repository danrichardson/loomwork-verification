import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  // ── Site ──────────────────────────────────────────────────
  // Change this per-project. Used for sitemap, canonical URLs, etc.
  site: "https://www.loomwork.org",

  // ── Output ────────────────────────────────────────────────
  // "static" = pre-rendered HTML (default, works everywhere)
  // "server" = SSR via Cloudflare Workers (needed for dynamic routes)
  // Start with static; switch to server only if you need SSR.
  output: "static",

  // ── Adapter ───────────────────────────────────────────────
  // Cloudflare Pages adapter. Only takes effect when output: "server".
  // Harmless to leave configured when output is "static".
  adapter: cloudflare(),

  // ── Image Optimization ─────────────────────────────────
  // Cloudflare doesn't support sharp at runtime.
  // "compile" optimizes images at build time instead.
  image: {
    service: { entrypoint: "astro/assets/services/compile" },
  },

  // ── Integrations ──────────────────────────────────────────
  integrations: [
    mdx(),
    react(),
    sitemap(),
  ],

  // ── Markdown ──────────────────────────────────────────────
  markdown: {
    shikiConfig: {
      theme: "github-dark",
    },
  },

  // ── Vite ────────────────────────────────────────────────
  // React 19 uses MessageChannel in server.browser which doesn't
  // exist in Cloudflare Workers. Alias to the edge build instead.
  vite: {
    resolve: {
      alias: import.meta.env.PROD && {
        "react-dom/server": "react-dom/server.edge",
      },
    },
  },
});
