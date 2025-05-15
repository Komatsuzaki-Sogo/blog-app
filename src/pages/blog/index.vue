<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'
  import BaseHeadingLevel1 from '~/components/atoms/BaseHeadingLevel1.vue'
  import BaseText from '~/components/atoms/BaseText.vue'
  import BaseLoading from '~/components/atoms/BaseLoading.vue'
  import BlogCategories from '~/components/molecules/BlogCategories.vue'
  import BlogPosts from '~/components/molecules/BlogPosts.vue'
  import { useBreadcrumbState } from '~/composables/useBreadcrumbState'
  import type { BlogPost } from '~/types/blogPost'
  import type { BlogCategory } from '~/types/blogCategory'

  const breadcrumbState = useBreadcrumbState()

  breadcrumbState.value = [
    { name: 'HOME', path: '/' },
    { name: 'Blog', path: '/blog' },
  ]

  const breadcrumbJsonLd = useBreadcrumbJsonLd(breadcrumbState?.value)

  useHead({
    title: 'Blog | KS BLOG',
    meta: [
      {
        name: 'description',
        content: 'KS BLOGはブログサイトです。ブログ記事をご紹介。',
      },
      {
        property: 'og:title',
        content: 'Blog | KS BLOG',
      },
      {
        property: 'og:description',
        content: 'KS BLOGはブログサイトです。ブログ記事をご紹介。',
      },
      { property: 'og:type', content: 'article' },
    ],
    script: [
      {
        key: 'breadcrumb-jsonld',
        type: 'application/ld+json',
        innerHTML: breadcrumbJsonLd.value,
      },
    ],
  })

  const fetchBlogPosts = async () => {
    const { data, error } = await useMicroCMSGetList<BlogPost>({
      endpoint: 'blog',
      queries: {
        orders: '-publishedAt',
      },
    })

    if (error.value) {
      throw createError({
        statusCode: 500,
        statusMessage: 'MicroCMS API error',
      })
    }

    return data.value
  }

  const {
    data: postsData,
    error: postsError,
    pending: postsPending,
  } = await useAsyncData('blog', fetchBlogPosts)

  const blogPosts = computed(() => postsData.value?.contents || [])
  const blogPostsErrorFlag = computed(() => (postsError.value ? true : false))

  const fetchBlogCategory = async () => {
    const { data, error } = await useMicroCMSGetList<BlogCategory>({
      endpoint: 'blog-category',
    })

    if (error.value) {
      throw createError({
        statusCode: 500,
        statusMessage: 'MicroCMS API error',
      })
    }

    return data.value
  }

  const {
    data: categoryData,
    error: categoryError,
    pending: categoryPending,
  } = await useAsyncData('blog-category', fetchBlogCategory)
  const blogCategory = computed(() => categoryData.value?.contents || [])
  const blogCategoryErrorFlag = computed(() => (categoryError.value ? true : false))
</script>

<template>
  <BaseContent>
    <BaseHeadingLevel1 sub-title="Blog">ブログ</BaseHeadingLevel1>

    <template v-if="!categoryPending && blogCategory.length > 0">
      <BlogCategories :blog-category="blogCategory" />
    </template>
    <template v-else-if="!categoryPending && blogCategoryErrorFlag">
      <BaseText>
        <p><em>データ取得に失敗しました。再度お試しください。</em></p>
      </BaseText>
    </template>
    <template v-else-if="!categoryPending">
      <BaseText>
        <p><em>お知らせ情報が1件もありませんでした。</em></p>
      </BaseText>
    </template>
    <template v-else>
      <BaseLoading />
    </template>

    <template v-if="!postsPending && blogPosts.length > 0">
      <BlogPosts :blog-posts="blogPosts" />
    </template>
    <template v-else-if="!postsPending && blogPostsErrorFlag">
      <BaseText>
        <p><em>データ取得に失敗しました。再度お試しください。</em></p>
      </BaseText>
    </template>
    <template v-else-if="!postsPending">
      <BaseText>
        <p><em>お知らせ情報が1件もありませんでした。</em></p>
      </BaseText>
    </template>
    <template v-else>
      <BaseLoading />
    </template>
  </BaseContent>
</template>
