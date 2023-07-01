# Nuxt module for Stripe

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

Nuxt module for application using stripe.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
- [🏀 Online playground](https://stackblitz.com/github/fuentesloic/nuxt-stripe?file=playground%2Fapp.vue)

## Features

This Nuxt module provides an easy way to integrate Stripe in your Nuxt application, both on the client-side and server-side. It utilizes the official [stripe](https://www.npmjs.com/package/stripe) package for server-side usage and [@stripe/stripe-js](https://www.npmjs.com/package/@stripe/stripe-js) for the client-side.

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
import { useClientStripe } from '@unlok-co/nuxt-stripe'

// Call the function to get the Stripe instance
const stripe = useClientStripe()

// Use the Stripe instance to interact with the stripe.js library
// stripe.redirectToCheckout(...)
</script>
```

## Quick Setup

1. Add `@unlok-co/nuxt-stripe` dependency to your project

```bash
# Using pnpm
pnpm add -D @unlok-co/nuxt-stripe

# Using yarn
yarn add --dev @unlok-co/nuxt-stripe

# Using npm
npm install --save-dev @unlok-co/nuxt-stripe
```

2. Add `@unlok-co/nuxt-stripe` to the `modules` section of `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: [
    '@unlok-co/nuxt-stripe'
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
    '@unlok-co/nuxt-stripe'
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

## Nuxt 2

Disclaimer! Nuxt 2's end-of-life is planned for 31st Dec, 2023.
The following stripe module is only for **nuxt 2** purpose and does **not** cover server side:
- [nuxt2-stripe - doc](https://github.com/WilliamDASILVA/nuxt-stripe-module)
- [nuxt2-stripe - latest release](https://github.com/WilliamDASILVA/nuxt-stripe-module/releases/tag/3.0.0)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@unlok-co/nuxt-stripe/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@unlok-co/nuxt-stripe

[npm-downloads-src]: https://img.shields.io/npm/dm/@unlok-co/nuxt-stripe.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@unlok-co/nuxt-stripe

[license-src]: https://img.shields.io/npm/l/@unlok-co/nuxt-stripe.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@unlok-co/nuxt-stripe

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
