/**
 * ISO 8601 日付文字列を「YYYY/MM/DD」形式にフォーマットする
 * @param isoString - 例: '2025-05-01T07:00:48.000Z'
 * @returns フォーマット済みの日付文字列 - 例: '2025/05/01'
 */
export const useFormatDate = (isoString: string): string => {
  const date = new Date(isoString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}/${month}/${day}`
}
