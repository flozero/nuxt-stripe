import { defineEventHandler, getQuery, createError } from 'h3'
import { useServerStripe } from '#stripe/server'

export default defineEventHandler(async (event) => {

  const query = await getQuery(event)
  const stripe = await useServerStripe(event)

  if (!query.productId) {
    throw createError({
      statusCode: 500,
      statusMessage: "productId is required"
    })
  }

  const product = await stripe.products.retrieve(query.productId)

  if (!product) {
    return null
  }
  return product
})
