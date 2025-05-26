<template>
  <div>
    <BaseContent padding-y="none" width="full">
      <div class="mv">MV MV</div>
    </BaseContent>
    <BaseContent padding-y="top">
      <BaseHeadingLevel1 markup="h2">About</BaseHeadingLevel1>
      <p>text</p>
    </BaseContent>
    <BaseContent padding-y="top" bg-color="white">
      <BaseHeadingLevel1 markup="h2">News</BaseHeadingLevel1>
      <FetchStateBlock
        name="ニュース記事"
        :items="newsPosts"
        :pending="pending"
        :error-flag="errorFlag"
      >
        <NewsPosts :news-posts="newsPosts" />
      </FetchStateBlock>
      <BaseButton :to="PATHS.NEWS.path">ニュース一覧</BaseButton>
    </BaseContent>
    <BaseContent padding-y="top">
      <BaseHeadingLevel1 markup="h2">Blog</BaseHeadingLevel1>
      <FetchStateBlock
        name="ブログ記事"
        :items="blogPosts"
        :pending="blogPostsPending"
        :error-flag="blogPostsErrorFlag"
      >
        <BlogPosts :blog-posts="blogPosts" />
      </FetchStateBlock>
      <BaseButton :to="PATHS.BLOG.path">ブログ一覧</BaseButton>
    </BaseContent>
    <BaseContent padding-y="top" bg-color="primary">
      <BaseHeadingLevel1 markup="h2">Contact me</BaseHeadingLevel1>
      <p>text</p>
    </BaseContent>
  </div>
</template>

<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'
  import BaseHeadingLevel1 from '~/components/atoms/BaseHeadingLevel1.vue'
  import FetchStateBlock from '~/components/molecules/FetchStateBlock.vue'
  import NewsPosts from '~/components/molecules/NewsPosts.vue'
  import BlogPosts from '~/components/molecules/BlogPosts.vue'
  import BaseButton from '~/components/atoms/BaseButton.vue'

  const breadcrumbState = useBreadcrumbState()

  breadcrumbState.value = [{ name: 'HOME', path: '/' }]

  const breadcrumbJsonLd = useBreadcrumbJsonLd(breadcrumbState?.value)

  useHead({
    script: [
      {
        key: 'breadcrumb-jsonld',
        type: 'application/ld+json',
        innerHTML: breadcrumbJsonLd.value,
      },
    ],
  })

  // ニュース記事の一覧取得
  const {
    dataArray: newsPosts,
    errorFlag,
    pending,
  } = await useFetchMicroCMS('news', {
    limit: 3,
  })

  // ブログ記事の一覧取得
  const {
    dataArray: blogPosts,
    errorFlag: blogPostsErrorFlag,
    pending: blogPostsPending,
  } = await useFetchMicroCMS('blog', {
    limit: 3,
  })
</script>

<style scoped lang="scss">
  .mv {
    height: min(480px, calc(100vh - var(--header-height)));
    background-color: red;
  }

  :deep(.c-button) {
    margin-top: 56px;
  }
</style>
