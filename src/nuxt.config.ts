// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['@/styles/main.scss'],
  nitro: {
    preset: 'static',
    prerender: {
      routes: [
        '/blog/1',
        '/blog/2',
        '/blog/3',
        '/blog/4',
        '/blog/5',
        '/blog/6',
        '/blog/7',
        '/blog/8',
        '/blog/9',
      ], // 必要に応じて拡張
    },
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
