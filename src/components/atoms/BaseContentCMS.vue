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
  import 'highlight.js/styles/github-dark.css'
  import hljs from 'highlight.js/lib/core'
  import javascript from 'highlight.js/lib/languages/javascript'
  import typescript from 'highlight.js/lib/languages/typescript'
  import xml from 'highlight.js/lib/languages/xml'
  import css from 'highlight.js/lib/languages/css'
  import scss from 'highlight.js/lib/languages/scss'
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
   * hljsの言語登録
   */
  hljs.registerLanguage('javascript', javascript)
  hljs.registerLanguage('typescript', typescript)
  hljs.registerLanguage('html', xml)
  hljs.registerLanguage('css', css)
  hljs.registerLanguage('scss', scss)

  /**
   * コンポーネントのマウント後に実行される処理
   */
  onMounted(async () => {
    await nextTick()
    const allAnchors: { id: string; text: string }[] = []

    contentRefs.value.forEach((el) => {
      // h2[id] 要素を取得し、アンカーリンク表示用にidとテキスト情報を抽出して`allAnchors`に格納する。
      const h2Elements = el.querySelectorAll<HTMLHeadingElement>('h2[id]')
      h2Elements.forEach((h2) => {
        const id = h2.getAttribute('id')
        const text = h2.textContent?.trim() ?? ''
        if (id && text) {
          allAnchors.push({ id, text })
        }
      })

      // `<pre><code>`ブロックが存在する場合は、`highlight.js`を使ってコードハイライトを適用
      const codeBlocks = el.querySelectorAll<HTMLElement>('pre code')
      codeBlocks.forEach((block) => {
        hljs.highlightElement(block)
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
