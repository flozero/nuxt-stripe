import { useServerStripe } from '#stripe/server'

export default defineEventHandler(async (event) => { 
    const stripe = await useServerStripe(event)
    return {
        hello: "stripe"
    }
});