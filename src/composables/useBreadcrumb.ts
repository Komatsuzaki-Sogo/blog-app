import { useRoute } from '#imports'
import type { BreadcrumbItem } from '~/types/breadcrumb'

/**
 * パンくずリストのデータを取得する
 */
export const useBreadcrumb = () => {
  const route = useRoute()

  const pageLists = computed<BreadcrumbItem[]>(() => {
    return Array.isArray(route.meta.breadcrumb) ? route.meta.breadcrumb : []
  })

  return {
    pageLists,
  }
}
