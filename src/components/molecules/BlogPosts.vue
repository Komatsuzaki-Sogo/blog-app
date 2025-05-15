<script setup lang="ts">
  import BaseBadge from '~/components/atoms/BaseBadge.vue'
  import BaseIconNew from '~/components/atoms/BaseIconNew.vue'
  import BaseTextTime from '~/components/atoms/BaseTextTime.vue'
  import { useIsNewContent } from '~/composables/useIsNewContent'
  import type { BlogPost } from '~/types/blogPost'

  defineProps<{
    blogPosts: BlogPost[]
  }>()
</script>

<template>
  <div>
    <h2>blogPost</h2>

    <ul v-if="blogPosts && blogPosts.length > 0">
      <li v-for="blogPost in blogPosts" :key="blogPost.id" class="c-list-news__item">
        <NuxtLink :to="'/blog/' + blogPost.slug" class="c-list-news__link">
          <div>{{ blogPost.title }}</div>
          <BaseTextTime :time="blogPost.publishedAt" />
          <div>
            <template
              v-for="category in blogPost['blog-category']"
              :key="blogPost.id + category.id"
            >
              <BaseBadge size="small">{{ category.name }}</BaseBadge>
            </template>
          </div>
          <BaseIconNew v-if="useIsNewContent(blogPost.publishedAt)" />
          <img
            v-if="blogPost.eyecatch?.url"
            :src="blogPost.eyecatch.url"
            :width="blogPost.eyecatch.width"
            :height="blogPost.eyecatch.height"
            alt=""
          />
          <img v-else src="/shared/img/eyecatch.webp" :width="560" :height="315" alt="" />
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
