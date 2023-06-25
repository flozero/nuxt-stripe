# Nuxt module for Stripe

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

Nuxt module for application using stripe.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
- [🏀 Online playground](https://stackblitz.com/github/fuentesloic/nuxt3-stripe?file=playground%2Fapp.vue)

## Features

This Nuxt module provides an easy way to integrate Stripe in your Nuxt application, both on the client-side and server-side. It utilizes the official `stripe` package for server-side usage and @stripe/stripe-js for the client-side.

### Server-side usage

The module provides a `useServerStripe` function to create a Stripe instance on the server-side.
This instance can be used to interact with the Stripe API.

#### Example
```ts
import { defineEventHandler } from 'h3'
import { useServerStripe } from '#stripe/server'

export default defineEventHandler(async (event) => {
  const stripe = await useServerStripe(event)
  console.info("Stripe instance:", stripe)

  return {
    version: stripe.VERSION
  }
})
```

### Client-side usage

On the client-side, you can use the `useClientStripe` function to get a Stripe instance.
This instance can be used in pages or plugins.

Use stripe inside pages or plugins

#### Example
```vue
<template>
  <h1>Nuxt Stripe instance</h1>
  <div>
    {{ stripe }}
  </div>
</template>

<script setup lang="ts">
// Import the function in your component or page
import { useClientStripe } from 'nuxt3-stripe'

// Call the function to get the Stripe instance
const stripe = useClientStripe()

// Use the Stripe instance to interact with the stripe.js library
// stripe.redirectToCheckout(...)
</script>
```

## Quick Setup

1. Add `nuxt3-stripe` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt3-stripe

# Using yarn
yarn add --dev nuxt3-stripe

# Using npm
npm install --save-dev nuxt3-stripe
```

2. Add `nuxt3-stripe` to the `modules` section of `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: [
    'nuxt3-stripe'
  ],
})
```

## Configuration

Stripe keys can be added to the `.env` file...

```env
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_API_KEY="sk_live_..."
```

...or to the Nuxt configuration file:


```ts
export default defineNuxtConfig({
  modules: [
    'nuxt3-stripe'
  ],
  stripe: {
    // Server
    apiKey: 'sk_test_123', // required
    apiVersion: '2022-11-15', // optional, default is '2022-11-15'
    // Client
    publishableKey: 'pk_test_123', // required
  }
})
```

> We highly recommend you put your **production** keys in your `.env` file to avoid committing them

## Development

Initial step: Clone this repository

```bash
# Install dependencies
yarn install 
npm install

# Generate type stubs
yarn dev:prepare
npm run dev:prepare

# Develop with the playground
yarn dev
npm run dev

# Build the playground
yarn dev:build
npm run dev:build

# Run ESLint
yarn lint
npm run lint

# Run Vitest
yarn test
yarn test:watch
npm run test
npm run test:watch

# Release new version
yarn release
npm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt3-stripe/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt3-stripe

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt3-stripe.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt3-stripe

[license-src]: https://img.shields.io/npm/l/nuxt3-stripe.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt3-stripe

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
