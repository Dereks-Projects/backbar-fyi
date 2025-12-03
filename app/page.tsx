import { client } from '@/sanity/lib/client'
import { allArticlesQuery } from '@/sanity/queries'
import FeaturedArticle from '@/components/homepage/FeaturedArticle'
import SubFeaturedArticles from '@/components/homepage/SubFeaturedArticles'
import ArticleGrid from '@/components/homepage/ArticleGrid'
import styles from './page.module.css'

export default async function HomePage() {
  const articles = await client.fetch(allArticlesQuery)

  if (!articles || articles.length === 0) {
    return (
      <div className={styles.container}>
        <p>No articles found. Make sure you have articles tagged for BACKBAR in Sanity.</p>
      </div>
    )
  }

  const featuredArticle = articles[0]
  const subFeaturedArticles = articles.slice(1, 3)
  const gridArticles = articles.slice(3, 12)

  return (
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
  )
}