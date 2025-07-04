<template>
  <BaseContent>
    <BaseContentWithSidenav>
      <BlogContent
        v-if="matchedBlogPostData && matchedBlogPostData.contents[0]"
        :blog-post="matchedBlogPostData.contents[0]"
      />

      <template v-if="blogCategory && blogCategory?.contents.length > 0">
        <BlogCategories
          v-if="blogCategory && blogCategory?.contents.length > 0"
          :blog-category="blogCategory?.contents"
          type="sidenav"
        />
      </template>
      <template v-else-if="blogCategoryError">
        <BaseText text-align="center">
          <p>
            <em>ブログカテゴリのデータの取得に失敗しました。</em>
          </p>
        </BaseText>
      </template>
      <template v-else>
        <BaseText text-align="center">
          <p>
            <em>ブログカテゴリのデータがありませんでした。</em>
          </p>
        </BaseText>
      </template>
    </BaseContentWithSidenav>

    <BaseButton type="button" @click="goBack">ブログ一覧へ戻る</BaseButton>
  </BaseContent>
</template>

<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'
  import BaseContentWithSidenav from '~/components/atoms/BaseContentWithSidenav.vue'
  import BaseText from '~/components/atoms/BaseText.vue'
  import BlogContent from '~/components/pages/blog/BlogContent.vue'
  import BaseButton from '~/components/atoms/BaseButton.vue'
  import BlogCategories from '~/components/molecules/BlogCategories.vue'

  const router = useRouter()

  const goBack = () => {
    if (history.length > 1) {
      router.back()
    } else {
      router.push('/')
    }
  }

  const route = useRoute()
  const slug = route.params.slug as string

  const { data: matchedBlogPostData } = await useFetchMicroCMSGetList({
    endpoint: 'blog',
    filters: `slug[equals]${slug}`,
    page: 1,
    pageLimit: 1,
  })

  const { data: blogCategory, error: blogCategoryError } = await useFetchMicroCMSGetList({
    endpoint: 'blog-category',
    filters: '',
  })

  if (!matchedBlogPostData.value?.contents?.length) {
    throw createError({
      statusCode: 404,
    })
  }

  const breadcrumbState = useBreadcrumbState()

  breadcrumbState.value = [
    { name: 'HOME', path: '/' },
    { name: `Blog一覧`, path: `/blog` },
    {
      name: `${matchedBlogPostData.value?.contents[0].title}`,
      path: `/blog/article/${matchedBlogPostData.value?.contents[0].title}`,
    },
  ]

  const breadcrumbJsonLd = useBreadcrumbJsonLd(breadcrumbState?.value)

  useHead({
    title: `${matchedBlogPostData.value?.contents[0].title} | KS BLOG`,
    meta: [
      {
        name: 'description',
        content: `KS BLOGはブログサイトです。ブログ記事の${matchedBlogPostData.value?.contents[0].title}をご紹介。`,
      },
      {
        property: 'og:title',
        content: `${matchedBlogPostData.value?.contents[0].title} | KS BLOG`,
      },
      {
        property: 'og:description',
        content: `KS BLOGはブログサイトです。ブログ記事の${matchedBlogPostData.value?.contents[0].title}をご紹介。`,
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
</script>
