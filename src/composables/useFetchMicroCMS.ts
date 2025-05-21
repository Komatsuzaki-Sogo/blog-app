import type { MicroCMSQueries } from 'microcms-js-sdk'
import type { NewsPost } from '~/types/newsPost'
import type { BlogPost } from '~/types/blogPost'
import type { BlogCategory } from '~/types/blogCategory'

// endpointごとの型をマップ
type EndpointMap = {
  news: NewsPost
  blog: BlogPost
  'blog-category': BlogCategory
}

type ValidEndpoint = keyof EndpointMap

export const useFetchMicroCMS = async <T extends ValidEndpoint>(
  endpoint: T,
  queries?: MicroCMSQueries,
) => {
  const fetchGetList = async () => {
    const { data, error } = await useMicroCMSGetList<EndpointMap[T]>({
      endpoint,
      queries: {
        ...(endpoint !== 'blog-category' ? { orders: '-publishedAt' } : {}),
        ...queries,
      },
    })

    if (error.value) {
      throw createError({
        statusCode: 500,
        statusMessage: 'MicroCMS API error',
      })
    }

    return data.value
  }

  const asyncKey = queries ? `${endpoint}-filtered-${queries.filters ?? ''}` : `${endpoint}`

  const { data, error, pending } = await useAsyncData(asyncKey, fetchGetList)

  const dataArray = computed(() => data.value?.contents || []) as ComputedRef<EndpointMap[T][]>
  const errorFlag = computed(() => !!error.value)

  return {
    dataArray,
    errorFlag,
    pending,
  }
}
