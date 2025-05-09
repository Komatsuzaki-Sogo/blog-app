import { useRoute } from '#imports'

export interface BreadcrumbItem {
  name: string
  path: string
}

export const useBreadcrumb = () => {
  const route = useRoute()

  const pageLists = computed<BreadcrumbItem[]>(() => {
    return Array.isArray(route.meta.breadcrumb) ? route.meta.breadcrumb : []
  })

  return {
    pageLists,
  }
}
