import { client } from '@/sanity/lib/client'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ArticleCard from '@/components/homepage/ArticleCard'
import styles from '../../articles.module.css'

interface SubcategoryPageProps {
  params: Promise<{ subcategory: string }>
}

export async function generateMetadata({ params }: SubcategoryPageProps) {
  const { subcategory } = await params
  const displayName = subcategory
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    title: `${displayName} Articles | BACKBAR`,
    description: `Explore our collection of in-depth articles about ${displayName}. Expert education for bartenders and spirits enthusiasts.`,
    alternates: {
      canonical: `https://backbar.fyi/articles/subcategory/${subcategory}`,
    },
  }
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { subcategory } = await params
  
  const querySubcategory = subcategory
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  const displayName = querySubcategory

  const articlesBySubcategoryQuery = `
    *[_type == "article" && category == "spirits" && "backbar" in sites && subcategory == "${querySubcategory}"] | order(publishedAt desc) {
      _id,
      title,
      subtitle,
      slug,
      mainImage {
        asset -> {
          _id,
          url
        },
        alt
      },
      subcategory,
      category,
      tags,
      publishedAt,
      author
    }
  `

  const articles = await client.fetch(articlesBySubcategoryQuery)

  if (!articles || articles.length === 0) {
    notFound()
  }

  const displayedArticles = articles.slice(0, 12)

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{displayName}</h1>
        <nav className={styles.filterNav}>
          <Link href="/articles" className={styles.filterButton}>
            ← All Articles
          </Link>
        </nav>
      </header>

      <div className={styles.grid}>
        {displayedArticles.map((article: any) => (
          <ArticleCard key={article.slug.current} article={article} />
        ))}
      </div>

      <footer className={styles.pageFooter}>
        <Link href="/articles" className={styles.backButton}>
          ← Back
        </Link>
      </footer>
    </div>
  )
}