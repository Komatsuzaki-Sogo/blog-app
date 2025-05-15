<script setup lang="ts">
  import BaseHeadingLevel1 from '~/components/atoms/BaseHeadingLevel1.vue'
  import BaseContentCMS from '~/components/atoms/BaseContentCMS.vue'
  import BaseButton from '~/components/atoms/BaseButton.vue'
  import ListDetailTime from '~/components/molecules/ListDetailTime.vue'
  import type { NewsPost } from '~/types/newsPost'

  defineProps<{
    newsList: NewsPost
  }>()
</script>

<template>
  <BaseHeadingLevel1 sub-title="News">{{ newsList.title }}</BaseHeadingLevel1>
  <BaseContentCMS :content="newsList.contents" />
  <ListDetailTime :published-at="newsList.publishedAt" :updated-at="newsList.updatedAt" />
  <BaseButton :to="PATHS.NEWS.path">ニュース一覧へ戻る</BaseButton>
</template>
