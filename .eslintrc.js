module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'linebreak-style': 'off',
    'semi': 'off',
    '@typescript-eslint/semi': 'off',
    'no-console': 'off',
    'react/function-component-definition': 'off',
    'jsx-quotes': ['error', 'prefer-double'],
    'react/jsx-props-no-spreading': 'off',
    'object-curly-newline': 'off',
    '@typescript-eslint/comma-dangle': ['error', 'never'],
    'no-restricted-exports': 'off',
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true
      }
    ],
    'react/require-default-props': 'off',
    '@typescript-eslint/indent': 'off',
    'import/prefer-default-export': 'off',
    'arrow-parens': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'no-underscore-dangle': 'off',
    'import/order': 'off',
    'no-param-reassign': 'off',
    'prefer-destructuring': 'off',
    'react/destructuring-assignment': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-confusing-arrow': 'off',
    '@typescript-eslint/naming-convention': 'off',
    'prefer-regex-literals': 'off',
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        labelComponents: ['CustomInputLabel'],
        labelAttributes: ['label'],
        controlComponents: ['CustomInput'],
        depth: 3
      }
    ],
    '@typescript-eslint/no-unused-expressions': 'off',
    'no-plusplus': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'no-restricted-globals': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
    'class-methods-use-this': 'off'
  },
};
