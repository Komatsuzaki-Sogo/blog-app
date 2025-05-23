<template>
  <ul v-if="blogPosts && blogPosts.length > 0" class="c-list-blog">
    <li v-for="blogPost in blogPosts" :key="blogPost.id" class="c-list-blog__item">
      <NuxtLink :to="'/blog/' + blogPost.slug" class="c-list-blog__link">
        <span class="c-list-blog__content">
          <span class="c-list-blog__index">
            <span class="c-list-blog__title">
              <BaseIconNew v-if="useIsNewContent(blogPost.publishedAt)" />
              <b>{{ blogPost.title }}</b>
            </span>
            <BaseTextTime :time="blogPost.publishedAt" />
            <span class="c-list-blog__badgeList">
              <template
                v-for="category in blogPost['blog-category']"
                :key="blogPost.id + category.id"
              >
                <BaseBadge size="small">{{ category.name }}</BaseBadge>
              </template>
            </span>
          </span>

          <span class="c-list-blog__text">
            <span class="c-list-blog__textItem"> Read more</span>
          </span>
        </span>
        <span class="c-list-blog__media">
          <img
            v-if="blogPost.eyecatch?.url"
            :src="blogPost.eyecatch.url"
            :width="blogPost.eyecatch.width"
            :height="blogPost.eyecatch.height"
            alt=""
            class="c-list-blog__mediaItem"
          />
          <Icon v-else name="material-symbols:article" mode="svg" class="c-list-blog__mediaIcon" />
        </span>
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import BaseBadge from '~/components/atoms/BaseBadge.vue'
  import BaseIconNew from '~/components/atoms/BaseIconNew.vue'
  import BaseTextTime from '~/components/atoms/BaseTextTime.vue'
  import type { BlogPost } from '~/types/blogPost'

  defineProps<{
    blogPosts: BlogPost[]
  }>()
</script>

<style scoped lang="scss">
  .c-list-blog {
    $this: &;

    display: grid;
    gap: 24px;
    margin-top: 40px;
    list-style: none;

    @include mixin.media(pc) {
      grid-template-columns: repeat(3, 1fr);
      margin-top: 48px;
    }

    &__link {
      display: flex;
      flex-direction: column-reverse;
      gap: 16px;
      justify-content: flex-end;
      height: 100%;
      padding: 16px;
      background-color: var(--color-foreground-light);
      border-radius: 12px;
      box-shadow: var(--box-shadow);

      @include mixin.media(hover) {
        &:hover {
          #{$this}__mediaItem,
          #{$this}__mediaIcon {
            transform: scale(1.1);
          }

          #{$this}__text {
            color: var(--color-primary);
          }
        }
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: 24px;
      justify-content: space-between;
      height: 100%;
    }

    &__title {
      display: flex;
      flex-direction: column;
      font-size: 2rem;

      @include mixin.media(pc) {
        font-size: 2.4rem;
      }
    }

    &__badgeList {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
    }

    &__text {
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      height: 100%;
      transition: color var(--transition);
    }

    &__textItem {
      position: relative;
      display: block;
      padding-right: 24px;

      &::before {
        position: absolute;
        top: 50%;
        right: 0;
        display: block;
        width: 8px;
        height: 8px;
        content: '';
        border-top: 2px solid var(--color-primary);
        border-right: 2px solid var(--color-primary);
        transform: translateY(-50%) rotate(45deg);
      }
    }

    &__media {
      display: flex;
      flex: 0 0 auto;
      align-items: center;
      justify-content: center;
      aspect-ratio: 16 / 9;
      overflow: hidden;
      background-color: var(--color-background-gray);
      border-radius: 8px;
    }

    &__mediaItem {
      width: 100%;
      height: 100%;
      object-fit: contain;
      transition: transform var(--transition);
    }

    &__mediaIcon {
      width: 30%;
      height: auto;
      color: var(--color-foreground-dark);
      transition: transform var(--transition);
    }
  }
</style>
