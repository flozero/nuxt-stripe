import { defineNuxtPlugin } from '#imports'
import { Stripe, loadStripe } from '@stripe/stripe-js'


let stripe: Stripe = null

/**
 * Nuxt plugin for Stripe
*
* This plugin loads the Stripe.js library and provides a Stripe instance using the publishable key
* from the Nuxt app configuration.
*
*/
export default defineNuxtPlugin(async(nuxtApp) => {
  
  async function _loadStripe() {
    console.log("je suis la", nuxtApp.$config)
    if (stripe){
      return stripe
    }

    if (!nuxtApp.$config.public.stripe.key) console.warn("no key given for client service")

    stripe = await loadStripe(
      nuxtApp.$config.public.stripe.key,
      nuxtApp.$config.public.stripe.options
    )
    return stripe
  }
  
  return {
    provide: {
      stripe: _loadStripe,
    }
  }
})
