import { client } from '@/sanity/lib/client'
import { allArticlesQuery } from '@/sanity/queries'
import Link from 'next/link'
import ArticleCard from '@/components/homepage/ArticleCard'
import SubcategoryDropdown from '@/components/homepage/SubcategoryDropdown'
import styles from './articles.module.css'

export const metadata = {
  title: 'Spirits Articles | BACKBAR',
  description: 'Explore our collection of in-depth articles on spirits, cocktails, and the bar industry. Expert education for bartenders and spirits enthusiasts.',
  alternates: {
    canonical: 'https://backbar.fyi/articles',
  },
}

export default async function ArticlesPage() {
  const articles = await client.fetch(allArticlesQuery)
  
  const subcategories = [...new Set(
    articles
      .map((article: any) => article.subcategory)
      .filter((sub: string | null) => sub !== null)
  )] as string[]

  const displayedArticles = articles.slice(0, 12)
  const totalPages = Math.ceil(articles.length / 12)

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Article Collection</h1>
        <SubcategoryDropdown subcategories={subcategories} />
      </header>

      <div className={styles.grid}>
        {displayedArticles.map((article: any) => (
          <ArticleCard key={article.slug.current} article={article} />
        ))}
      </div>

      <footer className={styles.pageFooter}>
        <Link href="/" className={styles.backButton}>
          ← Back
        </Link>
        {totalPages > 1 && (
          <Link href="/articles/page/2" className={styles.nextButton}>
            More Articles →
          </Link>
        )}
      </footer>
    </div>
  )
}