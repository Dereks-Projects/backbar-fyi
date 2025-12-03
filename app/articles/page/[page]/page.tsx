import { client } from '@/sanity/lib/client'
import { allArticlesQuery } from '@/sanity/queries'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ArticleCard from '@/components/homepage/ArticleCard'
import SubcategoryDropdown from '@/components/homepage/SubcategoryDropdown'
import styles from '../../articles.module.css'

interface PageProps {
  params: Promise<{ page: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { page } = await params
  const pageNum = parseInt(page)

  return {
    title: `Spirits Articles - Page ${pageNum} | BACKBAR`,
    description: 'Explore our collection of in-depth articles on spirits, cocktails, and the bar industry. Expert education for bartenders and spirits enthusiasts.',
    alternates: {
      canonical: `https://backbar.fyi/articles/page/${pageNum}`,
    },
  }
}

export default async function ArticlesPagePaginated({ params }: PageProps) {
  const { page } = await params
  const pageNum = parseInt(page)

  // Page 1 should use /articles, not /articles/page/1
  if (pageNum === 1) {
    notFound()
  }

  const articles = await client.fetch(allArticlesQuery)

  const articlesPerPage = 12
  const totalPages = Math.ceil(articles.length / articlesPerPage)

  // Invalid page number
  if (pageNum < 1 || pageNum > totalPages) {
    notFound()
  }

  const startIndex = (pageNum - 1) * articlesPerPage
  const displayedArticles = articles.slice(startIndex, startIndex + articlesPerPage)

  const subcategories = [...new Set(
    articles
      .map((article: any) => article.subcategory)
      .filter((sub: string | null) => sub !== null)
  )] as string[]

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
        {pageNum === 2 ? (
          <Link href="/articles" className={styles.backButton}>
            ← Previous
          </Link>
        ) : (
          <Link href={`/articles/page/${pageNum - 1}`} className={styles.backButton}>
            ← Previous
          </Link>
        )}
        {pageNum < totalPages && (
          <Link href={`/articles/page/${pageNum + 1}`} className={styles.nextButton}>
            More Articles →
          </Link>
        )}
      </footer>
    </div>
  )
}