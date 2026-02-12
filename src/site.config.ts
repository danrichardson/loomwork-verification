// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SITE CONFIG
//
// This is the ONE file you change when forking for a new project.
// Everything — nav, footer, branding, social — reads from here.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const SITE = {
  // ── Identity ────────────────────────────────────────────
  name: "Loomwork",
  tagline: "A content-first Astro starter for crafting sites by hand",
  description:
    "MDX + Content Collections + Cloudflare Pages. Write in Typora, push to GitHub, auto-deploy in 30 seconds.",
  url: "https://www.loomwork.org",
  author: "Dan",
  email: "",

  // ── Navigation ──────────────────────────────────────────
  // Top-level nav items. Children are auto-generated from
  // content collection pages that share the same `section`.
  nav: [
    { label: "About", href: "/about" },
    { label: "Deploy Guide", href: "/guide" },
  ],

  // ── Social ──────────────────────────────────────────────
  social: {
    github: "https://github.com/danrichardson/loomwork",
  },

  // ── Footer ──────────────────────────────────────────────
  footer: {
    company: "Throughline Technical Services, LLC",
    license: "MIT License",
  },
} as const;

export type SiteConfig = typeof SITE;
