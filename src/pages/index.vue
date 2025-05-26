<template>
  <div>
    <BaseContent padding-y="none" width="full">
      <div class="mv">MV</div>
    </BaseContent>
    <BaseContent padding-y="top">
      <BaseHeadingLevel1 markup="h2">About</BaseHeadingLevel1>
      <p>text</p>
    </BaseContent>
    <BaseContent padding-y="top" bg-color="white">
      <BaseHeadingLevel1 markup="h2">News</BaseHeadingLevel1>
      <p>text</p>
    </BaseContent>
    <BaseContent padding-y="top">
      <BaseHeadingLevel1 markup="h2">Blog</BaseHeadingLevel1>
      <p>text</p>
    </BaseContent>
    <BaseContent padding-y="top" bg-color="primary">
      <BaseHeadingLevel1 markup="h2">Contact</BaseHeadingLevel1>
      <p>text</p>
    </BaseContent>
  </div>
</template>

<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'
  import BaseHeadingLevel1 from '~/components/atoms/BaseHeadingLevel1.vue'

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

<style scoped lang="scss">
  .mv {
    height: calc(100vh - var(--header-height));
    background-color: red;
  }
</style>
