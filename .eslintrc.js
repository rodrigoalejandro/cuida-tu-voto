module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'object-shorthand': 'off',
    'nuxt/no-globals-in-created': 'off',
    'vue/no-v-html': 'off',
    'unicorn/prefer-includes': 'off',
    'vue/order-in-components': 'off',
    'no-prototype-builtins': 'off'
  }
}
