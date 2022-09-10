module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:jest-dom/recommended',
    'plugin:storybook/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {},
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'airbnb-typescript',
        'prettier',
      ],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 12,
        project: './tsconfig.blocks.json',
        sourceType: 'module',
      },
      plugins: ['react', '@typescript-eslint', 'jsx-a11y', 'jest-dom'],
      rules: {
        'react/jsx-filename-extension': [
          1,
          {
            extensions: ['.jsx', '.tsx'],
          },
        ],
        '@typescript-eslint/ban-ts-comment': [0],
        '@typescript-eslint/no-explicit-any': [0],
        'react/jsx-props-no-spreading': [0],
        'react/prop-types': [0],
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/require-default-props': 'off',
        'import/extensions': [0, 'never'],
        'import/no-extraneous-dependencies': [0, 'never'],
      },
    },
  ],
};
