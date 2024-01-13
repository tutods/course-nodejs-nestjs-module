module.exports = {
  // parser: '@typescript-eslint/parser',
  // parserOptions: {
  //   project: 'tsconfig.json',
  //   tsconfigRootDir: __dirname,
  //   sourceType: 'module',
  // },
  // plugins: ['@typescript-eslint/eslint-plugin'],
  // extends: [
  //   'plugin:@typescript-eslint/recommended',
  //   'plugin:prettier/recommended',
  // ],
  root: true,
  extends: [
    '@tutods/eslint-config/node',
    '@tutods/eslint-config/prettier'
  ],
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
};
