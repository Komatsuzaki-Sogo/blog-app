<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'

  const pageLists = [
    { name: 'HOME', path: '/' },
    { name: 'About', path: '/about' },
  ]

  definePageMeta({
    breadcrumb: pageLists,
  })

  const breadcrumbJsonLd = useBreadcrumbJsonLd(pageLists)

  useHead({
    title: 'About | KS BLOG',
    meta: [
      {
        name: 'description',
        content: 'KS BLOGはブログサイトです。サイト管理者についてをご紹介。',
      },
      {
        property: 'og:title',
        content: 'About | KS BLOG',
      },
      {
        property: 'og:description',
        content: 'KS BLOGはブログサイトです。サイト管理者についてをご紹介。',
      },
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
    <h1>heading-level1</h1>
    <p>text</p>
  </BaseContent>
</template>