<script setup lang="ts">
  import BaseHeadingLevel1 from '~/components/atoms/BaseHeadingLevel1.vue'
  import BaseContentCMS from '~/components/atoms/BaseContentCMS.vue'
  import BaseButton from '~/components/atoms/BaseButton.vue'
  import ListDetailTime from '~/components/molecules/ListDetailTime.vue'
  import type { NewsPost } from '~/types/newsPost'

  defineProps<{
    newsPost: NewsPost
  }>()

  const newsBadges = [{ id: 'news', name: 'お知らせ' }]
</script>

<template>
  <BaseHeadingLevel1 type="cms" :badges="newsBadges">
    {{ newsPost.title }}
  </BaseHeadingLevel1>
  <ListDetailTime
    :published-at="newsPost.publishedAt"
    :updated-at="newsPost.updatedAt"
    class="mt-0"
  />
  <BaseContentCMS :content="newsPost.contents" />
  <BaseButton :to="PATHS.NEWS.path">ニュース一覧へ戻る</BaseButton>
</template>
