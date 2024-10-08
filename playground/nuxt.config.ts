export default defineNuxtConfig({
  modules: ["../src/module"],

  stripe: {
    client: {
      key: process.env.STRIPE_PUBLIC_KEY,
    },
    server: {
      key: process.env.STRIPE_SECRET_KEY,
    },
  },
  compatibilityDate: "2024-10-07",
});
