import { defineEventHandler, readBody, createError } from 'h3'
import { useServerStripe } from '#stripe/server'

export default defineEventHandler(async (event) => {
    const stripe = await useServerStripe(event)
    const body = await readBody(event)

    if (!body.priceId) {
      throw createError({
        statusCode: 500,
        statusMessage: "priceId is required"
      })
    }

    const session = await stripe.checkout.sessions.create({
      "payment_method_types": ["card"],
      "mode":"subscription",
      "success_url": `http://localhost:3000/${body.productId}/success`,
      "cancel_url": `http://localhost:3000/${body.productId}/cancel`,
      "line_items": [
        {
          "price": body.priceId,
          "quantity": 1
        }
      ]
    })

    if (!session) {
      throw createError({
        statusCode: 500,
        statusMessage: "issue creating checkout session"
      })
    }

    return {
      url: session.url
    }
})
