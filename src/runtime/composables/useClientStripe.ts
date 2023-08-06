import { onBeforeMount, useNuxtApp, useState } from "#imports"
import { Stripe } from '@stripe/stripe-js'
/**
 * useClientStripe function
 *
 * This function is a helper to easily access the Stripe instance provided by the Nuxt plugin.
 * It can be used in components or pages to interact with the Stripe.js library.
 * 
 */
export default async function useClientStripe() {
  const nuxtApp = useNuxtApp()
  const stripe = useState<Stripe>('stripe-client', () => null)
  const isLoading = useState('stripe-client-loading', () => false)

  onBeforeMount(async () => {
    if (!isLoading.value) {
      isLoading.value = true
      const _stripe = await nuxtApp.$stripe._loadStripe()
      stripe.value = _stripe
      isLoading.value = false
    }
  })

  return stripe 
}
