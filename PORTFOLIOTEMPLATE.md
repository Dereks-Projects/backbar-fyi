# Portfolio Template: Article-Centric Magazine Sites

## Overview

This template describes how to build a mobile-first magazine-style site using Next.js and Sanity.io. The first implementation is BACKBAR (backbar.fyi), a spirits education site. Future sites will use the same Sanity content lake, filtered by different categories.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **CMS:** Sanity.io (headless, shared content lake)
- **Styling:** CSS Modules (no Tailwind)
- **Package Manager:** pnpm
- **Deployment:** Vercel + GoDaddy DNS

---

## Architecture

### One Sanity Project, Multiple Sites

All sites pull from the same Sanity project (`21zbxo34`, dataset `production`). Each site filters by:
- `category` field (e.g., "spirits", "wine", "beer")
- `sites` array field (e.g., "backbar", "somm")

### Folder Structure

```
project-root/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── layout.tsx                  # Root layout (Header, Footer, fonts, OG tags)
│   ├── globals.css                 # Global styles
│   ├── page.module.css             # Homepage styles
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
│       ├── page.tsx                # Articles archive
│       ├── articles.module.css     # Archive styles
│       ├── [slug]/
│       │   ├── page.tsx            # Individual article (includes JSON-LD)
│       │   └── article.module.css  # Article styles
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
│   ├── [site]-favicon.png          # Favicon
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

For a new site (e.g., wine site), change to:

```javascript
*[_type == "article" && category == "wine" && "somm" in sites]
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

## Dynamic Filtering

Subcategory and tag pages query Sanity directly—no hardcoded lists.

**Why:** If you add a new subcategory (e.g., "Brandy") in Sanity, it works automatically without code changes.

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

## Pitfalls Encountered

1. **Hardcoded subcategory lists** — Broke when articles had subcategories not in the list. Solution: Query Sanity for actual values.

2. **Case sensitivity** — Tags stored lowercase, URLs lowercase, display capitalized. Keep transformations consistent.

3. **Event handlers in Server Components** — `onChange` fails in Server Components. Extract interactive elements into Client Components.

4. **PortableText images** — Body images don't render by default. Must define custom components and expand asset URLs in query.

5. **next/image requires CSS setup** — Using `next/image` with `fill` prop requires parent element to have `position: relative` and defined dimensions. Stick with `<img>` tags unless you configure all CSS properly.

6. **scroll-behavior: smooth conflicts with App Router** — Do NOT use `scroll-behavior: smooth` in globals.css. It breaks scroll-to-top on navigation. Next.js handles scroll reset automatically.

---

## Customization Per Site

When creating a new site, change:

| Item | Example |
|------|---------|
| Brand color | `#002228` → new color |
| Site name | "BACKBAR" → new name |
| Category filter | `category == "spirits"` → new category |
| Sites filter | `"backbar" in sites` → new site value |
| Domain | backbar.fyi → new domain |
| Metadata | Titles, descriptions, canonical URLs |
| Public assets | favicon, socialcard images |

---

## Files to Copy vs Customize

**Copy as-is:**
- `sanity/lib/client.ts`
- `sanity/env.ts`
- Component structures
- `app/sitemap.ts` structure
- `app/robots.ts` structure

**Customize:**
- `sanity/queries.ts` (change category filter)
- `app/layout.tsx` (site name, colors, metadata, OG image path)
- All CSS files (brand colors)
- Legal pages (site name, contact email)
- `.env.local` (same project ID, but verify)

---

## Still To Build

- Pagination (page 2, 3, etc.)

---

## Commands Reference

```bash
# Start dev server
pnpm dev

# Install package
pnpm add [package-name]

# Build for production
pnpm build
```