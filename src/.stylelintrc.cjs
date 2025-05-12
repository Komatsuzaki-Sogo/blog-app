module.exports = {
  customSyntax: 'postcss-scss',
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-standard-scss',
  ],
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    'selector-class-pattern': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep'],
      },
    ],
    'scss/at-extend-no-missing-placeholder': null,
    'declaration-block-no-redundant-longhand-properties': null,
  },
}
