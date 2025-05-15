import type { BlogPost } from '~/types/blogPost'

type Queries = {
  limit?: number
  filters?: string
}

export const useFetchBlogPosts = (queries?: Queries) => {
  const fetchBlogPosts = async () => {
    const { data, error } = await useMicroCMSGetList<BlogPost>({
      endpoint: 'blog',
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

  const { data, error, pending: blogPostsPending } = useAsyncData('blog', fetchBlogPosts)
  const blogPosts = computed(() => data.value?.contents || [])
  const blogPostsErrorFlag = computed(() => !!error.value)

  return {
    blogPosts,
    blogPostsErrorFlag,
    blogPostsPending,
  }
}
