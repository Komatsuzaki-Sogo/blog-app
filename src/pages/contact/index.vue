<template>
  <BaseContent>
    <h1>Contact</h1>
    <p>text</p>
  </BaseContent>
</template>

<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'

  const breadcrumbState = useBreadcrumbState()

  breadcrumbState.value = [
    { name: 'HOME', path: '/' },
    { name: 'Contact', path: '/contact' },
  ]

  const breadcrumbJsonLd = useBreadcrumbJsonLd(breadcrumbState?.value)

  useHead({
    title: 'Contact | KS BLOG',
    meta: [
      {
        name: 'description',
        content: 'KS BLOGはブログサイトです。お問い合わせページ。',
      },
      {
        property: 'og:title',
        content: 'Contact | KS BLOG',
      },
      {
        property: 'og:description',
        content: 'KS BLOGはブログサイトです。お問い合わせページ。',
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
