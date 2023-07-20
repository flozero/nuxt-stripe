import { ref, useRuntimeConfig } from '#imports'
import { Stripe, loadStripe } from '@stripe/stripe-js'

/**
 * useClientStripe function
 *
 * This function is a helper to easily access the Stripe instance provided by the Nuxt plugin.
 * It can be used in components or pages to interact with the Stripe.js library.
 * 
 */

export default function useClientStripe() {
  const stripe = ref<Stripe | null>(null)

  if (!stripe.value) {
    const { public: { stripe: { publishableKey } } } = useRuntimeConfig()

    if (!publishableKey) {
      throw new Error('Missing publishableKey option.')
    }

    loadStripe(publishableKey).then((stripeInstance) => {
      stripe.value = stripeInstance
    })
  }

  return stripe
}