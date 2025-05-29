import type { NewsPost } from '~/types/newsPost'
import type { BlogPost } from '~/types/blogPost'
import type { BlogCategory } from '~/types/blogCategory'

/**
 * endpointごとの型をマップ
 */
export type EndpointMap = {
  news: NewsPost
  blog: BlogPost
  'blog-category': BlogCategory
}

export type ValidEndpoint = keyof EndpointMap

export type GetListPerPage<T extends ValidEndpoint> = {
  endpoint: T
  filters?: string
  page?: number
  pageLimit?: number
}

export type GetTotalCount<T extends ValidEndpoint> = {
  endpoint: T
  filters?: string
}
