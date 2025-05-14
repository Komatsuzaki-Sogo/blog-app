<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'
  import BaseHeadingLevel1 from '~/components/atoms/BaseHeadingLevel1.vue'
  // import { useRoute } from 'vue-router'
  // import type { NewsPost } from '~/types/newsPost'

  // const route = useRoute()
  // const slugArray = route.params.slug as string[]
  // const fullSlug = '/' + slugArray.join('/')

  // const { data } = await useMicroCMSGetList<NewsPost>({
  //   endpoint: 'news',
  //   queries: {
  //     filters: `slug[equals]${fullSlug}`,
  //     limit: 1,
  //   },
  // })

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
</script>

<template>
  <BaseContent>
    <div>
      <!-- <BaseHeadingLevel1 sub-title="News">{{ data?.contents[0].title }}</BaseHeadingLevel1>
      <div>{{ data }}</div> -->
      test
    </div>
  </BaseContent>
</template>
