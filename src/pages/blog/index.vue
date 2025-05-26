<template>
  <BaseContent>
    <BaseHeadingLevel1 sub-title="Blog">ブログ</BaseHeadingLevel1>

    <FetchStateBlock
      name="ブログカテゴリ"
      :items="blogCategory"
      :pending="blogCategoryPending"
      :error-flag="blogCategoryErrorFlag"
    >
      <BlogCategories :blog-category="blogCategory" />
    </FetchStateBlock>

    <FetchStateBlock
      name="ブログ記事"
      :items="blogPosts"
      :pending="blogPostsPending"
      :error-flag="blogPostsErrorFlag"
    >
      <BlogPosts :blog-posts="blogPosts" />
      <BasePagination :total-count="blogPostsTotal" :per-page="limit" :current-page="currentPage" />
    </FetchStateBlock>
  </BaseContent>
</template>

<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'
  import BaseHeadingLevel1 from '~/components/atoms/BaseHeadingLevel1.vue'
  import BasePagination from '~/components/atoms/BasePagination.vue'
  import FetchStateBlock from '~/components/molecules/FetchStateBlock.vue'
  import BlogCategories from '~/components/molecules/BlogCategories.vue'
  import BlogPosts from '~/components/molecules/BlogPosts.vue'
  import type { BlogPost } from '~/types/blogPost'

  const breadcrumbState = useBreadcrumbState()

  breadcrumbState.value = [
    { name: 'HOME', path: '/' },
    { name: 'Blog', path: '/blog' },
  ]

  const breadcrumbJsonLd = useBreadcrumbJsonLd(breadcrumbState?.value)

  useHead({
    title: 'Blog | KS BLOG',
    meta: [
      {
        name: 'description',
        content: 'KS BLOGはブログサイトです。ブログ記事をご紹介。',
      },
      {
        property: 'og:title',
        content: 'Blog | KS BLOG',
      },
      {
        property: 'og:description',
        content: 'KS BLOGはブログサイトです。ブログ記事をご紹介。',
      },
      { property: 'og:type', content: 'article' },
    ],
    script: [
      {
        key: 'breadcrumb-jsonld',
        type: 'application/ld+json',
        innerHTML: breadcrumbJsonLd.value,
      },
    ],
  })

  // ブログカテゴリの一覧取得
  const {
    dataArray: blogCategory,
    errorFlag: blogCategoryErrorFlag,
    pending: blogCategoryPending,
  } = await useFetchMicroCMS('blog-category', {
    limit: 100,
  })

  const route = useRoute()
  const currentPage = computed(() => parseInt((route.query.page as string) || '1', 10))
  const limit = 2
  const offset = computed(() => (currentPage.value - 1) * limit)

  // ブログ記事の一覧取得
  const blogPosts = ref<BlogPost[]>([])
  const blogPostsPending = ref(true)
  const blogPostsErrorFlag = ref(false)
  const blogPostsTotal = ref(0)

  const { dataArray, totalCount, errorFlag, pending } = await useFetchMicroCMS('blog', {
    limit,
    offset: offset.value,
  })

  blogPosts.value = dataArray.value
  blogPostsTotal.value = totalCount.value
  blogPostsErrorFlag.value = errorFlag.value
  blogPostsPending.value = pending.value

  const fetchBlogPosts = async () => {
    blogPostsPending.value = true
    try {
      const { dataArray, totalCount, errorFlag, pending } = await useFetchMicroCMS('blog', {
        limit,
        offset: offset.value,
      })

      blogPosts.value = dataArray.value
      blogPostsTotal.value = totalCount.value
      blogPostsErrorFlag.value = errorFlag.value
      blogPostsPending.value = pending.value
    } catch (error) {
      blogPostsErrorFlag.value = true
      console.error(error)
    } finally {
      blogPostsPending.value = false

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  watch(offset, () => {
    fetchBlogPosts()
  })
</script>
