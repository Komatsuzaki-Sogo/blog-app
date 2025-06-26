<template>
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
</template>

<script setup lang="ts">
  import { pageLimitTop } from '~/composables/utilities/pageLimit'
  import BaseContent from '~/components/atoms/BaseContent.vue'
  import BaseHeadingLevel1 from '~/components/atoms/BaseHeadingLevel1.vue'
  import BaseText from '~/components/atoms/BaseText.vue'
  import NewsPosts from '~/components/molecules/NewsPosts.vue'
  import BaseButton from '~/components/atoms/BaseButton.vue'

  const { data: newsPosts, error: newsPostsError } = await useFetchMicroCMSGetList({
    endpoint: 'news',
    pageLimit: pageLimitTop,
  })
</script>
