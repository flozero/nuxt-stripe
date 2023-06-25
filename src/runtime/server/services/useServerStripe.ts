import Stripe from "stripe"
import { useRuntimeConfig } from '#imports'
import { H3Event } from 'h3';

/**
 * useServerStripe is a utility function that initializes and returns a Stripe instance
 * for server-side usage in Nuxt 3. It ensures that only one instance of Stripe is created
 * per event context, avoiding unnecessary re-initializations.
 *
 * @param {H3Event} event - The event object passed to the Nuxt 3 event handler
 * @return {Promise<Stripe>} - A Promise that resolves to the Stripe server instance for the event context
 */
export const useServerStripe = async(event: H3Event): Promise<Stripe> => {
  const {stripe: { apiKey, apiVersion }} = useRuntimeConfig()

  // If the Stripe instance is already initialized for the event context, return it
  if ( event.context._stripe ) return event.context._stripe as Stripe

  // Stripe's TypeScript definition may throw an error if the apiVersion is not set
  // We can safely ignore this error by using the @ts-ignore directive
  // @docs — https://stripe.com/docs/api/versioning
  // @ts-ignore
  const stripe = new Stripe(apiKey, { apiVersion })

  // Store the initialized Stripe instance in the event context for future use
  event.context._stripe = stripe

  return event.context._stripe
}