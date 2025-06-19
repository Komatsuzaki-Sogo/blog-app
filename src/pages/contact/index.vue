<template>
  <BaseContent>
    <BaseHeadingLevel1 sub-title="Contact me">お問い合わせ</BaseHeadingLevel1>
    <ContactFrom />
  </BaseContent>
</template>

<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'
  import BaseHeadingLevel1 from '~/components/atoms/BaseHeadingLevel1.vue'
  import ContactFrom from '~/components/pages/contact/ContactFrom.vue'

  const breadcrumbState = useBreadcrumbState()

  breadcrumbState.value = [
    { name: 'HOME', path: '/' },
    { name: 'Contact', path: '/contact' },
  ]

  const breadcrumbJsonLd = useBreadcrumbJsonLd(breadcrumbState?.value)

  const config = useRuntimeConfig()

  useHead({
    title: 'Contact | KS BLOG',
    meta: [
      {
        name: 'description',
        content: 'KS BLOGはブログサイトです。お問い合わせはこちらから。',
      },
      {
        property: 'og:title',
        content: 'Contact | KS BLOG',
      },
      {
        property: 'og:description',
        content: 'KS BLOGはブログサイトです。お問い合わせはこちらから。',
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
