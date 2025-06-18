<template>
  <div class="c-content-cms">
    <div
      v-for="(item, index) in content"
      :key="index"
      class="c-content-cms__inner"
      v-html="getContentHtml(item)"
    />
  </div>
</template>

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

<style scoped lang="scss">
  .c-content-cms {
    margin-top: 32px;

    @include mixin.media(pc) {
      margin-top: 40px;
    }

    &__inner {
      @extend %reset-margin;

      & + & {
        margin-top: 64px;

        @include mixin.media(pc) {
          margin-top: 100px;
        }
      }
    }
  }
</style>
