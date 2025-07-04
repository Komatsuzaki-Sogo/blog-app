import type { BreadcrumbItem } from '~/types/breadcrumb'
import { useRuntimeConfig } from '#imports'

/**
 * パンくずリストのJSON-LDを取得する
 * @param pageLists パンくずリストのデータ
 */
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
