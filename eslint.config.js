import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react/no-unknown-property': ['error', { ignore: ['css'] }],
      'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
      'react/jsx-no-undef': 'off',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      
      'react/no-danger': 'off',
      'react/no-deprecated': 'off',
      'react/no-direct-mutation-state': 'off',
      'react/no-find-dom-node': 'off',
      'react/no-is-mounted': 'off',
      'react/no-multi-comp': 'off',
      'react/no-render-return-value': 'off',
      'react/no-set-state': 'off',
      'react/sort-comp': 'off',
      'react/void-dom-elements-no-children': 'off',
      'react/jsx-filename-extension': 'off',
      'react/jsx-no-comment-textnodes': 'off',
      'react/jsx-uses-vars': 'off',
      'react/self-closing-comp': 'off',
      'react/no-children-prop': 'off',
      'react/no-array-index-key': 'off',
      'react/no-unused-state': 'off',
      'react/jsx-indent': 'off',
      'react/jsx-indent-props': 'off',
      'no-console': 'off',
      'no-debugger': 'off',
      'no-unused-vars': 'off',
      'no-empty': 'off',
      'no-undef': 'off',
      'no-shadow': 'off',
      'no-prototype-builtins': 'off',
      'react-hooks/rules-of-hooks': 'off',
      'react-hooks/exhaustive-deps': 'off',
    },
  },
]
