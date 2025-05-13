/**
 * ニュース投稿の型定義
 */
export type NewsPost = {
  id: string // unique id
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  title: string
  description: string
  slug: string
  content: string
}
