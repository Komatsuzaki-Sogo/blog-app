<script setup lang="ts">
  type Props = {
    paddingY?: 'none' | 'narrow' | 'wide'
  }

  const props = defineProps<Props>()

  const contentClass = computed(() => {
    return [
      'c-content',
      props.paddingY === 'none' && 'c-content--none',
      props.paddingY === 'narrow' && 'c-content--narrow',
      props.paddingY === 'wide' && 'c-content--wide',
    ]
  })
</script>

<template>
  <div class="c-content" :class="contentClass">
    <div class="c-content__inner">
      <slot />
    </div>
  </div>
  <!-- /.c-content -->
</template>

<style scoped lang="scss">
  .c-content {
    display: grid;
    grid-template-columns: 1fr minmax(300px, 1200px) 1fr;
    grid-column: 1 / 4;
    gap: 0 clamp(1.6rem, calc(-2.667rem + 5.556vw), 4rem);
    width: 100%;
    padding-top: 64px;
    padding-bottom: 64px;

    @include mixin.media(pc) {
      padding-top: 80px;
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

    &--narrow {
      padding-top: 32px;
      padding-bottom: 32px;

      @include mixin.media(pc) {
        padding-top: 48px;
        padding-bottom: 48px;
      }
    }

    &--wide {
      padding-top: 64px;
      padding-bottom: 64px;

      @include mixin.media(pc) {
        padding-top: 80px;
        padding-bottom: 80px;
      }
    }
  }
</style>
