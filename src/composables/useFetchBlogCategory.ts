import type { BlogCategory } from '~/types/blogCategory'

type Queries = {
  limit?: number
  filters?: string
}

export const useFetchBlogCategory = (queries?: Queries) => {
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

  const {
    data,
    error,
    pending: blogCategoryPending,
  } = useAsyncData('blog-category', fetchBlogCategory)
  const blogCategory = computed(() => data.value?.contents || [])
  const blogCategoryErrorFlag = computed(() => !!error.value)

  return {
    blogCategory,
    blogCategoryErrorFlag,
    blogCategoryPending,
  }
}
