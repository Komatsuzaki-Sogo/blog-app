<template>
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
</template>

<script setup lang="ts">
  import { pageLimitTop } from '~/composables/utilities/pageLimit'
  import BaseContent from '~/components/atoms/BaseContent.vue'
  import BaseHeadingLevel1 from '~/components/atoms/BaseHeadingLevel1.vue'
  import BaseText from '~/components/atoms/BaseText.vue'
  import BlogPosts from '~/components/molecules/BlogPosts.vue'
  import BaseButton from '~/components/atoms/BaseButton.vue'

  const { data: blogPosts, error: blogPostsError } = await useFetchMicroCMSGetList({
    endpoint: 'blog',
    pageLimit: pageLimitTop,
  })
</script>
