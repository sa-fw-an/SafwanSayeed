import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    // three.js scenes are imperative by design: mutating Object3D transforms
    // inside useFrame / effects IS the API. The immutability rule can't know
    // that, so it's scoped off for the 3D layer only.
    files: ['src/three/**/*.{ts,tsx}'],
    rules: {
      'react-hooks/immutability': 'off',
    },
  },
  {
    // Provider + hook live together on purpose; splitting them would scatter
    // one small concern across three files for no real fast-refresh gain.
    files: ['src/lib/router.tsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
])
