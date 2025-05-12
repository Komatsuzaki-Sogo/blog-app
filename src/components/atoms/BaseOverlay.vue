<template>
  <div class="c-overlay" />
</template>

<style scoped lang="scss">
  .c-overlay {
    position: fixed;
    top: 0;
    left: 0;
    display: block;
    visibility: hidden;
    width: 100%;
    height: 100vh;
    background-color: var(--color-background-black);
    opacity: 0;
    transition:
      opacity var(--transition),
      visibility var(--transition);

    @include mixin.media(pc) {
      display: none;
    }

    &.is-active {
      visibility: visible;
      opacity: 0.56;
    }
  }
</style>
