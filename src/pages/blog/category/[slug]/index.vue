<template>
  <BaseContent>
    <BaseHeadingLevel1 sub-title="Blogカテゴリ">
      {{ blogMatchCategory[0].name }}
    </BaseHeadingLevel1>

    <FetchStateBlock
      name="ブログカテゴリ"
      :items="blogCategoryAll"
      :pending="blogCategoryAllPending"
      :error-flag="blogCategoryAllErrorFlag"
    >
      <BlogCategories :blog-category="blogCategoryAll" />
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
  import BlogCategories from '~/components/molecules/BlogCategories.vue'
  import BlogPosts from '~/components/molecules/BlogPosts.vue'
  import FetchStateBlock from '~/components/molecules/FetchStateBlock.vue'
  import type { BlogPost } from '~/types/blogPost'

  const route = useRoute()

  // マッチするブログカテゴリの取得
  const { dataArray: blogMatchCategory } = await useFetchMicroCMS('blog-category', {
    filters: `slug[equals]${route.params.slug}`,
    limit: 1,
  })

  // ブログカテゴリの一覧取得
  const {
    dataArray: blogCategoryAll,
    errorFlag: blogCategoryAllErrorFlag,
    pending: blogCategoryAllPending,
  } = await useFetchMicroCMS('blog-category', {
    limit: 100,
  })

  const currentPage = computed(() => parseInt((route.query.page as string) || '1', 10))
  const limit = 12
  const offset = computed(() => (currentPage.value - 1) * limit)

  // マッチするブログ記事の取得
  const blogPosts = ref<BlogPost[]>([])
  const blogPostsPending = ref(true)
  const blogPostsErrorFlag = ref(false)
  const blogPostsTotal = ref(0)
  const { dataArray, totalCount, errorFlag, pending } = await useFetchMicroCMS('blog', {
    filters: `blog-category[contains]${blogMatchCategory.value[0]?.id}`,
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
        filters: `blog-category[contains]${blogMatchCategory.value[0]?.id}`,
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

  const breadcrumbState = useBreadcrumbState()

  onMounted(async () => {
    watchEffect(() => {
      if (!blogMatchCategory.value[0]?.name) return

      breadcrumbState.value = [
        { name: 'HOME', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: `ブログカテゴリ：${blogMatchCategory.value[0].name}`, path: route.fullPath },
      ]
    })

    if (!blogMatchCategory.value[0]?.name) return

    const breadcrumbJsonLd = useBreadcrumbJsonLd(breadcrumbState.value)

    useHead({
      title: `${blogMatchCategory.value[0].name} | News | KS BLOG`,
      meta: [
        {
          name: 'description',
          content: `KS BLOGはブログサイトです。ブログカテゴリの${blogMatchCategory.value[0].name}をご紹介。`,
        },
        {
          property: 'og:title',
          content: `${blogMatchCategory.value[0].name} | News | KS BLOG`,
        },
        {
          property: 'og:description',
          content: `KS BLOGはブログサイトです。ブログカテゴリの${blogMatchCategory.value[0].name}をご紹介。`,
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
  })
</script>
