import { defineNuxtPlugin } from '#imports'
import { loadStripe } from '@stripe/stripe-js';

export default defineNuxtPlugin(async(nuxtApp) => {
  const stripe = await loadStripe(nuxtApp.$config.public.stripe.publishableKey);

  return {
    provide: {
      stripe
    }
  }
})
