<template>
  <div>
    <BaseContent padding-y="none" width="full">
      <div class="mv">MV MV</div>
    </BaseContent>
    <BaseContent padding-y="top">
      <BaseHeadingLevel1 markup="h2">About</BaseHeadingLevel1>
      <p>text</p>
    </BaseContent>
    <BaseContent padding-y="top" bg-color="gray">
      <BaseHeadingLevel1 markup="h2">News</BaseHeadingLevel1>

      <template v-if="newsPosts && newsPosts?.contents.length > 0">
        <NewsPosts :news-posts="newsPosts.contents" />
      </template>
      <template v-else-if="newsPostsError">
        <BaseText>
          <p>
            <em>ニュース一覧のデータの取得に失敗しました。</em>
          </p>
        </BaseText>
      </template>
      <template v-else>
        <BaseText>
          <p>
            <em>ニュース一覧のデータがありませんでした。</em>
          </p>
        </BaseText>
      </template>

      <BaseButton :to="PATHS.NEWS.path">ニュース一覧</BaseButton>
    </BaseContent>
    <BaseContent padding-y="top">
      <BaseHeadingLevel1 markup="h2">Blog</BaseHeadingLevel1>

      <template v-if="blogPosts && blogPosts?.contents.length > 0">
        <BlogPosts :blog-posts="blogPosts.contents" />
      </template>
      <template v-else-if="blogPostsError">
        <BaseText>
          <p>
            <em>ブログ一覧のデータの取得に失敗しました。</em>
          </p>
        </BaseText>
      </template>
      <template v-else>
        <BaseText>
          <p>
            <em>ブログ一覧のデータがありませんでした。</em>
          </p>
        </BaseText>
      </template>

      <BaseButton :to="PATHS.BLOG.path">ブログ一覧</BaseButton>
    </BaseContent>
    <BaseContent padding-y="top" bg-color="primary">
      <BaseHeadingLevel1 markup="h2">Contact me</BaseHeadingLevel1>
      <p>text</p>
    </BaseContent>
  </div>
</template>

<script setup lang="ts">
  import { pageLimitTop } from '~/composables/utilities/pageLimit'
  import BaseContent from '~/components/atoms/BaseContent.vue'
  import BaseHeadingLevel1 from '~/components/atoms/BaseHeadingLevel1.vue'
  import BaseText from '~/components/atoms/BaseText.vue'
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

  const { data: newsPosts, error: newsPostsError } = await useFetchMicroCMSGetList({
    endpoint: 'news',
    pageLimit: pageLimitTop,
  })

  const { data: blogPosts, error: blogPostsError } = await useFetchMicroCMSGetList({
    endpoint: 'blog',
    pageLimit: pageLimitTop,
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
