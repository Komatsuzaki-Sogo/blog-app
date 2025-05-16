import type { BlogCategory } from '~/types/blogCategory'

type Queries = {
  limit?: number
  filters?: string
}

export const useFetchBlogCategory = async (queries?: Queries) => {
  const fetchBlogCategory = async () => {
    const { data, error } = await useMicroCMSGetList<BlogCategory>({
      endpoint: 'blog-category',
      queries: {
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

  const asyncKey = queries ? `blog-category-filtered-${queries.filters ?? ''}` : 'blog-category'

  const {
    data,
    error,
    pending: blogCategoryPending,
  } = await useAsyncData(asyncKey, fetchBlogCategory)
  const blogCategory = computed(() => data.value?.contents || [])
  const blogCategoryErrorFlag = computed(() => !!error.value)

  return {
    blogCategory,
    blogCategoryErrorFlag,
    blogCategoryPending,
  }
}
