<template>
  <BaseContent>
    <BaseHeadingLevel1 sub-title="FAQ">よくあるご質問</BaseHeadingLevel1>

    <template v-for="list in faqLists" :key="list.id">
      <BaseAccordion :accordion-id="list.id" :accordion-title="list.title">
        <div v-html="list.content" />
      </BaseAccordion>
    </template>
  </BaseContent>
</template>

<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'
  import BaseHeadingLevel1 from '~/components/atoms/BaseHeadingLevel1.vue'
  import BaseAccordion from '~/components/atoms/BaseAccordion.vue'

  type FaqList = {
    id: string
    title: string
    content: string
  }

  const faqLists: FaqList[] = [
    {
      id: 'id-1',
      title: 'title:id-1',
      content:
        'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
    },
    {
      id: 'id-2',
      title: 'title:id-2',
      content:
        'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
    },
    {
      id: 'id-3',
      title: 'title:id-3',
      content:
        'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
    },
  ]

  const breadcrumbState = useBreadcrumbState()

  breadcrumbState.value = [
    { name: 'HOME', path: '/' },
    { name: 'Contact', path: '/contact' },
  ]

  const breadcrumbJsonLd = useBreadcrumbJsonLd(breadcrumbState?.value)

  useHead({
    title: 'Contact | KS BLOG',
    meta: [
      {
        name: 'description',
        content: 'KS BLOGはブログサイトです。お問い合わせページ。',
      },
      {
        property: 'og:title',
        content: 'Contact | KS BLOG',
      },
      {
        property: 'og:description',
        content: 'KS BLOGはブログサイトです。お問い合わせページ。',
      },
    ],
    script: [
      {
        key: 'breadcrumb-jsonld',
        type: 'application/ld+json',
        innerHTML: breadcrumbJsonLd.value,
      },
    ],
  })
</script>
