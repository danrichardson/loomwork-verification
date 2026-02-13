# Loomwork v2 — Migration Instructions

## What Changed

Loomwork has been refactored to cleanly separate **framework files** (layouts,
components, base CSS) from **site files** (config, content, branding). This means
you can pull framework updates from loomwork into any site repo without conflicts.

### Key changes:
- **`src/styles/site.css`** (NEW) — All your color/font overrides go here
- **`src/styles/global.css`** — Now a framework file, don't edit in site repos
- **`src/site.config.ts`** — Added `fonts_url` field for Google Fonts
- **`src/layouts/Base.astro`** — Imports `site.css` after `global.css`, loads fonts from config
- **`wrangler.toml`** — Clean template with all Cloudflare fixes baked in
- **`astro.config.mjs`** — All Cloudflare fixes included (image service, React edge alias)
- **`public/.assetsignore`** — Included in the template (no more forgetting it)

---

## Step 1: Update Loomwork Repo (10 minutes)

Replace your entire loomwork repo with the contents of the `loomwork-v2/` folder
from the archive.

```bash
# Back up current repo just in case
cp -r ~/path/to/loomwork ~/path/to/loomwork-backup

# Remove all files (but keep .git)
cd ~/path/to/loomwork
git rm -rf .

# Copy in the new files from the archive
cp -r ~/Downloads/loomwork-v2/* .
cp ~/Downloads/loomwork-v2/.gitignore .

# Commit and push
git add .
git commit -m "v2: framework/site split, improved styling, Cloudflare fixes"
git push
```

Verify loomwork.org still deploys and looks right.

---

## Step 2: Update Solarseed Repo (15 minutes)

### 2a. Add loomwork as upstream remote

```bash
cd ~/path/to/solarseed
git remote add loomwork https://github.com/danrichardson/loomwork.git
```

### 2b. Fetch and merge framework updates

```bash
git fetch loomwork
git merge loomwork/main --no-commit --allow-unrelated-histories
```

This will bring in the new framework files. There will be conflicts on
site-specific files. That's expected.

### 2c. Resolve conflicts

For each conflicted file, **keep the solarseed version** (your content):

```bash
# These are SITE files — keep yours:
git checkout --ours src/site.config.ts
git checkout --ours src/pages/index.astro
git checkout --ours astro.config.mjs
git checkout --ours wrangler.toml
git checkout --ours package.json
git checkout --ours README.md
```

For content files, keep yours:
```bash
git checkout --ours src/content/pages/
```

### 2d. Create your site.css

Create `src/styles/site.css` with your Johnny Solarseed overrides:

```css
/* Johnny Solarseed overrides */
:root {
  --color-accent:       #d97706;
  --color-accent-hover: #b45309;
  --color-accent-light: #fef3c7;
  --font-body: "Source Sans 3", system-ui, sans-serif;
  --font-heading: "Source Serif 4", Georgia, serif;
  --font-mono: "JetBrains Mono", "Fira Code", ui-monospace, monospace;
}
```

### 2e. Update site.config.ts to add fonts_url

Add this field to your SITE object in `src/site.config.ts`:

```typescript
fonts_url: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Source+Sans+3:wght@400;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,700&display=swap",
```

### 2f. Commit and push

```bash
git add .
git commit -m "Merge loomwork v2 framework updates"
git push
```

---

## Step 3: Verify Both Sites

- Check loomwork.org — should show the Loomwork demo
- Check johnnysolarseed.org — should look exactly like before, maybe with minor style tweaks from the improved global.css

---

## Going Forward

### When you improve the framework (loomwork):
1. Make changes in the loomwork repo
2. Commit and push to loomwork
3. In each site repo: `git fetch loomwork && git merge loomwork/main`

### When you write content (any site):
1. Edit files in that site's repo
2. Commit and push — auto-deploys

### When you create a new site:
1. `git clone https://github.com/danrichardson/loomwork.git new-site`
2. `cd new-site && git remote remove origin`
3. Create a new GitHub repo, set it as origin
4. Edit site files: `site.config.ts`, `site.css`, `astro.config.mjs`, `wrangler.toml`, `index.astro`
5. Add content to `src/content/pages/`
6. Push → connect to Cloudflare → live
7. `git remote add loomwork https://github.com/danrichardson/loomwork.git` for future updates

### Rules to keep merges clean:
- **Never edit framework files in site repos** (layouts, components, global.css, content.config.ts, [...slug].astro, 404.astro)
- **Never edit site files in the loomwork repo** beyond the demo/placeholder content
- If a site needs a unique component, add it to that site's `src/components/` with a name that doesn't exist in loomwork
