import globals from 'globals'
import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import { globalIgnores } from 'eslint/config'

const stylisticRules = stylistic.configs.customize({
  indent: 2,
  linebreakStyle: 'unix',
  quotes: 'single',
  semi: false,
})

export default [
  globalIgnores(['public/**']),

  js.configs.recommended, 

  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'module',
      globals: { ...globals.node },
      ecmaVersion: 'latest',
    },
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      ...stylisticRules.rules,
    },
  },
]
