<template>
  <main>
    <h1>Nuxt 3 - Stripe module playground</h1>
    <section>
      <h2>Stripe client</h2>
      <code>
        {{ stripeClient ? stripeClient : 'Loading...' }}
      </code>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useClientStripe } from '#imports';
import { Stripe } from '@stripe/stripe-js';

const stripeClient = ref<Stripe | null>(null)
stripeClient.value = useClientStripe()
</script>

<style>
html {
  font-family: sans-serif;
  font-size: 1rem;
  color: #eee;
  background-color: #222;
  margin: 1rem;
}

h1, h2  {
  margin: 0 0 1.5rem;
}

section {
  background-color: #2f2d2d;
  padding: 1.5rem;border-radius: 1rem;
  white-space: pre-wrap;
  font-family: monospace;
}
</style>