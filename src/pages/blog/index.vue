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
    </FetchStateBlock>
  </BaseContent>
</template>

<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'
  import BaseHeadingLevel1 from '~/components/atoms/BaseHeadingLevel1.vue'
  import FetchStateBlock from '~/components/molecules/FetchStateBlock.vue'
  import BlogCategories from '~/components/molecules/BlogCategories.vue'
  import BlogPosts from '~/components/molecules/BlogPosts.vue'

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

  const { blogCategory, blogCategoryErrorFlag, blogCategoryPending } = await useFetchBlogCategory()
  const { blogPosts, blogPostsErrorFlag, blogPostsPending } = await useFetchBlogPosts()
</script>
