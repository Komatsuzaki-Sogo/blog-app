<template>
  <div class="c-content-withSidenav">
    <slot />
  </div>
</template>

<style scoped lang="scss">
  .c-content-withSidenav {
    @extend %reset-margin;

    display: grid;

    @include mixin.media(pc) {
      grid-template-areas: 'heading none' 'main sidenav';
      grid-template-rows: auto 1fr;
      grid-template-columns: 1fr 180px;
      gap: 0 clamp(4rem, calc(-0.267rem + 5.556vw), 6.4rem); /* min: 40px, max: 64px */

      :deep(.c-heading-level1) {
        grid-area: heading;
      }

      :deep(.c-blog-content) {
        grid-area: main;
      }

      :deep(.c-list-category) {
        grid-area: sidenav;
      }
    }
  }
</style>
