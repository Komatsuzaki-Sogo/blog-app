<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'
  import BaseHeadingLevel1 from '~/components/atoms/BaseHeadingLevel1.vue'
  import BaseText from '~/components/atoms/BaseText.vue'
  import BaseLoading from '~/components/atoms/BaseLoading.vue'
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

  const fetchNews = async () => {
    const { data, error } = await useMicroCMSGetList<NewsPost>({
      endpoint: 'news',
      queries: {
        orders: '-publishedAt',
      },
    })

    if (error.value) {
      throw createError({
        statusCode: 500,
        statusMessage: 'MicroCMS API error',
      })
    }

    return data.value
  }

  const { data, error, pending } = await useAsyncData('news', fetchNews)

  const newsLists = computed(() => data.value?.contents || [])
  const errorFlag = computed(() => (error.value ? true : false))
</script>

<template>
  <BaseContent>
    <BaseHeadingLevel1 sub-title="News">ニュース</BaseHeadingLevel1>

    <template v-if="!pending && newsLists.length > 0">
      <NewsLists :news-posts="newsLists" />
    </template>
    <template v-else-if="!pending && errorFlag">
      <BaseText>
        <p><em>データ取得に失敗しました。</em></p>
      </BaseText>
    </template>
    <template v-else-if="!pending">
      <BaseText>
        <p><em>お知らせ情報が1件もありませんでした。</em></p>
      </BaseText>
    </template>
    <template v-else>
      <BaseLoading />
    </template>
  </BaseContent>
</template>
