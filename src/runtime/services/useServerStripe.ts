import Stripe from "stripe"

export const useServerStripe = async(event: any) => {
  const { stripe: { apiKey }, public: { stripe: { apiVersion }} } = useRuntimeConfig()

  if ( event.context._stripe ) return event.context._stripe

  // @ts-ignore
  const stripe = new Stripe(apiKey, { apiVersion })
  event.context._stripe = stripe

  return event.context._stripe
}