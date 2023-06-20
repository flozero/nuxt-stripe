import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, $fetch } from '@nuxt/test-utils'

// https://vitest.dev/guide/debugging.html#vscode to debug tests

describe('ssr', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
  })

  it('renders the index page', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<h1>Nuxt Stripe module playground!</h1>')
  })

  it("should have override the default config", async () => {
    const html = await $fetch('/')
    expect(html).toContain('publishableKey:"pk_test_123"')
    expect(html).toContain('apiVersion:"2021-01-01"')
  })

  it.todo("validate ssr config")
})
