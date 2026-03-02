import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import unicorn from 'eslint-plugin-unicorn'
import prettierConfig from 'eslint-config-prettier'
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
			prettierConfig
		],
		plugins: { unicorn },
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser
		},
		rules: {
			// No default exports
			'no-restricted-syntax': [
				'error',
				{
					selector: 'ExportDefaultDeclaration',
					message: 'Default exports are not allowed. Use named exports instead.'
				}
			],

			// File naming: kebab-case
			'unicorn/filename-case': ['error', { case: 'kebabCase' }],

			// Naming conventions
			'@typescript-eslint/naming-convention': [
				'error',
				{ selector: 'default', format: ['camelCase'] },
				{ selector: 'parameter', format: ['camelCase'], leadingUnderscore: 'allow' },
				{
					selector: 'variable',
					format: ['camelCase', 'UPPER_CASE', 'PascalCase']
				},
				{ selector: 'typeLike', format: ['PascalCase', 'kebab-case'] },
				{ selector: 'enumMember', format: ['PascalCase', 'UPPER_CASE'] },
				{ selector: 'function', format: ['camelCase', 'PascalCase'] },
				{
					selector: 'import',
					format: ['camelCase', 'PascalCase', 'UPPER_CASE']
				},
				// Allow any format for object literal properties (API keys, CSS vars, etc.)
				{ selector: 'objectLiteralProperty', format: null }
			]
		}
	},
	// Config files are exempt from no-default-export (required by their tools)
	{
		files: ['*.config.{ts,js,mts,mjs}'],
		rules: {
			'no-restricted-syntax': 'off'
		}
	}
])
