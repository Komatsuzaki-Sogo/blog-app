<template>
  <div class="l-container">
    <SiteHeader />
    <div class="l-content" :inert="isMenuOpen ? true : undefined">
      <BaseContent>
        <BaseHeadingLevel1 sub-title="404">Not Found</BaseHeadingLevel1>
        <BaseText type="widthFit">
          <p>
            大変申し訳ございません。
            <br />
            アクセスされたページは、移動または削除された可能性があります。
            <br />
            お手数をお掛けしますが、ページ右上のメニューからサイト内検索をご利用いただくか、
            <br />
            以下のメニューよりトップページへお戻りください。
          </p>
        </BaseText>

        <BaseButton :to="PATHS.HOME.path">トップページ</BaseButton>
      </BaseContent>
    </div>
    <SiteFooter :inert="isMenuOpen ? true : undefined" />
  </div>
</template>

<script setup lang="ts">
  import SiteFooter from '~/components/organisms/SiteFooter.vue'
  import SiteHeader from '~/components/organisms/SiteHeader.vue'
  import BaseHeadingLevel1 from '~/components/atoms/BaseHeadingLevel1.vue'
  import BaseText from '~/components/atoms/BaseText.vue'
  import BaseContent from '~/components/atoms/BaseContent.vue'
  import BaseButton from '~/components/atoms/BaseButton.vue'

  const isMenuOpen = computed(() => {
    return easyStore.menuActive
  })
  const config = useRuntimeConfig()
  const baseHost = config.public.NUXT_APP_BASE_HOST

  const pageLists = [
    { name: 'HOME', path: '/' },
    { name: '404', path: '/404' },
  ]

  definePageMeta({
    breadcrumb: pageLists,
  })

  const breadcrumbJsonLd = useBreadcrumbJsonLd(pageLists)

  useHead({
    title: '404 Not Found | KS BLOG',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'description', content: 'KS BLOGはブログサイトです。' },
      { name: 'twitter:card', content: 'summary' },
      { property: 'og:url', content: `${baseHost}/404` },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: '404 Not Found | KS BLOG' },
      {
        property: 'og:description',
        content: 'KS BLOGはブログサイトです。',
      },
      { property: 'og:site_name', content: 'KS BLOG オフィシャルサイト' },
      { property: 'og:image', content: `${baseHost}/shared/img/ogp.png` },
    ],
    link: [{ rel: 'canonical', href: `${baseHost}/404` }],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: breadcrumbJsonLd.value,
      },
    ],
  })
</script>

<style lang="scss">
  .l-container {
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
  }

  .l-content {
    min-height: 100%;
  }
</style>
