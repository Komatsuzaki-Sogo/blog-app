<script setup lang="ts">
  import { PATHS } from '#imports'
</script>

<template>
  <div class="c-logo">
    <NuxtLink :to="PATHS.HOME.path" class="c-logo__link">
      <span class="c-logo__text">LOGO</span>
    </NuxtLink>
  </div>
  <!-- /.c-content -->
</template>

<style scoped lang="scss">
  .c-logo {
    &__text {
      font-size: 3rem;
      font-weight: var(--font-weight-bold);
      color: var(--main);
      background: var(--color-gradient);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
</style>
