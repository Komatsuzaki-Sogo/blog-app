<template>
  <nav class="c-footer-navigation">
    <ul class="c-footer-navigation__list">
      <li
        v-for="item in pathEntries"
        :key="item.name"
        :aria-current="route.path === item.path ? 'page' : undefined"
        class="c-footer-navigation__item"
      >
        <NuxtLink :to="item.path" class="c-footer-navigation__link">{{ item.name }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
  const route = useRoute()

  const excludeKeys = ['HOME']
  const pathEntries = Object.entries(PATHS)
    .filter(([key]) => !excludeKeys.includes(key))
    .map(([, value]) => value)
</script>

<style scoped lang="scss">
  .c-footer-navigation {
    &__list {
      display: flex;
      flex-direction: column;
      gap: 24px;
      list-style: none;

      @include mixin.media(pc) {
        flex-direction: row;
        gap: 48px;
      }
    }

    &__link {
      position: relative;
      font-size: 2rem;
      color: var(--color-foreground-light);
      transition: color var(--transition);

      @include mixin.media(pc) {
        font-size: 1.4rem;
        transition: opacity var(--transition);
      }

      &::before {
        @include mixin.media(sp) {
          position: absolute;
          top: 50%;
          right: 4px;
          display: block;
          width: 10px;
          height: 10px;
          content: '';
          border-top: 2px solid var(--color-foreground-light);
          border-right: 2px solid var(--color-foreground-light);
          transform: translateY(-50%) rotate(45deg);
          transition: right var(--transition);
        }
      }

      @include mixin.media(hover) {
        &:hover {
          @include mixin.media(sp) {
            &::before {
              right: 0;
            }
          }

          @include mixin.media(pc) {
            opacity: var(--opacity);
          }
        }
      }
    }
  }
</style>
