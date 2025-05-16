<template>
  <BaseContent>
    <h1>Home</h1>
    <p>text</p>
  </BaseContent>
</template>

<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'

  const breadcrumbState = useBreadcrumbState()

  breadcrumbState.value = [{ name: 'HOME', path: '/' }]

  const breadcrumbJsonLd = useBreadcrumbJsonLd(breadcrumbState?.value)

  useHead({
    script: [
      {
        key: 'breadcrumb-jsonld',
        type: 'application/ld+json',
        innerHTML: breadcrumbJsonLd.value,
      },
    ],
  })
</script>
