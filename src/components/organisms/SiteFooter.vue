<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'
</script>

<template>
  <footer class="c-footer">
    <BaseContent padding-y="none">
      <div class="c-footer__inner">footer</div>
    </BaseContent>
  </footer>
</template>

<style scoped lang="scss">
  .c-footer {
    padding: 48px 0;
    color: var(--color-foreground-light);
    background: var(--color-gradient);

    @include mixin.media(pc) {
      padding: 64px 0;
    }
  }
</style>
