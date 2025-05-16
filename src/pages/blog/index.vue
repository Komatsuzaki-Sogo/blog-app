<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'
  import BaseHeadingLevel1 from '~/components/atoms/BaseHeadingLevel1.vue'
  import BaseText from '~/components/atoms/BaseText.vue'
  import BaseLoading from '~/components/atoms/BaseLoading.vue'
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

<template>
  <BaseContent>
    <BaseHeadingLevel1 sub-title="Blog">ブログ</BaseHeadingLevel1>

    <template v-if="!blogCategoryPending && blogCategory.length > 0">
      <BlogCategories :blog-category="blogCategory" />
    </template>
    <template v-else-if="!blogCategoryPending && blogCategoryErrorFlag">
      <BaseText>
        <p><em>データ取得に失敗しました。再度お試しください。</em></p>
      </BaseText>
    </template>
    <template v-else-if="!blogCategoryPending">
      <BaseText>
        <p><em>お知らせ情報が1件もありませんでした。</em></p>
      </BaseText>
    </template>
    <template v-else>
      <BaseLoading />
    </template>

    <template v-if="!blogPostsPending && blogPosts.length > 0">
      <BlogPosts :blog-posts="blogPosts" />
    </template>
    <template v-else-if="!blogPostsPending && blogPostsErrorFlag">
      <BaseText>
        <p><em>データ取得に失敗しました。再度お試しください。</em></p>
      </BaseText>
    </template>
    <template v-else-if="!blogPostsPending">
      <BaseText>
        <p><em>お知らせ情報が1件もありませんでした。</em></p>
      </BaseText>
    </template>
    <template v-else>
      <BaseLoading />
    </template>
  </BaseContent>
</template>
