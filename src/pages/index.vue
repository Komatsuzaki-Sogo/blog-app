<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'
  import { useBreadcrumbState } from '~/composables/useBreadcrumbState'

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

<template>
  <BaseContent>
    <h1>heading-level1</h1>
    <p>text</p>
  </BaseContent>
</template>
