// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    '@typescript-eslint/no-explicit-any': 'off', // any 型の使用を許可する
    'max-lines': ['error', { max: 300, skipBlankLines: true, skipComments: true }], // 1 ファイルあたりの行数を 300 行に制限する
    'vue/component-name-in-template-casing': ['error', 'PascalCase', { // コンポーネント名のケースを PascalCase にする
      registeredComponentsOnly: false,
      ignores: [],
    }],
    'vue/block-lang': ['error', {
      script: { lang: 'ts' }, // `lang="ts"` を必須にする
      style: { lang: 'scss' }, // `lang="scss"` を必須にする
    }],
    'vue/no-empty-component-block': 'error', // 空のコンポーネントブロックをエラーにする
    'no-console': ['error', { allow: ['warn', 'error'] }], // console.log をエラーにするが、warn と error は許可
    'vue/no-multiple-objects-in-class': 'error', // クラス内に複数のオブジェクトを許可しない
    'vue/no-potential-component-option-typo': 'error', // コンポーネントオプションのタイポをエラーにする
    'import/no-relative-parent-imports': 'error', // 親ディレクトリからの相対インポートをエラーにする
  },
})
