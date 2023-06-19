export default defineNuxtConfig({
  modules: ['../src/module'],
  stripe: {
    publishableKey: 'pk_test_123',
    apiKey: 'sk_test_123'
  }
})
