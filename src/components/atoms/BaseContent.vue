<template>
  <div :class="rootClass">
    <div class="c-content__inner">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
  type Props = {
    paddingY?: 'none' | 'top' | 'wide'
    width?: 'full'
    bgColor?: 'gray' | 'primary'
  }

  const props = defineProps<Props>()

  const rootClass = computed(() => {
    return [
      'c-content',
      props.paddingY === 'none' && 'c-content--none',
      props.paddingY === 'top' && 'c-content--top',
      props.bgColor === 'gray' && 'c-content--bgGray',
      props.bgColor === 'primary' && 'c-content--bgPrimary',
      props.width === 'full' && 'c-content--full',
    ]
  })
</script>

<style scoped lang="scss">
  .c-content {
    $this: &;

    display: grid;
    grid-template-columns: 1fr minmax(300px, 1024px) 1fr;
    grid-column: 1 / 4;
    gap: 0 clamp(1.6rem, calc(-2.667rem + 5.556vw), 4rem);
    width: 100%;
    padding-top: 24px;
    padding-bottom: 64px;

    @include mixin.media(pc) {
      padding-top: 32px;
      padding-bottom: 80px;
    }

    &__inner {
      grid-column: 2 / 3;
    }

    &--none {
      padding-top: 0;
      padding-bottom: 0;

      @include mixin.media(pc) {
        padding-top: 0;
        padding-bottom: 0;
      }
    }

    &--top {
      padding-top: 40px;
      padding-bottom: 40px;

      @include mixin.media(pc) {
        padding-top: 80px;
        padding-bottom: 80px;
      }
    }

    &--full {
      grid-template-columns: 100%;
      grid-column: auto;
      gap: 0;

      #{$this}__inner {
        grid-column: auto;
      }
    }

    &--bgGray {
      background-color: var(--color-background-gray);
    }

    &--bgPrimary {
      background: var(--color-gradient);
    }
  }
</style>
