<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'

  const pageLists = [
    { name: 'HOME', path: '/' },
    { name: 'HOME', path: '/' },
  ]

  definePageMeta({
    breadcrumb: pageLists,
  })

  const breadcrumbJsonLd = useBreadcrumbJsonLd(pageLists)

  useHead({
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
    <p>text</p>
    <p>text</p>
    <p>text</p>
    <p>text</p>
    <p>text</p>
    <p>text</p>
    <p>text</p>
    <p>text</p>
    <p>text</p>
    <p>text</p>
    <p>text</p>
    <p>text</p>
    <p>text</p>
    <p>text</p>
    <p>text</p>
    <p>text</p>
    <p>text</p>
    <p>text</p>
    <p>text</p>
    <p>text</p>
    <p>text</p>
    <p>text</p>
    <p>text</p>
    <p>text</p>
    <p>text</p>
    <p>text</p>
    <p>text</p>
    <p>text</p>
    <p>text</p>
    <p>text</p>
    <p>text</p>
    <p>text</p>
    <p>text</p>
    <p>text</p>
    <p>text</p>
  </BaseContent>
</template>

<style scoped lang="scss">
  h1 {
    @include mixin.media(pc) {
      background-color: red;
    }
  }

  p {
    color: red;
  }
</style>
