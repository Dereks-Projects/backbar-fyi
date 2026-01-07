# BACKBAR

A mobile-first spirits education magazine built with Next.js and Sanity.io.

**Live:** [backbar.fyi](https://backbar.fyi)

---

## Tech Stack

- Next.js 16 (App Router)
- Sanity.io CMS
- CSS Modules
- pnpm
- Vercel (Hosting)

---

## Features

- **Dynamic Content** — Articles pulled from Sanity CMS
- **SEO Optimized** — JSON-LD structured data, dynamic sitemap, OpenGraph/Twitter cards
- **Geo-Blocking** — China and Russia blocked via middleware
- **Custom 404** — Branded error page with navigation
- **Google Analytics** — GA4 tracking enabled
- **Mobile-First** — Responsive design for all devices

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
backbar/
├── app/
│   ├── articles/           # Article collection + pagination
│   │   ├── [slug]/         # Individual articles
│   │   ├── subcategory/    # Filtered by subcategory
│   │   ├── tag/            # Filtered by tag
│   │   └── page/           # Pagination
│   ├── about/              # About page
│   ├── privacy/            # Legal pages
│   ├── terms/
│   ├── cookies/
│   ├── disclaimer/
│   ├── layout.tsx          # Root layout + Google Analytics
│   ├── page.tsx            # Homepage + JSON-LD
│   ├── not-found.tsx       # Custom 404 page
│   ├── sitemap.ts          # Dynamic sitemap
│   └── robots.ts           # Robots.txt
│
├── components/
│   ├── layout/             # Header, Footer
│   ├── homepage/           # Article cards, grid, dropdown
│   └── article/            # Related articles
│
├── sanity/
│   ├── lib/client.ts       # Sanity client
│   ├── queries.ts          # GROQ queries
│   └── env.ts              # Environment config
│
├── public/                 # Static assets
│   ├── backbar-favicon.png
│   └── backbar-socialcard.jpg
│
└── middleware.ts           # Geo-blocking (CN, RU)
```

---

## Content Filtering

All content pulls from shared Sanity project, filtered by:

```javascript
category == "spirits" && "backbar" in sites
```

---

## SEO Implementation

| Feature | Location |
|---------|----------|
| Site metadata | `app/layout.tsx` |
| Homepage JSON-LD | `app/page.tsx` |
| Article JSON-LD | `app/articles/[slug]/page.tsx` |
| Dynamic sitemap | `app/sitemap.ts` |
| Robots.txt | `app/robots.ts` |

---

## Brand Colors

| Element | Color |
|---------|-------|
| Header/Footer | `#002228` |
| Page Background | `#fafafa` |
| Text | `#000000` |
| Accent (Gold) | `#c9a227` |

---

## Author

Derek Engles

---

## License

All rights reserved.