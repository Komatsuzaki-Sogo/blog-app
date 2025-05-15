<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'
  import type { BlogCategory } from '~/types/blogCategory'
  import type { BlogPost } from '~/types/blogPost'

  const route = useRoute()

  const fetchBlogCategory = async () => {
    const { data, error } = await useMicroCMSGetList<BlogCategory>({
      endpoint: 'blog-category',
      queries: {
        filters: `slug[equals]${route.params.slug}`,
        limit: 1,
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
    data: categoryData,
    pending: categoryPending,
    error: categoryError,
  } = await useAsyncData('blog-category', fetchBlogCategory)

  const blogCategory = computed(() => categoryData.value?.contents[0])
  const blogCategoryErrorFlag = computed(() => (categoryError.value ? true : false))

  const fetchBlogPostsByCategory = async () => {
    if (!blogCategory.value?.id) return { contents: [] }

    const { data, error } = await useMicroCMSGetList<BlogPost>({
      endpoint: 'blog',
      queries: {
        filters: `blog-category[contains]${blogCategory.value.id}`,
      },
    })

    if (error.value) {
      throw createError({
        statusCode: 500,
        statusMessage: 'MicroCMS API error (posts)',
      })
    }

    return data.value
  }

  const {
    data: postsData,
    pending: postsPending,
    error: postsError,
  } = await useAsyncData('blog', fetchBlogPostsByCategory)

  const blogPosts = computed(() => postsData.value?.contents ?? [])
  const blogPostsErrorFlag = computed(() => (postsError.value ? true : false))

  const breadcrumbState = useBreadcrumbState()

  onMounted(async () => {
    watchEffect(() => {
      if (!blogCategory.value?.name) return

      breadcrumbState.value = [
        { name: 'HOME', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: blogCategory.value.name, path: route.fullPath },
      ]
    })

    if (!blogCategory.value?.name) return

    const breadcrumbJsonLd = useBreadcrumbJsonLd(breadcrumbState.value)

    useHead({
      title: `${blogCategory.value.name} | News | KS BLOG`,
      meta: [
        {
          name: 'description',
          content: `KS BLOGはブログサイトです。ブログカテゴリの${blogCategory.value.name}をご紹介。`,
        },
        {
          property: 'og:title',
          content: `${blogCategory.value.name} | News | KS BLOG`,
        },
        {
          property: 'og:description',
          content: `KS BLOGはブログサイトです。ブログカテゴリの${blogCategory.value.name}をご紹介。`,
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
  })
</script>

<template>
  <BaseContent>
    <template v-if="!categoryPending && blogCategory">
      {{ blogCategory }}
      <hr />
      <template v-if="!postsPending && blogPosts">
        {{ blogPosts }}
        <hr />
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
  </BaseContent>
</template>
