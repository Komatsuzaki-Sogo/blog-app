<template>
  <div :class="contentClass">
    <em class="c-list-category__title">category</em>

    <ul v-if="props.blogCategory && props.blogCategory.length > 0" class="c-list-category__list">
      <li class="c-list-category__listItem">
        <NuxtLink
          to="/blog/"
          class="c-list-category__link"
          :aria-current="route.path === '/blog/' ? true : undefined"
        >
          <span class="c-list-category__text">全ての記事</span>
          <Icon name="mdi:tag-text" mode="svg" class="c-list-category__icon" />
        </NuxtLink>
      </li>
      <li
        v-for="category in props.blogCategory"
        :key="category.id"
        class="c-list-category__listItem"
      >
        <NuxtLink
          :to="'/blog/category/' + category.slug"
          class="c-list-category__link"
          :aria-current="route.path === `/blog/category/${category.slug}` ? true : undefined"
        >
          <span class="c-list-category__text">{{ category.name }}</span>
          <Icon name="mdi:tag-text" mode="svg" class="c-list-category__icon" />
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import type { BlogCategory } from '~/types/blogCategory'

  const props = defineProps<{
    blogCategory: BlogCategory[]
    type?: 'sidenav'
  }>()

  const contentClass = computed(() => {
    return ['c-list-category', props.type === 'sidenav' && 'c-list-category--sidenav']
  })

  const route = useRoute()
</script>

<style scoped lang="scss">
  .c-list-category {
    $this: &;

    display: flex;
    flex-wrap: wrap;
    gap: 16px 32px;

    &__title {
      flex: 0 0 auto;
      padding-right: 2px;
      font-size: 2rem;
    }

    &__list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      list-style: none;

      @include mixin.media(pc) {
        gap: 8px 16px;
        padding-top: 6px;
      }
    }

    &__link {
      display: flex;
      flex-direction: row-reverse;
      gap: 4px;
      align-items: center;
      padding: 2px 8px;
      font-size: 1.4rem;
      background-color: var(--color-background-light);
      border: 1px solid var(--color-outline-dark);
      border-radius: var(--border-radius-circle);
      transition:
        color var(--transition),
        background-color var(--transition);

      @include mixin.media(hover) {
        &:hover {
          color: var(--color-foreground-light);
          background-color: var(--color-background-dark);
        }
      }

      &[aria-current='true'] {
        color: var(--color-foreground-light);
        pointer-events: none;
        background-color: var(--color-background-dark);
      }
    }

    &__icon {
      font-size: 1.6rem;
    }

    &--sidenav {
      margin-top: 40px;

      @include mixin.media(pc) {
        position: sticky;
        top: var(--header-height);
        flex-direction: column;
        flex-wrap: nowrap;
        gap: 8px;
        height: fit-content;
        max-height: calc(100vh - var(--header-height));
        overflow-y: auto;
      }

      #{$this}__title {
        @include mixin.media(pc) {
          font-size: 2.4rem;
        }
      }

      #{$this}__list {
        @include mixin.media(pc) {
          flex-direction: column;
          gap: 0;
          padding-top: 0;
        }
      }

      #{$this}__link {
        @include mixin.media(pc) {
          gap: 16px;
          justify-content: flex-end;
          padding: 8px 0;
          font-size: 1.6rem;
          color: var(--color-foreground-dark);
          background-color: unset;
          border-width: 0 0 1px;
          border-radius: 0;
          transition: opacity var(--transition);

          @include mixin.media(hover) {
            &:hover {
              opacity: var(--opacity);
            }
          }
        }
      }
    }
  }
</style>
