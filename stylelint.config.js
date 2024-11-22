export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-standard-vue/scss'],
  defaultSeverity: 'warning',
  rules: {
    'max-nesting-depth': [3, { ignoreAtRules: ['each', 'media', 'supports', 'include'] }],
    'font-weight-notation': 'numeric',
    'scss/at-mixin-argumentless-call-parentheses': 'always',
    'selector-max-compound-selectors': 6,
    'selector-pseudo-element-no-unknown': [true, { ignorePseudoElements: ['v-deep'] }],
    'scss/dollar-variable-pattern': null,
    'scss/dollar-variable-empty-line-before': null,
    'color-no-hex': true,
    'color-named': 'never',
    'selector-class-pattern': [
      '^[a-z0-9]+(?:-[a-z0-9]+)*(?:__[a-z0-9]+(?:-[a-z0-9]+)*)?(?:--[a-z0-9]+(?:-[a-z0-9]+)*)?(?:\\[.+\\])?$',
      { message: 'Expected class name to follow BEM Guidelines (block-name__element-name--modifier-name)' },
    ],
  },
  overrides: [
    { files: ['src/assets/scss/_colors.scss'], rules: { 'color-no-hex': null } },
  ],
};
