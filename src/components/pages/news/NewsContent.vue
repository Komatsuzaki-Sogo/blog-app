<script setup lang="ts">
  import BaseHeadingLevel1 from '~/components/atoms/BaseHeadingLevel1.vue'
  import BaseContentCMS from '~/components/atoms/BaseContentCMS.vue'
  import BaseButton from '~/components/atoms/BaseButton.vue'
  import ListDetailTime from '~/components/molecules/ListDetailTime.vue'
  import type { NewsPost } from '~/types/newsPost'

  defineProps<{
    newsPost: NewsPost
  }>()
</script>

<template>
  <BaseHeadingLevel1 sub-title="News">{{ newsPost.title }}</BaseHeadingLevel1>
  <BaseContentCMS :content="newsPost.contents" />
  <ListDetailTime :published-at="newsPost.publishedAt" :updated-at="newsPost.updatedAt" />
  <BaseButton :to="PATHS.NEWS.path">ニュース一覧へ戻る</BaseButton>
</template>
