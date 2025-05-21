<template>
  <BaseContent>
    <BaseHeadingLevel1 sub-title="News">ニュース</BaseHeadingLevel1>

    <template v-if="!pending && newsPosts && newsPosts?.contents.length > 0">
      <NewsPosts :news-posts="newsPosts?.contents" />
    </template>
    <template v-else-if="!pending && errorFlag">
      <BaseText>
        <p>
          <em>データ取得に失敗しました。再度お試しください。</em>
        </p>
      </BaseText>
    </template>
    <template v-else-if="!pending">
      <BaseText>
        <p>
          <em>データがありませんでした。</em>
        </p>
      </BaseText>
    </template>
    <template v-else>
      <BaseLoading />
    </template>
  </BaseContent>
</template>

<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'
  import BaseHeadingLevel1 from '~/components/atoms/BaseHeadingLevel1.vue'
  // import FetchStateBlock from '~/components/molecules/FetchStateBlock.vue'
  import NewsPosts from '~/components/molecules/NewsPosts.vue'
  import type { NewsPost } from '~/types/newsPost'

  const breadcrumbState = useBreadcrumbState()

  breadcrumbState.value = [
    { name: 'HOME', path: '/' },
    { name: 'News', path: '/news' },
  ]

  const breadcrumbJsonLd = useBreadcrumbJsonLd(breadcrumbState?.value)

  useHead({
    title: 'News | KS BLOG',
    meta: [
      {
        name: 'description',
        content: 'KS BLOGはブログサイトです。ニュース記事をご紹介。',
      },
      {
        property: 'og:title',
        content: 'News | KS BLOG',
      },
      {
        property: 'og:description',
        content: 'KS BLOGはブログサイトです。ニュース記事をご紹介。',
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

  const {
    data: newsPosts,
    error: errorFlag,
    pending,
  } = await useMicroCMSGetList<NewsPost>({
    endpoint: 'news',
  })
</script>
