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
import { defineEventHandler } from "h3";
import { useServerStripe } from "#stripe/server";

export default defineEventHandler(async (event) => {
  const stripe = await useServerStripe(event);
  console.info("Stripe instance:", stripe);

  return {
    version: stripe.VERSION,
  };
});
```

### Client-side usage

On the client-side, you can use the `useClientStripe` function to get a Stripe instance.
This composable is a wrap around the [`loadStripe`](https://github.com/stripe/stripe-js#loadstripe) and can be used in pages or plugins.

#### Example

```vue
<template>
  <h1>Nuxt Stripe instance</h1>
  <div>
    {{ stripe ? stripe : "Loading..." }}
  </div>
</template>

<script setup lang="ts">
// Call the composable to get the Stripe instance
const stripe = await useClientStripe();

// Use the Stripe instance to interact with the stripe.js library
// https://docs.stripe.com/js
</script>
```

## Quick Setup

1. Add `@unlok-co/nuxt-stripe` dependency to your project

```bash
npx nuxi@latest module add stripe-next
```

2. Add `@unlok-co/nuxt-stripe` to the `modules` section of `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: ["@unlok-co/nuxt-stripe"],
});
```

## Configuration

```ts
export default defineNuxtConfig({
  modules: ["@unlok-co/nuxt-stripe"],
  stripe: {
    // Server
    server: {
      key: "sk_test_123",
      options: {
        // your api options override for stripe server side
        // https://github.com/stripe/stripe-node?tab=readme-ov-file#configuration
      },
      // CLIENT
    },
    client: {
      key: "pk_test_123",
      // your api options override for stripe client side https://stripe.com/docs/js/initializing#init_stripe_js-options
      options: {},
    },
  },
});
```

For all available `serverConfig` options take a look at the [official repo README](https://github.com/stripe/stripe-node#configuration). While for the `clientConfig` options take a look at the [official docs](https://stripe.com/docs/js/initializing#init_stripe_js-options).

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

[npm-version-src]: https://img.shields.io/npm/v/@unlok-co/nuxt-stripe/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@unlok-co/nuxt-stripe
[npm-downloads-src]: https://img.shields.io/npm/dm/@unlok-co/nuxt-stripe.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@unlok-co/nuxt-stripe
[license-src]: https://img.shields.io/npm/l/@unlok-co/nuxt-stripe.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@unlok-co/nuxt-stripe
[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
