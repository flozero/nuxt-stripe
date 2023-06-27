export default defineNuxtConfig({
  modules: ['../src/module', '@nuxtjs/tailwindcss'],
  stripe: {
    publishableKey: process.env.STRIPE_PKEY,
    apiKey: process.env.STRIPE_SKEY
  }
})
