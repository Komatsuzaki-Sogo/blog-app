<template>
  <div class="c-heading-level2">
    <h2 class="c-heading-level2__title">
      <slot />
    </h2>
  </div>
</template>

<style scoped lang="scss">
  .c-heading-level2 {
    $this: &;

    position: relative;
    padding: 10px;
    margin-top: 64px;

    @include mixin.media(pc) {
      margin-top: 80px !important;
    }

    &::before {
      position: absolute;
      bottom: 0;
      left: 50%;
      display: block;
      width: 40px;
      height: 4px;
      content: '';
      background: var(--color-gradient);
      border-radius: var(--border-radius-circle);
      transform: translateX(-50%);
    }

    &__title {
      font-size: clamp(3.2rem, calc(1.778rem + 1.852vw), 4rem); /* min: 32px, max: 40px */
      text-align: center;
    }

    & + * {
      margin-top: 32px !important;

      @include mixin.media(pc) {
        margin-top: 40px !important;
      }
    }
  }
</style>
