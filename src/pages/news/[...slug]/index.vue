<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'
  import BaseHeadingLevel1 from '~/components/atoms/BaseHeadingLevel1.vue'
  import { useRoute } from 'vue-router'
  import type { NewsPost } from '~/types/newsPost'

  const route = useRoute()
  const slugArray = route.params.slug as string[]
  const fullSlug = '/' + slugArray.join('/')

  const fetchNewsDetail = async () => {
    const { data, error } = await useMicroCMSGetList<NewsPost>({
      endpoint: 'news',
      queries: {
        filters: `slug[equals]${fullSlug}`,
        limit: 1,
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

  const { data, error, pending } = await useAsyncData('news', fetchNewsDetail)

  const newsList = computed(() => data.value?.contents[0])
  const errorFlag = computed(() => (error.value ? true : false))

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
      <template v-if="!pending && newsList">
        <BaseHeadingLevel1 sub-title="News">{{ newsList.title }}</BaseHeadingLevel1>
        <div>{{ newsList }}</div>
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
    </div>
  </BaseContent>
</template>
