# Nuxt module for Stripe

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

Nuxt module for application using stripe.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
- [🏀 Online playground](https://stackblitz.com/github/fuentesloic/nuxt-stripe?file=playground%2Fapp.vue)

## Features

This Nuxt module provides an easy way to integrate Stripe in your Nuxt application, both on the client-side and server-side. It utilizes the official [stripe](https://www.npmjs.com/package/stripe) package for server-side usage and [@stripe/stripe-js](https://www.npmjs.com/package/@stripe/stripe-js) for the client-side.

## Installation

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

For all available `serverConfig` options take a look at the [official repo README](https://github.com/stripe/stripe-node#configuration). While for the `clientConfig` options take a look at the [official docs](https://stripe.com/docs/js/initializing#init_stripe_js-options).

### Using Options

```ts
export default defineNuxtConfig({
  modules: ["@unlok-co/nuxt-stripe"],
  stripe: {
    // Server
    server: {
      key: process.env.STRIPE_SECRET_KEY,
      options: {
        // your api options override for stripe server side
        // https://github.com/stripe/stripe-node?tab=readme-ov-file#configuration
      },
    },
    // Client
    client: {
      key: process.env.STRIPE_PUBLIC_KEY,
      // manualClientLoad: true, // if you want to have control where you are going to load the client
      // your api options override for stripe client side https://stripe.com/docs/js/initializing#init_stripe_js-options
      options: {},
    },
  },
});
```

### Alternatively using [Runtime Config](https://nuxt.com/docs/guide/going-further/runtime-config)

```ts
export default defineNuxtConfig({
  modules: ["@unlok-co/nuxt-stripe"],
  runtimeConfig: {
    // Server
    stripe: {
      key: process.env.STRIPE_SECRET_KEY,
      options: {},
    },
    // Client
    public: {
      stripe: {
        key: process.env.STRIPE_PUBLIC_KEY,
        options: {},
      },
    },
  },
});
```

## Usage

### Server-side

The module provides a `useServerStripe` function to create a Stripe instance on the server-side.
This instance can be used to interact with the Stripe API.

#### Minimum example

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

#### generate payment intent for stripe elements

At any time you can find a full code at `playground/server/api/create-payment-intent.get.ts` for the server side and `playground/components/OtherComponent.vue`
for the client side.

Server side example:

```ts
export default defineEventHandler(async (event) => {
  const stripe = await useServerStripe(event);
  const orderAmount = 1400;
  let paymentIntent;

  try {
    paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: orderAmount,
      automatic_payment_methods: { enabled: true },
    });

    return {
      clientSecret: paymentIntent.client_secret,
      error: null,
    };
  } catch (e) {
    return {
      clientSecret: null,
      error: e,
    };
  }
});
```

Client side example:

```ts
const { stripe } = useClientStripe();

watch(
  stripe,
  async () => {
    if (stripe.value) {
      // https://github.com/stripe-samples/accept-a-payment/blob/main/payment-element/client/vue-cva/src/components/SrCheckoutForm.vue
      const { clientSecret, error } = await $fetch(
        "/api/create-payment-intent"
      );
      if (error) {
        console.error(error);
        return;
      }

      const elements = stripe.value.elements({
        clientSecret: clientSecret as string,
      });
      const linkAuthenticationElement = elements.create("linkAuthentication");
      linkAuthenticationElement.mount("#linkAuthenticationElement");
    }
  },
  {
    immediate: true,
  }
);
```

### Client-side usage

On the client-side, you can use the `useClientStripe`. This is going to expose to you an object with

```ts
{
  stripe, // This composable is a wrap around the [`loadStripe`](https://github.com/stripe/stripe-js#loadstripe) and can be used in pages or plugins.
  isLoading, // You don't really need this in practice but we did expose it
  loadStipe; // you can also manually loadStripe if you have disabled auto load for stripe
}
```

You can see the actual code used inside `playground/app.vue` file.

#### Automated load of stripe client side

```vue
<template>
  <h1>Nuxt Stripe instance</h1>
  <div>
    {{ stripe ? stripe : "Loading..." }}
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";

const { stripe, isLoading } = await useClientStripe();
</script>
```

#### Manually load client side stripe

nuxt.config.ts

```ts
stripe: {
    client: {
      // ...
      manualClientLoad: true, // this is the part you want
    },
      // ...
},
```

App.vue

```ts
import { useNuxtApp, useClientStripe } from "#imports";

const { loadStripe, stripe } = useClientStripe();
const nuxtApp = useNuxtApp();

// you can leave it empty if you already have defined the keys in the config or override like in this example
stripe.value = await loadStripe(nuxtApp.$config.public.stripe.key);
```

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
