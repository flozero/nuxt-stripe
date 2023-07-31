<template>
  <main>
    <h1>Nuxt - Stripe module playground</h1>
    <section>
      <h2>Stripe client</h2>
      <code>
        {{ stripeClient ? stripeClient : 'Loading...' }}
      </code>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useClientStripe } from '#imports'

const stripeClient = await useClientStripe()
</script>

<style>
html {
  background-color: #222;
  color: #eee;
  font-family: sans-serif;
  font-size: 1rem;
  margin: 1rem;
}

h1, h2  {
  margin: 0 0 1.5rem;
}

section {
  background-color: #2f2d2d;
  border-radius: 1rem;
  font-family: monospace;
  padding: 1.5rem;
  white-space: pre-wrap;
}
</style>