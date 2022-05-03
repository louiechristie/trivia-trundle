// module.exports = {
//   extends: [
//     'universe/native',
//     'universe/web',
//     'plugin:@typescript-eslint/recommended',
//     'plugin:@typescript-eslint/eslint-recommended',
//   ],
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     ecmaVersion: 2020,
//     sourceType: 'module',
//   },
//   plugins: ['@typescript-eslint', 'react-hooks', 'eslint-plugin-tsdoc', 'import', 'prettier'],
//   env: {
//     browser: true,
//     node: true,
//     es6: true,
//     jest: true,
//   },
//   settings: {
//     react: {
//       version: 'detect',
//     },
//     'import/parsers': {
//       '@typescript-eslint/parser': ['.ts', '.tsx'],
//     },
//     'import/resolver': {
//       node: {
//         extensions: ['.js', '.jsx', '.ts', '.tsx'],
//       },
//     },
//   },
//   rules: {
//     'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
//     '@typescript-eslint/indent': [2, 2],
//     'import/no-extraneous-dependencies': 'off',
//     '@typescript-eslint/no-use-before-define': 'off',
//     'tsdoc/syntax': 'warn',
//     'react-hooks/rules-of-hooks': 'error',
//     'react-hooks/exhaustive-deps': 'warn',
//     'prettier/prettier': 'error',
//   },
// };

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'universe/native',
    'universe/web',
  ],
  plugins: ['prettier', 'react', 'react-hooks', '@typescript-eslint'],
  rules: {
    eqeqeq: 'error',
    'no-console': 'warn',
    'prettier/prettier': 'error',
    'react/display-name': 'off',
    'react/no-children-prop': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  ignorePatterns: ['node_modules', 'build', 'dist', 'public'],
};
