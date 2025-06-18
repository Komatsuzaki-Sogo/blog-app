<template>
  <button type="button" class="c-hamburgerMenu">
    <span class="c-hamburgerMenu__text">メニュー</span>
  </button>
</template>

<style scoped lang="scss">
  .c-hamburgerMenu {
    $this: &;

    position: fixed;
    top: 15px;
    right: clamp(1.6rem, -2.667rem + 5.556vw, 4rem);
    z-index: 10;
    display: block;
    width: 30px;
    height: 30px;

    @include mixin.media(pc) {
      display: none;
    }

    &__text {
      position: relative;
      display: block;
      width: 100%;
      height: 2px;
      margin: auto;
      font-size: 0;
      background: var(--color-gradient-reverse);
      transition: background var(--transition);

      &::before,
      &::after {
        position: absolute;
        display: block;
        width: 100%;
        height: 2px;
        font-size: 0;
        content: '';
        background: var(--color-gradient);
        transition: all var(--transition);
      }

      &::before {
        top: -10px;
      }

      &::after {
        bottom: -10px;
      }
    }

    &.is-active {
      #{$this}__text {
        background: transparent;

        &::before {
          top: 0;
          transform: rotate(-45deg);
        }

        &::after {
          bottom: 0;
          transform: rotate(45deg);
        }
      }
    }
  }
</style>
