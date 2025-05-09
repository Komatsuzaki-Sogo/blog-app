<script setup lang="ts">
  import { PATHS } from '#imports'
  import { useRoute } from 'vue-router'

  const route = useRoute()

  const pathEntries = Object.entries(PATHS)
    .filter(([key]) => key !== 'CONTACT')
    .map(([, value]) => value)
</script>

<template>
  <div class="c-navigation">
    <div class="c-navigation__inner">
      <nav class="c-navigation__nav">
        <ul class="c-navigation__list">
          <li
            v-for="item in pathEntries"
            :key="item.name"
            :aria-current="route.path === item.path ? 'page' : undefined"
            class="c-navigation__item"
          >
            <NuxtLink :to="item.path" class="c-navigation__link">{{ item.name }}</NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="c-navigation__contact">
        <NuxtLink
          :to="PATHS.CONTACT.path"
          :aria-current="route.path === PATHS.CONTACT.path ? 'page' : undefined"
          class="c-navigation__contactItem"
        >
          <span class="c-navigation__contactText">{{ PATHS.CONTACT.name }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
  <!-- /.c-navigation -->
</template>

<style scoped lang="scss">
  .c-navigation {
    $this: &;

    @include mixin.media(sp, $minor-breakpoint) {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 5;
      width: 100%;
      max-height: 100vh;
      background-color: var(--color-background-gray);

      &::after {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: var(--header-height);
        content: '';
        background-color: var(--color-background-gray);
      }

      &.is-active {
        #{$this}__inner {
          overflow: auto;
        }
      }
    }

    &__inner {
      @include mixin.media(sp, $minor-breakpoint) {
        padding: var(--header-height) 16px 32px;
      }

      @include mixin.media(pc, $minor-breakpoint) {
        display: flex;
        gap: 48px;
        align-items: center;
      }
    }

    &__list {
      display: flex;
      list-style: none;

      @include mixin.media(sp, $minor-breakpoint) {
        flex-direction: column;
        border-top: 1px solid var(--color-outline-gray);
      }

      @include mixin.media(pc, $minor-breakpoint) {
        gap: 48px;
      }
    }

    &__item {
      @include mixin.media(sp, $minor-breakpoint) {
        border-bottom: 1px solid var(--color-outline-gray);
      }
    }

    &__link {
      --local-padding-y: 16px;

      position: relative;
      font-weight: var(--font-weight-bold);
      transition: var(--transition);

      @include mixin.media(sp, $minor-breakpoint) {
        padding: var(--local-padding-y) 0 var(--local-padding-y) 20px;
      }

      &[aria-current='page'] {
        pointer-events: none;

        &::before {
          position: absolute;
          left: 0;
          display: block;
          width: 6px;
          height: calc(100% - (var(--local-padding-y) * 2));
          content: '';
          background: var(--color-gradient);
          border-radius: 2px;

          @include mixin.media(pc, $minor-breakpoint) {
            bottom: -10px;
            left: 50%;
            width: 24px;
            height: 4px;
            border-radius: var(--border-radius-circle);
            transform: translateX(-50%);
          }
        }
      }

      &:not([aria-current='page']) {
        @include mixin.media(sp, $minor-breakpoint) {
          position: relative;

          &::before {
            position: absolute;
            top: 50%;
            right: 10px;
            display: block;
            width: 8px;
            height: 8px;
            content: '';
            border-top: 2px solid var(--color-secondary);
            border-right: 2px solid var(--color-secondary);
            transform: translateY(-50%) rotate(45deg);
          }
        }
      }

      @include mixin.media(hover) {
        &:hover {
          color: var(--color-secondary);
        }
      }
    }

    &__contact {
      @include mixin.media(sp, $minor-breakpoint) {
        margin-top: 32px;
      }

      &Item {
        position: relative;
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
    }
  }
</style>
