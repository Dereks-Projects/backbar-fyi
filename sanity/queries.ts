// Get all BACKBAR articles (spirits category, tagged for backbar)
export const allArticlesQuery = `
  *[_type == "article" && category == "spirits" && "backbar" in sites] | order(publishedAt desc) {
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
    author,
    "excerpt": body[0].children[0].text
  }
`

// Get single article by slug (for individual article pages)
// Get single article by slug (for individual article pages)
export const articleBySlugQuery = `
  *[_type == "article" && slug.current == $slug][0] {
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
    body[] {
      ...,
      _type == "image" => {
        ...,
        asset -> {
          _id,
          url
        }
      }
    },
    publishedAt,
    author
  }
`

// Get articles by subcategory
export const articlesBySubcategoryQuery = `
  *[_type == "article" && category == "spirits" && "backbar" in sites && subcategory == $subcategory] | order(publishedAt desc) {
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

// Get related articles by subcategory (for article page)
export const relatedArticlesQuery = `
  *[_type == "article" 
    && category == "spirits" 
    && "backbar" in sites 
    && subcategory == $subcategory 
    && slug.current != $currentSlug
  ] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    mainImage {
      asset -> {
        url
      },
      alt
    }
  }
`

// Fallback: Get related articles by category if subcategory has fewer than 3
export const relatedArticlesByCategoryQuery = `
  *[_type == "article" 
    && category == "spirits" 
    && "backbar" in sites 
    && slug.current != $currentSlug
  ] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    mainImage {
      asset -> {
        url
      },
      alt
    }
  }
`