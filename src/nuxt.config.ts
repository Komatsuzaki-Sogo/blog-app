// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['@/styles/main.scss'],
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
    '@nuxt/image',
    '@nuxtjs/google-fonts',
    '@nuxtjs/stylelint-module',
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
    microcmsServiceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
    microcmsApiKey: process.env.MICROCMS_API_KEY,
  },
})
