<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'
  import NewsContent from '~/components/pages/news/NewsContent.vue'
  import { useBreadcrumbState } from '~/composables/useBreadcrumbState'
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

  const { data, pending, error } = await useAsyncData('news', fetchNewsDetail)

  const newsPost = computed(() => data.value?.contents[0])
  const errorFlag = computed(() => !!error.value)
  const breadcrumbState = useBreadcrumbState()

  onMounted(async () => {
    watchEffect(() => {
      if (!newsPost.value?.title) return

      breadcrumbState.value = [
        { name: 'HOME', path: '/' },
        { name: 'News', path: '/news' },
        { name: newsPost.value.title, path: route.fullPath },
      ]
    })

    if (!newsPost.value?.title) return

    const breadcrumbJsonLd = useBreadcrumbJsonLd(breadcrumbState.value)

    useHead({
      title: `${newsPost.value.title} | News | KS BLOG`,
      meta: [
        {
          name: 'description',
          content: `KS BLOGはブログサイトです。ニュース記事の${newsPost.value.title}をご紹介。`,
        },
        {
          property: 'og:title',
          content: `${newsPost.value.title} | News | KS BLOG`,
        },
        {
          property: 'og:description',
          content: `KS BLOGはブログサイトです。ニュース記事の${newsPost.value.title}をご紹介。`,
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
  })
</script>

<template>
  <BaseContent>
    <template v-if="!pending && newsPost">
      <NewsContent :news-list="newsPost" />
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
