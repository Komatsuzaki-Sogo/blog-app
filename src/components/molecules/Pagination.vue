<template>
  <nav v-if="totalPage > 1" class="c-pagination" role="navigation" aria-label="ページネーション">
    <ul class="c-pagination__list">
      <li v-if="currentPage > 1" class="c-pagination__item c-pagination__item--prev">
        <button
          type="button"
          class="c-pagination__button"
          :disabled="currentPage <= 1"
          aria-label="前のページへ"
          @click="() => onPaging(currentPage - 1)"
        >
          <span class="c-pagination__text">1ページ前に戻る</span>
        </button>
      </li>

      <li v-for="pageNumber in totalPage" :key="pageNumber" class="c-pagination__item">
        <button
          type="button"
          class="c-pagination__button"
          :class="{ 'is-current': pageNumber === currentPage }"
          :aria-current="pageNumber === currentPage ? 'page' : undefined"
          @click="() => onPaging(pageNumber)"
        >
          <span class="c-pagination__text">{{ pageNumber }}</span>
        </button>
      </li>

      <li v-if="currentPage < totalPage" class="c-pagination__item c-pagination__item--next">
        <button
          type="button"
          class="c-pagination__button"
          :disabled="currentPage >= totalPage"
          @click="() => onPaging(currentPage + 1)"
        >
          <span class="c-pagination__text">1ページ前に戻る</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
  defineProps<{
    totalPage: number
    perPage: number
    currentPage: number
    onPaging: (pageNumber: number) => void
  }>()
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
        #{$this}__button {
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
        #{$this}__button {
          &::before {
            transform: rotate(45deg);
          }
        }
      }
    }

    &__button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      color: var(--color-primary);
      background-color: var(--color-background-light);
      border: 1px solid var(--color-primary);
      border-radius: 4px;
      transition: background-color var(--transition);

      &.is-current {
        color: var(--color-foreground-light);
        pointer-events: none;
        background-color: var(--color-primary);
      }

      @include mixin.media(hover) {
        &:hover {
          background-color: #0093e930;
        }
      }
    }

    &__text {
      display: block;
    }
  }
</style>
