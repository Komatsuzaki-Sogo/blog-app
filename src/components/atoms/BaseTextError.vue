<template>
  <p class="c-text-error">
    <strong><slot /></strong>
  </p>
</template>

<style scoped lang="scss">
  .c-text-error {
    font-size: 1.4rem;

    > strong {
      font-weight: var(--font-weight-normal);
    }
  }
</style>
