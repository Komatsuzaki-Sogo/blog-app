import { pageLimitBase } from './composables/utilities/pageLimit'
import {
  useNewsRoutes,
  useBlogArticleRoutes,
  useBlogListRoutes,
  useBlogCategoryRoutes,
} from './composables/useFetchMicroCMSGetURL'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-30',
  devtools: { enabled: true },
  css: ['@/styles/main.scss'],
  hooks: {
    async 'nitro:config'(nitroConfig) {
      nitroConfig.prerender = nitroConfig.prerender || {}
      nitroConfig.prerender.routes = nitroConfig.prerender.routes || []

      const newsRoutes = await useNewsRoutes()
      nitroConfig.prerender?.routes?.push(...newsRoutes)

      const blogArticleRoutes = await useBlogArticleRoutes()
      nitroConfig.prerender?.routes?.push(...blogArticleRoutes)

      const blogListRoutes = await useBlogListRoutes(pageLimitBase)
      nitroConfig.prerender?.routes?.push(...blogListRoutes)

      const blogCategoryRoutes = await useBlogCategoryRoutes(pageLimitBase)
      nitroConfig.prerender?.routes?.push(...blogCategoryRoutes)
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
