// https://vitest.dev/guide/debugging.html#vscode to debug tests

import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, $fetch } from '@nuxt/test-utils'

import stripe from './fixtures/basic/stripeConfig'

describe('ssr', async () => {
  const rootDir = fileURLToPath(new URL('./fixtures/basic', import.meta.url))
  await setup({ rootDir })

  it('renders the index page', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<h1>Nuxt Stripe module test</h1>')
  })

  it('overrides the default config exposing only public key', async () => {
    const html = await $fetch('/')

    expect(html).toContain(`publishableKey:"${stripe.publishableKey}"`)
    expect(html).not.toContain(`apiKey:"${stripe.apiKey}"`)
    expect(html).not.toContain(`apiVersion:"${stripe.apiVersion}"`)
  })

  it('correctly returns from server API', async () => {
    const response = await $fetch('/api/stripe', { method: 'GET' })
  
    expect(response.status).toBe(200)
    expect(response.version).toBe("12.9.0")
  })

  it('validates ssr config', async () => {
    const serverResponse = await $fetch('/')
    const serverRenderedHtml = serverResponse.data
  
    const clientResponse = await $fetch('/client-rendered')
    const clientRenderedHtml = clientResponse.data
  
    expect(serverRenderedHtml).toEqual(clientRenderedHtml)
  })
})
