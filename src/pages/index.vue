<script setup lang="ts">
  const pageLists = [{ name: 'ホーム', path: '/' }]

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
  <div>
    <h1>heading-level1</h1>
    <p>text</p>
  </div>
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
