<template>
  <label class="c-label"><slot /></label>
</template>

<style scoped lang="scss">
  .c-label {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    font-weight: var(--font-weight-bold);
  }
</style>
