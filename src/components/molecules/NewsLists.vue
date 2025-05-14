<script setup lang="ts">
  import BaseBadge from '~/components/atoms/BaseBadge.vue'
  import BaseIconNew from '~/components/atoms/BaseIconNew.vue'
  import { useFormatDate } from '~/composables/useFormatDate'
  import { useIsNewContent } from '~/composables/useIsNewContent'
  import type { NewsPost } from '~/types/newsPost'

  defineProps<{
    newsPosts: NewsPost[]
  }>()
</script>

<template>
  <ul class="c-list-news">
    <li v-for="newsPost in newsPosts" :key="newsPost.id" class="c-list-news__item">
      <NuxtLink :to="'/news' + newsPost.slug" class="c-list-news__link">
        <span class="c-list-news__inner">
          <span class="c-list-news__info">
            <time :datetime="newsPost.publishedAt" class="c-list-news__time">
              {{ useFormatDate(newsPost.publishedAt) }}
            </time>
            <BaseBadge>お知らせ</BaseBadge>
            <BaseIconNew v-if="useIsNewContent(newsPost.publishedAt)" />
          </span>
          <span class="c-list-news__title">{{ newsPost.title }}</span>
        </span>
      </NuxtLink>
    </li>
  </ul>
</template>

<style scoped lang="scss">
  .c-list-news {
    $this: &;

    width: min(100%, 720px);
    margin: 32px auto 0;
    list-style: none;

    @include mixin.media(pc) {
      margin-top: 40px;
    }

    &__item {
      & + & {
        #{$this}__link {
          padding-top: 16px;
        }
      }
    }

    &__link {
      padding-bottom: 16px;
      border-bottom: 1px solid var(--color-outline-dark);

      @include mixin.media(hover) {
        &:hover {
          #{$this}__inner::before {
            right: 0;
          }
        }
      }
    }

    &__inner {
      position: relative;
      display: block;
      padding-right: 24px;

      &::before {
        position: absolute;
        top: 50%;
        right: 8px;
        display: block;
        width: 10px;
        height: 10px;
        content: '';
        border-top: 2px solid var(--color-primary);
        border-right: 2px solid var(--color-primary);
        transform: translateY(-50%) rotate(45deg);
        transition: right var(--transition);
      }
    }

    &__info {
      display: flex;
      grid-template-columns: auto auto 1fr;
      gap: 16px;
      align-items: center;
    }

    &__time {
      font-size: 1.4rem;
      color: var(--color-foreground-gray);
    }

    &__title {
      display: block;
      margin-top: 8px;
    }
  }
</style>
