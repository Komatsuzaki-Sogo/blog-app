/**
 * ブレイクポイント (MediaQueryListで参照されるメジャーブレイクポイント)
 */
export const majorBreakPoint = 768
export const minorBreakPoint = 1024

/**
 * 指定したブレイクポイントで matchMedia を返すユーティリティ
 * @param query メディアクエリ（例: '(min-width: 1024px)'）
 * @returns MediaQueryList
 */
export const getMediaQueryList = (query: number = majorBreakPoint): MediaQueryList => {
  return window.matchMedia(`(min-width:${query}px)`)
}
