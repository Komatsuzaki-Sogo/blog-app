<script setup lang="ts">
import { PATHS } from '#imports';
import { useRoute } from 'vue-router'

const route = useRoute()

const pathEntries = Object.entries(PATHS)
  .filter(([key]) => key !== 'CONTACT')
  .map(([, value]) => value)
</script>

<template>
  <div class="c-navigation">
    <nav class="c-navigation__nav">
      <ul class="c-navigation__list">
        <li v-for="item in pathEntries" :key="item.name" :aria-current="route.path === item.path ? 'page' : undefined" class="c-navigation__item">
          <NuxtLink :to="item.path" class="c-navigation__link">{{ item.name }}</NuxtLink>
        </li>
      </ul>
    </nav>

    <div class="c-navigation__contact">
      <NuxtLink :to="PATHS.CONTACT.path" :aria-current="route.path === PATHS.CONTACT.path ? 'page' : undefined" class="c-navigation__contactItem">
        <span class="c-navigation__contactText">{{ PATHS.CONTACT.name }}</span>
      </NuxtLink>
    </div>
  </div><!-- /.c-navigation -->
</template>

<style scoped lang="scss">
.c-navigation {
  @include mixin.media(pc, $minor-breakpoint) {
    display: flex;
    gap: 24px;
    align-items: center;
  }

  &__nav {
    @include mixin.media(pc, $minor-breakpoint) {
      padding: 12px 36px;
      border-radius: var(--border-radius-circle);
      box-shadow: 1px 1px 10px rgb(0 0 0 / 40%);
    }
  }

  &__list {
    display: flex;
    gap: 24px;
    list-style: none;
  }

  &__link {
    position: relative;
    font-weight: var(--font-weight-bold);
    transition: var(--transition);

    &[aria-current="page"] {
      &::before {
        @include mixin.media(pc, $minor-breakpoint) {
          position: absolute;
        bottom: -7px;
        left: 50%;
        display: block;
        width: 7px;
        height: 7px;
        content: "";
        background: var(--color-gradient);
        border-radius: var(--border-radius-circle);
        transform: translateX(-50%);
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
        content: "";
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
    }
  }
}
</style>