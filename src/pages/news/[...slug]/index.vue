<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'
  import FetchStateBlock from '~/components/molecules/FetchStateBlock.vue'

  import NewsContent from '~/components/pages/news/NewsContent.vue'

  const route = useRoute()
  const slugArray = route.params.slug as string[]
  const fullSlug = '/' + slugArray.join('/')

  const { newsPosts, errorFlag, pending } = await useFetchNewsPosts({
    filters: `slug[equals]${fullSlug}`,
    limit: 1,
  })

  const breadcrumbState = useBreadcrumbState()

  onMounted(async () => {
    watchEffect(() => {
      if (!newsPosts.value[0]?.title) return

      breadcrumbState.value = [
        { name: 'HOME', path: '/' },
        { name: 'News', path: '/news' },
        { name: newsPosts.value[0].title, path: route.fullPath },
      ]
    })

    if (!newsPosts.value[0]?.title) return

    const breadcrumbJsonLd = useBreadcrumbJsonLd(breadcrumbState.value)

    useHead({
      title: `${newsPosts.value[0].title} | News | KS BLOG`,
      meta: [
        {
          name: 'description',
          content: `KS BLOGはブログサイトです。ニュース記事の${newsPosts.value[0].title}をご紹介。`,
        },
        {
          property: 'og:title',
          content: `${newsPosts.value[0].title} | News | KS BLOG`,
        },
        {
          property: 'og:description',
          content: `KS BLOGはブログサイトです。ニュース記事の${newsPosts.value[0].title}をご紹介。`,
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
    <FetchStateBlock
      name="ニュース記事"
      :items="newsPosts"
      :pending="pending"
      :error-flag="errorFlag"
    >
      <NewsContent :news-list="newsPosts[0]" />
    </FetchStateBlock>
  </BaseContent>
</template>
