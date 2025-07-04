<template>
  <BaseContent>
    <NewsContent
      v-if="matchedNewsPostData && matchedNewsPostData.contents[0]"
      :news-post="matchedNewsPostData.contents[0]"
    />
  </BaseContent>
</template>

<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'
  import NewsContent from '~/components/pages/news/NewsContent.vue'

  const route = useRoute()
  const slugArray = route.params.slug as string[]
  const fullSlug = '/' + slugArray.join('/')
  const normalizedSlug = fullSlug.replace(/\/$/, '')

  // ニュース記事の取得
  const { data: matchedNewsPostData } = await useFetchMicroCMSGetList({
    endpoint: 'news',
    filters: `slug[equals]${normalizedSlug}`,
    page: 1,
    pageLimit: 1,
  })

  if (!matchedNewsPostData.value?.contents?.length) {
    throw createError({
      statusCode: 404,
    })
  }

  const breadcrumbState = useBreadcrumbState()

  breadcrumbState.value = [
    { name: 'HOME', path: '/' },
    { name: 'News', path: '/news' },
    { name: `${matchedNewsPostData.value?.contents[0].title}`, path: route.fullPath },
  ]

  const breadcrumbJsonLd = useBreadcrumbJsonLd(breadcrumbState.value)

  useHead({
    title: `${matchedNewsPostData.value?.contents[0].title} | News | KS BLOG`,
    meta: [
      {
        name: 'description',
        content: `KS BLOGはブログサイトです。ニュース記事の${matchedNewsPostData.value?.contents[0].title}をご紹介。`,
      },
      {
        property: 'og:title',
        content: `${matchedNewsPostData.value?.contents[0].title} | News | KS BLOG`,
      },
      {
        property: 'og:description',
        content: `KS BLOGはブログサイトです。ニュース記事の${matchedNewsPostData.value?.contents[0].title}をご紹介。`,
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
</script>
