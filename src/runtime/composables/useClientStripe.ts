import { loadStripe } from '@stripe/stripe-js'

import type { Stripe } from '@stripe/stripe-js'
import { onMounted, useNuxtApp, useState } from '#imports'
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

  async function _loadStripe() {
    if (stripe.value) {
      return stripe.value
    }

    isLoading.value = true

    if (!nuxtApp.$config.public.stripe.key) console.warn('no key given for Stripe client service')

    return await loadStripe(
      nuxtApp.$config.public.stripe.key,
      nuxtApp.$config.public.stripe.options,
    )
  }

  onMounted(async () => {
    if (!isLoading.value) {
      const _stripe = await _loadStripe()
      stripe.value = _stripe
      isLoading.value = false
    }
  })

  return stripe
}
