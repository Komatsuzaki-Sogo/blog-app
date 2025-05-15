<script setup lang="ts">
  import type { NewsContent } from '~/types/newsPost'
  import type { BlogContent } from '~/types/blogPost'

  defineProps<{
    content: NewsContent[] | BlogContent[]
  }>()

  // リッチeditorとHTMLどちらも記入されている場合、HTMLを表示する
  const getContentHtml = (item: NewsContent | BlogContent): string => {
    if (item.HTML) return item.HTML
    if (item.richEditor) return item.richEditor
    return ''
  }
</script>

<template>
  <div class="c-content-cms">
    <div v-for="(item, index) in content" :key="index" v-html="getContentHtml(item)" />
  </div>
</template>
