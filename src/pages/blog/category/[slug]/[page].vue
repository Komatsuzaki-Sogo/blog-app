<template>
  <BaseContent>
    <BaseHeadingLevel1 sub-title="Blog">
      {{ matchedCategoryData?.contents[0].name }}のブログ記事一覧
    </BaseHeadingLevel1>
    <template v-if="blogCategory && blogCategory?.contents.length > 0">
      <BlogCategories :blog-category="blogCategory?.contents" />
    </template>
    <template v-else-if="blogCategoryError">
      <BaseText>
        <p>
          <em>ブログカテゴリのデータの取得に失敗しました。</em>
        </p>
      </BaseText>
    </template>
    <template v-else>
      <BaseText>
        <p>
          <em>ブログカテゴリのデータがありませんでした。</em>
        </p>
      </BaseText>
    </template>

    <template v-if="blogPosts && blogPosts?.contents.length > 0">
      <BlogPosts :blog-posts="blogPosts.contents" />
      <Pagination
        :total-page="totalPage"
        :per-page="pageLimit"
        :current-page="page"
        :on-paging="onPaging"
      />
    </template>
    <template v-else>
      <BaseText>
        <p>
          <em>ブログ記事一覧のデータがありませんでした。</em>
        </p>
      </BaseText>
    </template>
  </BaseContent>
</template>

<script setup lang="ts">
  import { pageLimitBase } from '~/composables/utilities/pageLimit'
  import BaseContent from '~/components/atoms/BaseContent.vue'
  import BaseHeadingLevel1 from '~/components/atoms/BaseHeadingLevel1.vue'
  import BaseText from '~/components/atoms/BaseText.vue'
  import Pagination from '~/components/molecules/Pagination.vue'
  import BlogCategories from '~/components/molecules/BlogCategories.vue'
  import BlogPosts from '~/components/molecules/BlogPosts.vue'

  const route = useRoute()
  const { params } = useRoute()
  const slug = route.params.slug as string

  const { data: matchedCategoryData, error: matchedCategoryDataError } =
    await useFetchMicroCMSGetList({
      endpoint: 'blog-category',
      filters: `slug[equals]${slug}`,
      page: 1,
      pageLimit: 1,
    })

  if (!matchedCategoryDataError) {
    throw createError({
      statusCode: 404,
      statusMessage: '指定されたカテゴリが見つかりません',
    })
  }

  const page = ref(Number(Array.isArray(params.page) ? params.page[0] : params.page))
  const pageLimit = pageLimitBase

  const { data: blogPosts, error: blogPostsError } = await useFetchMicroCMSGetList({
    endpoint: 'blog',
    filters: `blog-category[contains]${matchedCategoryData.value?.contents[0]?.id}`,
    page: page.value,
    pageLimit: pageLimit,
  })

  const totalCount = await useFetchMicroCMSTotalCount({
    endpoint: 'blog',
    filters: `blog-category[contains]${matchedCategoryData.value?.contents[0]?.id}`,
  })

  const totalPage = ref(Math.ceil(totalCount / pageLimit))

  if (blogPostsError.value) {
    throw showError({
      statusCode: 404,
      statusMessage: 'ページが存在しません',
    })
  }

  const onPaging = (pageNumber: number) => {
    const router = useRouter()
    router.push({
      path: `/blog/category/${slug}/${pageNumber}`,
    })
  }

  const { data: blogCategory, error: blogCategoryError } = await useFetchMicroCMSGetList({
    endpoint: 'blog-category',
    filters: '',
  })

  const breadcrumbState = useBreadcrumbState()

  breadcrumbState.value = [
    { name: 'HOME', path: '/' },
    { name: `ブログ記事一覧`, path: `/blog` },
    {
      name: `${matchedCategoryData.value?.contents[0].name}のブログ記事一覧：${page.value}ページ`,
      path: `/blog/category/${slug}/${page.value}`,
    },
  ]

  const breadcrumbJsonLd = useBreadcrumbJsonLd(breadcrumbState?.value)

  useHead({
    title: `${matchedCategoryData.value?.contents[0].name}ブログ記事一覧の${page.value}ページ | ブログ記事一覧 | KS BLOG`,
    meta: [
      {
        name: 'description',
        content: `KS BLOGはブログサイトです。ブログ記事一覧の${matchedCategoryData.value?.contents[0].name}ブログ記事一覧の${page.value}ページをご紹介。`,
      },
      {
        property: 'og:title',
        content: `${matchedCategoryData.value?.contents[0].name}ブログ記事一覧の${page.value}ページ | ブログ記事一覧 | KS BLOG`,
      },
      {
        property: 'og:description',
        content: `KS BLOGはブログサイトです。ブログ記事一覧の${matchedCategoryData.value?.contents[0].name}ブログ記事一覧の${page.value}ページをご紹介。`,
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
