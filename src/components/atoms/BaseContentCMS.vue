<template>
  <div class="c-content-cms">
    <BaseAnchorLink :anchors="anchors" />

    <div class="c-content-cms__inner">
      <div
        v-for="(item, index) in content"
        :key="index"
        ref="contentRefs"
        class="c-content-cms__content"
        v-html="getContentHtml(item)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { NewsContent } from '~/types/newsPost'
  import type { BlogContent } from '~/types/blogPost'
  import BaseAnchorLink from '~/components/atoms/BaseAnchorLink.vue'

  defineProps<{
    content: NewsContent[] | BlogContent[]
  }>()

  /**
   * コンテンツオブジェクトから表示すべきHTMLを取得する
   *
   * @param {NewsContent | BlogContent} item - microCMSから取得した記事データ
   * @returns {string} 表示するHTML文字列
   */
  const getContentHtml = (item: NewsContent | BlogContent): string => {
    if (item.HTML) return item.HTML
    if (item.richEditor) return item.richEditor
    return ''
  }

  const anchors = ref<{ id: string; text: string }[]>([])
  const contentRefs = ref<HTMLElement[]>([])

  /**
   * マウント後にv-htmlで描画されたh2要素を取得し、アンカー情報として保持する
   */
  onMounted(async () => {
    await nextTick()
    const allAnchors: { id: string; text: string }[] = []

    contentRefs.value.forEach((el) => {
      const h2Elements = el.querySelectorAll<HTMLHeadingElement>('h2[id]')
      h2Elements.forEach((h2) => {
        const id = h2.getAttribute('id')
        const text = h2.textContent?.trim() ?? ''
        if (id && text) {
          allAnchors.push({ id, text })
        }
      })
    })

    anchors.value = allAnchors
  })
</script>

<style scoped lang="scss">
  .c-content-cms {
    margin-top: 32px;

    @include mixin.media(pc) {
      margin-top: 40px;
    }

    &__inner {
      margin-top: 48px;

      @include mixin.media(pc) {
        margin-top: 64px;
      }
    }

    &__content {
      &:first-child {
        @extend %reset-margin;
      }
    }
  }
</style>
