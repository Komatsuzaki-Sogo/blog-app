<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
  const config = useRuntimeConfig()
  const baseHost = config.public.NUXT_APP_BASE_HOST

  const router = useRouter()
  const currentPath = computed(() => `${baseHost}${router.currentRoute.value.path}`)

  useHead({
    htmlAttrs: {
      lang: 'ja',
    },
    title: 'KS BLOG',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'robots', content: 'noindex' },
      { name: 'description', content: 'KS BLOGはブログサイトです。' },
      { name: 'twitter:card', content: 'summary' },
      { property: 'og:url', content: currentPath },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'KS BLOG' },
      {
        property: 'og:description',
        content: 'KS BLOGはブログサイトです。',
      },
      { property: 'og:site_name', content: 'KS BLOG オフィシャルサイト' },
      { property: 'og:image', content: `${baseHost}/shared/img/ogp.png` },
    ],
    link: [{ rel: 'canonical', href: currentPath }],
  })
</script>
