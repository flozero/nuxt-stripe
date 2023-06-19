# Nuxt module for stripe

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt module for application using stripe.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
- [🏀 Online playground](https://stackblitz.com/github/fuentesloic/nuxt3-stripe?file=playground%2Fapp.vue)
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

At any time look at the playground for code examples.

As Stripe can only be used in a node env we had to use both `stripe` (ssr / server) and `@stripe/stripe-js` (frontend).

Use stripe inside the server folder. 

``` server/api/hello-stripe.ts
import { useServerStripe } from '#stripe/server'

export default defineEventHandler(async (event) => { 
    const stripe = await useServerStripe(event)

    console.log(stripe)

    return {
        hello: "stripe"
    }
});
```

Use stripe inside pages or plugins

``` app.vue
<template>
  <h1>Nuxt Stripe module playground!</h1>
  <div>
    {{ stripe }}
  </div>
</template>

<script setup lang="ts">
import { useClientStripe } from '#imports';

const stripe = useClientStripe() // useClientStripe is doing exactly the same as the code below. We have added a composable for convenience
const stripePlugin = useNuxtApp().$stripe

</script>

```


## Quick Setup

1. Add `@nuxtjs/stripe` dependency to your project

```bash
# Using pnpm
pnpm add -D @nuxtjs/stripe

# Using yarn
yarn add --dev @nuxtjs/stripe

# Using npm
npm install --save-dev @nuxtjs/stripe
```

2. Add `@nuxtjs/stripe` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/stripe'
  ],
  stripe: { // both keys are required. Check typescript
    publishableKey: 'pk_test_123',
    apiKey: 'sk_test_123'
  }
})
```

## Configuration

``` nuxt.config.js
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/stripe'
  ],
  stripe: { 
    publishableKey: 'pk_test_123', // required
    apiKey: 'sk_test_123' // required,
    locale: string,
    apiVersion: string, // default 2022-11-15
  }
})
```

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/stripe/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@nuxtjs/stripe

[npm-downloads-src]: https://img.shields.io/npm/dm/@nuxtjs/stripe.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/stripe

[license-src]: https://img.shields.io/npm/l/@nuxtjs/stripe.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@nuxtjs/stripe

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
