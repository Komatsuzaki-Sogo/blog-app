<template>
  <span :class="rootClass">New</span>
</template>

<script setup lang="ts">
  type Props = {
    type?: 'badge'
  }

  const props = defineProps<Props>()

  const rootClass = computed(() => {
    return ['c-icon-new', props.type === 'badge' && 'c-icon-new--badge']
  })
</script>

<style scoped lang="scss">
  .c-icon-new {
    font-size: 1.4rem;
    font-style: italic;
    color: var(--color-role-danger-dark);

    &--badge {
      padding: 2px 10px 2px 8px;
      font-size: 1.2rem;
      color: var(--color-foreground-light);
      background-color: var(--color-role-danger-dark);
      border-radius: var(--border-radius-circle);
    }
  }
</style>
