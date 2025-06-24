<template>
  <span class="c-rate" :style="{ '--rate': rate }" :aria-label="`スキルレベルは${rate}です`" />
</template>

<script setup lang="ts">
  defineProps<{
    rate: number
  }>()
</script>

<style scoped lang="scss">
  .c-rate {
    --local-star-width: 18px;

    position: relative;
    display: inline-block;
    width: calc(var(--local-star-width) * 5);
    height: var(--local-star-width);
    font-size: var(--local-star-width);

    &::before,
    &::after {
      position: absolute;
      display: inline-block;
      height: var(--local-star-width);
      line-height: var(--local-star-width);
      white-space: nowrap;
      content: '★★★★★';
    }

    &::before {
      color: var(--color-foreground-gray);
    }

    &::after {
      width: calc(var(--rate) * var(--local-star-width));
      overflow: hidden;
      color: #ffb906;
    }
  }
</style>
