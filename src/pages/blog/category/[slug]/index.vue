<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'
  import BaseHeadingLevel1 from '~/components/atoms/BaseHeadingLevel1.vue'
  import BaseText from '~/components/atoms/BaseText.vue'
  import BaseLoading from '~/components/atoms/BaseLoading.vue'
  import BlogCategories from '~/components/molecules/BlogCategories.vue'
  import BlogPosts from '~/components/molecules/BlogPosts.vue'

  const route = useRoute()

  const {
    blogCategory: blogMatchCategory,
    blogCategoryErrorFlag: blogMatchCategoryErrorFlag,
    blogCategoryPending: blogMatchCategoryPending,
  } = await useFetchBlogCategory({
    filters: `slug[equals]${route.params.slug}`,
    limit: 1,
  })

  const {
    blogCategory: blogCategoryAll,
    blogCategoryErrorFlag: blogCategoryAllErrorFlag,
    blogCategoryPending: blogCategoryAllPending,
  } = await useFetchBlogCategory()

  const { blogPosts, blogPostsErrorFlag, blogPostsPending } = await useFetchBlogPosts({
    filters: `blog-category[contains]${blogMatchCategory.value[0]?.id}`,
  })

  const breadcrumbState = useBreadcrumbState()

  onMounted(async () => {
    watchEffect(() => {
      if (!blogMatchCategory.value[0]?.name) return

      breadcrumbState.value = [
        { name: 'HOME', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: blogMatchCategory.value[0].name, path: route.fullPath },
      ]
    })

    if (!blogMatchCategory.value[0]?.name) return

    const breadcrumbJsonLd = useBreadcrumbJsonLd(breadcrumbState.value)

    useHead({
      title: `${blogMatchCategory.value[0].name} | News | KS BLOG`,
      meta: [
        {
          name: 'description',
          content: `KS BLOGはブログサイトです。ブログカテゴリの${blogMatchCategory.value[0].name}をご紹介。`,
        },
        {
          property: 'og:title',
          content: `${blogMatchCategory.value[0].name} | News | KS BLOG`,
        },
        {
          property: 'og:description',
          content: `KS BLOGはブログサイトです。ブログカテゴリの${blogMatchCategory.value[0].name}をご紹介。`,
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
    <template v-if="!blogMatchCategoryPending && blogMatchCategory">
      <BaseHeadingLevel1 sub-title="Blogカテゴリ">{{
        blogMatchCategory[0].name
      }}</BaseHeadingLevel1>

      <template v-if="!blogCategoryAllPending && blogCategoryAll.length > 0">
        <BlogCategories :blog-category="blogCategoryAll" />
      </template>
      <template v-else-if="!blogCategoryAllPending && blogCategoryAllErrorFlag">
        <BaseText>
          <p><em>データ取得に失敗しました。再度お試しください。</em></p>
        </BaseText>
      </template>
      <template v-else-if="!blogCategoryAllPending">
        <BaseText>
          <p><em>お知らせ情報が1件もありませんでした。</em></p>
        </BaseText>
      </template>
      <template v-else>
        <BaseLoading />
      </template>

      <template v-if="!blogPostsPending && blogPosts">
        <BlogPosts :blog-posts="blogPosts" />
      </template>
      <template v-else-if="!blogPostsPending && blogPostsErrorFlag">
        <BaseText>
          <p><em>データ取得に失敗しました。再度お試しください。</em></p>
        </BaseText>
      </template>
      <template v-else-if="!blogPostsPending">
        <BaseText>
          <p><em>お知らせ情報が1件もありませんでした。</em></p>
        </BaseText>
      </template>
      <template v-else>
        <BaseLoading />
      </template>
    </template>
    <template v-else-if="!blogMatchCategoryPending && blogMatchCategoryErrorFlag">
      <BaseText>
        <p><em>データ取得に失敗しました。再度お試しください。</em></p>
      </BaseText>
    </template>
    <template v-else-if="!blogMatchCategoryPending">
      <BaseText>
        <p><em>お知らせ情報が1件もありませんでした。</em></p>
      </BaseText>
    </template>
    <template v-else>
      <BaseLoading />
    </template>
  </BaseContent>
</template>
