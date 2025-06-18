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

/**
 * `EndpointMap` に定義された有効なエンドポイントのキー型。
 */
export type ValidEndpoint = keyof EndpointMap

/**
 * ページごとのリストデータを取得するためのパラメータ型。
 * @template T - 有効なエンドポイント
 */
export type GetListPerPage<T extends ValidEndpoint> = {
  endpoint: T
  filters?: string
  page?: number
  pageLimit?: number
}

/**
 * 総件数（totalCount）のみを取得するためのパラメータ型。
 * @template T - 有効なエンドポイント
 */
export type GetTotalCount<T extends ValidEndpoint> = {
  endpoint: T
  filters?: string
}
