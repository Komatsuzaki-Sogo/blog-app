import { createClient } from 'microcms-js-sdk'

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
})

/**
 * ニュースの詳細ページルートを取得する
 */
export const useNewsRoutes = async (): Promise<string[]> => {
  const res = await client.get({ endpoint: 'news', queries: { limit: 100 } })
  return res.contents.map((news: { slug: string }) => `/news${news.slug}`)
}

/**
 * ブログ記事の詳細ページルートを取得する
 */
export const useBlogArticleRoutes = async (): Promise<string[]> => {
  const res = await client.get({ endpoint: 'blog', queries: { limit: 100 } })
  return res.contents.map((blog: { slug: string }) => `/blog/article/${blog.slug}`)
}

/**
 * ブログ一覧ページのページネーションルートを取得する
 */
export const useBlogListRoutes = async (pageLimit: number): Promise<string[]> => {
  try {
    const res = await client.get({
      endpoint: 'blog',
      queries: { limit: pageLimit },
    })
    const total = res.totalCount || 0
    const totalPages = Math.ceil(total / pageLimit)
    return Array.from({ length: totalPages }, (_, i) => `/blog/${i + 1}`)
  } catch (e) {
    console.error('ブログ一覧の件数取得に失敗しました:', e)
    return []
  }
}

/**
 * ブログカテゴリごとの一覧ページルートを取得する
 */
export const useBlogCategoryRoutes = async (pageLimit: number): Promise<string[]> => {
  const routes: string[] = []

  try {
    const categoryRes = await client.get({
      endpoint: 'blog-category',
      queries: { limit: 100 },
    })

    const categories: { id: string; slug: string }[] = categoryRes.contents

    for (const category of categories) {
      try {
        const res = await client.get({
          endpoint: 'blog',
          queries: {
            limit: pageLimit,
            filters: `blog-category[contains]${category.id}`,
          },
        })

        const total = res.totalCount || 0
        const totalPages = Math.max(1, Math.ceil(total / pageLimit))

        for (let i = 1; i <= totalPages; i++) {
          routes.push(`/blog/category/${category.slug}/${i}`)
        }
      } catch (e) {
        console.error(`カテゴリ「${category.slug}」の記事取得失敗:`, e)
      }
    }
  } catch (e) {
    console.error('カテゴリ一覧の取得に失敗しました:', e)
  }

  return routes
}
