import ArticleCard from './ArticleCard'
import styles from './ArticleGrid.module.css'

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

interface ArticleGridProps {
  articles: Article[]
}

export default function ArticleGrid({ articles }: ArticleGridProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>More Articles</h2>
      <div className={styles.grid}>
        {articles.map((article) => (
          <ArticleCard key={article.slug.current} article={article} />
        ))}
      </div>
      <div className={styles.buttonWrapper}>
        <a href="/articles" className={styles.moreButton}>
          More
        </a>
      </div>
    </section>
  )
}