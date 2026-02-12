# Loomwork

A content-first Astro starter for crafting sites by hand.

**MDX + Content Collections + Cloudflare Pages.** Write in Typora, push to GitHub, auto-deploy in 30 seconds. Fork it, change one config file, and you have a new site.

## Quick Start

```bash
git clone https://github.com/YOUR_USER/loomwork.git my-site
cd my-site
npm install
npm run dev          # → http://localhost:4321
```

## Rebranding for a New Project

1. Edit **`src/site.config.ts`** — name, tagline, nav, footer, email
2. Edit **`src/styles/global.css`** `:root` variables — colors, fonts
3. Update **`astro.config.mjs`** `site` URL
4. Replace content in `src/content/pages/` with your own MDX
5. Push → Cloudflare Pages auto-builds → live

## Project Structure

```
src/
├── site.config.ts           ★ The ONE file you change per project
├── content.config.ts        Content Collection schemas
├── content/
│   ├── pages/               Site pages (MDX). File path = URL.
│   │   ├── about.mdx        → /about
│   │   └── guides/
│   │       └── system-1.mdx → /guides/system-1
│   └── posts/               Blog posts (MDX). Date-driven.
├── components/
│   ├── Header.astro          Nav (reads from site.config)
│   ├── Footer.astro          Footer (reads from site.config)
│   ├── TableOfContents.astro Auto-generated TOC for guide pages
│   ├── Callout.astro         Info/warning/tip boxes for MDX
│   └── YouTube.astro         Responsive video embeds for MDX
├── layouts/
│   ├── Base.astro            HTML shell, meta tags, fonts
│   └── Content.astro         Page chrome with template variants
├── pages/
│   ├── index.astro           Homepage
│   ├── [...slug].astro       Dynamic route → renders content/pages
│   └── 404.astro
└── styles/
    └── global.css            CSS variables, reset, base styles
```

## Content Authoring

### Writing Pages

Create `.mdx` files in `src/content/pages/`. Every file needs YAML frontmatter:

```yaml
---
title: "My Page Title"
description: "SEO description under 160 chars."
section: "guides"
nav_order: 10
template: "guide"           # default | landing | guide | tool
tags: ["solar", "beginner"]
draft: false
---
```

### Using Components in MDX

```mdx
import Callout from '../../components/Callout.astro';
import YouTube from '../../components/YouTube.astro';

<Callout type="tip" title="Pro tip">
  Components work inline in your markdown content.
</Callout>

<YouTube id="dQw4w9WgXcQ" title="Important tutorial" />
```

### Page Templates

| Template  | Use for                    | Layout                        |
| --------- | -------------------------- | ----------------------------- |
| `default` | Standard content pages     | Centered, content-width       |
| `landing` | Home/marketing pages       | Wide container, no sidebar    |
| `guide`   | Long-form guides           | Sticky TOC sidebar on desktop |
| `tool`    | Interactive tools          | Minimal chrome, wide          |

### Typora Workflow

1. Open `src/content/pages/` in Typora
2. Write and edit `.mdx` files
3. Drop images in the same folder or `src/assets/`
4. `git add . && git commit -m "update" && git push`
5. Cloudflare Pages auto-deploys (~30 seconds)

## Deploy to Cloudflare Pages

1. Push repo to GitHub
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git
3. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Deploy. Subsequent pushes auto-deploy.

## Adding React Islands

For interactive components (calculators, tools), create `.tsx` files:

```tsx
// src/components/LoadCalculator.tsx
import { useState } from "react";

export default function LoadCalculator() {
  const [watts, setWatts] = useState(0);
  return <div>...</div>;
}
```

Use with a client directive:

```astro
import LoadCalculator from '../components/LoadCalculator';

<LoadCalculator client:load />
```

Options: `client:load` (immediate), `client:idle` (when idle), `client:visible` (when scrolled to).

## Extending

- **New collection:** Add to `src/content.config.ts`, create folder in `src/content/`
- **New layout:** Add to `src/layouts/`, reference via frontmatter `template`
- **SSR routes:** Set `output: "server"` in `astro.config.mjs` (Cloudflare adapter pre-configured)

## License

MIT

---

*Loomwork is a [Throughline Technical Services](https://throughlinetechnical.com) project.*
