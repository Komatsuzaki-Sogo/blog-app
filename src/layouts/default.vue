<template>
  <div class="l-container">
    <SiteHeader />
    <main class="l-content" :inert="isMenuOpen ? true : undefined">
      <slot />
    </main>
    <SiteBreadcrumbs :inert="isMenuOpen ? true : undefined" />
    <SiteFooter :inert="isMenuOpen ? true : undefined" />
  </div>
</template>

<script setup lang="ts">
  import SiteBreadcrumbs from '~/components/organisms/SiteBreadcrumbs.vue'
  import SiteFooter from '~/components/organisms/SiteFooter.vue'
  import SiteHeader from '~/components/organisms/SiteHeader.vue'

  const isMenuOpen = computed(() => {
    return easyStore.menuActive
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
