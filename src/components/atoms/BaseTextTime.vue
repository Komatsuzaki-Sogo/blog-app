<template>
  <time :datetime="time" class="c-text-time">
    {{ useFormatDate(time) }}
  </time>
</template>

<script setup lang="ts">
  defineProps<{
    time: string
  }>()
</script>

<style scoped lang="scss">
  .c-text-time {
    font-size: 1.4rem;
    color: var(--color-foreground-gray);
  }
</style>
