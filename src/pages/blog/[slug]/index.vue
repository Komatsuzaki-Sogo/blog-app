<template>
  <BaseContent>
    <BaseContentWithSidenav>
      <FetchStateBlock
        name="ブログ記事"
        :items="blogPosts"
        :pending="blogPostsPending"
        :error-flag="blogPostsErrorFlag"
      >
        <BlogContent :blog-post="blogPosts[0]" />
      </FetchStateBlock>
      <FetchStateBlock
        name="ブログカテゴリ"
        :items="blogCategory"
        :pending="blogCategoryPending"
        :error-flag="blogCategoryErrorFlag"
      >
        <BlogCategories :blog-category="blogCategory" type="sidenav" />
      </FetchStateBlock>
    </BaseContentWithSidenav>
    <BaseButton :to="PATHS.BLOG.path">ブログ一覧へ戻る</BaseButton>
  </BaseContent>
</template>

<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'
  import BaseContentWithSidenav from '~/components/atoms/BaseContentWithSidenav.vue'
  import BlogContent from '~/components/pages/blog/BlogContent.vue'
  import BaseButton from '~/components/atoms/BaseButton.vue'
  import BlogCategories from '~/components/molecules/BlogCategories.vue'
  import FetchStateBlock from '~/components/molecules/FetchStateBlock.vue'

  const route = useRoute()

  // ブログカテゴリの一覧取得
  const {
    dataArray: blogCategory,
    errorFlag: blogCategoryErrorFlag,
    pending: blogCategoryPending,
  } = await useFetchMicroCMS('blog-category')

  // カテゴリがマッチするブログ記事の一覧取得
  const {
    dataArray: blogPosts,
    errorFlag: blogPostsErrorFlag,
    pending: blogPostsPending,
  } = await useFetchMicroCMS('blog', {
    filters: `slug[equals]${route.params.slug}`,
    limit: 1,
  })

  const breadcrumbState = useBreadcrumbState()

  onMounted(async () => {
    watchEffect(() => {
      if (!blogPosts.value[0]?.title) return

      breadcrumbState.value = [
        { name: 'HOME', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: `ブログ記事：${blogPosts.value[0].title}`, path: route.fullPath },
      ]
    })

    if (!blogPosts.value[0]?.title) return

    const breadcrumbJsonLd = useBreadcrumbJsonLd(breadcrumbState.value)

    useHead({
      title: `${blogPosts.value[0].title} | News | KS BLOG`,
      meta: [
        {
          name: 'description',
          content: `KS BLOGはブログサイトです。ブログカテゴリの${blogPosts.value[0].title}をご紹介。`,
        },
        {
          property: 'og:title',
          content: `${blogPosts.value[0].title} | News | KS BLOG`,
        },
        {
          property: 'og:description',
          content: `KS BLOGはブログサイトです。ブログカテゴリの${blogPosts.value[0].title}をご紹介。`,
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
