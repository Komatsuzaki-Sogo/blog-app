<template>
  <ul class="c-list-blog">
    <li v-for="blogPost in blogPosts" :key="blogPost.id" class="c-list-blog__item">
      <NuxtLink :to="'/blog/article/' + blogPost.slug" class="c-list-blog__link">
        <span class="c-list-blog__content">
          <span class="c-list-blog__title">
            <b class="c-list-blog__titleInner">{{ blogPost.title }}</b>
          </span>
          <div class="c-list-blog__other">
            <span class="c-list-blog__badgeList">
              <template
                v-for="category in blogPost['blog-category']"
                :key="blogPost.id + category.id"
              >
                <BaseBadge size="small">{{ category.name }}</BaseBadge>
              </template>
            </span>
            <BaseTextTime :time="blogPost.publishedAt" />
          </div>
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
          <BaseIconNew v-if="useIsNewContent(blogPost.publishedAt)" type="badge" />
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

    --local-column-gap: 16px;

    display: flex;
    flex-wrap: wrap;
    gap: calc(var(--local-column-gap) + 8px) var(--local-column-gap);
    margin-top: 40px;
    list-style: none;

    @include mixin.media(pc) {
      --local-column-gap: 24px;

      margin-top: 48px;
    }

    &__item {
      width: 100%;

      @include mixin.media(pc, 450px) {
        width: calc((100% - var(--local-column-gap)) / 2);
      }

      @include mixin.media(pc) {
        width: calc((100% - (var(--local-column-gap) * 2)) / 3);
      }
    }

    &__link {
      display: flex;
      flex-direction: column-reverse;
      gap: 16px;
      justify-content: flex-end;
      height: 100%;

      @include mixin.media(hover) {
        &:hover {
          #{$this}__mediaItem,
          #{$this}__mediaIcon {
            transform: scale(1.1);
          }

          #{$this}__titleInner {
            color: var(--color-primary);
          }
        }
      }
    }

    &__content {
      display: flex;
      flex-direction: column-reverse;
      gap: 8px;
      justify-content: flex-end;
      height: 100%;
    }

    &__title {
      display: flex;
      flex-direction: column;
      font-size: 1.8rem;

      @include mixin.media(pc) {
        font-size: 2.2rem;
      }
    }

    &__titleInner {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      transition: color var(--transition);
    }

    &__other {
      @extend %reset-margin;
    }

    &__badgeList {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
    }

    &__media {
      position: relative;
      display: flex;
      flex: 0 0 auto;
      align-items: center;
      justify-content: center;
      aspect-ratio: 16 / 9;
      overflow: hidden;
      background-color: #eee;
      border-radius: 8px;

      :deep(.c-icon-new--badge) {
        position: absolute;
        top: 8px;
        left: 8px;
      }
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
