<template>
  <span class="c-badge">
    <slot />
  </span>
</template>

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
  }
</style>
