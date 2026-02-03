import react from 'eslint-plugin-react';
import reactNative from 'eslint-plugin-react-native';
import tsParser from '@typescript-eslint/parser';
import js from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['.expo/**', 'node_modules/**', 'babel.config.js'],
  },
  js.configs.recommended,
  {
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
