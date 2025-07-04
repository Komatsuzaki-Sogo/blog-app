<template>
  <div class="c-header-navigation">
    <div class="c-header-navigation__inner">
      <nav class="c-header-navigation__nav">
        <ul class="c-header-navigation__list">
          <li v-for="item in pathEntries" :key="item.name" class="c-header-navigation__item">
            <NuxtLink
              :to="item.path"
              class="c-header-navigation__link"
              :class="{ 'is-current': route.path.startsWith(item.path) }"
              :aria-current="route.path === item.path ? 'page' : undefined"
            >
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <BaseButton
        :to="PATHS.CONTACT.path"
        :aria-current="route.path === PATHS.CONTACT.path ? 'page' : undefined"
        icon-name="bytesize:mail"
      >
        {{ PATHS.CONTACT.name }}
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  import BaseButton from '~/components/atoms/BaseButton.vue'

  const route = useRoute()

  const excludeKeys = ['HOME', 'CONTACT']
  const pathEntries = Object.entries(PATHS)
    .filter(([key]) => !excludeKeys.includes(key))
    .map(([, value]) => value)
</script>

<style scoped lang="scss">
  .c-header-navigation {
    $this: &;

    @include mixin.media(sp) {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 5;
      width: 100%;
      max-height: 100vh;
      background-color: var(--color-background-light);

      &.is-active {
        #{$this}__inner {
          overflow: auto;
        }
      }
    }

    &__inner {
      @include mixin.media(sp) {
        padding: var(--header-height) clamp(1.6rem, -2.667rem + 5.556vw, 4rem) 40px;
      }

      @include mixin.media(pc) {
        display: flex;
        gap: 48px;
        align-items: center;
      }
    }

    &__list {
      display: flex;
      list-style: none;

      @include mixin.media(sp) {
        flex-direction: column;
        border-top: 1px solid var(--color-outline-gray);
      }

      @include mixin.media(pc) {
        gap: 48px;
      }
    }

    &__item {
      @include mixin.media(sp) {
        border-bottom: 1px solid var(--color-outline-gray);
      }
    }

    &__link {
      --local-padding-y: 16px;

      position: relative;
      font-weight: var(--font-weight-bold);
      transition: var(--transition);

      @include mixin.media(sp) {
        padding: var(--local-padding-y) 0 var(--local-padding-y) 20px;
      }

      &[aria-current='page'],
      &.is-current {
        &::before {
          position: absolute;
          left: 0;
          display: block;
          width: 6px;
          height: calc(100% - (var(--local-padding-y) * 2));
          content: '';
          background: var(--color-gradient);
          border-radius: 2px;

          @include mixin.media(pc) {
            bottom: -10px;
            left: 50%;
            width: 24px;
            height: 4px;
            border-radius: var(--border-radius-circle);
            transform: translateX(-50%);
          }
        }
      }

      &[aria-current='page'] {
        pointer-events: none;
      }

      &:not([aria-current='page']) {
        @include mixin.media(sp) {
          position: relative;

          &::after {
            position: absolute;
            top: 50%;
            right: 10px;
            display: block;
            width: 8px;
            height: 8px;
            content: '';
            border-top: 2px solid var(--color-primary);
            border-right: 2px solid var(--color-primary);
            transform: translateY(-50%) rotate(45deg);
          }
        }
      }

      @include mixin.media(hover) {
        &:hover {
          color: var(--color-primary);
        }
      }
    }

    &__contact {
      @include mixin.media(sp) {
        max-width: 36px;
        margin: 32px auto 0;
      }

      &Item {
        position: relative;
        display: flex;
        flex-direction: row-reverse;
        gap: 8px;
        align-items: center;
        justify-content: center;
        padding: 12px 36px;
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

      &Text {
        position: relative;
        display: block;
        text-align: center;
      }

      &Icon {
        position: relative;
        display: block;
        width: 24px;
        height: 24px;
        text-align: center;
      }
    }
  }
</style>
