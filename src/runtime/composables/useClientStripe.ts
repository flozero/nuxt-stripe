import { useNuxtApp } from "#imports"

/**
 * useClientStripe function
 *
 * This function is a helper to easily access the Stripe instance provided by the Nuxt plugin.
 * It can be used in components or pages to interact with the Stripe.js library.
 * 
 */

export default function useClientStripe() {
  const { public: { stripe: { publishableKey } } } = useRuntimeConfig()

  if (!publishableKey) {
    throw new Error('Missing publishableKey option.')
  }

  return useNuxtApp().$stripe
}