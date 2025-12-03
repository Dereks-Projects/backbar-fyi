import { client } from '@/sanity/lib/client'
import { articleBySlugQuery, relatedArticlesQuery, relatedArticlesByCategoryQuery } from '@/sanity/queries'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import styles from './article.module.css'
import RelatedArticles from '@/components/article/RelatedArticles'

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

// Format date to readable string (e.g., "December 3, 2025")
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Generate unique metadata for each article
export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await client.fetch(articleBySlugQuery, { slug })

  if (!article) {
    return {
      title: 'Article Not Found | BACKBAR',
    }
  }

  const articleUrl = `https://backbar.fyi/articles/${slug}`
  const imageUrl = article.mainImage?.asset?.url

  return {
    title: `${article.title} | BACKBAR`,
    description: article.subtitle || 'Spirits education and bar industry insights.',
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.subtitle || 'Spirits education and bar industry insights.',
      url: articleUrl,
      siteName: 'BACKBAR',
      publishedTime: article.publishedAt,
      authors: [article.author || 'BACKBAR'],
      images: imageUrl ? [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.mainImage?.alt || article.title,
        },
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.subtitle || 'Spirits education and bar industry insights.',
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

const portableTextComponents = {
  types: {
    image: ({ value }: { value: { asset: { url: string }, alt?: string, caption?: string } }) => (
      <figure className={styles.bodyImage}>
        <img src={value.asset?.url} alt={value.alt || ''} />
        {value.caption && <figcaption>{value.caption}</figcaption>}
      </figure>
    ),
  },
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await client.fetch(articleBySlugQuery, { slug })

  if (!article) {
    notFound()
  }

  // Fetch related articles by subcategory
  let relatedArticles = []
  
  if (article.subcategory) {
    relatedArticles = await client.fetch(relatedArticlesQuery, {
      subcategory: article.subcategory,
      currentSlug: slug
    })
  }

  // Fallback: if fewer than 3, fetch by category instead
  if (relatedArticles.length < 3) {
    relatedArticles = await client.fetch(relatedArticlesByCategoryQuery, {
      currentSlug: slug
    })
  }

  // Build JSON-LD structured data for search engines and LLMs
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.subtitle || "",
    "author": {
      "@type": "Person",
      "name": article.author || "BACKBAR"
    },
    "datePublished": article.publishedAt,
    "image": article.mainImage?.asset?.url,
    "publisher": {
      "@type": "Organization",
      "name": "BACKBAR",
      "url": "https://backbar.fyi"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://backbar.fyi/articles/${article.slug?.current}`
    }
  }

  // Build BreadcrumbList JSON-LD
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://backbar.fyi"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Articles",
      "item": "https://backbar.fyi/articles"
    }
  ]

  if (article.subcategory) {
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 3,
      "name": article.subcategory,
      "item": `https://backbar.fyi/articles/subcategory/${article.subcategory.toLowerCase().replace(/\s+/g, '-')}`
    })
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 4,
      "name": article.title,
      "item": `https://backbar.fyi/articles/${article.slug?.current}`
    })
  } else {
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 3,
      "name": article.title,
      "item": `https://backbar.fyi/articles/${article.slug?.current}`
    })
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className={styles.article}>
        <header className={styles.header}>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span className={styles.separator}>/</span>
            <Link href="/articles">Articles</Link>
           {article.subcategory && (
              <>
                <span className={styles.separator}>/</span>
                <Link href={`/articles/subcategory/${article.subcategory.toLowerCase().replace(/\s+/g, '-')}`}>
                  {article.subcategory}
                </Link>
              </>
            )}
          </div>
          <h1 className={styles.title}>{article.title}</h1>
          {article.subtitle && (
            <p className={styles.subtitle}>{article.subtitle}</p>
          )}
          <div className={styles.meta}>
            {article.author && (
              <span className={styles.author}>By {article.author}</span>
            )}
            {article.author && article.publishedAt && (
              <span className={styles.metaSeparator}>•</span>
            )}
            {article.publishedAt && (
              <time className={styles.publishedDate} dateTime={article.publishedAt}>
                {formatDate(article.publishedAt)}
              </time>
            )}
          </div>
        </header>

        {article.mainImage && (
          <div className={styles.imageWrapper}>
            <img
              src={article.mainImage.asset.url}
              alt={article.mainImage.alt}
              className={styles.mainImage}
            />
          </div>
        )}

        <div className={styles.body}>
          <PortableText value={article.body} components={portableTextComponents} />
        </div>

        {article.tags && article.tags.length > 0 && (
          <div className={styles.tags}>
            <span className={styles.tagsLabel}>Tags:</span>
            {article.tags.map((tag: string) => (
              <Link
                key={tag}
                href={`/articles/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                className={styles.tagLink}
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        <RelatedArticles articles={relatedArticles} />

        <footer className={styles.articleFooter}>
          <Link href="/articles" className={styles.backLink}>
            ← Back to Articles
          </Link>
        </footer>
      </article>
    </>
  )
}