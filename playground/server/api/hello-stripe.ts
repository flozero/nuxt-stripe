import { useServerStripe } from '#stripe/server'

export default defineEventHandler(async (event) => { 
    const stripe = await useServerStripe(event)

    console.log(stripe)

    return {
        hello: "stripe",
    }
});