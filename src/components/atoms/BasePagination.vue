<template>
  <nav v-if="totalPages > 1" class="c-pagination">
    <ul class="c-pagination__list">
      <li v-if="currentPage > 1" class="c-pagination__item--prev">
        <NuxtLink :to="{ query: { page: currentPage - 1 } }" class="c-pagination__link">
          <span class="c-pagination__text">1つ前に戻る</span>
        </NuxtLink>
      </li>

      <li
        v-for="page in totalPages"
        :key="page"
        class="c-pagination__item"
        :class="{ 'is-current': page === currentPage }"
      >
        <NuxtLink :to="{ query: { page } }" class="c-pagination__link">
          <span class="c-pagination__text">{{ page }}</span>
        </NuxtLink>
      </li>

      <li v-if="currentPage < totalPages" class="c-pagination__item--next">
        <NuxtLink :to="{ query: { page: currentPage + 1 } }" class="c-pagination__link">
          <span class="c-pagination__text">1つ後に進む</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
  type Props = {
    totalCount: number
    currentPage: number
    perPage: number
  }

  const props = defineProps<Props>()

  const totalPages = computed(() => Math.ceil(props.totalCount / props.perPage))
</script>

<style scoped lang="scss">
  .c-pagination {
    $this: &;

    margin-top: 40px;

    @include mixin.media(pc) {
      margin-top: 48px;
    }

    &__list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: center;
      padding: 0;
      list-style: none;
    }

    &__item {
      &--prev,
      &--next {
        #{$this}__link {
          position: relative;

          &::before {
            position: absolute;
            inset: 0;
            display: block;
            width: 8px;
            height: 8px;
            margin: auto;
            content: '';
            border-top: 2px solid var(--color-primary);
            border-right: 2px solid var(--color-primary);
            transform: rotate(225deg);
            transition: border-color var(--transition);
          }

          @include mixin.media(hover) {
            &:hover {
              &::before {
                border-color: var(--color-outline-white);
              }
            }
          }
        }

        #{$this}__text {
          position: absolute;
          top: 0;
          left: 0;
          font-size: 0;
          color: transparent;
        }
      }

      &--next {
        #{$this}__link {
          &::before {
            transform: rotate(45deg);
          }
        }
      }

      &.is-current {
        #{$this}__link {
          color: var(--color-foreground-light);
          pointer-events: none;
          background-color: var(--color-primary);
        }
      }
    }

    &__link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      color: var(--color-primary);
      background-color: var(--color-background-light);
      border: 2px solid var(--color-primary);
      border-radius: 4px;
      transition:
        color var(--transition),
        background-color var(--transition);

      @include mixin.media(hover) {
        &:hover {
          color: var(--color-foreground-light);
          background-color: var(--color-primary);
        }
      }
    }

    &__text {
      display: block;
    }
  }
</style>
