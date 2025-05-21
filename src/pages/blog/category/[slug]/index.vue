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
    </FetchStateBlock>
  </BaseContent>
</template>

<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'
  import BaseHeadingLevel1 from '~/components/atoms/BaseHeadingLevel1.vue'
  import BlogCategories from '~/components/molecules/BlogCategories.vue'
  import BlogPosts from '~/components/molecules/BlogPosts.vue'
  import FetchStateBlock from '~/components/molecules/FetchStateBlock.vue'

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
  } = await useFetchMicroCMS('blog-category')

  // マッチするブログ記事の取得
  const {
    dataArray: blogPosts,
    errorFlag: blogPostsErrorFlag,
    pending: blogPostsPending,
  } = await useFetchMicroCMS('blog', {
    filters: `blog-category[contains]${blogMatchCategory.value[0]?.id}`,
  })

  const breadcrumbState = useBreadcrumbState()

  onMounted(async () => {
    watchEffect(() => {
      if (!blogMatchCategory.value[0]?.name) return

      breadcrumbState.value = [
        { name: 'HOME', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: blogMatchCategory.value[0].name, path: route.fullPath },
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
