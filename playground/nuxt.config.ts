export default defineNuxtConfig({
  modules: ['../src/module'],
  stripe: {
    client: {
      key: 'pk_test_123',
    },
    server: {
      key: 'sk_test_123',
    },
  },
})
