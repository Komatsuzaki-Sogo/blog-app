import type { BlogCategory } from './blogCategory'

/**
 * アイキャッチ画像の型定義
 */
type Eyecatch = {
  /** 画像URL */
  url: string

  /** 画像の高さ */
  height: number

  /** 画像の幅 */
  width: number
}

/**
 * ブログコンテンツの型定義
 */
export type BlogContent = {
  /** カスタムフィールドのID */
  fieldId: 'customBlogContent'

  /** リッチeditorのコンテンツ */
  richEditor?: string

  /** HTML直書きのコンテンツ */
  HTML?: string
}

/**
 * ブログ投稿の型定義
 */
export type BlogPost = {
  /** 投稿の一意なID */
  id: string

  /** 作成日時（ISO形式） */
  createdAt: string

  /** 更新日時（ISO形式） */
  updatedAt: string

  /** 公開日時（ISO形式） */
  publishedAt: string

  /** 修正日時（ISO形式） */
  revisedAt: string

  /** ブログのタイトル */
  title: string

  /** 投稿のスラッグ（URLなどで使用） */
  slug: string

  /** アイキャッチ */
  eyecatch?: Eyecatch

  /** ブログカテゴリ */
  'blog-category': BlogCategory[]

  /** ブログコンテンツ */
  contents: BlogContent[]
}
