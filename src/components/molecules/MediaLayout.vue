<template>
  <div :class="rootClass">
    <div class="c-media-layout__content">
      <slot name="content" />
    </div>
    <div class="c-media-layout__media">
      <slot name="media" />
    </div>
  </div>
</template>

<script setup lang="ts">
  type Props = {
    typeSp?: 'columnReverse'
    typePc?: 'rowReverse'
  }

  const props = defineProps<Props>()

  const rootClass = computed(() => {
    return [
      'c-media-layout',
      props.typeSp === 'columnReverse' && 'c-media-layout--columnReverseSP',
      props.typePc === 'rowReverse' && 'c-media-layout--rowReversePC',
    ]
  })
</script>

<style scoped lang="scss">
  .c-media-layout {
    $this: &;

    --local-gap: clamp(2.4rem, calc(-0.444rem + 3.704vw), 4rem); /* min: 24px, max: 40px */

    display: flex;
    flex-direction: column;
    gap: var(--local-gap);
    margin-top: 40px;

    @include mixin.media(pc) {
      flex-direction: row;
      margin-top: 48px;
    }

    &__content,
    &__media {
      @extend %reset-margin;
    }

    &__content {
      align-self: center;
      width: 100%;
    }

    &__media {
      flex: 0 0 auto;

      @include mixin.media(pc) {
        align-self: center;
        max-width: calc((100% - var(--local-gap)) / 2);
      }
    }

    &--columnReverseSP {
      @include mixin.media(sp) {
        flex-direction: column-reverse;
      }
    }

    &--rowReversePC {
      @include mixin.media(pc) {
        flex-direction: row-reverse;
      }
    }
  }
</style>
