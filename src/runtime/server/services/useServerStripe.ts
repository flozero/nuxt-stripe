import Stripe from 'stripe'
import type { H3Event } from 'h3'
import { useRuntimeConfig } from '#imports'

/**
 * useServerStripe is a utility function that initializes and returns a Stripe instance
 * for server-side usage in Nuxt. It ensures that only one instance of Stripe is created
 * per event context, avoiding unnecessary re-initializations.
 *
 * @param {H3Event} event - The event object passed to the Nuxt event handler
 * @return {Promise<Stripe>} - A Promise that resolves to the Stripe server instance for the event context
 */
export const useServerStripe = async (event: H3Event): Promise<Stripe> => {
  const { stripe: { key, options } } = useRuntimeConfig()

  // Return Stripe's instance if already initialized in event context
  if (event.context._stripe) return event.context._stripe

  if (!key) console.warn('no key given for server service')

  // @docs — https://stripe.com/docs/api/versioning
  const stripe = new Stripe(key, options)

  // Store the initialized Stripe instance in the event context for future use
  event.context._stripe = stripe

  return event.context._stripe
}
