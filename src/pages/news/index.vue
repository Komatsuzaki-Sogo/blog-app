<template>
  <BaseContent>
    <BaseHeadingLevel1 sub-title="News">ニュース</BaseHeadingLevel1>

    <h2>{{ data }}</h2>
  </BaseContent>
</template>

<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'
  import BaseHeadingLevel1 from '~/components/atoms/BaseHeadingLevel1.vue'
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

  const { data } = await useMicroCMSGetList<NewsPost>({
    endpoint: 'news',
  })
</script>
