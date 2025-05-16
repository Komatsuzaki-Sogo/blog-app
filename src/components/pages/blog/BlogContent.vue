<template>
  <div class="c-blog-heading">
    <BaseHeadingLevel1 type="cms" :badges="blogPost['blog-category']">
      {{ blogPost.title }}
    </BaseHeadingLevel1>
    <ListDetailTime
      :published-at="blogPost.publishedAt"
      :updated-at="blogPost.updatedAt"
      class="mt-0"
    />
  </div>
  <div class="c-blog-content">
    <BaseContentCMS :content="blogPost.contents" />
  </div>
</template>

<script setup lang="ts">
  import BaseHeadingLevel1 from '~/components/atoms/BaseHeadingLevel1.vue'
  import BaseContentCMS from '~/components/atoms/BaseContentCMS.vue'
  import ListDetailTime from '~/components/molecules/ListDetailTime.vue'
  import type { BlogPost } from '~/types/blogPost'
  defineProps<{
    blogPost: BlogPost
  }>()
</script>
