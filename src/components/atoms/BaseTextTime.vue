<script setup lang="ts">
  import { useFormatDate } from '~/composables/useFormatDate'

  defineProps<{
    time: string
  }>()
</script>

<template>
  <time :datetime="time" class="c-text-time">
    {{ useFormatDate(time) }}
  </time>
</template>

<style scoped lang="scss">
  .c-text-time {
    font-size: 1.4rem;
    color: var(--color-foreground-gray);
  }
</style>
