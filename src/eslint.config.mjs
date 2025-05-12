// eslint.config.mjs
// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'max-lines': ['error', { max: 300, skipBlankLines: true, skipComments: true }],
    'vue/component-name-in-template-casing': ['error', 'PascalCase', {
      registeredComponentsOnly: false,
      ignores: [],
    }],
    'vue/block-lang': ['error', {
      script: { lang: 'ts' },
      style: { lang: 'scss' },
    }],
    'vue/no-empty-component-block': 'error',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'vue/no-multiple-objects-in-class': 'error',
    'vue/no-potential-component-option-typo': 'error',
    'import/no-relative-parent-imports': 'error',
    'vue/html-self-closing': ['error', {
      html: {
        void: 'never',
      }
    }]
  },
})
