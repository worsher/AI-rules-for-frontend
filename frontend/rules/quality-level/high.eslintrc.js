module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    'react/prop-types': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'no-console': 'error',
    'no-debugger': 'error',
    'no-alert': 'error',
    'max-lines': [
      'error',
      { max: 200, skipBlankLines: true, skipComments: true },
    ],
    'max-lines-per-function': [
      'error',
      { max: 50, skipBlankLines: true, skipComments: true },
    ],
    complexity: ['error', 15],
    'max-depth': ['error', 4],
    'react/jsx-props-no-spreading': 'warn',
    'react/jsx-no-useless-fragment': 'error',
    eqeqeq: ['error', 'smart'],
    'prefer-const': 'error',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-trailing-spaces': 'error',
  },
}
