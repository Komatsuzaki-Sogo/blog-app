<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'
  import BaseHeadingLevel1 from '~/components/atoms/BaseHeadingLevel1.vue'
  import BaseText from '~/components/atoms/BaseText.vue'
  import BaseLoading from '~/components/atoms/BaseLoading.vue'
  import NewsPosts from '~/components/molecules/NewsPosts.vue'
  import type { NewsPost } from '~/types/newsPost'
  import { useBreadcrumbState } from '~/composables/useBreadcrumbState'

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

  const newsPosts = computed(() => data.value?.contents || [])
  const errorFlag = computed(() => (error.value ? true : false))
</script>

<template>
  <BaseContent>
    <BaseHeadingLevel1 sub-title="News">ニュース</BaseHeadingLevel1>

    <template v-if="!pending && newsPosts.length > 0">
      <NewsPosts :news-posts="newsPosts" />
    </template>
    <template v-else-if="!pending && errorFlag">
      <BaseText>
        <p><em>データ取得に失敗しました。再度お試しください。</em></p>
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
