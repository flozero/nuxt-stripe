import { useServerStripe } from '#stripe/server'
import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => { 
    const stripe = await useServerStripe(event)

    return {
        api: stripe.PACKAGE_VERSION
    }
});