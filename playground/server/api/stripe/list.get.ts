import { defineEventHandler } from 'h3'
import { useServerStripe } from '#stripe/server'

export default defineEventHandler(async (event) => {

  const stripe = await useServerStripe(event)
  const products = await stripe.products.list({
    "expand": ["data.default_price"]
  })

  return products
})
