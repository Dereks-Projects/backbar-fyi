import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://backbar.fyi'

  // Fetch all articles from Sanity
  const articles = await client.fetch(`
    *[_type == "article" && category == "spirits" && "backbar" in sites] {
      "slug": slug.current,
      publishedAt,
      subcategory,
      tags
    }
  `)

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Article pages
  const articlePages: MetadataRoute.Sitemap = articles.map((article: any) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: article.publishedAt ? new Date(article.publishedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Extract unique subcategories
  const subcategories = [...new Set(
    articles
      .map((article: any) => article.subcategory)
      .filter((sub: string | null) => sub !== null)
  )] as string[]

  const subcategoryPages: MetadataRoute.Sitemap = subcategories.map((subcategory) => ({
    url: `${baseUrl}/articles/subcategory/${subcategory.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // Extract unique tags
  const allTags = articles.flatMap((article: any) => article.tags || [])
  const uniqueTags = [...new Set(allTags)] as string[]

  const tagPages: MetadataRoute.Sitemap = uniqueTags.map((tag) => ({
    url: `${baseUrl}/articles/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))

  return [...staticPages, ...articlePages, ...subcategoryPages, ...tagPages]
}