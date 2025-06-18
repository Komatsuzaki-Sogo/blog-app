/**
 * ニュースコンテンツの型定義
 */
export type NewsContent = {
  /** カスタムフィールドのID */
  fieldId: 'customNewsContent'

  /** リッチeditorのコンテンツ */
  richEditor?: string

  /** HTML直書きのコンテンツ */
  HTML?: string
}

/**
 * ニュース投稿の型定義
 */
export type NewsPost = {
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

  /** ニュースのタイトル */
  title: string

  /** 投稿のスラッグ（URLなどで使用） */
  slug: string

  /** ニュース本文（HTMLまたはMarkdown形式） */
  contents: NewsContent[]
}
