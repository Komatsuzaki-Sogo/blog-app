import type { NewsPost } from '~/types/newsPost'
import type { MicroCMSQueries } from 'microcms-js-sdk'

export const useFetchNewsPosts = async (queries?: MicroCMSQueries) => {
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

  const { data, error, pending } = await useAsyncData('news', fetchNews)

  const newsPosts = computed(() => data.value?.contents || [])
  const errorFlag = computed(() => !!error.value)

  return {
    newsPosts,
    errorFlag,
    pending,
  }
}
