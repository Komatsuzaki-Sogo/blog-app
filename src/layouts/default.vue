<script setup lang="ts">
import SiteHeader from '~/components/organisms/SiteHeader.vue';

const isMenuOpen = computed(() => {
  return easyStore.menuActive
})
</script>

<template>
  <div class="container">
    <SiteHeader />
    <div :inert="isMenuOpen ? true : undefined">
      <slot />
    </div>
    <footer :inert="isMenuOpen ? true : undefined">footer</footer>
  </div>
</template>

<style lang="scss">
.container {
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 40px;
}
</style>
