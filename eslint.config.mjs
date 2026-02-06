import react from 'eslint-plugin-react';
import reactNative from 'eslint-plugin-react-native';
import tsParser from '@typescript-eslint/parser';
import js from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
  {
    ignores: ['.expo/**', 'node_modules/**', 'babel.config.js'],
  },
  js.configs.recommended,
  {
    env: {
      browser: true,
      'react-native/react-native': true,
    },
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react,
      'react-native': reactNative,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser, // Adds fetch, window, etc.
        ...globals.node, // Useful if you have build scripts
        'react-native/react-native': true, // Specific to your mobile environment
        console: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      'no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
        },
      ],
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-native/no-unused-styles': 'error',
      'no-undef': 'error',
      'prettier/prettier': 'error',
    },
  },
];
