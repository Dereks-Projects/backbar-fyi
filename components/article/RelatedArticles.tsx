import Link from 'next/link'
import styles from './RelatedArticles.module.css'

interface RelatedArticle {
  _id: string
  title: string
  slug: { current: string }
  mainImage: {
    asset: { url: string }
    alt: string
  }
}

interface RelatedArticlesProps {
  articles: RelatedArticle[]
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  // Don't render section if no related articles
  if (!articles || articles.length === 0) {
    return null
  }

  return (
    <section className={styles.relatedSection}>
      <h2 className={styles.relatedTitle}>Related Articles</h2>
      <div className={styles.relatedGrid}>
        {articles.map((article) => (
          <Link
            key={article._id}
            href={`/articles/${article.slug.current}`}
            className={styles.relatedCard}
          >
            <img
              src={article.mainImage.asset.url}
              alt={article.mainImage.alt || article.title}
              className={styles.relatedCardImage}
            />
            <h3 className={styles.relatedCardTitle}>{article.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  )
}