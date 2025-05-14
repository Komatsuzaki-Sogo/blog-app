<script setup lang="ts">
  defineProps<{
    subTitle?: string
  }>()
</script>

<template>
  <h1 class="c-heading-level1">
    <span class="c-heading-level1__inner">
      <span class="c-heading-level1__mainTitle">
        <slot />
      </span>
      <template v-if="subTitle">
        <span class="c-heading-level1__subTitle">{{ subTitle }}</span>
      </template>
    </span>
  </h1>
</template>

<style scoped lang="scss">
  .c-heading-level1 {
    &__inner {
      display: flex;
      flex-direction: column-reverse;
      text-align: center;
    }

    &__mainTitle {
      font-size: clamp(3.6rem, calc(0.044rem + 4.63vw), 5.6rem); /* min: 36px, max: 56px */
    }

    &__subTitle {
      font-size: clamp(1.6rem, calc(0.889rem + 0.926vw), 2rem); /* min: 16px, max: 20px */
      color: var(--color-primary);
      background: var(--color-gradient);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    & + * {
      margin-top: 32px !important;

      @include mixin.media(pc) {
        margin-top: 40px !important;
      }
    }
  }
</style>
