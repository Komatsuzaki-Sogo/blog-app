<template>
  <BaseHeadingLevel1 sub-title="Blog">{{ blogPost.title }}</BaseHeadingLevel1>
  <BaseContentCMS :content="blogPost.contents" />
  <ListDetailTime :published-at="blogPost.publishedAt" :updated-at="blogPost.updatedAt" />
  <BaseButton :to="PATHS.BLOG.path">ブログ一覧へ戻る</BaseButton>
</template>

<script setup lang="ts">
  import BaseHeadingLevel1 from '~/components/atoms/BaseHeadingLevel1.vue'
  import BaseContentCMS from '~/components/atoms/BaseContentCMS.vue'
  import BaseButton from '~/components/atoms/BaseButton.vue'
  import ListDetailTime from '~/components/molecules/ListDetailTime.vue'
  import type { BlogPost } from '~/types/blogPost'
  defineProps<{
    blogPost: BlogPost
  }>()
</script>
