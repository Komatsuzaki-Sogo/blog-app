<template>
  <div>
    <IndexMainVisual />
    <IndexAbout />
    <IndexNews />
    <IndexBlog />
    <IndexContact />
  </div>
</template>

<script setup lang="ts">
  import IndexAbout from '~/components/pages/index/IndexAbout.vue'
  import IndexNews from '~/components/pages/index/IndexNews.vue'
  import IndexBlog from '~/components/pages/index/IndexBlog.vue'
  import IndexContact from '~/components/pages/index/IndexContact.vue'
  import IndexMainVisual from '~/components/pages/index/IndexMainVisual.vue'

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
