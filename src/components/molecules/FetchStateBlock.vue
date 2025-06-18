<template>
  <template v-if="!pending && items.length > 0">
    <slot :items="items" />
  </template>
  <template v-else-if="!pending && errorFlag">
    <BaseText>
      <p>
        <em>{{ name }}のデータ取得に失敗しました。再度お試しください。</em>
      </p>
    </BaseText>
  </template>
  <template v-else-if="!pending">
    <BaseText>
      <p>
        <em>{{ name }}のデータがありませんでした。</em>
      </p>
    </BaseText>
  </template>
  <template v-else>
    <BaseLoading />
  </template>
</template>

<script setup lang="ts">
  import BaseText from '~/components/atoms/BaseText.vue'
  import BaseLoading from '~/components/atoms/BaseLoading.vue'
  import type { BlogCategory } from '~/types/blogCategory'
  import type { BlogPost } from '~/types/blogPost'
  import type { NewsPost } from '~/types/newsPost'

  defineProps<{
    name: string
    items: BlogCategory[] | BlogPost[] | NewsPost[]
    pending: boolean
    errorFlag: boolean
  }>()
</script>
