import { client } from '@/sanity/lib/client'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ArticleCard from '@/components/homepage/ArticleCard'
import styles from '../../articles.module.css'

interface TagPageProps {
  params: Promise<{ tag: string }>
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params
  const displayTag = tag
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    title: `${displayTag} Articles | BACKBAR`,
    description: `Explore our collection of articles tagged with "${displayTag}". Expert spirits education for bartenders and enthusiasts.`,
    alternates: {
      canonical: `https://backbar.fyi/articles/tag/${tag}`,
    },
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  
  const queryTag = tag.replace(/-/g, ' ')
  
  const displayTag = queryTag
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  const articlesByTagQuery = `
    *[_type == "article" && category == "spirits" && "backbar" in sites && "${queryTag}" in tags] | order(publishedAt desc) {
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

  const articles = await client.fetch(articlesByTagQuery)

  if (!articles || articles.length === 0) {
    notFound()
  }

  const displayedArticles = articles.slice(0, 12)

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{displayTag}</h1>
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