import { defineNuxtModule, addPlugin, createResolver, addImportsDir, addTemplate } from '@nuxt/kit'
import defu from "defu"

export interface ModuleOptions {
  /**
   * Stripe publishable key for client side only
   * @example 'pk_test_yOipfsEBmvrjWhSJFMCMX0yf'
   * @type string | null
   * @docs https://stripe.com/docs/js/initializing
   */
  publishableKey: string | null,
  /**
   * Stripe private key for server side only
   * @example 'pk_test_yOipfsEBmvrjWhSJFMCMX0yf'
   * @type string | null
   * @docs https://...
   */
  apiKey: string | null,
  // TODO: add more options
  locale: string,
  // TODO: add more options
  apiVersion: string | "2022-11-15"
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxtjs/stripe',
    configKey: 'stripe',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {
      publishableKey: null,
      apiKey: null,
      locale: 'en',
      apiVersion: "2022-11-15"
  },
  setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    if (!options.publishableKey) {
      throw new Error('Missing publishableKey option')
    }
    if (!options.apiKey) {
      throw new Error('Missing apiKey option')
    }

    // Add public and private runtime config
    nuxt.options.runtimeConfig.public.stripe = {
      publishableKey: options.publishableKey,
      locale: options.locale,
      apiVersion: options.apiVersion
    }

    nuxt.options.runtimeConfig.stripe = {
      apiKey: options.apiKey
    }

    addPlugin(resolve('./runtime/plugins/stripe.client'))
    addImportsDir(resolve('./runtime/composables'))

    addTemplate({
      filename: 'types/stripe.d.ts',
      getContents: () => `
        declare module '#stripe/server' {
          const useServerStripe: typeof import('${resolve('./runtime/server/services')}').useServerStripe
        }
        export {}`
    })

    nuxt.hook('nitro:config', (nitroConfig) => {
      nitroConfig.alias = nitroConfig.alias || {}
      nitroConfig.externals = defu(typeof nitroConfig.externals === 'object' ? nitroConfig.externals : {}, {
        inline: [resolve('./runtime')]
      })
      nitroConfig.alias['#stripe/server'] = resolve('./runtime/server/services')
    })


    nuxt.hook('prepare:types', (options) => {
      options.references.push({ path: resolve(nuxt.options.buildDir, 'types/stripe.d.ts') })
    })
  }
})
