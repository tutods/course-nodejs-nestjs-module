module.exports = {
  root: true,
  extends: ['@tutods/eslint-config/node', '@tutods/eslint-config/prettier'],
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
};
