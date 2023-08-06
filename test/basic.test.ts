// https://vitest.dev/guide/debugging.html#vscode to debug tests

import { describe, it, expect, vi, afterAll } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, $fetch } from '@nuxt/test-utils'

describe('ssr', async () => {
  const rootDir = fileURLToPath(new URL('./fixtures/basic', import.meta.url))

  await setup({ rootDir })

  it('renders the index page', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<h1>Nuxt Stripe module test</h1>')
  })

  it('overrides the default config exposing only public key', async () => {
    const html = await $fetch('/')
    expect(html).toContain(`{stripe:{key:"pk_test123",options:{}}`)
  })


  it('validates ssr config', async () => {
    const serverResponse = await $fetch('/')
    const serverRenderedHtml = serverResponse.data
  
    const clientResponse = await $fetch('/client-rendered')
    const clientRenderedHtml = clientResponse.data
  
    expect(serverRenderedHtml).toEqual(clientRenderedHtml)
  })
})
