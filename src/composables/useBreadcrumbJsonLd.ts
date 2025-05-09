import type { BreadcrumbItem } from '~/composables/useBreadcrumb'
import { useRuntimeConfig } from '#imports'

export const useBreadcrumbJsonLd = (pageLists: BreadcrumbItem[]) => {
  const config = useRuntimeConfig()
  const baseHost = config.public.NUXT_APP_BASE_HOST

  const breadcrumbJsonLd = computed(() => {
    const itemListElement = pageLists.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseHost}${item.path}`,
    }))

    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: itemListElement,
    })
  })

  return breadcrumbJsonLd
}
