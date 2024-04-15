import { defineNuxtModule, createResolver } from '@nuxt/kit'
import defu from 'defu'
import Stripe from 'stripe'
import { fileURLToPath } from 'url'

import type { StripeConstructorOptions } from '@stripe/stripe-js'

export interface ServerStripeOptions {
  key?: string | null,
  options?: Stripe.StripeConfig
}

export interface ClientStripeOptions  {
  key?: string | null;
  options?: StripeConstructorOptions;
}

export interface ModuleOptions {
  server: ServerStripeOptions
  client: ClientStripeOptions
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
      server: {
        key: null,
        options: {}
      },
      client: {
        key: null,
        options: {}
      }
  },
  setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Public runtimeConfig
    nuxt.options.runtimeConfig.public.stripe = defu(nuxt.options.runtimeConfig.public.stripe, options.client)

    // Private runtimeConfig
    nuxt.options.runtimeConfig.stripe = defu(nuxt.options.runtimeConfig.stripe, options.server)

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
      nitroConfig.alias['#stripe/server'] = resolve(runtimeDir, './server/services')
    })

    nuxt.hook('prepare:types', (options) => {
      options.tsConfig.compilerOptions.paths['#stripe/server'] = [resolve(runtimeDir, './server/services')]
    })
  }
})
