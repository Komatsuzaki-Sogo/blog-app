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
