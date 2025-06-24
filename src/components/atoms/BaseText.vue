<template>
  <div :class="rootClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
  type Props = {
    textAlign?: 'center' | 'right'
    type?: 'widthFit'
  }

  const props = defineProps<Props>()

  const rootClass = computed(() => {
    return [
      'c-text',
      props.textAlign === 'center' && 'c-text--center',
      props.textAlign === 'right' && 'c-text--right',
      props.type === 'widthFit' && 'c-text--widthFit',
    ]
  })
</script>

<style scoped lang="scss">
  .c-text {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 32px;

    @include mixin.media(pc) {
      gap: 32px;
      margin-top: 40px;
    }

    > p {
      flex: 0 0 auto;
    }

    &--center {
      text-align: center;
    }

    &--right {
      text-align: right;
    }

    &--widthFit {
      :deep(p) {
        width: fit-content;
        margin-right: auto;
        margin-left: auto;
      }
    }
  }
</style>
