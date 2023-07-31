import { defineNuxtModule, createResolver, resolveModule } from '@nuxt/kit'
import defu from 'defu'
import { fileURLToPath } from 'url'
import { Stripe } from 'stripe'
import type { StripeConstructorOptions } from '@stripe/stripe-js'

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
   * @docs https://stripe.com/docs/api/authentication
   */
  apiKey: string | null,

  /**
   * Stripe config options for client side only
   * @docs https://stripe.com/docs/js/initializing
   */
  clientConfig?: StripeConstructorOptions,

  /**
   * Stripe config options for server side only
   * @docs https://github.com/stripe/stripe-node#configuration
   */
  serverConfig?: Stripe.StripeConfig
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@unlok-co/nuxt-stripe',
    configKey: 'stripe',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {
      publishableKey: '' as string,
      apiKey: '' as string,
      clientConfig: {
        apiVersion: '2022-11-15' as Stripe.LatestApiVersion
      },
      serverConfig: {
        apiVersion: '2022-11-15' as Stripe.LatestApiVersion
      }
  },
  setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const resolveRuntimeModule = (path: string) => resolveModule(path, { paths: resolve('./runtime') })

    // Public runtimeConfig
    nuxt.options.runtimeConfig.public.stripe = defu(nuxt.options.runtimeConfig.public.stripe, {
      publishableKey: options.publishableKey,
      clientConfig: options.clientConfig
    })

    // Private runtimeConfig
    nuxt.options.runtimeConfig.stripe = defu(nuxt.options.runtimeConfig.stripe, {
      apiKey: options.apiKey,
      serverConfig: options.serverConfig
    })

    // Transpile runtime
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    nuxt.hook('imports:dirs', (dirs) => {
      dirs.push(resolve(runtimeDir, 'composables'))
    })

    nuxt.hook('nitro:config', (nitroConfig) => {
      nitroConfig.alias = nitroConfig.alias || {}

      // Inline module runtime in Nitro bundle
      nitroConfig.externals = defu(typeof nitroConfig.externals === 'object' ? nitroConfig.externals : {}, {
        inline: [resolve('./runtime')]
      })
      nitroConfig.alias['#stripe/server'] = resolveRuntimeModule('./server/services')
    })

    nuxt.hook('prepare:types', (options) => {
      options.tsConfig.compilerOptions.paths['#stripe/server'] = [resolveRuntimeModule('./server/services')]
    })
  }
})
