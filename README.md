# BACKBAR

A mobile-first spirits education magazine built with Next.js and Sanity.io.

**Live:** [backbar.fyi](https://backbar.fyi)

---

## Tech Stack

- Next.js 16 (App Router)
- Sanity.io CMS
- CSS Modules
- pnpm

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Build for production
pnpm build
```

---

## Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=21zbxo34
NEXT_PUBLIC_SANITY_DATASET=production
```

---

## Project Structure

```
app/
├── articles/           # Article collection + pagination
│   ├── [slug]/         # Individual articles
│   ├── subcategory/    # Filtered by subcategory
│   ├── tag/            # Filtered by tag
│   └── page/           # Pagination
├── about/              # About page
├── privacy/            # Legal pages
├── terms/
├── cookies/
├── disclaimer/
├── sitemap.ts          # Dynamic sitemap
└── robots.ts           # Robots.txt

components/
├── layout/             # Header, Footer
├── homepage/           # Article cards, grid, dropdown
└── article/            # Related articles

sanity/
├── lib/client.ts       # Sanity client
├── queries.ts          # GROQ queries
└── env.ts              # Environment config
```

---

## Content Filtering

All content pulls from shared Sanity project, filtered by:

```javascript
category == "spirits" && "backbar" in sites
```

---

## Author

Derek Engles