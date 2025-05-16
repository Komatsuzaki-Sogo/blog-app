/**
 * ブログカテゴリの型定義
 */
export type BlogCategory = {
  /** 投稿の一意なID */
  id: string

  /** タイトル */
  name: string

  /** 投稿のスラッグ（URLなどで使用） */
  slug: string
}
