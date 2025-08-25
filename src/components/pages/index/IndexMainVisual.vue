<template>
  <BaseContent padding-y="none">
    <h1 class="c-mv-title">
      <span class="c-mv-title__text">
        <span class="c-mv-title__strong">Thank you</span> for visiting.
      </span>
      <span class="c-mv-title__text">
        This is my <span class="c-mv-title__strong">Website</span>.
      </span>
      <span class="c-mv-title__text">
        Check out my <span class="c-mv-title__strong">Tech Blog</span>, too.
      </span>
    </h1>
    <NuxtLink href="#anchor-01" class="c-mv-scroll">
      <span class="c-mv-scroll__text">Scroll Down</span>
    </NuxtLink>
  </BaseContent>
</template>

<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'
</script>

<style scoped lang="scss">
  .c-mv-title {
    padding-top: 40px;
    font-size: clamp(2.8rem, calc(-2.178rem + 6.481vw), 5.6rem); /* min: 28px, max: 56px */

    &__text {
      display: block;
    }

    &__strong {
      font-size: clamp(3.2rem, calc(-2.489rem + 7.407vw), 6.4rem); /* min: 32px, max: 64px */
      color: var(--color-primary);
      background: var(--color-gradient);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .c-mv-scroll {
    --color-scroll: var(--color-foreground-gray);

    display: block;
    width: fit-content;
    margin: 40px auto 0;

    @include mixin.media(pc) {
      margin-top: 80px;
    }

    &__text {
      position: relative;
      display: flex;
      padding-bottom: 50px;
      font-size: 1.4rem;
      font-weight: var(--font-weight-medium);
      color: var(--color-scroll);

      &::before {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        width: 40px;
        height: 40px;
        margin: auto;
        content: '';
        border: 1px solid var(--color-scroll);
        border-radius: var(--border-radius-circle);
        animation: circle-animation 2s infinite;
      }

      &::after {
        position: absolute;
        right: 0;
        bottom: 17px;
        left: 0;
        width: 10px;
        height: 10px;
        margin: auto;
        content: '';
        border-bottom: 1px solid var(--color-scroll);
        border-left: 1px solid var(--color-scroll);
        transform: rotate(-45deg);
      }
    }
  }

  @keyframes circle-animation {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.1);
    }

    100% {
      transform: scale(1);
    }
  }
</style>
