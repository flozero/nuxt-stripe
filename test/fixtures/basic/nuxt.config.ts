export default defineNuxtConfig({
  ssr: true,
  modules: [
    '../../../src/module',
  ],
  stripe: {
    client: {
      key: 'pk_test123',
    },
    server: {
      key: 'sk_test123',
    },
  },
})
