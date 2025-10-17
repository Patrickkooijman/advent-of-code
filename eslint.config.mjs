import globals from 'globals';
import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import eslintPluginJest from 'eslint-plugin-jest';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPromise from 'eslint-plugin-promise';
import eslintPluginJson from 'eslint-plugin-json';

export default tsEslint.config(
  {
    name: 'base ignore',
    ignores: [
      'dist/',
      'deployment/',
      'coverage/',
      'performance-test/',
      'mongodb-migrations/',
      'src/2015/',
      'src/2022/',
      'src/2024/day/',
    ],
  },
  {
    name: 'base files',
    files: ['**/*.{js,mjs,cjs,ts}'],
  },
  {
    name: 'globals',
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    name: 'public',
    files: ['**/public/**'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    name: 'prettier',
    extends: [eslintPluginPrettierRecommended],
    rules: {
      'prettier/prettier': ['error', { singleQuote: true }],
    },
  },
  {
    name: 'plugin promise',
    ...eslintPluginPromise.configs['flat/recommended'],
  },
  {
    name: 'eslint recommended',
    extends: [eslint.configs.recommended],
    rules: {
      'no-unused-vars': [
        'error',
        {
          destructuredArrayIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    name: 'typescript',
    extends: [tsEslint.configs.strictTypeChecked, tsEslint.configs.stylisticTypeChecked],
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.js'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          destructuredArrayIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    name: 'eslint-plugin-import',
    extends: [
      eslintPluginImport.flatConfigs.typescript,
      eslintPluginImport.flatConfigs.recommended,
    ],
    files: ['**/*.{js,ts}'],
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      'import/order': [
        'warn',
        {
          'newlines-between': 'never',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          named: true,
        },
      ],
      'import/newline-after-import': 'warn',
      'import/no-named-as-default': 'off',
    },
  },
  {
    name: 'js files to commonjs',
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
    },
  },
  {
    name: 'jest',
    files: ['**/*.spec.js', '**/*.spec.ts', '**/__mocks__/**/*.js'],
    plugins: { jest: eslintPluginJest },
    languageOptions: {
      globals: eslintPluginJest.environments.globals.globals,
    },
    extends: [eslintPluginJest.configs['flat/recommended'], eslintPluginJest.configs['flat/style']],
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/consistent-test-it': 'warn',
      'jest/expect-expect': 'error',
      'jest/padding-around-all': 'warn',
      'jest/prefer-strict-equal': 'warn',
    },
  },
  {
    name: 'json',
    files: ['**/*.json'],
    extends: [eslintPluginJson.configs['recommended']],
    rules: {
      'json/*': ['error', { allowComments: true }],
    },
  },
  {
    name: 'typescript declaration files',
    files: ['**/*.d.ts'],
    rules: {
      'no-unused-vars': 'off',
    },
  }
);
