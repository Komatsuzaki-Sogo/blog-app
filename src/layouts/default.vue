<script setup lang="ts">
import SiteHeader from '~/components/organisms/SiteHeader.vue';
</script>

<template>
  <div class="container">
    <SiteHeader />
    <slot />
    <footer>footer</footer>
  </div>
</template>

<style lang="scss">
.container {
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 40px;
}
</style>
