import Link from 'next/link'
import styles from './FeaturedArticle.module.css'

interface FeaturedArticleProps {
  article: {
    title: string
    subtitle?: string
    slug: { current: string }
    mainImage: {
      asset: { url: string }
      alt: string
    }
    subcategory?: string
    excerpt?: string
  }
}

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <article className={styles.featured}>
      <Link href={`/articles/${article.slug.current}`} className={styles.imageLink}>
        <div className={styles.imageWrapper}>
          <img
            src={article.mainImage.asset.url}
            alt={article.mainImage.alt}
            className={styles.image}
          />
          {article.subcategory && (
            <span className={styles.subcategory}>{article.subcategory}</span>
          )}
        </div>
      </Link>
      <div className={styles.content}>
        <h2 className={styles.title}>
          <Link href={`/articles/${article.slug.current}`}>
            {article.title}
          </Link>
        </h2>
        {article.subtitle && (
          <p className={styles.subtitle}>{article.subtitle}</p>
        )}
        {article.excerpt && (
          <p className={styles.excerpt}>{article.excerpt}</p>
        )}
        <Link href={`/articles/${article.slug.current}`} className={styles.readMore}>
          Read More
        </Link>
      </div>
    </article>
  )
}