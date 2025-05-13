<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'
  import BaseHeadingLevel1 from '~/components/atoms/BaseHeadingLevel1.vue'
  import NewsLists from '~/components/molecules/NewsLists.vue'
  import type { NewsPost } from '~/types/newsPost'

  const pageLists = [
    { name: 'HOME', path: '/' },
    { name: 'News', path: '/news' },
  ]

  definePageMeta({
    breadcrumb: pageLists,
  })

  const breadcrumbJsonLd = useBreadcrumbJsonLd(pageLists)

  useHead({
    title: 'News | KS BLOG',
    meta: [
      {
        name: 'description',
        content: 'KS BLOGはブログサイトです。ニュース記事をご紹介。',
      },
      {
        property: 'og:title',
        content: 'About | KS BLOG',
      },
      {
        property: 'og:description',
        content: 'KS BLOGはブログサイトです。ニュース記事をご紹介。',
      },
      { property: 'og:type', content: 'article' },
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: breadcrumbJsonLd.value,
      },
    ],
  })

  const { data, error } = await useMicroCMSGetList<NewsPost>({
    endpoint: 'news',
    queries: {
      orders: '-publishedAt',
    },
  })
</script>

<template>
  <BaseContent>
    <BaseHeadingLevel1 sub-title="News">ニュース</BaseHeadingLevel1>

    <template v-if="data && data.contents.length > 0">
      <NewsLists :news-posts="data.contents" />
    </template>
    <template v-else-if="error">
      <p>error</p>
    </template>
    <template v-else>
      <p>none</p>
    </template>
  </BaseContent>
</template>
