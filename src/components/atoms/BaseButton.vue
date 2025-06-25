<template>
  <div class="c-button">
    <component
      :is="to ? NuxtLink : 'button'"
      :to="to"
      :aria-current="to ? ariaCurrent : undefined"
      :type="to ? undefined : type"
      class="c-button__item"
      :disabled="disabledState === true ? true : undefined"
      @click="handleClick"
    >
      <span class="c-button__text">
        <slot />
      </span>
      <template v-if="iconName">
        <Icon :name="iconName" mode="svg" class="c-button__icon" />
      </template>
    </component>
  </div>
</template>

<script setup lang="ts">
  import { NuxtLink } from '#components'

  defineProps<{
    to?: string
    type?: 'button' | 'submit'
    ariaCurrent?: string
    iconName?: string
    disabledState?: boolean
  }>()

  const emit = defineEmits<{
    (e: 'click', event: MouseEvent): void
  }>()

  const handleClick = (e: MouseEvent) => {
    emit('click', e)
  }
</script>

<style scoped lang="scss">
  .c-button {
    $this: &;

    max-width: 320px;
    margin: 40px auto 0;

    @include mixin.media(pc) {
      margin-top: 48px;
    }

    .c-header & {
      @include mixin.media(pc) {
        margin-top: 0;
      }

      #{$this}__item {
        padding-top: 12px;
        padding-bottom: 12px;
      }
    }

    &__item {
      position: relative;
      display: flex;
      flex-direction: row-reverse;
      gap: 8px;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 12px 24px;
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

    &__item[disabled] {
      pointer-events: none;
      cursor: auto;
      opacity: 0.4;
    }
  }
</style>
