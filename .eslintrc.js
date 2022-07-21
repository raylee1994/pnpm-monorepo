/** @type {import('eslint').Linter.Config} */
const config = {
  env: {
    browser: true,
    es2021: true,
  },
  root: true,
  extends: ['plugin:react/recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-debugger': ['error'],
    'no-console': ['warn'],
    indent: ['error', 2],
    'jsx-quotes': ['error', 'prefer-single'],
    'key-spacing': 'error',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        jsxSingleQuote: true,
        arrowParens: 'always',
        bracketSameLine: false,
        bracketSpacing: false,
        endOfLine: 'lf',
        printWidth: 80,
        quoteProps: 'as-needed',
        semi: true,
        useTabs: false,
        tabWidth: 2,
        trailingComma: 'es5',
        htmlWhitespaceSensitivity: 'css',
        insertPragma: false,
      },
    ],
  },
};

module.exports = config;
