import { createClient } from 'microcms-js-sdk'
import { pageLimitBase } from './composables/utilities/pageLimit'

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
})

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['@/styles/main.scss'],
  hooks: {
    async 'nitro:config'(nitroConfig) {
      nitroConfig.prerender = nitroConfig.prerender || {}
      nitroConfig.prerender.routes = nitroConfig.prerender.routes || []

      // ニュース詳細ページのルート追加
      const newsList = await client.get({
        endpoint: 'news',
        queries: { limit: 100 },
      })
      const newsRoutes = newsList.contents.map((news: { slug: string }) => `/news${news.slug}`)
      nitroConfig.prerender.routes.push(...newsRoutes)

      // ブログ詳細ページのルート追加
      const blogList = await client.get({
        endpoint: 'blog',
        queries: { limit: 100 },
      })
      const blogRoutes = blogList.contents.map(
        (blog: { slug: string }) => `/blog/article/${blog.slug}`,
      )
      nitroConfig.prerender.routes.push(...blogRoutes)

      // ブログ一覧ページのルート追加
      const blogPageLimit = pageLimitBase
      let totalBlogCount = 0

      try {
        const res = await client.get({
          endpoint: 'blog',
          queries: { limit: blogPageLimit },
        })

        totalBlogCount = res.totalCount || 0
      } catch (e) {
        console.error('ブログ一覧の件数取得に失敗しました:', e)
      }

      const totalBlogPages = Math.ceil(totalBlogCount / blogPageLimit)
      const blogListRoutes = []

      for (let page = 1; page <= totalBlogPages; page++) {
        blogListRoutes.push(`/blog/${page}`)
      }
      nitroConfig.prerender.routes.push(...blogListRoutes)

      // カテゴリ一覧取得
      let categories: { id: string; slug: string }[] = []
      try {
        const res = await client.get({
          endpoint: 'blog-category',
          queries: { limit: 100 },
        })
        categories = res.contents
      } catch (e) {
        console.error('カテゴリ取得失敗:', e)
      }

      // ブログ一覧ページのルート追加
      for (const category of categories) {
        try {
          const res = await client.get({
            endpoint: 'blog',
            queries: {
              limit: blogPageLimit,
              filters: `blog-category[contains]${category.id}`,
            },
          })

          const totalBlogMatchCategoryCount = res.totalCount || 0
          const totalBlogMatchCategoryPages = Math.max(
            1,
            Math.ceil(totalBlogMatchCategoryCount / blogPageLimit),
          )

          for (let page = 1; page <= totalBlogMatchCategoryPages; page++) {
            nitroConfig.prerender.routes.push(`/blog/category/${category.slug}/${page}`)
          }
        } catch (e) {
          console.error(`カテゴリ「${category.slug}」の記事取得失敗:`, e)
        }
      }
    },
  },
  nitro: {
    preset: 'static',
  },
  appConfig: {
    router: {
      trailingSlash: false,
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use '@/styles/_common/extend/' as *; @use '@/styles/_base/argument' as *; @use '@/styles/_common/mixin/' as mixin;`,
        },
      },
    },
  },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxtjs/google-fonts',
    '@nuxtjs/stylelint-module',
    'nuxt-microcms-module',
    '@nuxt/image-edge',
  ],
  googleFonts: {
    families: {
      'Noto+Sans+JP': [400, 500, 700],
    },
  },
  runtimeConfig: {
    public: {
      NUXT_APP_BASE_HOST: process.env.NUXT_PUBLIC_APP_BASE_HOST,
    },
  },
  microCMS: {
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: process.env.MICROCMS_API_KEY,
  },
})
