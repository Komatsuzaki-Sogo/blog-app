<template>
  <span class="c-badge" :class="contentClass">
    <slot />
  </span>
</template>

<script setup lang="ts">
  type Props = {
    size?: 'small'
  }

  const props = defineProps<Props>()

  const contentClass = computed(() => {
    return ['c-content', props.size === 'small' && 'c-badge--small']
  })
</script>

<style scoped lang="scss">
  .c-badge {
    display: block;
    width: fit-content;
    height: fit-content;
    padding: 4px 16px;
    font-size: 1.2rem;
    color: var(--color-foreground-light);
    background-color: var(--color-primary);
    border-radius: 4px;

    &--small {
      padding: 1px 4px 2px;
      font-size: 1.1rem;
    }
  }
</style>
