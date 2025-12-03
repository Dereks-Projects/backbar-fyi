import Link from 'next/link'
import styles from './ArticleCard.module.css'

interface ArticleCardProps {
  article: {
    title: string
    subtitle?: string
    slug: { current: string }
    mainImage: {
      asset: { url: string }
      alt: string
    }
    subcategory?: string
  }
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className={styles.card}>
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
  )
}