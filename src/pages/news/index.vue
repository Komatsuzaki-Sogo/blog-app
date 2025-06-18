<template>
  <BaseContent>
    <BaseHeadingLevel1 sub-title="News">ニュース</BaseHeadingLevel1>

    <template v-if="newsPosts && newsPosts?.contents.length > 0">
      <NewsPosts :news-posts="newsPosts.contents" />
    </template>
    <template v-else-if="newsPostsError">
      <BaseText>
        <p>
          <em>ニュース一覧のデータの取得に失敗しました。</em>
        </p>
      </BaseText>
    </template>
    <template v-else>
      <BaseText>
        <p>
          <em>ニュース一覧のデータがありませんでした。</em>
        </p>
      </BaseText>
    </template>
  </BaseContent>
</template>

<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'
  import BaseHeadingLevel1 from '~/components/atoms/BaseHeadingLevel1.vue'
  import NewsPosts from '~/components/molecules/NewsPosts.vue'

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

  const { data: newsPosts, error: newsPostsError } = await useFetchMicroCMSGetList({
    endpoint: 'news',
  })
</script>
