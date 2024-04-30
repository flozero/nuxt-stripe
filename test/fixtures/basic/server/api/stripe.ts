import { defineEventHandler } from 'h3'
import { useServerStripe } from '#stripe/server'

export default defineEventHandler(async (event) => {
  const stripe = await useServerStripe(event)

  return {
    status: 200,
    // @ts-expect-error
    version: stripe.VERSION,
  }
})
