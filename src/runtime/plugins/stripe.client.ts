import { defineNuxtPlugin } from '#imports'
import { loadStripe } from '@stripe/stripe-js'

/**
 * Nuxt plugin for Stripe
 *
 * This plugin loads the Stripe.js library and provides a Stripe instance using the publishable key
 * from the Nuxt app configuration.
 *
 */

export default defineNuxtPlugin(async(nuxtApp) => {
  const stripe = await loadStripe(nuxtApp.$config.public.stripe.publishableKey)

  return {
    provide: {
      stripe
    }
  }
})
