import { defineNuxtPlugin } from '#app'

import { loadStripe } from '@stripe/stripe-js';

export default defineNuxtPlugin(async(nuxtApp) => {
  const stripe = await loadStripe(nuxtApp.$config.public.stripe.publishableKey);

  return {
    provide: {
      stripe
    }
  }
})
