<template>
  <main>
    <h1>Nuxt - Stripe module playground</h1>
    <section class="section">
      <h2>Stripe client app.vue</h2>
      <ClientOnly>
        <code>
        {{ stripe ? "loaded" : "Loading..." }}
      </code>
      </ClientOnly>
    </section>
    <OtherComponent class="section" />
    <OtherOverride class="section" />
  </main>
</template>

<script setup lang="ts">
import { useNuxtApp, useClientStripe } from "#imports";

// As we have defined manualClientLoad: true in the module options, we need to manually load the stripe client
// That means you have to setup the stripe client in the root component of your app
// This let you have multiple stripe clients in your app and not rely on the module to load the client
const { loadStripe, stripe } = useClientStripe();
const nuxtApp = useNuxtApp();

// you can leave loadStripe() empty, if you already have defined the keys in the config or override like in this example
stripe.value = await loadStripe(nuxtApp.$config.public.stripe.key);
</script>

<style>
html {
  background-color: #222;
  color: #ffff;
  font-family: sans-serif;
  font-size: 1rem;
  margin: 1rem;
}

h1,
h2 {
  margin: 0 0 1.5rem;
}

section {
  background-color: #2f2d2d;
  border-radius: 1rem;
  font-family: monospace;
  padding: 1.5rem;
  white-space: pre-wrap;
}

.section {
  margin-bottom: 1.5rem;
}

.section:last-child {
  margin-bottom: 0;
}
</style>
