<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'

  const breadcrumbState = useBreadcrumbState()

  breadcrumbState.value = [
    { name: 'HOME', path: '/' },
    { name: 'About', path: '/about' },
  ]

  const breadcrumbJsonLd = useBreadcrumbJsonLd(breadcrumbState?.value)

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
        key: 'breadcrumb-jsonld',
        type: 'application/ld+json',
        innerHTML: breadcrumbJsonLd.value,
      },
    ],
  })
</script>

<template>
  <BaseContent>
    <h1>About</h1>
    <p>text</p>
  </BaseContent>
</template>
