import type { NewsPost } from '~/types/newsPost'

type Queries = {
  limit?: number
  filters?: string
}

export const useFetchNewsPosts = async (queries?: Queries) => {
  const fetchNews = async () => {
    const { data, error } = await useMicroCMSGetList<NewsPost>({
      endpoint: 'news',
      queries: {
        orders: '-publishedAt',
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

  const { data, error, pending } = await useAsyncData('news', fetchNews, { server: true })

  const newsPosts = computed(() => data.value?.contents || [])
  const errorFlag = computed(() => !!error.value)

  return {
    newsPosts,
    errorFlag,
    pending,
  }
}
