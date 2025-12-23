import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import playwright from 'eslint-plugin-playwright';
import globals from 'globals';

export default [
  js.configs.recommended,
  prettierConfig,
  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': tseslint,
      playwright,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: {
        ...globals.es2021,
        process: 'readonly',
        console: 'readonly',
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        exports: 'readonly',
      },
    },
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'prettier/prettier': 'error',
      'playwright/no-networkidle': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'playwright/no-standalone-expect': 'off',
      'playwright/no-skipped-test': 'off',
      'playwright/no-conditional-in-test': 'off',
    },
  },
  {
    files: [
      'global-setup.cjs',
      'src/seed/**/*.ts',
      'src/support/**/*.ts',
    ],
    languageOptions: {
      globals: {
        ...globals.es2021,
        ...globals.node,
      },
    },
  },
];
