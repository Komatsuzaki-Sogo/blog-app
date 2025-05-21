import type { NewsPost } from '~/types/newsPost'
import type { MicroCMSQueries } from 'microcms-js-sdk'

export const useFetchMicroCMS = async (endpoint: string, queries?: MicroCMSQueries) => {
  const { data, error, pending } = await useMicroCMSGetList<NewsPost>({
    endpoint: endpoint,
    queries: {
      orders: '-publishedAt',
      ...queries,
    },
  })

  return {
    data,
    error,
    pending,
  }
}
