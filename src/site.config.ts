// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SITE CONFIG - SITE-SPECIFIC FILE
//
// This file is YOURS. Edit it freely. It won't conflict
// with framework updates from the loomwork repo.
//
// Everything site-specific - name, nav, branding - lives here.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const SITE = {
  // ── Identity ────────────────────────────────────────────
  name: "Coastal Kitchen",
  tagline: "Fresh seafood recipes and coastal cooking techniques from shore to table",
  description:
    "Discover the best of coastal cooking — seafood recipes, grilling techniques, pantry essentials, and the flavors of the sea.",
  url: "https://verification.loomwork.org",
  author: "Coastal Kitchen",
  email: "",

  // ── Navigation ──────────────────────────────────────────
  // Update these to match your content pages:
  nav: [
    { label: "About", href: "/about" },
    { label: "Recipes", href: "/recipes" },
    { label: "Techniques", href: "/techniques" },
    { label: "Pantry", href: "/pantry" },
  ],

  // ── Fonts ───────────────────────────────────────────────
  // Google Fonts URL. Leave empty to use system fonts (the default).
  // Then set --font-body / --font-heading in site.css.
  fonts_url:
    "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@400;600;700&display=swap",

  // ── Social ──────────────────────────────────────────────
  social: {},

  // ── Footer ──────────────────────────────────────────────
  footer: {
    company: "Coastal Kitchen",
    license: "MIT License",
  },
} as const;

export type SiteConfig = typeof SITE;
