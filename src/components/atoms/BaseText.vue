<template>
  <div class="c-text">
    <slot />
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    subTitle?: string
  }>()
</script>

<style scoped lang="scss">
  .c-text {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 32px;

    @include mixin.media(pc) {
      gap: 32px;
      margin-top: 40px;
    }

    > p {
      flex: 0 0 auto;
    }
  }
</style>
