<script setup lang="ts">
  import { PATHS } from '#imports'
</script>

<template>
  <div class="c-logo">
    <NuxtLink :to="PATHS.HOME.path" class="c-logo__link">
      <span class="c-logo__text">LOGO</span>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
  .c-logo {
    $this: &;

    position: relative;
    z-index: 20;

    &__text {
      font-size: 3rem;
      font-weight: var(--font-weight-bold);
      color: var(--main);
      background: var(--color-gradient);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    // フッター内は前景色を白くする
    .c-footer & {
      #{$this}__link {
        color: var(--color-foreground-light);
      }

      #{$this}__text {
        background: transparent;
        background-clip: unset;
        -webkit-text-fill-color: unset;
      }
    }
  }
</style>
