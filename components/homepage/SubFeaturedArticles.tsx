import Link from 'next/link'
import styles from './SubFeaturedArticles.module.css'

interface Article {
  title: string
  subtitle?: string
  slug: { current: string }
  mainImage: {
    asset: { url: string }
    alt: string
  }
  subcategory?: string
}

interface SubFeaturedArticlesProps {
  articles: Article[]
}

export default function SubFeaturedArticles({ articles }: SubFeaturedArticlesProps) {
  return (
    <div className={styles.subFeaturedWrapper}>
      {articles.map((article) => (
        <article key={article.slug.current} className={styles.subFeatured}>
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
            <h3 className={styles.title}>
              <Link href={`/articles/${article.slug.current}`}>
                {article.title}
              </Link>
            </h3>
            {article.subtitle && (
              <p className={styles.subtitle}>{article.subtitle}</p>
            )}
            <Link href={`/articles/${article.slug.current}`} className={styles.readMore}>
              Read More
            </Link>
          </div>
        </article>
      ))}
    </div>
  )
}