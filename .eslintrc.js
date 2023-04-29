module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'airbnb-typescript/base',
    'standard-with-typescript',
    'prettier',
  ],
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'eslint-plugin-prettier',
    'simple-import-sort',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    'no-console': [
      2,
      {
        allow: ['warn', 'error'],
      },
    ],
    indent: ['error', 2, {SwitchCase: 1}],
    quotes: ['error', 'single', {avoidEscape: true}],
    'react/prop-types': 'off',
    'no-unused-vars': 2,
    'no-param-reassign': 2,
    'no-restricted-imports': 2,
    'no-use-before-define': 0,
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-use-before-define': 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    // simple-import-sort
    'sort-imports': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // 1. Side effect imports
          ['^\\u0000'],
          // 2. React and React Native imports
          ['^react$', '^react-native$', '^react/', '^react-native/'],
          // 3. Any other 3rd party imports
          ['^@?\\w'],
          // 4. Our modules, other than the module the current file is part of
          [
            '^@components?\\w',
            '^@features?\\w',
            '^@hooks?\\w',
            '^@utils?\\w',
            '^@navigation?\\w',
            '^@localization?\\w',
            '^@lib?\\w',
            '^@services?\\w',
            '^@theme?\\w',
          ],
          // 5. Other parts of the same module that the current file is part of
          ['^\\.'],
          // 6. Styles
          ['^\\./styles'],
          // 7. Types
          ['^.*\\u0000$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
    'import/no-extraneous-dependencies': ['error', {devDependencies: true}],
    // 'react/function-component-definition': [
    //   'error',
    //   {namedComponents: 'arrow-function'},
    // ],
    'react/display-name': ['error'],
  },
};
