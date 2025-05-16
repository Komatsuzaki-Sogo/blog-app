<template>
  <div class="c-button">
    <NuxtLink :to="to" :aria-current="ariaCurrent" class="c-button__link">
      <span class="c-button__text">
        <slot />
      </span>
      <template v-if="iconName">
        <Icon :name="iconName" mode="svg" class="c-button__icon" />
      </template>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    to: string
    ariaCurrent?: string
    iconName?: string
  }>()
</script>

<style scoped lang="scss">
  .c-button {
    $this: &;

    max-width: 360px;
    margin: 40px auto 0;

    @include mixin.media(pc) {
      margin-top: 48px;
    }

    .c-header & {
      @include mixin.media(pc) {
        margin-top: 0;
      }

      #{$this}__link {
        padding-top: 12px;
        padding-bottom: 12px;
      }
    }

    &__link {
      position: relative;
      display: flex;
      flex-direction: row-reverse;
      gap: 8px;
      align-items: center;
      justify-content: center;
      padding: 16px 36px;
      font-weight: var(--font-weight-bold);
      color: var(--color-foreground-light);
      background-image: var(--color-gradient-reverse);
      border-radius: var(--border-radius-circle);

      &::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        content: '';
        background: var(--color-gradient);
        border-radius: var(--border-radius-circle);
        transition: all var(--transition);
      }

      @include mixin.media(hover) {
        &:hover {
          &::before {
            opacity: 0;
          }
        }
      }
    }

    &__text {
      position: relative;
      display: block;
      text-align: center;
    }

    &__icon {
      position: relative;
      display: block;
      width: 24px;
      height: 24px;
      text-align: center;
    }
  }
</style>
