import { client } from '@/sanity/lib/client'
import { allArticlesQuery } from '@/sanity/queries'
import FeaturedArticle from '@/components/homepage/FeaturedArticle'
import SubFeaturedArticles from '@/components/homepage/SubFeaturedArticles'
import ArticleGrid from '@/components/homepage/ArticleGrid'
import styles from './page.module.css'
import type { Metadata } from 'next'

// ============================================
// HOMEPAGE METADATA (SEO)
// ============================================
// This tells Google exactly what your homepage is about.

export const metadata: Metadata = {
  title: 'BACKBAR | Spirits Education & Bar Industry Insights',
  description: 'Deep-dive articles on spirits, cocktails, and the bar industry. Expert education for bartenders, hospitality professionals, and spirits enthusiasts.',
  alternates: {
    canonical: 'https://backbar.fyi',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://backbar.fyi',
    siteName: 'BACKBAR',
    title: 'BACKBAR | Spirits Education & Bar Industry Insights',
    description: 'Deep-dive articles on spirits, cocktails, and the bar industry. Expert education for bartenders, hospitality professionals, and spirits enthusiasts.',
    images: [
      {
        url: 'https://backbar.fyi/backbar-socialcard.jpg',
        width: 1200,
        height: 630,
        alt: 'BACKBAR - Spirits Education',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BACKBAR | Spirits Education & Bar Industry Insights',
    description: 'Deep-dive articles on spirits, cocktails, and the bar industry.',
    images: ['https://backbar.fyi/backbar-socialcard.jpg'],
  },
}

export default async function HomePage() {
  const articles = await client.fetch(allArticlesQuery)

  // ============================================
  // JSON-LD STRUCTURED DATA
  // ============================================
  // This is "secret code" for search engines and AI.
  
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BACKBAR',
    description: 'Deep-dive articles on spirits, cocktails, and the bar industry. Expert education for bartenders, hospitality professionals, and spirits enthusiasts.',
    url: 'https://backbar.fyi',
    publisher: {
      '@type': 'Organization',
      name: 'BACKBAR',
      url: 'https://backbar.fyi',
    },
  }

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BACKBAR',
    url: 'https://backbar.fyi',
    logo: 'https://backbar.fyi/backbar-favicon.png',
    description: 'Spirits education and bar industry insights for hospitality professionals and enthusiasts.',
    sameAs: [],
  }

  if (!articles || articles.length === 0) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <div className={styles.container}>
          <p>No articles found. Make sure you have articles tagged for BACKBAR in Sanity.</p>
        </div>
      </>
    )
  }

  const featuredArticle = articles[0]
  const subFeaturedArticles = articles.slice(1, 3)
  const gridArticles = articles.slice(3, 12)

  return (
    <>
      {/* JSON-LD Structured Data for Search Engines & AI */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      <div className={styles.container}>
        <section className={styles.heroSection}>
          <div className={styles.featuredWrapper}>
            <FeaturedArticle article={featuredArticle} />
          </div>
          {subFeaturedArticles.length > 0 && (
            <div className={styles.subFeaturedWrapper}>
              <SubFeaturedArticles articles={subFeaturedArticles} />
            </div>
          )}
        </section>

        {gridArticles.length > 0 && (
          <ArticleGrid articles={gridArticles} />
        )}
      </div>
    </>
  )
}