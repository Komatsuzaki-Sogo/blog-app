/**
 * 指定の日付が現在から7日以内（当日含む）かどうかを判定する
 * @param dateString ISO 8601形式の日付（例: '2025-05-13T07:00:48.362Z'）
 * @returns true（7日以内）または false（それ以外）
 */
export const useIsNewContent = (dateString: string): boolean => {
  const input = new Date(dateString)
  const inputDateOnly = new Date(input.getFullYear(), input.getMonth(), input.getDate())

  const now = new Date()
  const todayDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  const diffTime = todayDateOnly.getTime() - inputDateOnly.getTime()
  const diffDays = diffTime / (1000 * 60 * 60 * 24)

  return diffDays <= 7 && diffDays >= 0
}
