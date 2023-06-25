import stripe from "./stripeConfig"

export default defineNuxtConfig({
  ssr: true,
  modules: ["../../../src/module"],
  stripe
})
