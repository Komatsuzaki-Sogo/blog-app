<script setup lang="ts">
  import type { BlogCategory } from '~/types/blogCategory'

  defineProps<{
    blogCategory: BlogCategory[]
  }>()
</script>

<template>
  <div>
    <h2>category</h2>

    <ul v-if="blogCategory && blogCategory.length > 0">
      <li v-for="category in blogCategory" :key="category.id" class="c-list-news__item">
        <NuxtLink :to="'/blog/' + category.slug" class="c-list-news__link">{{
          category.name
        }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
