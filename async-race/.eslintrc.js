module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: ["**/*.js"],
  extends: [
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    "arrow-body-style": ["error", "as-needed"],
    "max-lines-per-function": ["error", {"max": 40, "skipBlankLines": true}],
    "max-len": ["error", { "code": 100 }]
  },
};
