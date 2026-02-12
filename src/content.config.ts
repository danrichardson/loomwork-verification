import { defineCollection, z } from "astro:content";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PAGES — Long-form site content (guides, reference, about, etc.)
//
// File path becomes the URL:
//   src/content/pages/garage-solar/what-is-garage-solar.mdx
//   → /garage-solar/what-is-garage-solar
//
// Nested folders create hierarchy automatically.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const pages = defineCollection({
  type: "content",
  schema: z.object({
    // ── Required ──────────────────────────────────────────
    title: z.string(),
    description: z.string().max(160), // SEO meta description

    // ── Navigation ────────────────────────────────────────
    // section: top-level nav group this page belongs to
    // e.g. "garage-solar", "learn", "guides", "oregon", "tools"
    section: z.string().optional(),

    // nav_title: shorter label for nav menus (defaults to title)
    nav_title: z.string().optional(),

    // nav_order: sort order within its section (lower = first)
    nav_order: z.number().default(100),

    // parent: slug of parent page for breadcrumb/sidebar hierarchy
    // e.g. "garage-solar" for a child of /garage-solar/
    parent: z.string().optional(),

    // ── Display ───────────────────────────────────────────
    // hero_image: path relative to content folder (Astro optimizes at build)
    hero_image: z.string().optional(),
    hero_alt: z.string().optional(),

    // template: which layout variant to use
    // "default" = standard content page
    // "landing" = wider, no sidebar
    // "guide"   = with table of contents sidebar
    // "tool"    = minimal chrome for interactive tools
    template: z
      .enum(["default", "landing", "guide", "tool"])
      .default("default"),

    // ── Metadata ──────────────────────────────────────────
    draft: z.boolean().default(false),
    date_created: z.coerce.date().optional(),
    date_updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),

    // ── SEO ───────────────────────────────────────────────
    og_image: z.string().optional(),
    canonical: z.string().url().optional(),
    noindex: z.boolean().default(false),
  }),
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// POSTS — Blog / news / updates (reverse-chronological)
//
// Simpler schema. Date-driven. Good for announcements,
// workshop recaps, build logs, etc.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    date: z.coerce.date(),
    author: z.string().default("Dan"),
    tags: z.array(z.string()).default([]),
    hero_image: z.string().optional(),
    hero_alt: z.string().optional(),
    draft: z.boolean().default(false),
    og_image: z.string().optional(),
  }),
});

export const collections = { pages, posts };
