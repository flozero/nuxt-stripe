import { useServerStripe } from '#stripe/server'
import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => { 
    await useServerStripe(event)
    
    return {
        status: 200,
    }
});