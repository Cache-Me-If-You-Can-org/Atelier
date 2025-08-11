module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: { version: 'detect' },
  },
};