# Portfolio Template: Article-Centric Magazine Sites

## Overview

This template describes how to build a mobile-first magazine-style site using Next.js and Sanity.io. Reference implementation: BACKBAR (backbar.fyi). Future sites use the same Sanity content lake, filtered by different categories.

**Reference screenshots of backbar.fyi are attached for mobile and desktop views.**

---

## Tech Stack

- **Framework:** Next.js 16.0.7 (App Router)
- **CMS:** Sanity.io (headless, shared content lake)
- **Styling:** CSS Modules (no Tailwind)
- **Package Manager:** pnpm
- **Deployment:** Vercel + GoDaddy DNS

---

## Architecture

### One Sanity Project, Multiple Sites

All sites pull from the same Sanity project (`21zbxo34`, dataset `production`). Each site filters by:
- `category` field (e.g., "spirits", "wine", "hospitality")
- `sites` array field (e.g., "backbar", "somm", "hospitalityfyi")

### Folder Structure

```
project-root/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── layout.tsx                  # Root layout (Header, Footer, fonts, OG tags)
│   ├── globals.css                 # Global styles
│   ├── page.module.css             # Homepage styles
│   ├── icon.png                    # Favicon (MUST be here, not just public/)
│   ├── sitemap.ts                  # Dynamic sitemap generation
│   ├── robots.ts                   # Robots.txt generation
│   ├── about/
│   │   ├── page.tsx                # About page
│   │   └── about.module.css
│   ├── privacy/
│   │   └── page.tsx                # Privacy policy
│   ├── terms/
│   │   └── page.tsx                # Terms of use
│   ├── cookies/
│   │   └── page.tsx                # Cookie policy
│   ├── disclaimer/
│   │   └── page.tsx                # Content disclaimer
│   ├── legal-pages.module.css      # Shared legal page styles
│   └── articles/
│       ├── page.tsx                # Articles archive (page 1)
│       ├── articles.module.css     # Archive styles
│       ├── [slug]/
│       │   ├── page.tsx            # Individual article (includes JSON-LD)
│       │   └── article.module.css  # Article styles
│       ├── page/
│       │   └── [page]/
│       │       └── page.tsx        # Pagination (page 2, 3, etc.)
│       ├── subcategory/
│       │   └── [subcategory]/
│       │       └── page.tsx        # Filtered by subcategory
│       └── tag/
│           └── [tag]/
│               └── page.tsx        # Filtered by tag
├── components/
│   ├── layout/
│   │   ├── Header.tsx + Header.module.css  # Client Component (hamburger menu)
│   │   └── Footer.tsx + Footer.module.css
│   ├── homepage/
│   │   ├── FeaturedArticle.tsx + FeaturedArticle.module.css
│   │   ├── SubFeaturedArticles.tsx + SubFeaturedArticles.module.css
│   │   ├── ArticleCard.tsx + ArticleCard.module.css
│   │   ├── ArticleGrid.tsx + ArticleGrid.module.css
│   │   └── SubcategoryDropdown.tsx + SubcategoryDropdown.module.css
│   └── article/
│       └── RelatedArticles.tsx + RelatedArticles.module.css
├── public/
│   └── [site]-socialcard.jpg       # OG image (1200x630)
├── sanity/
│   ├── lib/
│   │   └── client.ts               # Sanity client
│   ├── env.ts                      # Environment variables
│   └── queries.ts                  # GROQ queries
└── .env.local                      # Credentials (not committed)
```

---

## Key Queries

All queries filter by category AND sites array:

```javascript
*[_type == "article" && category == "spirits" && "backbar" in sites]
```

For a new site (e.g., hospitality site), change to:

```javascript
*[_type == "article" && category == "hospitality" && "hospitalityfyi" in sites]
```

---

## SEO Implementation

### Required Files

1. **app/robots.ts** — Generates robots.txt
2. **app/sitemap.ts** — Dynamic sitemap from Sanity content
3. **app/layout.tsx** — Default Open Graph tags, metadataBase
4. **app/articles/[slug]/page.tsx** — Article-specific metadata via `generateMetadata`, JSON-LD

### JSON-LD on Article Pages

Each article page includes two JSON-LD blocks:
- `Article` schema (headline, author, datePublished, image, publisher)
- `BreadcrumbList` schema (Home → Articles → Subcategory → Article)

### generateMetadata Pattern

```typescript
export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await client.fetch(articleBySlugQuery, { slug })
  
  return {
    title: `${article.title} | SITENAME`,
    description: article.subtitle,
    alternates: { canonical: `https://domain.com/articles/${slug}` },
    openGraph: { /* ... */ },
    twitter: { /* ... */ },
  }
}
```

---

## Sanity Setup for New Sites

1. **Add CORS origin** in Sanity dashboard (API tab) for new domain
2. **Add site to schema** in `article.ts` sites field options
3. **Tag articles** with new site value in Sanity Studio

---

## Sanity Webhook for Auto-Deploy

After deploying to Vercel, set up a webhook so publishing in Sanity triggers a rebuild:

### Step 1: Create Deploy Hook in Vercel
1. Vercel → Project → Settings → Git → Deploy Hooks
2. Name: `sanity-publish`
3. Branch: `main`
4. Copy the generated URL

### Step 2: Create Webhook in Sanity
1. sanity.io/manage → Project → API → Webhooks → Add webhook
2. Name: `[SITENAME] Deploy`
3. URL: Paste Vercel deploy hook URL
4. Dataset: `production`
5. Trigger on: Create, Update, Delete (all checked)
6. Filter: `_type == "article" && "[sitename]" in sites`
7. HTTP method: POST
8. Save

Now publishing an article auto-deploys the site (~30-60 seconds).

---

## Dynamic Filtering

Subcategory and tag pages query Sanity directly—no hardcoded lists.

**Why:** If you add a new subcategory in Sanity, it works automatically without code changes.

**How:** URL slug is converted to query value:
- URL: `/articles/subcategory/other-spirits`
- Conversion: dashes → spaces, capitalize each word
- Query: `subcategory == "Other Spirits"`

---

## Data Conventions in Sanity

Maintain consistency:
- **Subcategories:** Capitalized (e.g., "Bourbon", "Vodka", "Other Spirits")
- **Tags:** Lowercase (e.g., "cocktail history", "agave spirits")

The code handles display formatting—Sanity stores the canonical version.

---

## Client vs Server Components

Next.js App Router defaults to Server Components. Use Client Components (`'use client'`) only when needed for interactivity.

**Server Components:** Pages, layouts, static content
**Client Components:** Header (hamburger menu), dropdowns, anything with `onChange`, `onClick`, `useState`

---

## Critical Pitfalls — Do NOT Do These

### 1. Do NOT use `next/image` without full CSS preparation
**Problem:** `next/image` with `fill` prop requires parent elements to have `position: relative` and defined dimensions. Without this, images break across entire site.
**Solution:** Stick with `<img>` tags unless you're prepared to update all related CSS.

### 2. Do NOT use `scroll-behavior: smooth` in globals.css
**Problem:** Conflicts with Next.js App Router navigation. Pages load at wrong scroll position.
**Solution:** Remove from CSS entirely. Next.js handles scroll reset automatically.

### 3. Do NOT upgrade Next.js blindly
**Problem:** Running `pnpm add next@latest` can break every TSX file.
**Solution:** Use specific patch versions (e.g., `pnpm add next@16.0.7`). Test locally before pushing.

### 4. Do NOT dump multiple files at once
**Problem:** Files get saved to wrong locations, causing cascading errors.
**Solution:** One file at a time, with exact folder path, wait for confirmation.

### 5. Do NOT put favicon only in public/
**Problem:** May not be picked up by Next.js.
**Solution:** Copy favicon to `app/icon.png` for guaranteed detection.

### 6. Do NOT hardcode subcategory lists
**Problem:** Breaks when articles have subcategories not in the list.
**Solution:** Query Sanity for actual values dynamically.

### 7. Do NOT use event handlers in Server Components
**Problem:** `onChange`, `onClick` fail silently in Server Components.
**Solution:** Extract interactive elements into separate Client Components with `'use client'`.

---

## Customization Per Site

When creating a new site, change:

| Item | Example |
|------|---------|
| Header/brand color | `#002228` → new color |
| Accent color | `#c9a227` → new color |
| Page background | `#fafafa` (usually keep) |
| Font | Roboto → new font |
| Site name | "BACKBAR" → new name |
| Category filter | `category == "spirits"` → new category |
| Sites filter | `"backbar" in sites` → new site value |
| Domain | backbar.fyi → new domain |
| Metadata | Titles, descriptions, canonical URLs |
| Public assets | socialcard image |

---

## Files to Copy vs Customize

**Copy structure as-is:**
- `sanity/lib/client.ts`
- `sanity/env.ts`
- Component structures
- `app/sitemap.ts` structure
- `app/robots.ts` structure

**Customize:**
- `sanity/queries.ts` (change category filter)
- `app/layout.tsx` (site name, colors, metadata, OG image path, font)
- All CSS files (brand colors)
- Legal pages (site name, contact email)
- `.env.local` (same project ID, but verify)

---

## Deployment Checklist

1. ☐ All pages working locally (`pnpm dev`)
2. ☐ Git initialized and pushed to GitHub
3. ☐ Vercel project created and connected to repo
4. ☐ Environment variables set in Vercel
5. ☐ Domain added in Vercel
6. ☐ DNS configured in GoDaddy (A record + CNAME)
7. ☐ Sanity CORS origin added for new domain
8. ☐ Sanity webhook created for auto-deploy
9. ☐ Favicon in `app/icon.png`
10. ☐ Social card image in `public/`
11. ☐ Test publish from Sanity → verify auto-deploy works

---

## Commands Reference

```bash
# Start dev server
pnpm dev

# Install package
pnpm add [package-name]

# Install specific Next.js version
pnpm add next@16.0.7

# Build for production
pnpm build

# Git workflow
git add .
git commit -m "message"
git push
```

---

## Post-Launch Tasks

1. Add site to Google Analytics
2. Add site to Google Search Console
3. Submit sitemap.xml to Google
4. Verify indexing